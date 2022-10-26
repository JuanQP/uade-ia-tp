import { notification } from "@/utils";
import { CMSTable } from "@features/UI";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from "@mui/material";
import axios from 'axios';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

async function fetchCarousels() {
  const response = await axios.get(`/api/carruseles`, {
    params: { format: 'table' },
  });
  return response.data.results;
}

const columns = [
  {name: 'ID', key: "id", hide: true},
  {name: 'Título', key: "title", hide: false},
];

export function Carousel() {

  const [carousels, setCarousels] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  async function fetchData () {
    const carousels = await fetchCarousels();
    setCarousels(carousels);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(carousel) {
    const response = confirm("¿Estás seguro?");
    if(response === true) {
      await axios.delete(`/api/carruseles/${carousel.id}`);
      notification(enqueueSnackbar, `Se eliminó el carrusel ${carousel.title}`);
      fetchData();
    }
  }

  return (
    <>
      <div style={{display: 'flex', gap: 10}}>
        <Typography sx={{fontSize: 24}}>Carruseles</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          component={Link}
          to="/carousels/new"
        >
          Nuevo
        </Button>
      </div>
      <Box mt={2}/>
      <CMSTable
        items={carousels}
        columns={columns}
        url="/carousels/"
        onDelete={handleDelete}
      />
    </>
  );
}
