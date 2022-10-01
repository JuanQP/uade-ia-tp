import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Layout } from "../../Layouts/Layout";
import { CarouselForm } from "./CarouselForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function NewCarousel() {

  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);

  async function handleCarouselSubmit(carousel) {
    setWaiting(true);
    try {
      const newCarousel = await axios.post('/api/carruseles', carousel);
      console.log("Server response:", newCarousel);
      navigate('/carousels');
    } catch (error) {
      console.error("Server error", error);
    }
    finally {
      setWaiting(false);
    }
  }

  return (
    <Layout>
      <Box>
        <Typography sx={{fontSize: 24}}>Nuevo carrusel</Typography>
        <Paper style={{
          marginTop: 10,
          padding: 12
        }}>
          <CarouselForm
            loading={waiting}
            onSubmit={handleCarouselSubmit}
          />
        </Paper>
      </Box>
    </Layout>
  )
}