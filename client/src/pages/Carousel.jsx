import { notification } from "@/utils";
import { carouselAPI } from "@features/Carousels";
import { CMSTable } from "@features/UI";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {name: 'ID', key: "id", hide: true},
  {name: 'Título', key: "title", hide: false},
];

export function Carousel() {

  const [carousels, setCarousels] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  async function fetchData () {
    const carousels = await carouselAPI.fetchCarousels({ format: 'table' });
    setCarousels(carousels);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(carousel) {
    const response = confirm("¿Estás seguro?");
    if(response === true) {
      await carouselAPI.deleteCarousel(carousel);
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
