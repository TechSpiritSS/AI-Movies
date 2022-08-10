import React from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectGenreOrCategory } from '../../features/currentGenreCategory';

import useStyles from './styles';
import { useGetMovieQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';

function MovieInfo() {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();

  const addToFav = () => {};
  const isMovieFav = false;

  const addToWatch = () => {};
  const isMovieWatch = false;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center"> <CircularProgress size="8rem" />
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item xs={12} sm={6} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" xs={12} sm={6} lg={8}>
        <Typography variant="h4" align="center" gutterBottom>
          {data?.title} ({data?.release_date?.substring(0, 4)})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" alignItems="center">
            <Rating readOnly value={data.vote_average / 2} precision={0.5} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min {data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}` : ''}  <br />
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link className={classes.link} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))} key={genre.name} button>
              <img src={genreIcons[genre.name.toLowerCase()]} alt={genre.name} height={30} className={classes.genreImage} />
              <Typography variant="subtitle1" gutterBottom color="textPrimary">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '10px' }}>
          Overview
          <Typography style={{ marginBottom: '10px' }} variant="subtitle1" align="justify" gutterBottom>
            {data?.overview}
          </Typography>
        </Typography>
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '10px' }}>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data?.credits?.cast?.map((cast) => (
            cast.profile_path && (
            <Grid item spacing={2} key={cast.id} component={Link} to={`/actor/${cast.id}`} style={{ textDecoration: 'none' }}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
              <Typography variant="subtitle1" gutterBottom color="textPrimary">
                {cast.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom color="textSecondary">
                {cast.character.split('/')[0]}
              </Typography>
            </Grid>
            )
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item sx={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button onClick={() => {}} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item sx={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFav}
                  endIcon={isMovieFav ? <Favorite /> : <FavoriteBorderOutlined />}
                >
                  {isMovieFav ? 'Favorite' : 'UnFavorite'}
                </Button>
                <Button
                  onClick={addToWatch}
                  endIcon={isMovieWatch ? <Remove /> : <PlusOne />}
                >
                  WatchList
                </Button>
                <Button onClick={() => {}} endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" variant="subtitle1" color="inherit">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieInfo;
