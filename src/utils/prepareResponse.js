export const prepareForecastList = (data) => {
    let dateWeatherInfos = [];
    data.list.forEach(item => {
        let relatedDateInfo = dateWeatherInfos.find(info => info.date == new Date(item.dt * 1000).toLocaleDateString());
        if (relatedDateInfo == undefined) {
            let dateWeatherInfo = {

                date: new Date(item.dt * 1000).toLocaleDateString(),
                temp_min: item.main.temp_min,
                temp_max: item.main.temp_max,
                avg_temp: item.main.temp,
                hourly: [{...item.main, dt:item.dt}]
            }
            dateWeatherInfos.push(dateWeatherInfo);
        }
        else {
            if (relatedDateInfo.temp_min > item.main.temp_min)
                relatedDateInfo.temp_min = item.main.temp_min;
            if (relatedDateInfo.temp_max < item.main.temp_max)
                relatedDateInfo.temp_max = item.main.temp_max;
            
            relatedDateInfo.avg_temp += item.main.temp;
            relatedDateInfo.hourly.push({...item.main, dt:item.dt}); 
        }
    });
    dateWeatherInfos.forEach(item => {
        item.avg_temp = (item.avg_temp/item.hourly.length).toFixed(2);
    });
    return dateWeatherInfos;
}