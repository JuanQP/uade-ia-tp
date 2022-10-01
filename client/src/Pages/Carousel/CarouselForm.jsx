import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { setFieldValue } from "../../utils";
import SaveIcon from '@mui/icons-material/Save';

export function CarouselForm({
  editing = false,
  initialValues,
  loading,
  onSubmit,
  ...props
}) {

  const [title, setTitle] = useState('');

  useState(() => {
    if(!editing) return;

    setTitle(initialValues.title);
  }, []);

  function handleSubmit() {
    onSubmit({
      title,
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