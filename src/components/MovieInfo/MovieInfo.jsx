import React, { useEffect, useState } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectGenreOrCategory } from '../../features/currentGenreCategory';

import useStyles from './styles';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { MovieList } from '..';

function MovieInfo() {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isMovieFav, setIsMovieFav] = useState(false);
  const [isMovieWatchlist, setIsMovieWatchlist] = useState(false);

  const { data, isFetching } = useGetMovieQuery(id);
  const { data: favMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: recommendations } = useGetRecommendationsQuery(id);

  useEffect(() => {
    setIsMovieFav(!!favMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favMovies, data]);
  useEffect(() => {
    setIsMovieWatchlist(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  const addToFav = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${import.meta.env.VITE_API_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFav,
    });
    setIsMovieFav((prev) => !prev);
  };

  const addToWatch = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${import.meta.env.VITE_API_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlist,
    });
    setIsMovieWatchlist((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center"> <CircularProgress size="8rem" />
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px' }}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} />
      </Grid>
      <Grid item container direction="column" sm={6} lg={8}>
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
          <Typography variant="h5" align="center" gutterBottom>
            {data?.runtime} min | Language: {data?.spoken_languages[0].name} <br />
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
          <Typography style={{ marginBottom: '10px' }} variant="body1" align="justify" gutterBottom>
            {data?.overview}
          </Typography>
        </Typography>
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '10px' }}>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data && data?.credits?.cast?.map((cast) => (
            cast.profile_path && (
            <Grid item key={cast.id} component={Link} to={`/actor/${cast.id}`} style={{ textDecoration: 'none' }}>
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
            <Grid item sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                  Website
                </Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                  IMDB
                </Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFav}
                  endIcon={isMovieFav ? <Favorite /> : <FavoriteBorderOutlined />}
                >
                  {isMovieFav ? 'Favorite' : 'UnFavorite'}
                </Button>
                <Button
                  onClick={addToWatch}
                  endIcon={isMovieWatchlist ? <Remove /> : <PlusOne />}
                >
                  WatchList
                </Button>
                <Button onClick={() => {}} endIcon={<ArrowBack />} style={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" variant="subtitle" color="inherit">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          You May Also Like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : (
            <Box display="flex" justifyContent="center" alignItems="center"> <CircularProgress size="8rem" />
            </Box>
          )}
      </Box>
      <Modal closeAfterTransition className={classes.modal} open={open} onClose={() => setOpen(false)}>
        {data?.videos?.results?.length > 0
          ? <iframe autoPlay className={classes.video} title="Trailer" frameBorder="0" src={`https://www.youtube.com/embed/${data.videos.results[0].key}`} allow="autoplay" />
          : (
            <Typography variant="h5" align="center" gutterBottom>
              No Trailer Available
            </Typography>
          )}
      </Modal>
    </Grid>
  );
}

export default MovieInfo;
