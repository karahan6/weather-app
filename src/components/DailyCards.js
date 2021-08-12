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

const DailyCards = () => {
    const [numberOfCards, setNumberOfCards] = useState(undefined);
    const dispatch = useDispatch();
    const unit = useSelector(state => state.ui.unit, shallowEqual);
    const dateWeatherInfos = useSelector(state => state.query[requestNames.forecast], shallowEqual);
    const classes = useStyles();
    const widthSize = useWidthSize();

    useEffect(() => {
        let spin = {
            spinning: true,
            tip: "Loading"
        };
        let ftqueryInput = new QueryInputBuilder(requestNames.forecast, QueryTypeEnum.GET)
            .withRequestParams({
                APPID: APP_ID,
                cnt: FORECAST_COUNT,
                q: LOCATION,
                units: unit
            })
            .withCallBackPrepare(prepareForecastList)
            .withSpin(spin)
            .build();
        dispatch(getQuery(ftqueryInput));
    }, []);

    useEffect(() => {
        console.log(widthSize);
        if (widthSize < 600)
            setNumberOfCards(1);
        else if (widthSize < 960)
            setNumberOfCards(2);
        else if (widthSize < 1280)
            setNumberOfCards(3);
        else if (widthSize < 1920)
            setNumberOfCards(4);
        else
            setNumberOfCards(6);

    }, [widthSize]); // Empty array ensures that effect is only run on mount



    return <Grid container spacing={0} style={{
        padding: 10,
        width: '100%'
      }}>
        {dateWeatherInfos && dateWeatherInfos.slice(0, numberOfCards).map(dw =>
            <Grid style={{padding:10, cursor:"pointer"}} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <DailyCard weatherInfo={dw}/>
            </Grid>
        )}
    </Grid>
}

export default DailyCards;