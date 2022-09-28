import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Layout } from "../../Layouts/Layout";
import { ContentForm } from "./ContentForm";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export function EditContent() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const { data } = await axios.get(`/api/contenidos/${id}`);
        setContent(data.content);
      } catch (error) {
        console.error(error);
        navigate('/content');
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  async function handleContentSubmit(content) {
    setWaiting(true);
    try {
      const newContent = await axios.patch(`/api/contenidos/${id}`, content);
      console.log("Server response:", newContent);
      navigate('/content');
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
        <Typography sx={{fontSize: 24}}>Editando {content?.title ?? 'contenido'}</Typography>
        <Paper style={{
          marginTop: 10,
          padding: 12
        }}>
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
    </Layout>
  )
}