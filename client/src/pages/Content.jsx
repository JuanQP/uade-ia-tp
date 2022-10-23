import { checkToken, notification } from "@/utils";
import { CMSTable, Layout } from "@features/UI";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from "@mui/material";
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  {name: 'ID', key: "id", hide: true},
  {name: 'Título', key: "title", hide: false},
  {name: 'Año', key: "year", hide: true},
  {name: 'Duración', key: "duration", hide: true},
  {name: 'Director', key: "director", hide: true},
];

async function fetchContents() {
  const response = await axios.get(`/api/contenidos`, {
    params: { format: 'table' },
  });
  return response.data.results;
}

export function Content() {

  const [contents, setContents] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  async function fetchData () {
    const contents = await fetchContents();
    setContents(contents);
  };

  useEffect(() => {
    checkToken(navigate);
    fetchData();
  }, []);

  async function handleDelete(content) {
    const response = confirm("¿Estás seguro?");
    if(response === true) {
      await axios.delete(`/api/contenidos/${content.id}`);
      notification(enqueueSnackbar, `Se eliminó ${content.title}`);
      fetchData();
    }
  }

  return (
    <Layout>
      <div style={{display: 'flex', gap: 10}}>
        <Typography sx={{fontSize: 24}}>Contenidos</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          component={Link}
          to="/contents/new"
        >
          Nuevo
        </Button>
      </div>
      <Box mt={2} />
      <CMSTable
        items={contents}
        columns={columns}
        url="/contents/"
        onDelete={handleDelete}
      />
    </Layout>
  );
}
