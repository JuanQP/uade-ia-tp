import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Box, Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import "./RotatingGradient.css";

const styles = {
  card: (isSelected: boolean) => ({
    display: 'flex', // I need this to enable marginTop: 'auto' on CardContent
    flexDirection: 'column',
    height: "100%", // Row with same height
    transform: isSelected ? 'translate(0, -1em)' : '',
    transition: 'transform 0.3s ease-out',
  }),
}

interface ContentCardProps {
  content: CardFormatContentWithOrder;
  values: CardFormatContent[];
  onClick: (content: CardFormatContent) => void;
  onMoveToFirst: (content: CardFormatContent) => void;
  onMoveToLeft: (content: CardFormatContent) => void;
  onMoveToRight: (content: CardFormatContent) => void;
  onMoveToLast: (content: CardFormatContent) => void;
}

export function ContentCard({
  content,
  values,
  onClick,
  onMoveToFirst,
  onMoveToLeft,
  onMoveToRight,
  onMoveToLast,
}: ContentCardProps) {
  const isSelected = values.some(v => v.id === content.id);
  const { order } = content.ContenidoCarrusel ?? { order: 0 };
  const isFirstContent = isSelected && order === 1;
  const isLastContent = isSelected && order === values.length;
  const orderText = isSelected ? `#${order}` : '#0';
  const Icon = isSelected ? CheckBoxIcon : CheckBoxOutlineBlankOutlinedIcon;

  return (
    <Card
      className={isSelected ? "content-card-selected" : undefined}
      raised={isSelected}
      sx={styles.card(isSelected)}
    >
      <CardContent
        sx={{
          padding: 0,
          position: 'relative',
          height: '10em', // Images will have same height
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          backgroundImage: `url('${content.urlImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{
          position: 'absolute',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))',
        }}>
          <Chip
            label={orderText}
            color="default"
            size="small"
            sx={{
              margin: 1,
              backgroundColor: isSelected ? 'background.default' : 'transparent',
              color: isSelected ? 'inherit' : 'transparent',
            }}
          />
          <IconButton onClick={() => onClick(content)}>
            <Icon sx={{ color: isSelected ? 'white' : 'white' }} />
          </IconButton>
        </Box>
        <Typography
          textAlign="center"
          fontWeight={500}
          sx={{
            color: 'white',
            textShadow: '2px 2px 3px black',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        >
          {content.title}
        </Typography>
      </CardContent>
      {/* Genres, maturity ratings, and buttons will go to bottom */}
      <CardContent sx={{marginTop: 'auto', py: 1}}>
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
        <Tooltip title="Poner en primer lugar" placement="top">
          <span>
            <IconButton
              color={'primary'}
              disabled={!isSelected || isFirstContent}
              onClick={() => onMoveToFirst(content)}
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Mover una posición a la izquierda" placement="top">
          <span>
            <IconButton
              color={'primary'}
              disabled={!isSelected || isFirstContent}
              onClick={() => onMoveToLeft(content)}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Mover una posición a la derecha" placement="top">
          <span>
            <IconButton
              color={'primary'}
              disabled={!isSelected || isLastContent}
              onClick={() => onMoveToRight(content)}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Poner al final" placement="top">
          <span>
            <IconButton
              color={'primary'}
              disabled={!isSelected || isLastContent}
              onClick={() => onMoveToLast(content)}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </span>
        </Tooltip>
      </CardActions>
    </Card>
  )
}
