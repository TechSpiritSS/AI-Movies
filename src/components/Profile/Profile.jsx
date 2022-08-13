import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';
import useStyles from './style';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';

function Profile() {
  const { user } = useSelector((state) => state.user);
  const classes = useStyles();

  const { data: favMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlist } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlist();
  }, []);

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
        !favMovies?.results?.length && !watchlistMovies?.results?.length
          ? <Typography variant="h5">Add some movies to your Favorites or WatchList</Typography>
          : (
            <Box>
              <RatedCards title="Favorites" movies={favMovies} />
              <RatedCards title="Watchlist" movies={watchlistMovies} />
            </Box>
          )
      }
    </Box>
  );
}

export default Profile;
