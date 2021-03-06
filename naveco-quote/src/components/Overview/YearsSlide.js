import React, {useContext} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import style from '../../styles/SlideStyle';
import {Card} from "tabler-react";
import StateContext from '../../StateContext';


const useStyles = makeStyles(theme => ({
  root: {
    width: 800 + 24 * 2,
    padding: 24,
  },
  margin: {
    height: theme.spacing(3),
  },
}));



const YearSlider = withStyles(style)(Slider);

export default function YearsSlide(props) {

  const state = useContext(StateContext);
  const classes = useStyles();
  

  return (
    <Card body = {
      <Paper className={classes.root}>
      <Typography gutterBottom>{`Year: ${state.year}`}</Typography>
      <YearSlider valueLabelDisplay="auto" aria-label="year slider" defaultValue={state.year} min={2020} max={2044} onChange={props.handleYearChange} />
      </Paper>
    }/>
      
  );
}




