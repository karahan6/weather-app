import { Card, CardContent, FormLabel, FormControl } from '@material-ui/core';
import { Forward } from '@material-ui/icons';
import { Fragment } from 'react-is';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setSelectedDate, setUnit } from "../action/ui";

const DailyCard = (props) => {
    const dispatch = useDispatch();
    const unit = useSelector(state => state.ui.unit, shallowEqual);
    const {weatherInfo} = props;
    return <Fragment
    >
        <Card variant="outlined" onClick={()=>dispatch(setSelectedDate(weatherInfo.date))}>
            <CardContent>
                    <div ><span style={{fontWeight: 600, fontSize:22}}>{weatherInfo.temp_max}</span>{"/" + weatherInfo.temp_min}</div>
                    
                    <div >{"Temp: " + weatherInfo.avg_temp}</div>
                    
                    <div >{"Date: " + weatherInfo.date}</div>
                    
            </CardContent>
        </Card>
    </Fragment>
}

export default DailyCard;