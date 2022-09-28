import { Box, Button, Paper, Typography } from "@mui/material";
import { Layout } from "../Layouts/Layout";
import AddIcon from '@mui/icons-material/Add';
import { ContentTable } from "./Content/ContentTable";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

async function fetchContents() {
  const response = await axios.get(`/api/contenidos`);
  return response.data.contenidos;
}

export function Content() {

  const [contents, setContents] = useState([]);
  
  async function fetchData () {
    const contents = await fetchContents();
    setContents(contents);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(content) {
    const response = confirm("¿Estás seguro?");
    if(response === true) {
      await axios.delete(`/api/contenidos/${content.id}`);
      fetchData();
    }
  }

  return (
    <Layout>
      <Box>
        <div style={{display: 'flex', gap: 10}}>
          <Typography sx={{fontSize: 24}}>Contenidos</Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            component={Link}
            to="/content/new"
          >
            Nuevo
          </Button>
        </div>
        <Paper style={{
          marginTop: 10,
          padding: 10
        }}>
          <ContentTable
            contents={contents}
            onDelete={handleDelete}
          />
        </Paper>
      </Box>
    </Layout>
  );
}
