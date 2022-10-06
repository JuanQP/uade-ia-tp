import { Box, Button, Paper, Typography } from "@mui/material";
import { Layout } from "../Layouts/Layout";
import AddIcon from '@mui/icons-material/Add';
import { CarouselTable } from "./Carousel/CarouselTable";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { checkToken } from "../utils";

async function fetchCarousels() {
  const response = await axios.get(`/api/carruseles`);
  return response.data.carruseles;
}

export function Carousel() {

  const [carousels, setCarousels] = useState([]);
  
  async function fetchData () {
    const carousels = await fetchCarousels();
    setCarousels(carousels);
  };

  useEffect(() => {
    checkToken();
    fetchData();
  }, []);

  async function handleDelete(carousel) {
    const response = confirm("¿Estás seguro?");
    if(response === true) {
      await axios.delete(`/api/carruseles/${carousel.id}`);
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
      <Paper style={{
        marginTop: 10,
        padding: 10
      }}>
        <CarouselTable
          carousels={carousels}
          onDelete={handleDelete}
        />
      </Paper>
    </Layout>
  );
}
