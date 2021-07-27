import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import reducers from './store/reducers';
import * as serviceWorker from './serviceWorker';
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render((
  <BrowserRouter>
    <Provider store={store}> <App/></Provider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
