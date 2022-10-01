import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Layout } from "../../Layouts/Layout";
import { ContentForm } from "./ContentForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function NewContent() {

  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);

  async function handleContentSubmit(content) {
    setWaiting(true);
    try {
      const newContent = await axios.post('/api/contenidos', content);
      console.log("Server response:", newContent);
      navigate('/contents');
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
        <Typography sx={{fontSize: 24}}>Nuevo contenido</Typography>
        <Paper style={{
          marginTop: 10,
          padding: 12
        }}>
          <ContentForm
            loading={waiting}
            onSubmit={handleContentSubmit}
          />
        </Paper>
      </Box>
    </Layout>
  )
}