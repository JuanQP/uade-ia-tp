import { HomeCard } from "@features/UI";
import { useUserContext } from "@hooks/UserContext";
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { Card, CardContent, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export function Home() {

  const { user } = useUserContext();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight={100}>
        Sistema de Gestión de Contenidos
      </Typography>
      <Grid container spacing={3} mt={1}>
        <Grid xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight={100} component="span">
                Hola, <Typography color="primary" variant="inherit" fontWeight={400} component="span"> {user.nombre}</Typography>
              </Typography>
              <Typography>
                Para empezar a gestionar el contenido de la plataforma acá tenés un resumen 👇
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <HomeCard bgColor="#1565c0" title="Contenidos" Icon={MovieIcon} linkTo="/contents">
            <Typography>
              Son las películas con las que contamos en la plataforma 🎥🍿
            </Typography>
          </HomeCard>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <HomeCard bgColor="#009de1" title="Carruseles" Icon={ViewCarouselIcon} linkTo="/carousels">
            <Typography>
              Para facilitar el uso de la plataforma agrupamos el contenido en listas así los usuarios pueden ver películas similares 😌👌
            </Typography>
          </HomeCard>
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <HomeCard bgColor="#00cfde" title="Curadores" Icon={PersonIcon} linkTo="/register">
            <Typography>
              Los usuarios que tienen acceso a este sistema se llaman <strong>Curadores</strong>. Podemos solicitar a la gente de SSO que agregue nuevos usuarios a través de esta misma página 👍
            </Typography>
          </HomeCard>
        </Grid>
      </Grid>
    </Container>
  );
}
