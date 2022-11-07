import { notification } from "@/utils";
import { contentAPI, ContentForm } from "@features/Contents";
import { CircularProgress, Container, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const styles = {
  paper: {
    marginTop: 10,
    padding: 12
  },
};

export function EditContent() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [content, setContent] = useState<Content>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const data = await contentAPI.fetchContent(Number(id));
        setContent(data);
      } catch (error) {
        console.error(error);
        navigate('/contents');
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  async function handleContentSubmit(content: Content) {
    setWaiting(true);
    try {
      await contentAPI.patchContent(Number(id), content);
      notification(enqueueSnackbar, `${content.title} se guardó correctamente 👌`, "success");
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
      <Typography variant="h4" fontWeight={100}>
        Editando contenido {content?.title ?? 'contenido'}
      </Typography>
      <Paper style={styles.paper}>
        {fetching ? (
          <CircularProgress />
        ) : (
          <ContentForm
            editing
            initialValues={content}
            loading={waiting}
            onSubmit={handleContentSubmit}
          />
        )}
      </Paper>
    </Container>
  )
}
