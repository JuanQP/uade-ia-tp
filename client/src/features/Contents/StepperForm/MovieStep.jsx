import {
  CONTENT_DEFAULT_VALUES,
  schemaShape
} from "@features/Contents";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Unstable_Grid2 as Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const {
  title,
  year,
  description,
} = schemaShape;

const schema = z.object({
  title,
  year,
  description,
});

const DEFAULT_VALUES = {
  title: CONTENT_DEFAULT_VALUES.title,
  year: CONTENT_DEFAULT_VALUES.year,
  description: CONTENT_DEFAULT_VALUES.description,
}

export function MovieStep({ active, onNextStep }) {

  const { formState, register, handleSubmit } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  function handleStepOneSubmit(formValues) {
    onNextStep({ ...formValues });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      display={active ? undefined : 'none'}
      onSubmit={handleSubmit(handleStepOneSubmit)}
    >
      <Grid container spacing={2} mt={1}>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Título"
            placeholder="El Señor de los Anillos"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title')}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Año"
            type="number"
            error={!!errors.year}
            helperText={errors.year?.message}
            {...register('year', { valueAsNumber: true })}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            sx={{'& label': { zIndex: 0 }}}
            fullWidth
            required
            variant="outlined"
            label="Descripción / Sinopsis"
            multiline
            minRows={4}
            placeholder="Esta película narra la historia de Frodo Bolsón..."
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description')}
          />
        </Grid>
        <Grid xs={12} display="flex" justifyContent="space-between">
          <Button disabled>
            Anterior
          </Button>
          <Button variant="contained" type="submit">
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
