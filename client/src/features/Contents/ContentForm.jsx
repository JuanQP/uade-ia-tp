import { notification, setFieldValue } from "@/utils";
import { DelayedAsyncSelect } from "@features/UI";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import Image from "mui-image";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

const DEFAULT_HORIZONTAL_IMAGE = 'http://cdn.bongobd.com/upload/content/landscape/hd/O1rJFgE8KTD.jpg';
const DEFAULT_VERTICAL_IMAGE = 'https://peach.blender.org/wp-content/uploads/poster_bunny_small.jpg';
const DEFAULT_VIDEO = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const ImageStyles = {
  boxShadow: '2px 2px 8px dimgray'
};

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

function isImageURL(url) {
  return /^(https?):.+\.(jpg|jpeg|png)$/i.test(url);
}

function isVideoURL(url) {
  return /^(https?):.+\.(mp4)$/i.test(url);
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
  const [urlImage, setUrlImage] = useState(DEFAULT_HORIZONTAL_IMAGE);
  const [verticalUrlImage, setVerticalUrlImage] = useState(DEFAULT_VERTICAL_IMAGE);
  const [loadedUrlImage, setLoadedUrlImage] = useState(DEFAULT_HORIZONTAL_IMAGE);
  const [loadedVerticalUrlImage, setLoadedVerticalUrlImage] = useState(DEFAULT_VERTICAL_IMAGE);
  const [urlVideo, setUrlVideo] = useState(DEFAULT_VIDEO);
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
    setVerticalUrlImage(initialValues.verticalUrlImage);
    setUrlVideo(initialValues.urlVideo);
    setWriter(initialValues.writer);
    setGenres(initialValues.genres);
    setMaturityRating(initialValues.MaturityRating);
  }, []);

  function handleSubmit() {
    if (!title || !description || !year || !duration || !director || !cast || !urlImage || !writer || !genres.length || !maturity_rating || !verticalUrlImage) {
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
      urlImage: loadedUrlImage,
      verticalUrlImage: loadedVerticalUrlImage,
      urlVideo,
      writer,
      genres: genres.map(g => g.id),
      maturity_rating_id: maturity_rating.id,
    });
  }

  useEffect(() => {
    if(isImageURL(urlImage)) {
      setLoadedUrlImage(urlImage);
    }
    if(isImageURL(verticalUrlImage)) {
      setLoadedVerticalUrlImage(verticalUrlImage);
    }
  }, [urlImage, verticalUrlImage]);

  return (
    <Box
      component="form"
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <TextField
            inputProps={{maxLength: 255}}
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
            InputProps={{ inputProps: {min: 0, max: 600} }}
            onChange={setFieldValue(setDuration)}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            inputProps={{maxLength: 255}}
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
            inputProps={{maxLength: 255}}
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
            inputProps={{maxLength: 255}}
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
            inputProps={{maxLength: 255}}
            fullWidth
            // This is to avoid getting rendered on top of react-selects
            sx={{'& label': { zIndex: 0 }}}
            required
            variant="outlined"
            label="URL Video"
            value={urlVideo}
            placeholder="URL Video"
            error={!isVideoURL(urlVideo)}
            helperText={!isVideoURL(urlVideo) ? "No es una URL de un video" : ""}
            onChange={setFieldValue(setUrlVideo)}
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
            label="URL Imagen"
            value={urlImage}
            placeholder="URL Imagen"
            error={!isImageURL(urlImage)}
            helperText={!isImageURL(urlImage) ? "No es una URL de una imagen" : "Intentá que la imagen sea resolución 16:9 🙏"}
            onChange={setFieldValue(setUrlImage)}
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
            label="URL Imagen vertical"
            value={verticalUrlImage}
            placeholder="URL Imagen Vertical"
            error={!isImageURL(verticalUrlImage)}
            helperText={!isImageURL(verticalUrlImage) ? "No es una URL de una imagen" : "Intentá que la imagen sea resolución 2:3 🙏"}
            onChange={setFieldValue(setVerticalUrlImage)}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            sx={{'& label': { zIndex: 0 }}}
            fullWidth
            required
            variant="outlined"
            label="Descripción / Sinopsis"
            value={description}
            multiline
            minRows={4}
            inputProps={{maxLength: 800}}
            placeholder="Esta película narra la historia de Frodo Bolsón..."
            onChange={setFieldValue(setDescription)}
          />
        </Grid>
        <Grid xs={12}>
          <Grid container>
            <Grid display="flex" flexDirection="column" xs={12} md={6}>
              <Typography textAlign="center">Portada horizontal (Web)</Typography>
              <Box display="flex" flexGrow={1} flexDirection="column" justifyContent="center" alignItems="center">
                <Image
                  src={loadedUrlImage}
                  alt="Imagen horizontal"
                  width="100%"
                  height="auto"
                  style={ImageStyles}
                  showLoading
                />
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography textAlign="center">Portada vertical (Mobile)</Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  src={loadedVerticalUrlImage}
                  alt="Imagen vertical"
                  width="50%"
                  style={ImageStyles}
                  showLoading
                />
              </Box>
            </Grid>
          </Grid>
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
