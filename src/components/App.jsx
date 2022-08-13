import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import { Actor, MovieInfo, Movies, NavBar, Profile } from './index';
import useStyles from './styles';
import useAlanAI from './AlanAI';

function App() {
  const classes = useStyles();
  const ALanBtnContainer = useRef();
  useAlanAI();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={['/', '/approved']}>
            <Movies />
          </Route>
          <Route exact path="/movie/:id">
            <MovieInfo />
          </Route>
          <Route exact path="/actor/:id">
            <Actor />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </main>
      <div ref={ALanBtnContainer} />
    </div>
  );
}

export default App;
