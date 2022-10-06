import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { setFieldValue } from "../../utils";
import SaveIcon from '@mui/icons-material/Save';

export function UserForm({
  loading,
  onSubmit,
  ...props
}) {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    onSubmit({
      nombre,
      apellido,
      email,
      password,
      telefono: '',
      tenant: 'Cms',
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
          label="Nombre"
          value={nombre}
          placeholder="Linus"
          onChange={setFieldValue(setNombre)}
        />
        <TextField
          style={{flex: 1}}
          required
          variant="outlined"
          label="Apellido"
          value={apellido}
          placeholder="Torvalds"
          onChange={setFieldValue(setApellido)}
        />
      </div>
      <div style={{display: 'flex', gap: 10}}>
        <TextField
          style={{flex: 1}}
          required
          variant="outlined"
          label="E-Mail"
          value={email}
          placeholder="tu@email.com"
          onChange={setFieldValue(setEmail)}
        />
        <TextField
          style={{flex: 1}}
          autoComplete="new-password"
          required
          type="password"
          variant="outlined"
          label="Password"
          value={password}
          placeholder="No se lo digas a nadie 🤫"
          onChange={setFieldValue(setPassword)}
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
