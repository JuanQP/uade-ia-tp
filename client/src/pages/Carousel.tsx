import { notification } from "@/utils";
import { carouselAPI, SearchField } from "@features/Carousels";
import { CMSTable } from "@features/UI";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {name: 'ID', key: "id", hide: true},
  {name: 'Título', key: "title", hide: false},
];

export function Carousel() {

  const [carousels, setCarousels] = useState<TableFormatCarousel[]>([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const searchField = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  async function fetchData () {
    const {
      results,
      currentPage,
      totalPages
    } = await carouselAPI.fetchCarousels({
      format: 'table',
      page,
      title: searchText,
    });
    setCarousels(results);
    setPage(currentPage);
    setPages(totalPages);
  };

  function handlePageChange(_: any, newPage: number) {
    setPage(newPage - 1);
  }

  function handleSearch() {
    setSearchText(searchField.current?.value ?? '');
  }

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  async function handleDelete(carousel: TableFormatCarousel) {
    const response = confirm("¿Estás seguro?");
    if(response === true) {
      await carouselAPI.deleteCarousel(carousel);
      notification(enqueueSnackbar, `Se eliminó el carrusel ${carousel.title}`);
      fetchData();
    }
  }

  return (
    <Container maxWidth="lg">
      <Box style={{display: 'flex', gap: 10}}>
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
      </Box>
      <Paper sx={{ my: 2, p: 2 }}>
        <SearchField
          label="Buscar carruseles"
          ref={searchField}
          variant="standard"
          fullWidth
          onSearch={handleSearch}
        />
      </Paper>
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
