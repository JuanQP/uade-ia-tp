import { carouselAPI } from "@/features/Carousels";
import { notification } from "@/utils";
import { CarouselForm } from "@features/Carousels";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const styles = {
  paper: {
    marginTop: 10,
    padding: 12
  },
};

export function EditCarousel() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [carousel, setCarousel] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const data = await carouselAPI.fetchCarousel(id);
        setCarousel(data);
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
      await carouselAPI.patchCarousel(id, carousel);
      notification(enqueueSnackbar, `El carrusel ${carousel.title} se guardó correctamente 👌`, "success");
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
      <Typography sx={{fontSize: 24}}>
        Editando carrusel {carousel?.title ?? 'carrusel'}
      </Typography>
      <Paper style={styles.paper}>
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
  )
}
