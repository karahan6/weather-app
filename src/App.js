import logo from './logo.svg';
import './App.css';
import { Provider, useSelector } from "react-redux";
import { configureStore } from "./store/index"
import RadioButtons from './components/RadioButtons';
import PrevNext from './components/PrevNext';
import DailyCard from './components/DailyCard';
import DailyCards from './components/DailyCards';
import BarCharts from './components/BarCharts';

const store = configureStore();

function App() {

  return <Provider store={store}>
    <RadioButtons/>
    <PrevNext/>
    <DailyCards/>
    <BarCharts/>
  </Provider>;
}

export default App;
