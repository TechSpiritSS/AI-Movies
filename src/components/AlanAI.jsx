import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DarkModeContext } from '../utils/ToggleDark';
import { fetchToken } from '../utils';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreCategory';

const useAlanAI = () => {
  const { setMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    alanBtn({
      key: 'b77699a7d430290efd1dcc7533e344e82e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const genreFound = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());

          if (genreFound) {
            history.push('/');
            dispatch(selectGenreOrCategory(genreFound.id));
          } else {
            const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
            history.push('/');
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'toggleDarkMode') {
          setMode(mode);
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          window.location.href = '/';
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      } });
  }, []);
};

export default useAlanAI;
