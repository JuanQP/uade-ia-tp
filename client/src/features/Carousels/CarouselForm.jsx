import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";
import { MoviePicker } from "./MoviePicker";

const schema = z.object({
  title: z.string().min(1).max(255),
  contenidos: z.object({
    id: z.number(),
    ContenidoCarrusel: z.object({
      order: z.number().min(1),
    }),
  }).array().nonempty('El carrusel tiene que tener al menos una película'),
});

const DEFAULT_VALUES = {
  title: '',
  contenidos: [],
};

export function CarouselForm({
  editing = false,
  initialValues = DEFAULT_VALUES,
  loading,
  onSubmit,
}) {

  const { control, formState, register, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  function handleCarouselSubmit(formValues) {
    onSubmit({
      title: formValues.title,
      contenidos: formValues.contenidos.map(c => ({
        id: c.id,
        ContenidoCarrusel: c.ContenidoCarrusel,
      })),
    });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(handleCarouselSubmit)}
    >
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField
            autoFocus
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
          <Controller
            name="contenidos"
            control={control}
            render={({ field }) => (
              <MoviePicker
                values={field.value}
                error={!!errors.contenidos}
                helperText={errors.contenidos?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12}>
          <Box display="flex" justifyContent="end">
            <LoadingButton
              type="submit"
              loading={loading}
              className={loading ? "" : "create-button"}
              variant="contained"
              startIcon={editing ? <SaveIcon /> : <AddIcon />}
            >
              {editing ? "Guardar" : "Crear"}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
