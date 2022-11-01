import { DelayedAsyncSelect, URLImageField } from "@features/UI";
import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { contentAPI } from ".";

const DEFAULT_HORIZONTAL_IMAGE = 'http://cdn.bongobd.com/upload/content/landscape/hd/O1rJFgE8KTD.jpg';
const DEFAULT_VERTICAL_IMAGE = 'https://peach.blender.org/wp-content/uploads/poster_bunny_small.jpg';
const DEFAULT_VIDEO = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

function loadGenresDelayed(searchText, callback) {
  contentAPI.fetchGenres(searchText).then((genres) => {
    callback(genres);
  });
}

function loadMaturityRatingsDelayed(searchText, callback) {
  contentAPI.fetchMaturityRatings(searchText).then((maturityRatings) => {
    callback(maturityRatings);
  });
}

const mp4URLRegex = /^(https?):.+\.(mp4)$/i;
const imageURLRegex = /^(https?):.+\.(jpg|jpeg|png)$/i;

export const schemaShape = {
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(800),
  year: z.number().gt(1900).lt(2023),
  duration: z.number().gt(0),
  director: z.string().min(1).max(255),
  writer: z.string().min(1).max(255),
  cast: z.string().min(1).max(255),
  urlImage: z.string().min(1).max(255).regex(imageURLRegex, "No es una URL de una imagen"),
  verticalUrlImage: z.string().min(1).max(255).regex(imageURLRegex, "No es una URL de una imagen"),
  urlVideo: z.string().min(1).max(255).regex(mp4URLRegex, "No es una URL de un video mp4"),
  genres: z.object({
    id: z.number(),
    description: z.string().optional(),
  }).array().nonempty(),
  maturity_rating: z.object({
    id: z.number(),
    description: z.string().optional(),
  }).nullable(),
};

const schema = z.object(schemaShape);

export const DEFAULT_VALUES = {
  title: '',
  description: '',
  year: 2022,
  duration: 60,
  director: '',
  writer: '',
  cast: '',
  urlImage: DEFAULT_HORIZONTAL_IMAGE,
  verticalUrlImage: DEFAULT_VERTICAL_IMAGE,
  urlVideo: DEFAULT_VIDEO,
  genres: [],
  maturity_rating: null,
  MaturityRating: undefined,
};

export function ContentForm({
  editing = false,
  initialValues = DEFAULT_VALUES,
  loading,
  onSubmit,
}) {

  const { control, formState, register, handleSubmit } = useForm({
    defaultValues: {
      ...initialValues,
      maturity_rating: initialValues.MaturityRating ?? initialValues.maturity_rating,
    },
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  function handleContentSubmit(formValues) {
    onSubmit({
      ...formValues,
      genres: formValues.genres.map(g => g.id),
      maturity_rating_id: formValues.maturity_rating.id,
    });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(handleContentSubmit)}
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
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
        <Grid xs={12} md={3}>
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
        <Grid xs={12} md={3}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Duración (minutos)"
            type="number"
            error={!!errors.duration}
            helperText={errors.duration?.message}
            {...register('duration', { valueAsNumber: true })}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Director"
            placeholder="Peter Jackson"
            error={!!errors.director}
            helperText={errors.director?.message}
            {...register('director')}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Escritor"
            placeholder="John Doe"
            error={!!errors.writer}
            helperText={errors.writer?.message}
            {...register('writer')}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Controller
            name="genres"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <DelayedAsyncSelect
                placeholder="Géneros *"
                cacheOptions
                defaultOptions
                isMulti
                getOptionLabel={item => item.description}
                getOptionValue={item => item.id}
                fetchCallback={loadGenresDelayed}
                delay={1500}
                error={!!errors.genres}
                helperText={errors.genres?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Controller
            name="maturity_rating"
            control={control}
            render={({ field }) => (
              <DelayedAsyncSelect
                placeholder="Calificación de Madurez *"
                cacheOptions
                defaultOptions
                getOptionLabel={item => item.description}
                getOptionValue={item => item.id}
                fetchCallback={loadMaturityRatingsDelayed}
                delay={1500}
                error={!!errors.maturity_rating}
                helperText={errors.maturity_rating?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            // This is to avoid getting rendered on top of react-selects
            sx={{'& label': { zIndex: 0 }}}
            required
            variant="outlined"
            label="Elenco"
            placeholder="Viggo Mortensen, Orlando Bloom, Elijah Wood..."
            error={!!errors.cast}
            helperText={errors.cast?.message}
            {...register('cast')}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            inputProps={{maxLength: 255}}
            fullWidth
            // This is to avoid getting rendered on top of react-selects
            sx={{'& label': { zIndex: 0 }}}
            required
            variant="outlined"
            label="URL Video"
            placeholder="URL Video"
            error={!!errors.urlVideo}
            helperText={errors.urlVideo?.message}
            {...register('urlVideo')}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Controller
            name="urlImage"
            control={control}
            render={({ field }) => (
              <URLImageField
                type="horizontal"
                fullWidth
                required
                variant="outlined"
                label="URL Imagen"
                placeholder="URL Imagen"
                error={!!errors.urlImage}
                helperText={errors.urlImage?.message ?? "Mucho mejor si la imagen está en resolución 16:9 👌"}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Controller
            name="verticalUrlImage"
            control={control}
            render={({ field }) => (
              <URLImageField
                type="vertical"
                fullWidth
                sx={{'& label': { zIndex: 0 }}}
                required
                variant="outlined"
                label="URL Imagen vertical"
                placeholder="URL Imagen Vertical"
                error={!!errors.verticalUrlImage}
                helperText={errors.verticalUrlImage?.message ?? "Mucho mejor si la imagen está en resolución 2:3 👌"}
                {...field}
              />
            )}
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
            rows={6}
            placeholder="Esta película narra la historia de Frodo Bolsón..."
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description')}
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
