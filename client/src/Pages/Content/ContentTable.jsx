import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

export function ContentTable({contents, onDelete, ...props}) {

  if(contents.length === 0) {
    return (
      <Typography align="center">
        Todavía no hay contenidos creados 😅...
      </Typography>
    );
  }

  function handleDelete(content) {
    onDelete(content);
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Título</TableCell>
          <TableCell>Año</TableCell>
          <TableCell>Duración</TableCell>
          <TableCell>Director</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contents.map((content) => (
          <TableRow key={content.id}>
            <TableCell>
              {content.id}
            </TableCell>
            <TableCell>{content.title}</TableCell>
            <TableCell>{content.year}</TableCell>
            <TableCell>{content.duration}</TableCell>
            <TableCell>{content.director}</TableCell>
            <TableCell style={{display: 'flex', justifyContent: 'end'}}>
              <IconButton
                color="primary"
                component={Link}
                to={`/content/${content.id}`}
              >
                <EditIcon/>
              </IconButton>
              <IconButton
                color="error"
                component="label"
                onClick={() => handleDelete(content)}
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