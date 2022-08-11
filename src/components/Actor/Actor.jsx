import React, { useState } from 'react';
import { Typography, Button, Grid, Box, CircularProgress } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorQuery, useGetActorMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination } from '..';
import useStyles from './styles';

function Actor() {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: actorMovies } = useGetActorMoviesQuery({ id, page });
  const history = useHistory();
  const classes = useStyles();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center"> <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button startIcon={<ArrowBack />} color="primary" onClick={() => history.goBack()}>
        Go Back
      </Button>
    </Box>;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={4}>
          <img className={classes.image} src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`} alt={data?.name} />
        </Grid>
        <Grid item container direction="column" xs={12} sm={6} lg={8}>
          <Typography variant="h4" align="center" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Born - {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography style={{ marginBottom: '10px' }} variant="body1" align="justify" paragraph gutterBottom>
            { data?.biography || 'No biography available' }
          </Typography>
          <Box display="flex" justifyContent="space-around" marginTop="2rem">
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} color="primary" onClick={() => history.goBack()}>Go Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {actorMovies && <MovieList movies={actorMovies} numberOfMovies={12} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={actorMovies?.total_pages} />
      </Box>
    </>
  );
}

export default Actor;
