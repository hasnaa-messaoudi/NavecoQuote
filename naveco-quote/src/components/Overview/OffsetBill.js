import React, { useContext } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { formatNumbers } from '../../helpers/formatNumbers';
import StateContext from '../../StateContext';
import { newBill } from '../../helpers/overviewCalculation';
import { Card } from "tabler-react";
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import styles from '../../styles/AppStyle';
import { makeStyles } from '@material-ui/core/styles';


export default function OffsetBill() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const state = useContext(StateContext);
  let grid = newBill(state.acMonthly, state.monthlyAmount, state.year, state.rate) / state.monthlyAmount;

  if (grid < 0) {
    grid = 0;
  }
  const dataMock = [
    { title: 'Solar', value: (1 - grid) * 100, color: 'orange', },
    { title: 'Grid', value: (grid) * 100, color: 'blue' },
  ];

  const defaultLabelStyle = {
    fontSize: '8px',
    fontColor: "FFFFFF",
    fontWeight: "800"
  };

  //shiftSize determine the space between the pie peices 
  const shiftSize = 0.5;

  return (
    <Card>
      <Card.Status color="blue" side />
      <Card.Header>
        <Card.Title>Power Bill</Card.Title>
      </Card.Header>

      <Card.Body>
        <Grid container space={0}>
          <Grid item xs={6}>
            <PieChart
              style={{ fontColor: 'white', width: 200 }}
              data={dataMock}
              animate={true}
              segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
              label={({ dataEntry }) => dataEntry.title === 'Solar' ? `${formatNumbers(dataEntry.value)}%` : (dataEntry.value === 0 ? '' : `${formatNumbers(dataEntry.value)}%`) }
              labelStyle={{
                ...defaultLabelStyle,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <div className={classes.legend}>
              <img src={require("../../images/square-blue.png")} alt="company logo" />
              <Typography> &nbsp;Grid</Typography>
            </div>
            <div className={classes.legend}>
              <img src={require("../../images/square-orange.png")} alt="company logo" />
              <Typography> &nbsp;Solar</Typography>
            </div>

          </Grid>
        </Grid>
      </Card.Body>

    </Card>
  );
}


