import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  card: (bgColor) => ({
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    minHeight: '200px',
    backgroundColor: bgColor,
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
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
    backgroundColor: 'white',
    height: '100%',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  icon: {
    filter: "drop-shadow(1px 1px 1px black)"
  },
}

export function HomeCard({ title, Icon, linkTo, bgColor, children }) {
  return (
    <Card sx={styles.card(bgColor)}>
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
          <Link underline="hover" component={RouterLink} to={linkTo}>
            Ir a {title.toLowerCase()}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}
