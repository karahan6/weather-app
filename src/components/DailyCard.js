import { Card, CardContent } from '@material-ui/core';
import { Fragment } from 'react-is';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../action/ui";

const DailyCard = (props) => {
    const dispatch = useDispatch();
    const date = useSelector(state => state.ui.date, shallowEqual);
    const { weatherInfo } = props;
    return <Fragment>
        <Card variant="outlined" style={date == weatherInfo.date ? { cursor: "pointer", backgroundColor: "#efb59e" } : { cursor: "pointer" }} onClick={() => dispatch(setSelectedDate(weatherInfo.date))}>
            <CardContent>
                <div ><span style={{ fontWeight: 600, fontSize: 22 }}>{weatherInfo.temp_max}</span>{"/" + weatherInfo.temp_min}</div>
                <div >{"Temp: " + weatherInfo.avg_temp}</div>
                <div >{"Date: " + weatherInfo.date}</div>
            </CardContent>
        </Card>
    </Fragment>
}

export default DailyCard;