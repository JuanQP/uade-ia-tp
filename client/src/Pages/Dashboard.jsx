import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../Layouts/Layout";
import { checkToken } from "../utils";

export function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    checkToken(navigate);
  }, []);

  return (
    <Layout>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography sx={{fontSize: 24}}>Dashboard en construcción</Typography>
        <Typography sx={{fontSize: 72}}>🚧</Typography>
      </Box>
    </Layout>
  );
}
