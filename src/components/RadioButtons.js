import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useSelector } from "react-redux";

const RadioButtons = () => {
    const counter = useSelector(state => state.query.test);
    return <RadioGroup
        row
        aria-label="metric"
        name="metric"
        defaultValue="celciues">
        <FormControlLabel value="celciues" control={<Radio color="primary" />} label="Celciues" />
        <FormControlLabel value="fahrenheit" control={<Radio color="primary" />} label="Fahrenheit" />
    </RadioGroup>
}

export default RadioButtons;