import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function HomeCard({ title, Icon, linkTo, bgColor, children }) {
  return (
    <Card sx={{display: 'flex', height: '100%'}}>
      <CardContent sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        backgroundColor: bgColor,
      }}>
        <Icon
          fontSize="large"
          htmlColor="white"
          sx={{filter: "drop-shadow(1px 1px 1px black)"}}
        />
      </CardContent>
      <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
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
