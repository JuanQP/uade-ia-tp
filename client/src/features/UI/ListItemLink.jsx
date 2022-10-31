import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  selected: {
    borderTopLeftRadius: '40px',
    borderBottomLeftRadius: '40px',
    backgroundColor: '#e0e0e0 !important',
    color: '#0F2027',
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
        sx={listItemButtonStyle}
        selected={match}
        component={Link}
        to={linkItem.to}
      >
        <ListItemIcon
          sx={iconStyle}
        >
          {linkItem.icon}
        </ListItemIcon>
        <ListItemText primary={linkItem.label}/>
      </ListItemButton>
    </ListItem>
  )
}
