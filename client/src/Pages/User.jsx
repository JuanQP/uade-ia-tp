import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Layout } from "../Layouts/Layout";
import { UserForm } from "./Users/UserForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkToken } from "../utils";

export function User() {

  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    checkToken(navigate);
  }, []);

  async function handleCarouselSubmit(user) {
    setWaiting(true);
    try {
      await axios.post('/api/register', user);
      navigate('/dashboard');
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
        <Typography sx={{fontSize: 24}}>Agregar nuevo curador</Typography>
        <Paper style={{
          marginTop: 10,
          padding: 12
        }}>
          <UserForm
            loading={waiting}
            onSubmit={handleCarouselSubmit}
          />
        </Paper>
      </Box>
    </Layout>
  )
}
