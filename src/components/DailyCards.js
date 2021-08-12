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
import { requestNames } from '../constants/requestUrls';
import QueryTypeEnum from '../model/QueryTypeEnum';
import { APP_ID, FORECAST_COUNT, LOCATION } from '../constants';
import { prepareForecastList } from '../utils/prepareResponse';

const DailyCards = () => {
    const [numberOfCards, setNumberOfCards] = useState(undefined);
    const [cardFirstIndex, setCardFirstIndex] = useState(0);

    const dispatch = useDispatch();
    const unit = useSelector(state => state.ui.unit, shallowEqual);
    const dateWeatherInfos = useSelector(state => state.query[requestNames.forecast], shallowEqual);
    const widthSize = useWidthSize();

    useEffect(() => {
        let ftqueryInput = new QueryInputBuilder(requestNames.forecast, QueryTypeEnum.GET)
            .withRequestParams({
                APPID: APP_ID,
                cnt: FORECAST_COUNT,
                q: LOCATION,
                units: unit
            })
            .withCallBackPrepare(prepareForecastList)
            .withSpin()
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

    return <Fragment>
        {dateWeatherInfos && <ul className="ulIconGruop" style={cardFirstIndex == 0 ? { justifyContent: "flex-end" } : {}}>
            {cardFirstIndex != 0 && <Forward className="rotate180 prevNextIcon" onClick={() => setCardFirstIndex(cardFirstIndex - 1)} />}
            {cardFirstIndex + numberOfCards < dateWeatherInfos.length && <Forward className="prevNextIcon" onClick={() => setCardFirstIndex(cardFirstIndex + 1)} />}
        </ul>}
        <Grid container spacing={0} style={{
            padding: 10,
            width: '100%'
        }}>
            {dateWeatherInfos && dateWeatherInfos.slice(cardFirstIndex, cardFirstIndex + numberOfCards).map(dw =>
                <Grid style={{ padding: 10 }} item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <DailyCard weatherInfo={dw} />
                </Grid>
            )}
        </Grid>
    </Fragment>
}

export default DailyCards;