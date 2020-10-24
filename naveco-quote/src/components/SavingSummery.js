import React from 'react';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from "../AppStyle";


const useStyles = makeStyles(styles);

export default function SavingSummery(props) {

  const classes = useStyles();
  return (

    <Card className={classes.root} >
      <CardContent>
        <div className={classes.saving}>
          <AttachMoneyIcon fontSize="large"/>
          <Typography gutterBottom variant="h5" component="h2">
            {`Congratulations!! You can save ${props.saved} with this solar system in the next 25 years!`}
        </Typography>
        </div>

        <div className={classes.saving}>
          <SettingsIcon fontSize="large"/>
          <div>
          <Typography gutterBottom variant="h5" component="h2">
            {`Size: ${props.capactity} KW System`}
          </Typography>
          {/* <Typography gutterBottom variant="h5" component="h2">
            {`Pitch: 25
          </Typography> */}
          <Typography gutterBottom variant="h5" component="h2">
            {`Address: ${props.city}`}
          </Typography>
          </div>
        </div>
        
      </CardContent>
      </Card>
  );
}