import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App.js';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import GapMinderDataContext from './context/GapminderDataContext.js';
import { getFinalGapminderData } from './data/gapminder/newData/newData_functions.js';

ReactDOM.render(<GapMinderDataContext.Provider value={getFinalGapminderData()}><App /></GapMinderDataContext.Provider>, document.getElementById('root'));
serviceWorker.unregister();
