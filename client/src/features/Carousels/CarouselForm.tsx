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
  contents: z.object({
    id: z.number(),
    order: z.number().min(1),
  }).array().nonempty('El carrusel tiene que tener al menos una película'),
});

export const DEFAULT_VALUES = {
  id: 0,
  title: '',
  contents: [],
};

type CarouselFormProps = {
  editing?: boolean;
  initialValues?: Carousel;
  loading: boolean;
  onSubmit: (formValues: CarouselFormValues) => void;
}

export function CarouselForm({
  editing = false,
  initialValues = DEFAULT_VALUES,
  loading,
  onSubmit,
}: CarouselFormProps) {

  const { control, formState, register, handleSubmit } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  function handleCarouselSubmit(formValues: CarouselFormValues) {
    onSubmit(formValues);
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
            name="contents"
            control={control}
            render={({ field }) => (
              <MoviePicker
                values={field.value}
                error={!!errors.contents}
                helperText={errors.contents?.message ?? ''}
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
              variant="gradient-success"
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
