import React, { Component } from 'react';
import '../CSS/profile.css';
import api from './api';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const THEME = createMuiTheme({
  typography: {
    "fontFamily": `'Open Sans', sans-serif`,
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: '10px',
        backgroundColor: "#5675b4",
      },
    },
  },
})

class BasicTable extends Component {

  state = { rows: [] };

  async componentDidMount() {
    const rows = await this.getRows();
    this.setState({ rows });
  }

  async getTableDataWeather(filename, param) {
    const data = await api.getUserData(filename);
    return data["Results"][param];
  }

  createData = (name, naive, counter_factual, sample) => {
    return { name, naive, counter_factual, sample };
  }

  getRows = async () => {

    const filename = ['Weather_Counterfactual', 'Weather_Naive_guide', 'Weather_Sample'];
    const results = ['Prediction', 'dtw_from_sample'];

    const predict_counter = await this.getTableDataWeather(filename[0], results[0]);
    const dtw_counter = await this.getTableDataWeather(filename[0], results[1]);

    const predict_naive = await this.getTableDataWeather(filename[1], results[0]);
    const dtw_naive = await this.getTableDataWeather(filename[1], results[1]);

    const predict_sample = await this.getTableDataWeather(filename[2], results[0]);
    const dtw_sample = await this.getTableDataWeather(filename[2], results[1]);


    return [
      this.createData('Prediction',
        Number(predict_counter),
        Number(predict_naive),
        Number(predict_sample)),
      this.createData('dtw_from_sample',
        Number(dtw_counter),
        Number(dtw_naive),
        Number(dtw_sample)),
    ];
  }

  render() {
    return (
      <MuiThemeProvider theme={THEME}>
        <TableContainer component={Paper} >
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Naive</TableCell>
                <TableCell align="right">Counter</TableCell>
                <TableCell align="right">Sample</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.naive}</TableCell>
                  <TableCell align="right">{row.counter_factual}</TableCell>
                  <TableCell align="right">{row.sample}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(BasicTable);