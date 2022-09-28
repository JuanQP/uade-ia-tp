import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

export function ContentTable({contents, ...props}) {

  if(contents.length === 0) {
    return (
      <Typography>Todavía no hay contenidos creados 😅...</Typography>
    );
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
            <TableCell>
              <Link to={`/content/${content.id}`}>
                <EditIcon color="primary"/>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}