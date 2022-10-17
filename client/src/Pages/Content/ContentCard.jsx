import { Box, Card, CardActionArea, CardActions, CardContent, Chip, IconButton, Typography } from "@mui/material";
import Image from "mui-image";
import CheckIcon from '@mui/icons-material/Check';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import "../../RotatingGradient.css";

export function ContentCard({ content, values, onClick }) {
  const isSelected = values.some(v => v.id === content.id);
  return (
    <Card
      elevation={isSelected ? 8 : undefined}
      className={isSelected ? "content-card-selected" : undefined}
      sx={{
        display: 'flex', // I need this to enable marginTop: 'auto' on CardContent
        flexDirection: 'column',
        height: "100%", // Row with same height
        transform: isSelected ? 'translate(0, -1em)' : undefined,
        transition: 'transform 0.3s ease-out',
      }}
    >
      <CardActionArea>
        <Image
          style={{cursor: 'pointer'}}
          wrapperStyle={{height: 'auto'}} // Images will have same height
          src={content.urlImage}
          onClick={() => onClick(content)}
        />
      </CardActionArea>
      <CardContent sx={{py: 1}}>
        <Typography textAlign="center">{content.title}</Typography>
      </CardContent>
      {/* Genres, maturity ratings, and buttons will go to bottom */}
      <CardContent sx={{marginTop: 'auto', py: 0}}>
        <Box>
          <Typography variant="body2" color="text.secondary">Calificación</Typography>
          <Chip label={content.MaturityRating.description} />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">Géneros</Typography>
          {content.genres.map(genre => <Chip key={genre.id} label={genre.description}/>)}
        </Box>
      </CardContent>
      {/* disableSpacing allows me to move CheckIcon to right */}
      <CardActions disableSpacing sx={{py: 0}}>
        <IconButton size="large" href={`/contents/${content.id}`} target="_blank" >
          <OpenInNewIcon />
        </IconButton>
        {isSelected && (
          <IconButton
            sx={{marginLeft: 'auto'}}
            size="large"
            color={'primary'}
            onClick={() => onClick(content)}
          >
            <CheckIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  )
}
