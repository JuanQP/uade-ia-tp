import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { setFieldValue } from "../../utils";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { DelayedAsyncSelect } from "../../Components/DelayedAsyncSelect";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnackbar } from "notistack";
import { notification } from "../../utils";

function loadGenresDelayed(searchText, callback) {
  axios.get('/api/generos', {
    params: { description: searchText },
  }).then((response) => {
    callback(response.data.generos);
  });
}

function loadMaturityRatingsDelayed(searchText, callback) {
  axios.get('/api/maturity-ratings', {
    params: { description: searchText },
  }).then((response) => {
    callback(response.data.maturity_ratings);
  });
}

export function ContentForm({
  editing = false,
  initialValues,
  loading,
  onSubmit,
}) {

  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(2022);
  const [duration, setDuration] = useState(60);
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [urlImage, setUrlImage] = useState('https://peach.blender.org/wp-content/uploads/poster_bunny_small.jpg');
  const [urlVideo, setUrlVideo] = useState('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [writer, setWriter] = useState('');
  const [genres, setGenres] = useState([]);
  const [maturity_rating, setMaturityRating] = useState(null);

  useState(() => {
    if(!editing) return;

    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setYear(initialValues.year);
    setDuration(initialValues.duration);
    setDirector(initialValues.director);
    setCast(initialValues.cast);
    setUrlImage(initialValues.urlImage);
    setUrlVideo(initialValues.urlVideo);
    setWriter(initialValues.writer);
    setGenres(initialValues.genres);
    setMaturityRating(initialValues.MaturityRating);
  }, []);

  function handleSubmit() {
    if (!title || !description || !year || !duration || !director || !cast || !urlImage || !writer || !genres.length || !maturity_rating) { 
      notification(enqueueSnackbar, "Complete los campos obligatorios", "warning");
      return;
    }
    onSubmit({
      title,
      description,
      year,
      duration,
      director,
      cast,
      urlImage,
      urlVideo,
      writer,
      genres: genres.map(g => g.id),
      maturity_rating_id: maturity_rating.id,
    });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Título"
            value={title}
            placeholder="El Señor de los Anillos"
            onChange={setFieldValue(setTitle)}
          />
        </Grid>
        <Grid xs={12} md={3}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Año"
            value={year}
            type="number"
            InputProps={{ inputProps: {min: 1900, max: 2022} }}
            onChange={setFieldValue(setYear)}
          />
        </Grid>
        <Grid xs={12} md={3}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Duración (minutos)"
            value={duration}
            type="number"
            onChange={setFieldValue(setDuration)}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Director"
            value={director}
            placeholder="Peter Jackson"
            onChange={setFieldValue(setDirector)}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Escritor"
            value={writer}
            placeholder="John Doe"
            onChange={setFieldValue(setWriter)}
          /> 
        </Grid>
        <Grid xs={12} md={6}>
          <DelayedAsyncSelect
            placeholder="Géneros *"
            cacheOptions
            defaultOptions
            isMulti
            getOptionLabel={item => item.description}
            getOptionValue={item => item.id}
            onChange={setFieldValue(setGenres)}
            value={genres}
            fetchCallback={loadGenresDelayed}
            delay={1500}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <DelayedAsyncSelect
            placeholder="Calificación de Madurez *"
            cacheOptions
            defaultOptions
            getOptionLabel={item => item.description}
            getOptionValue={item => item.id}
            onChange={setFieldValue(setMaturityRating)}
            value={maturity_rating}
            fetchCallback={loadMaturityRatingsDelayed}
            delay={1500}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            // This is to avoid getting rendered on top of react-selects
            sx={{'& label': { zIndex: 0 }}}
            required
            variant="outlined"
            label="URL Imagen"
            value={urlImage}
            placeholder="URL Imagen"
            onChange={setFieldValue(setUrlImage)}
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
            value={cast}
            placeholder="Viggo Mortensen, Orlando Bloom, Elijah Wood..."
            onChange={setFieldValue(setCast)}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            fullWidth
            // This is to avoid getting rendered on top of react-selects
            sx={{'& label': { zIndex: 0 }}}
            required
            variant="outlined"
            label="URL Video"
            value={urlVideo}
            placeholder="URL Video"
            onChange={setFieldValue(setUrlVideo)}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            sx={{'& label': { zIndex: 0 }}}
            fullWidth
            required
            variant="outlined"
            label="Descripción"
            value={description}
            multiline
            minRows={4}
            placeholder="Esta película narra la historia de Frodo Bolsón..."
            onChange={setFieldValue(setDescription)}
          />
        </Grid>
        <Grid xs={12}>
          <Box display="flex" justifyContent="end">
            <LoadingButton
              loading={loading}
              className={loading ? "" : "create-button"}
              variant="contained"
              startIcon={editing ? <SaveIcon /> : <AddIcon />}
              onClick={handleSubmit}
            >
              {editing ? "Guardar" : "Agregar"}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
