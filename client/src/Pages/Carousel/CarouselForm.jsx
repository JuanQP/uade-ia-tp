import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { setFieldValue } from "../../utils";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from "react";
import axios from "axios";
import { DelayedAsyncSelect } from "../../Components/DelayedAsyncSelect";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2";

function loadContentsDelayed(searchText, callback) {
  axios.get('/api/contenidos', {
    params: { title: searchText },
  }).then((response) => {
    callback(response.data.contenidos);
  });
}

export function CarouselForm({
  editing = false,
  initialValues,
  loading,
  onSubmit,
}) {

  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if(!editing) return;

    setTitle(initialValues.title);
    setSelected(initialValues.contenidos);
  }, []);

  function handleSubmit() {
    onSubmit({
      title,
      contenidos: selected.map(s => s.id),
    });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid xs={12}>
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
        <Grid xs={12}>
          <DelayedAsyncSelect
            placeholder="Contenidos de este carrusel"
            cacheOptions
            isMulti
            getOptionLabel={item => item.title}
            getOptionValue={item => item.id}
            onChange={setFieldValue(setSelected)}
            value={selected}
            fetchCallback={loadContentsDelayed}
            delay={1500}
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
