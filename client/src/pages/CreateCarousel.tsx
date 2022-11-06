import { notification } from "@/utils";
import { carouselAPI, CarouselForm } from "@features/Carousels";
import { Container, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  paper: {
    marginTop: 10,
    padding: 12
  },
};

export function CreateCarousel() {

  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function handleCarouselSubmit(carousel: CarouselFormValues) {
    setWaiting(true);
    try {
      await carouselAPI.createCarousel(carousel);
      notification(enqueueSnackbar, `El carrusel ${carousel.title} se creó correctamente 👌`, "success");
      navigate('/carousels');
    } catch (error) {
      console.error("Server error", error);
    }
    finally {
      setWaiting(false);
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight={100}>Nuevo carrusel</Typography>
      <Paper style={styles.paper}>
        <CarouselForm
          loading={waiting}
          onSubmit={handleCarouselSubmit}
        />
      </Paper>
    </Container>
  )
}
