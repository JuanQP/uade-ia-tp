import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '300px',
  },
  cardContentTop: (gradientFrom: string, gradientTo: string) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
  }),
  cardContentBottom: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'background.paper',
  },
  icon: {
    fontSize: 48,
    color: 'common.white',
  },
}

type HomeCardProps = {
  title: string;
  Icon: any;
  linkTo: string;
  gradientFrom: string;
  gradientTo: string;
  children: JSX.Element | JSX.Element[];
}

export function HomeCard({ title, Icon, linkTo, gradientFrom, gradientTo, children }: HomeCardProps) {
  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContentTop(gradientFrom, gradientTo)}>
        <Icon sx={styles.icon} />
      </CardContent>
      <CardContent sx={styles.cardContentBottom}>
        <Typography
          variant="h6"
          fontWeight={200}
          align="center"
          gutterBottom
        >
          {title}
        </Typography>
        {/* Here goes the content */}
        {children}
        <Button
          variant="gradient"
          gradient={{ deg: "45deg", from: gradientFrom, to: gradientTo }}
          component={RouterLink}
          to={linkTo}
          sx={{marginTop: 'auto'}}
          endIcon={<ArrowForwardIcon />}
        >
          {title}
        </Button>
      </CardContent>
    </Card>
  )
}
