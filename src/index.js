import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './modules';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { loadableReady } from '@loadable/component';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, 
  // 브라우저에서 상태를 재사용하기 위해 스토어 생성 과정에서
  window.__PRELOADED_STATE__, // 이 값을 초기 상태로 사용함
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));

// loadableReady
// 환경을 확인하여 프로덕션 환경일 때 호출하고 개발 환경일 때는 호출하지 않음
async function render() {
  // 프로덕션 환경에서는 loadableReady를 호출하여 필요한 데이터가 로드될 때까지 대기
  if (process.env.NODE_ENV === 'production') {
    await loadableReady();
  }
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

render();

