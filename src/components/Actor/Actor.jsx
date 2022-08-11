import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';

import { useParams } from 'react-router-dom';
import { useGetActorQuery } from '../../services/TMDB';

import useStyles from './styles';

function Actor() {
  const { id } = useParams();
  const { data, isFetching } = useGetActorQuery(id);
  const classes = useStyles();

  console.log(data);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center"> <CircularProgress size="8rem" />
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item xs={12} sm={6} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`} alt={data?.name} />
      </Grid>
      <Grid item container direction="column" xs={12} sm={6} lg={8}>
        <Typography variant="h4" align="center" gutterBottom>
          {data?.name} {data?.birthday}
        </Typography>
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '10px' }}>
          Biography
          <Typography style={{ marginBottom: '10px' }} variant="subtitle1" align="justify" gutterBottom>
            {data?.biography}
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Actor;
