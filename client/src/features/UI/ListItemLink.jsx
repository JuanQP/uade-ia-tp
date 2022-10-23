import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export function ListItemLink({ pathname, linkItem }) {
  // It checks if current location starts with this element URL
  const regexp = new RegExp(`^${linkItem.to}`, 'i');
  const match = regexp.test(pathname);
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={match}
        component={Link}
        to={linkItem.to}
        className={!match ? undefined : "side-panel-color-selected"}
      >
        <ListItemIcon>{linkItem.icon}</ListItemIcon>
        <ListItemText className="side-panel-color" primary={linkItem.label} />
      </ListItemButton>
    </ListItem>
  )
}
