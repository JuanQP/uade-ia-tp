import { notification } from "@/utils";
import { contentAPI } from "@features/Contents";
import { ContentStepperForm } from "@features/Contents/StepperForm";
import { Container, Paper, Typography } from "@mui/material";
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

  async function handleContentSubmit(content: Content) {
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
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight={100}>Nuevo contenido</Typography>
      <Paper style={styles.paper}>
        <ContentStepperForm
          loading={waiting}
          onSubmit={handleContentSubmit}
        />
      </Paper>
    </Container>
  )
}
