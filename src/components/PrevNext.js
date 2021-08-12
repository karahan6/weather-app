import { Forward } from '@material-ui/icons';
import { Fragment } from 'react-is';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setUnit } from "../action/ui";

const PrevNext = () => {
    const dispatch = useDispatch();
    const unit = useSelector(state => state.ui.unit, shallowEqual);
    return <Fragment
    >
        <ul className="ulIconGruop">
            <Forward className="rotate180 prevNextIcon"  />
            <Forward className="prevNextIcon" />
        </ul>
    </Fragment>
}

export default PrevNext;