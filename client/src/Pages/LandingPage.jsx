import { Box, Typography } from "@mui/material";
import { Layout } from "../Layouts/Layout";

export function LandingPage() {
  return (
    <Layout>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography sx={{fontSize: 24}}>Landing Page en construcción</Typography>
        <Typography sx={{fontSize: 72}}>🚧</Typography>
      </Box>
    </Layout>
  );
}
