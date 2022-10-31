import { notification } from "@/utils";
import { contentAPI } from "@features/Contents";
import { CMSTable } from "@features/UI";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {name: 'ID', key: "id", hide: true},
  {name: 'Título', key: "title", hide: false},
  {name: 'Año', key: "year", hide: true},
  {name: 'Duración', key: "duration", hide: true},
  {name: 'Director', key: "director", hide: true},
];

export function Content() {

  const [contents, setContents] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  async function fetchData () {
    const contents = await contentAPI.fetchContents({ format: 'table' });
    setContents(contents);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(content) {
    const response = confirm("¿Estás seguro?");
    if(response === true) {
      await contentAPI.deleteContent(content);
      notification(enqueueSnackbar, `Se eliminó ${content.title}`);
      fetchData();
    }
  }

  return (
    <Container maxWidth="lg">
      <div style={{display: 'flex', gap: 10}}>
        <Typography variant="h4" fontWeight={100}>Contenidos</Typography>
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
    </Container>
  );
}
