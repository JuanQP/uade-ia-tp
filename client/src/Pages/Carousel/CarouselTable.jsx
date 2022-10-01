import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

export function CarouselTable({carousels, onDelete, ...props}) {

  if(carousels.length === 0) {
    return (
      <Typography align="center">
        Todavía no hay carruseles creados 😅...
      </Typography>
    );
  }

  function handleDelete(carousel) {
    onDelete(carousel);
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Título</TableCell>
          <TableCell>#Contenidos</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {carousels.map((carousel) => (
          <TableRow key={carousel.id}>
            <TableCell>
              {carousel.id}
            </TableCell>
            <TableCell>{carousel.title}</TableCell>
            <TableCell>{carousel.contenidos.length}</TableCell>
            <TableCell style={{display: 'flex', justifyContent: 'end'}}>
              <IconButton
                color="primary"
                component={Link}
                to={`/carousels/${carousel.id}`}
              >
                <EditIcon/>
              </IconButton>
              <IconButton
                color="error"
                component="label"
                onClick={() => handleDelete(carousel)}
              >
                <DeleteIcon/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}