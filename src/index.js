import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './modules';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(
  rootReducer, 
  // 브라우저에서 상태를 재사용하기 위해 스토어 생성 과정에서
  window.__PRELOADED__STATE__, // 이 값을 초기 상태로 사용함
  applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

