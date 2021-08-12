import logo from './logo.svg';
import './App.css';
import { Provider, useSelector } from "react-redux";
import { configureStore } from "./store/index"
import RadioButtons from './components/RadioButtons';
import DailyCard from './components/DailyCard';
import DailyCards from './components/DailyCards';
import BarCharts from './components/BarCharts';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Dashboard from './components/Dashboard';

const store = configureStore();
const theme = {
  palette: {
    primary: { main: "#ff4800" }, 
    secondary: { main: '#ff4800' }, 
  },
};
const muiTheme = createTheme(theme);
function App() {

  return <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <Dashboard/>
    </ThemeProvider>
  </Provider>;
}

export default App;
