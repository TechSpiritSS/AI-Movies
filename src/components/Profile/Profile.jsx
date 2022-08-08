import React from 'react';
import { useSelector } from 'react-redux';
// import { useStyles } from './styles';

function Profile() {
  const { user } = useSelector((state) => state.user);
  // const classes = useStyles();

  return (
    <div>Profile Name - {user.username}</div>
  );
}

export default Profile;
