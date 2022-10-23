import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  card: {
    display: 'flex',
    height: '100%'
  },
  cardContentLeft: (bgColor) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    backgroundColor: bgColor,
  }),
  cardContentRight: {
    display: 'flex',
    flexDirection: 'column'
  },
  icon: {
    filter: "drop-shadow(1px 1px 1px black)"
  },
}

export function HomeCard({ title, Icon, linkTo, bgColor, children }) {
  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContentLeft(bgColor)}>
        <Icon
          fontSize="large"
          htmlColor="white"
          sx={styles.icon}
        />
      </CardContent>
      <CardContent sx={styles.cardContentRight}>
        <Typography fontWeight="bold">
          {title}
        </Typography>
        {/* Here goes the content */}
        {children}
        <Box sx={{marginTop: 'auto'}} />
        <Typography sx={{alignSelf: 'end'}}>
          <Link underline="hover" component={RouterLink} to={linkTo}>
            Ir a {title.toLowerCase()}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}
