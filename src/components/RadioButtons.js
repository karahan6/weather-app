import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getQuery } from "../action/query";
import { setUnit } from "../action/ui";
import { APP_ID, FORECAST_COUNT, LOCATION } from "../constants";
import { requestNames } from "../constants/requestUrls";
import QueryInputBuilder from "../model/QueryInput";
import QueryTypeEnum from "../model/QueryTypeEnum";
import { prepareForecastList } from "../utils/prepareResponse";

const RadioButtons = () => {
    const dispatch = useDispatch();
    const unit = useSelector(state => state.ui.unit, shallowEqual);
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
    }, [unit])
    return <RadioGroup
        style={{ justifyContent: "space-around", margin: "20px 0px 20px 0px" }}
        row
        aria-label="unit"
        name="unit"
        value={unit}
        onChange={(event) => {
            dispatch(setUnit(event.target.value));
        }
        }>
        <FormControlLabel value="metric" control={<Radio color="primary" />} label="Celciues" />
        <FormControlLabel value="imperial" control={<Radio color="primary" />} label="Fahrenheit" />
    </RadioGroup>
}

export default RadioButtons;