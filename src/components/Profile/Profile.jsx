import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';
// import { useStyles } from './styles';

function Profile() {
  const { user } = useSelector((state) => state.user);
  // const classes = useStyles();

  const favoriteMovies = [];

  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          {user.username}
        </Typography>
        <Button color="inherit" onClick={logOut}>
          Logout &nbsp;<ExitToApp />
        </Button>
      </Box>
      {
        !favoriteMovies.length
          ? <Typography variant="h5">Add some movies to your Favorites or WatchList</Typography>
          : <Box>Fav Movies </Box>
      }
    </Box>
  );
}

export default Profile;
