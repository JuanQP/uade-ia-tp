import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { setFieldValue } from "../../utils";
import SaveIcon from '@mui/icons-material/Save';

export function ContentForm({loading, onSubmit, ...props}) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(2022);
  const [duration, setDuration] = useState(60);
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [writer, setWriter] = useState('');
  const [genres, setGenres] = useState('');
  const [maturity_rating, setMaturityRating] = useState('');

  function handleSubmit() {
    onSubmit({
      title,
      description,
      year,
      duration,
      director,
      cast,
      writer,
      genres,
      maturity_rating,
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
        <TextField
          style={{flex: 1}}
          required
          variant="outlined"
          label="Título"
          value={title}
          placeholder="El Señor de los Anillos"
          onChange={setFieldValue(setTitle)}
        />
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
        <TextField
          style={{flex: 1}}
          required
          variant="outlined"
          label="Director"
          value={director}
          placeholder="Peter Jackson"
          onChange={setFieldValue(setDirector)}
        />
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
          <div style={{display: 'flex', flex: 1, gap: 10}}>
            <TextField
              style={{flex: 1}}
              required
              variant="outlined"
              label="Elenco"
              value={cast}
              placeholder="Viggo Mortensen, Orlando Bloom, Elijah Wood..."
              onChange={setFieldValue(setCast)}
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
          <div style={{display: 'flex', flex: 1, gap: 10}}>
          <TextField
            style={{flex: 1}}
            required
            variant="outlined"
            label="Géneros"
            value={genres}
            placeholder="Acción, aventura, ..."
            onChange={setFieldValue(setGenres)}
          />  
          <TextField
            style={{flex: 1}}
            required
            variant="outlined"
            label="Calificación de Madurez"
            value={maturity_rating}
            placeholder="PG-13"
            onChange={setFieldValue(setMaturityRating)}
          />
          </div>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          className={loading ? "" : "create-button"}
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={loading}
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </div>
    </Box>
  )
}