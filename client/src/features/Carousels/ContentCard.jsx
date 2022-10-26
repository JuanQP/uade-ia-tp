import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Card, CardActionArea, CardActions, CardContent, Chip, IconButton, Link, Typography } from "@mui/material";
import Image from "mui-image";
import { Link as RouterLink } from 'react-router-dom';
import "./RotatingGradient.css";

const styles = {
  card: (isSelected) => ({
    display: 'flex', // I need this to enable marginTop: 'auto' on CardContent
    flexDirection: 'column',
    height: "100%", // Row with same height
    transform: isSelected ? 'translate(0, -1em)' : undefined,
    transition: 'transform 0.3s ease-out',
  }),
}

export function ContentCard({
  content,
  values,
  onClick,
  onMoveToFirst,
  onMoveToLeft,
  onMoveToRight,
  onMoveToLast,
}) {
  const isSelected = values.some(v => v.id === content.id);
  const { order } = content.ContenidoCarrusel ?? { order: 0 };
  const isFirstContent = isSelected && order === 1;
  const isLastContent = isSelected && order === values.length;
  const orderText = isSelected ? `#${order}` : '-';
  return (
    <Card
      elevation={isSelected ? 8 : undefined}
      className={isSelected ? "content-card-selected" : undefined}
      sx={styles.card(isSelected)}
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
          <Link
            underline="hover"
            target="_blank"
            component={RouterLink}
            to={`/contents/${content.id}`}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography textAlign="center" justifyContent="center">
                {content.title}
              </Typography>
              <OpenInNewIcon />
            </Box>
          </Link>
      </CardContent>
      {/* Genres, maturity ratings, and buttons will go to bottom */}
      <CardContent sx={{marginTop: 'auto', py: 0}}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Posición en carrusel
          </Typography>
          <Chip color={isSelected ? "primary" : "default"} label={orderText} />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Calificación
          </Typography>
          <Chip label={content.MaturityRating.description} />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Géneros
          </Typography>
          {content.genres.map(genre => <Chip key={genre.id} label={genre.description}/>)}
        </Box>
      </CardContent>
      {/* disableSpacing allows me to move CheckIcon to right */}
      <CardActions
        disableSpacing
        sx={{display: "flex", justifyContent: "space-between", py: 0}}
      >
        <IconButton
          color={'primary'}
          disabled={!isSelected || isFirstContent}
          onClick={() => onMoveToFirst(content)}
        >
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
        <IconButton
          color={'primary'}
          disabled={!isSelected || isFirstContent}
          onClick={() => onMoveToLeft(content)}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <IconButton
          color={'primary'}
          disabled={!isSelected || isLastContent}
          onClick={() => onMoveToRight(content)}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
        <IconButton
          color={'primary'}
          disabled={!isSelected || isLastContent}
          onClick={() => onMoveToLast(content)}
        >
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
