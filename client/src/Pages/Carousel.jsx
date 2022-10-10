import { Box, Button, Paper, Typography } from "@mui/material";
import { Layout } from "../Layouts/Layout";
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { checkToken, notification } from "../utils";
import { useSnackbar } from "notistack";
import { CMSTable } from "../Components/CMSTable";

async function fetchCarousels() {
  const response = await axios.get(`/api/carruseles`);
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
    checkToken(navigate);
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
    <Layout>
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
    </Layout>
  );
}
