import { Box, Checkbox, ListItem, ListItemText, ListItemIcon, List, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactGroups, listGroupsSuccess } from '../../../redux/slices/campaigns';

// const liststyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   height: 20,
//   margin: 0,
//   width: 50
// };

export default function SendFromGroup({ group }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState();
  const [checkedList, setCheckedList] = useState([]);
  const { contactGroups } = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(getContactGroups());
  }, []);

  const handleCheckedList = (event, index) => {
    // if checked, add to checkedList
    if (event.target.checked) {
      setCheckedList([...checkedList, contactGroups[index]]);
      dispatch(listGroupsSuccess([...checkedList, contactGroups[index]]));
    }
    // if unchecked, remove from checkedList
    else {
      setCheckedList(checkedList.filter((item) => item !== contactGroups[index]));
      dispatch(listGroupsSuccess(checkedList.filter((item) => item !== contactGroups[index])));
    }
  };

  return (
    <Box>
      {contactGroups.map(({ groupName, contacts }, index) => (
        <ListItem sx={{padding:0}}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              value={checked}
              onChange={(event) => {
                setChecked(!checked);
                handleCheckedList(event, index);
              }}
            />
          </ListItemIcon>
          <ListItemText>{`${groupName} [${contacts}]`}</ListItemText>
          {/* <Divider/> */}
        </ListItem>
      ))}
    </Box>
  );
}
