import logo from './logo.svg';
import './App.css';
import { Provider, useSelector } from "react-redux";
import { configureStore } from "./store/index"
import RadioButtons from './components/RadioButtons';

const store = configureStore();

function App() {

  return <Provider store={store}>
    <RadioButtons/>
  </Provider>;
}

export default App;
