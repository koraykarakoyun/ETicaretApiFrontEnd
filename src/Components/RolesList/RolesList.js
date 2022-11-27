import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect } from 'react';
import { useForkRef } from '@mui/material';
import { api } from '../../Utilities/Api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function RolesList(props) {

  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    props.setSelectedRoles(checked);
  })




  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    let newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {props.rolesList.map((value) => {

        const labelId = value.name;
        return (
          <ListItem
            key={value}
            disablePadding
            secondaryAction={
              props.rolesToEndpoint.map((rolesEndpoint) => {
                if (rolesEndpoint == value.name)
                  return (<CheckCircleIcon />)
              })
            }
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>

  );
}
