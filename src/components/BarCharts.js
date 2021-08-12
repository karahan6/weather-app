import { Grid } from '@material-ui/core';
import { Forward } from '@material-ui/icons';
import { Fragment } from 'react-is';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getQuery } from "../action/query";
import DailyCard from './DailyCard';
import { makeStyles } from '@material-ui/core/styles';
import useWidthSize from '../hooks/useWidthSize';
import { useState, useEffect } from 'react';
import QueryInputBuilder from '../model/QueryInput';
import { requestNames, requestUrls } from '../constants/requestUrls';
import QueryTypeEnum from '../model/QueryTypeEnum';
import { APP_ID, FORECAST_COUNT, LOCATION } from '../constants';
import { prepareForecastList } from '../utils/prepareResponse';
import { Bar, Chart } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const BarCharts = () => {
    
    const unit = useSelector(state => state.ui.unit, shallowEqual);
    const date = useSelector(state => state.ui.date, shallowEqual);
    
    const dateWeatherInfos = useSelector(state => state.query[requestNames.forecast], shallowEqual);
    
    const dateWeatherInfo = dateWeatherInfos ? dateWeatherInfos.find(item => item.date == date) : undefined;
    const data = {
        labels: dateWeatherInfo ? dateWeatherInfo.hourly.map(h => new Date(h.dt*1000).toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute:'2-digit'
          })) : [],
        datasets: [
            {
                label: '# of Red Votes',
                data: dateWeatherInfo ? dateWeatherInfo.hourly.map(h => h.temp) : [],
                backgroundColor: 'rgb(255, 99, 132)',
            }
        ],
    };

    const options = {
        scaleShowLabels : false,
        scales: {
            xAxes: [{
                display: false,
                ticks: {
                    display: false //this will remove only the label
                }
            }],
            yAxes: [{
                display: false,
                ticks: {
                    display: false //this will remove only the label
                }
            }],
        }
    };
    /// Chart.defaults.scale.gridLines.display = false;

    return <div style={{ padding: 40 }}>
        <Bar style={{ margin: 20 }} data={data} options={options} />
    </div>
}

export default BarCharts;