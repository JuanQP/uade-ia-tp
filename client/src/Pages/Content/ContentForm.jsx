import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { setFieldValue } from "../../utils";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { DelayedAsyncSelect } from "../../Components/DelayedAsyncSelect";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

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
  ...props
}) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(2022);
  const [duration, setDuration] = useState(60);
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
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
    setWriter(initialValues.writer);
    setGenres(initialValues.genres);
    setMaturityRating(initialValues.MaturityRating);
  }, []);

  function handleSubmit() {
    onSubmit({
      title,
      description,
      year,
      duration,
      director,
      cast,
      writer,
      genres: genres.map(g => g.id),
      maturity_rating_id: maturity_rating.id,
    });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{display: 'flex', gap: 10}}>
        <div style={{display: 'flex', flex: 1}}>
          <TextField
            style={{flex: 1}}
            required
            variant="outlined"
            label="Título"
            value={title}
            placeholder="El Señor de los Anillos"
            onChange={setFieldValue(setTitle)}
          />
        </div>
        <div style={{display: 'flex', flex: 1, gap: 10}}>
          <TextField
            style={{flex: 1}}
            required
            variant="outlined"
            label="Año"
            value={year}
            type="number"
            InputProps={{ inputProps: {min: 1900, max: 2022} }}
            onChange={setFieldValue(setYear)}
          />
          <TextField
            style={{flex: 1}}
            required
            variant="outlined"
            label="Duración (minutos)"
            value={duration}
            type="number"
            onChange={setFieldValue(setDuration)}
          />
        </div>
      </div>
      <div style={{display: 'flex', flex: 1, gap: 10}}>
        <TextField
          style={{flex: 1}}
          required
          variant="outlined"
          label="Descripción"
          value={description}
          multiline
          minRows={4}
          placeholder="Esta película narra la historia de Frodo Bolsón..."
          onChange={setFieldValue(setDescription)}
        />
        <div style={{display: 'flex', flex: 1, gap: 10, flexDirection: 'column'}}>
          <TextField
            style={{flex: 1}}
            required
            variant="outlined"
            label="Director"
            value={director}
            placeholder="Peter Jackson"
            onChange={setFieldValue(setDirector)}
          />
          <TextField
            style={{flex: 1}}
            required
            variant="outlined"
            label="Escritor"
            value={writer}
            placeholder="John Doe"
            onChange={setFieldValue(setWriter)}
          /> 
        </div>
      </div>
      <div style={{display: 'flex', gap: 10}}>
        <div style={{flex: 1}}>
          <DelayedAsyncSelect
            placeholder="Géneros"
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
        </div>
        <div style={{flex: 1}}>
          <DelayedAsyncSelect
            placeholder="Calificación de Madurez"
            cacheOptions
            defaultOptions
            getOptionLabel={item => item.description}
            getOptionValue={item => item.id}
            onChange={setFieldValue(setMaturityRating)}
            value={maturity_rating}
            fetchCallback={loadMaturityRatingsDelayed}
            delay={1500}
          />
        </div>
      </div>
      <div style={{display: 'flex', gap: 10}}>
        <TextField
          style={{flex: 1}}
          // This is to avoid getting rendered on top of react-selects
          sx={{
            '& label': {
              zIndex: 0
            }
          }}
          required
          variant="outlined"
          label="Elenco"
          value={cast}
          placeholder="Viggo Mortensen, Orlando Bloom, Elijah Wood..."
          onChange={setFieldValue(setCast)}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <LoadingButton
          loading={loading}
          className={loading ? "" : "create-button"}
          variant="contained"
          startIcon={editing ? <SaveIcon /> : <AddIcon />}
          onClick={handleSubmit}
        >
          {editing ? "Guardar" : "Agregar"}
        </LoadingButton>
      </div>
    </Box>
  )
}
