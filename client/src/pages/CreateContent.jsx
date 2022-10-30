import { notification } from "@/utils";
import { contentAPI, ContentForm } from "@features/Contents";
import { Paper, Typography } from "@mui/material";
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
      await contentAPI.createContent(content);
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
    <>
      <Typography sx={{fontSize: 24}}>Nuevo contenido</Typography>
      <Paper style={styles.paper}>
        <ContentForm
          loading={waiting}
          onSubmit={handleContentSubmit}
        />
      </Paper>
    </>
  )
}
