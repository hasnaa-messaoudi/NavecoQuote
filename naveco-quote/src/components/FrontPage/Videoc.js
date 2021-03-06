import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 500,
    height: 366
  },
}));

/*youtube video with embeded link in src*/
export default function MediaControlCard() {
  const classes = useStyles();
  

  return (
    <Grid>

    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Watch us
            </Typography>
            <Typography variant="subtitle1" color="textSecondary"> 
              Naveco Power
            </Typography>
        </CardContent>
        <CardMedia
          className={classes.cover}
          component='iframe'
          src="https://www.youtube-nocookie.com/embed/7_9n1u-Ju5k"
          title="Live from space album cover"
        />
      </div>
    </Card>
    
  </Grid>
  );
}


