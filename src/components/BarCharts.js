
import { shallowEqual, useSelector } from "react-redux";
import { requestNames } from '../constants/requestUrls';
import { Bar } from 'react-chartjs-2';

const BarCharts = () => {
    const date = useSelector(state => state.ui.date, shallowEqual);
    const dateWeatherInfos = useSelector(state => state.query[requestNames.forecast], shallowEqual);

    const dateWeatherInfo = dateWeatherInfos ? dateWeatherInfos.find(item => item.date == date) : undefined;
    const data = {
        labels: dateWeatherInfo ? dateWeatherInfo.hourly.map(h => new Date(h.dt * 1000).toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute: '2-digit'
        })) : [],
        datasets: [
            {
                label: 'Hourly Temperature - ' + date,
                data: dateWeatherInfo ? dateWeatherInfo.hourly.map(h => h.temp) : [],
                backgroundColor: '#ff4800',
            }
        ],
    };

    return <div style={{ padding: 40 }}>
        {date ? <Bar style={{ margin: 20 }} data={data} /> :
            <div style={{ textAlign: "center" }}>Please select a date to see hourly temperature</div>}
    </div>
}

export default BarCharts;