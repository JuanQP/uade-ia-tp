import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  selected: {
    borderTopLeftRadius: '40px',
    borderBottomLeftRadius: '40px',
    backgroundColor: '#e0e0e0 !important',
    color: '#0F2027',
    // Remove button transition effects
    transition: 'none',
    // "Before" and "after" pseudo elements to make
    // active links rounded in the outside
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-30px',
      right: 0,
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      boxShadow: '15px 15px 0 #e0e0e0',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-30px',
      right: 0,
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      boxShadow: '15px -15px 0 #e0e0e0',
    },
  },
  notSelected: {
    color: 'white',
  }
}

export function ListItemLink({ pathname, linkItem }) {
  // It checks if current location starts with this element URL
  const regexp = new RegExp(`^${linkItem.to}`, 'i');
  const match = regexp.test(pathname);

  const listItemButtonStyle = match ? styles.selected : styles.notSelected;
  const iconStyle = { color: listItemButtonStyle.color };

  return (
    <ListItem disablePadding sx={{ paddingLeft: 1 }}>
      <ListItemButton
        disableRipple
        sx={listItemButtonStyle}
        selected={match}
        component={Link}
        to={linkItem.to}
      >
        <ListItemIcon sx={iconStyle}>
          {linkItem.icon}
        </ListItemIcon>
        <ListItemText primary={linkItem.label}/>
      </ListItemButton>
    </ListItem>
  )
}
