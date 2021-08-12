import { CircularProgress } from "@material-ui/core";
import { Fragment } from "react";
import { shallowEqual, useSelector } from "react-redux";
import BarCharts from "./BarCharts";
import DailyCards from "./DailyCards";
import RadioButtons from "./RadioButtons";


const Dashboard = () => {
    const spin = useSelector(state => state.ui.spin, shallowEqual);


    return <Fragment>
        {spin && <div className="spinLoading"> <CircularProgress title="Loading"/></div>}
        <RadioButtons />
      <DailyCards />
      <BarCharts />
    </Fragment>
}

export default Dashboard;