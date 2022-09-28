import { Box, Button, Paper, Typography } from "@mui/material";
import { Layout } from "../Layouts/Layout";
import AddIcon from '@mui/icons-material/Add';
import { ContentTable } from "./Content/ContentTable";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Content() {

  const [contents, setContents] = useState([]);

  useEffect(() => {
    fetch('/api/contenidos')
      .then((response) => response.json())
      .then((data) => setContents(data.contenidos));
  }, []);

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
          <ContentTable contents={contents} />
        </Paper>
      </Box>
    </Layout>
  );
}
