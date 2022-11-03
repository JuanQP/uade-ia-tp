import { ContentImage } from "@features/UI";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Typography, Unstable_Grid2 as Grid } from "@mui/material";

const valueTypographyProps = {
  align: 'center',
  fontWeight: 'bold',
}

const propertyTypographyProps = {
  align: 'center',
  variant: 'body2',
  color: 'dimgray',
}

function FormValue({ label, value }) {
  return (
    <Grid xs={12}>
      <Typography { ...valueTypographyProps }>
        {value}
      </Typography>
      <Typography { ...propertyTypographyProps }>
        {label}
      </Typography>
    </Grid>
  )
}

function FormValueChips({ label, values = [] }) {
  return (
    <Grid xs={12}>
      <Box display="flex" justifyContent="center" gap={0.5}>
        {values.map((value) => (
          <Chip
            key={value.id}
            label={value.description}
            color="primary"
          />
        ))}
      </Box>
      <Typography { ...propertyTypographyProps }>
        {label}
      </Typography>
    </Grid>
  )
}

export function ReviewStep({
  active,
  loading,
  formValues,
  onNextStep,
  onPreviousStep
}) {

  function handleNextStep() {
    onNextStep({});
  }

  function handlePreviousStep() {
    onPreviousStep({});
  }

  return (
    <Box display={active ? undefined : 'none'}>
      <Grid container spacing={2} mt={1}>
        <Grid xs={12}>
          <Typography align="center">
            Solo falta el último paso: Verificá que toda la información esté correcta y listo 😌👌
          </Typography>
        </Grid>
        <FormValue label="Título" value={formValues.title}  />
        <FormValue label="Año" value={formValues.year}  />
        <FormValue label="Duración (minutos)" value={formValues.duration}  />
        <FormValueChips label="Géneros" values={formValues.genres} />
        <FormValueChips
          label="Calificación de Madurez"
          values={formValues.maturity_rating ? [formValues.maturity_rating] : []}
        />
        <FormValue label="Director" value={formValues.director} />
        <FormValue label="Escritor" value={formValues.writer} />
        <FormValue label="Cast" value={formValues.cast} />
        <FormValue label="Sinopsis" value={formValues.description} />
        <Grid xs={12} md={6} display="flex" sx={{flexDirection: 'column'}}>
          <ContentImage type="horizontal" src={formValues.urlImage} />
          <Typography {...propertyTypographyProps}>
            Portada horizontal
          </Typography>
        </Grid>
        <Grid xs={12} md={6} display="flex" sx={{flexDirection: 'column'}} alignItems="center">
          <ContentImage type="vertical" src={formValues.verticalUrlImage} />
          <Typography {...propertyTypographyProps}>
            Portada vertical
          </Typography>
        </Grid>
        <Grid xs={12} display="flex" justifyContent="space-between">
          <Button onClick={handlePreviousStep}>
            Anterior
          </Button>
          <LoadingButton
            variant="gradient-success"
            loading={loading}
            onClick={handleNextStep}
          >
            Guardar
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
