import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { setFieldValue } from "../../utils";
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2";
import { useSnackbar } from "notistack";
import { notification } from "../../utils";
import { MoviePicker } from "../../Components/MoviePicker";

export function CarouselForm({
  editing = false,
  initialValues,
  loading,
  onSubmit,
}) {

  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if(!editing) return;

    setTitle(initialValues.title);
    setSelected(initialValues.contenidos);
  }, []);

  function handleSubmit() {
    if (!title || !selected.length) {
      notification(enqueueSnackbar, "Complete los campos obligatorios", "warning");
      return;
    }
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
            autoFocus
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
        <Grid xs={12}>
          <MoviePicker
            values={selected}
            onChange={setFieldValue(setSelected)}
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
