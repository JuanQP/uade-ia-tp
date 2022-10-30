import { notification } from "@/utils";
import { carouselAPI, CarouselForm } from "@features/Carousels";
import { Box, Paper, Typography } from "@mui/material";
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

  async function handleCarouselSubmit(carousel) {
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
    <Box>
      <Typography sx={{fontSize: 24}}>Nuevo carrusel</Typography>
      <Paper style={styles.paper}>
        <CarouselForm
          loading={waiting}
          onSubmit={handleCarouselSubmit}
        />
      </Paper>
    </Box>
  )
}
