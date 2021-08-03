import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setUnit } from "../action/ui";

const RadioButtons = () => {
    const dispatch = useDispatch();
    const unit = useSelector(state => state.ui.unit, shallowEqual);
    return <RadioGroup
        style={{justifyContent:"space-around", margin:"20px 0px 20px 0px"}}
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