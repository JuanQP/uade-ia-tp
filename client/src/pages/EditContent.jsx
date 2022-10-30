import { notification } from "@/utils";
import { contentAPI, ContentForm } from "@features/Contents";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
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
  const [fetching, setFetching] = useState(false);
  const [content, setContent] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const data = await contentAPI.fetchContent(id);
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

  async function handleContentSubmit(content) {
    setWaiting(true);
    try {
      await contentAPI.patchContent(id, content);
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
    <Box>
      <Typography sx={{fontSize: 24}}>
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
    </Box>
  )
}
