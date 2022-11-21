import { notification } from "@/utils";
import { SearchField } from "@features/Carousels";
import { contentAPI } from "@features/Contents";
import { CMSTable } from "@features/UI";
import { CMSTableColumnType } from "@features/UI/types";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const columns: CMSTableColumnType<Required<Content>>[] = [
  {name: 'ID', key: "id", hide: true},
  {name: 'Título', key: "title", hide: false},
  {name: 'Año', key: "year", hide: true},
  {name: 'Duración', key: "duration", hide: true},
  {name: 'Director', key: "director", hide: true},
];

export function Content() {

  const [contents, setContents] = useState<Required<Content>[]>([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const searchField = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  async function fetchData () {
    const {
      results,
      currentPage,
      totalPages,
    } = await contentAPI.fetchContents({
      format: 'table',
      page,
      title: searchText,
    });
    setContents(results);
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

  async function handleDelete(content: Content) {
    const response = confirm("¿Estás seguro?");
    if(response === true) {
      await contentAPI.deleteContent(content);
      notification(enqueueSnackbar, `Se eliminó ${content.title}`);
      fetchData();
    }
  }

  return (
    <Container maxWidth="lg">
      <Box style={{ display: 'flex', gap: 10 }}>
        <Typography variant="h4" fontWeight={100}>Contenidos</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          component={Link}
          to="/contents/new"
        >
          Nuevo
        </Button>
      </Box>
      <Paper sx={{ my: 2, p: 2 }}>
        <SearchField
          label="Buscar películas"
          ref={searchField}
          variant="standard"
          fullWidth
          onSearch={handleSearch}
        />
      </Paper>
      <CMSTable
        idField="id"
        items={contents}
        columns={columns}
        url="/contents/"
        page={page + 1}
        pages={pages}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}
