import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: '20px auto',
    [theme.breakpoints.down('lg')]: {
      margin: '10px 0',
      justifyContent: 'center',
    },
  },
}));
