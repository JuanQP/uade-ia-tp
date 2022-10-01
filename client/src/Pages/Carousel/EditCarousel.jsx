import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Layout } from "../../Layouts/Layout";
import { CarouselForm } from "./CarouselForm";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export function EditCarousel() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [carousel, setCarousel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const { data } = await axios.get(`/api/carruseles/${id}`);
        setCarousel(data.carousel);
      } catch (error) {
        console.error(error);
        navigate('/carousels');
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  async function handleCarouselSubmit(carousel) {
    setWaiting(true);
    try {
      const newCarousel = await axios.patch(`/api/carruseles/${id}`, carousel);
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
        <Typography sx={{fontSize: 24}}>Editando {carousel?.title ?? 'carrusel'}</Typography>
        <Paper style={{
          marginTop: 10,
          padding: 12
        }}>
          {fetching ? (
            <CircularProgress />
          ) : (
            <CarouselForm
              editing
              initialValues={carousel}
              loading={waiting}
              onSubmit={handleCarouselSubmit}
            />
          )}
        </Paper>
      </Box>
    </Layout>
  )
}