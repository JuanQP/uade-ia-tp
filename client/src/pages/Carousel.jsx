import { notification } from "@/utils";
import { carouselAPI } from "@features/Carousels";
import { CMSTable } from "@features/UI";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {name: 'ID', key: "id", hide: true},
  {name: 'Título', key: "title", hide: false},
];

export function Carousel() {

  const [carousels, setCarousels] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  async function fetchData () {
    const {
      results,
      currentPage,
      totalPages
    } = await carouselAPI.fetchCarousels({ format: 'table', page });
    setCarousels(results);
    setPage(currentPage);
    setPages(totalPages);
  };

  function handlePageChange(_, newPage) {
    setPage(newPage - 1);
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  async function handleDelete(carousel) {
    const response = confirm("¿Estás seguro?");
    if(response === true) {
      await carouselAPI.deleteCarousel(carousel);
      notification(enqueueSnackbar, `Se eliminó el carrusel ${carousel.title}`);
      fetchData();
    }
  }

  return (
    <Container maxWidth="lg">
      <div style={{display: 'flex', gap: 10}}>
        <Typography variant="h4" fontWeight={100}>Carruseles</Typography>
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
        page={page + 1}
        pages={pages}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}
