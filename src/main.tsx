import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import './i18n';

import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
