import { ListUser } from "@/features/Users/UserAPI";
import { notification } from "@/utils";
import { CMSTable } from "@features/UI";
import { CMSTableColumnType } from "@features/UI/types";
import { userAPI } from "@features/Users";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns: CMSTableColumnType<ListUser>[] = [
  {name: 'E-Mail', key: "email", hide: false},
  {name: 'Apellido', key: "apellido", hide: false},
  {name: 'Nombre', key: "nombre", hide: false},
];

export function Users() {

  const [users, setUsers] = useState<ListUser[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  async function fetchData () {
    const users = await userAPI.getUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(user: ListUser) {
    const response = confirm(`¿Estás seguro de quitar permisos de curador a ${user.email}?`);
    if(response === true) {
      await userAPI.deleteUser(user);
      notification(enqueueSnackbar, `${user.email} ya no es más curador 👋`);
      fetchData();
    }
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 10, mb: 2 }}>
        <Typography variant="h4" fontWeight={100}>Curadores</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          component={Link}
          to="/register"
        >
          Nuevo
        </Button>
      </Box>
      <CMSTable
        editButton={false}
        items={users}
        idField="email"
        url="/users/"
        columns={columns}
        onDelete={handleDelete}
      />
    </Container>
  );
}
