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
export default function UserAuth(props) {

  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    if (checked.length != 0) {
      props.setSelectedUserAuthRoles(checked[0].roleId)
    }

  })





  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    let newChecked = [...checked];

    if (newChecked.length == 0) {

      if (currentIndex === -1) {
        newChecked.push(value);
      }
      else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    }
    else {
      newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
    }




  };

  return (

    <List>
      {props.userAuthRoles.map((value) => {
        console.log(value.roleId)
        const labelId = value.roleId;
        return (
          <ListItem
            key={value}
            disablePadding
            secondaryAction={
              value.roleId == props.defaultUserAuthRoles ? (<CheckCircleIcon />) : (null)
            }
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)}
              dense>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.roleName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>

  );
}
