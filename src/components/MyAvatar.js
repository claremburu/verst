// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.photoURL}
      alt={user?.clientName}
      color={user?.photoURL ? 'default' : createAvatar(user?.clientName).color}
      {...other}
      sx={{width: 50, height: 50 }}
    >
      {createAvatar(user?.clientName).name}
    </Avatar>
  );
}
