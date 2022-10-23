import { notification } from "@/utils";
import { ContentForm } from "@features/Contents";
import { Layout } from "@features/UI";
import { Paper, Typography } from "@mui/material";
import axios from 'axios';
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  paper: {
    marginTop: 10,
    padding: 12
  },
}

export function CreateContent() {

  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function handleContentSubmit(content) {
    setWaiting(true);
    try {
      await axios.post('/api/contenidos', content);
      notification(enqueueSnackbar, `"${content.title}" creado 🍿`, "success");
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
      <Typography sx={{fontSize: 24}}>Nuevo contenido</Typography>
      <Paper style={styles.paper}>
        <ContentForm
          loading={waiting}
          onSubmit={handleContentSubmit}
        />
      </Paper>
    </Layout>
  )
}
