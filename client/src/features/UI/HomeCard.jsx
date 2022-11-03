import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  card: (gradientFrom, gradientTo) => ({
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    minHeight: '200px',
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    boxShadow: `0px 4px 8px ${gradientTo}`,
  }),
  cardContentTop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  cardContentBottom: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    height: '100%',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  icon: {
    filter: "drop-shadow(1px 1px 1px black)"
  },
}

export function HomeCard({ title, Icon, linkTo, gradientFrom, gradientTo, children }) {
  return (
    <Card sx={styles.card(gradientFrom, gradientTo)}>
      <CardContent sx={styles.cardContentTop}>
        <Icon
          fontSize="large"
          htmlColor="white"
          sx={styles.icon}
        />
      </CardContent>
      <CardContent sx={styles.cardContentBottom}>
        <Typography
          variant="h6"
          fontWeight={200}
        >
          {title}
        </Typography>
        {/* Here goes the content */}
        {children}
        <Box sx={{marginTop: 'auto'}} />
        <Typography sx={{alignSelf: 'end'}}>
          <Link color="primary.dark" underline="hover" component={RouterLink} to={linkTo}>
            Ir a {title.toLowerCase()}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}
