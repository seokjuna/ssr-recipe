import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom/server";

import App from "./App";
import path from "path";
import fs from "fs";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import PreloadContext from "./lib/PreloadContext";

// asset-manifest.json에서 파일 경로들을 조회함
const manifest = JSON.parse(
    fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
);

function createPage(root, stateScript) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,shrink-to-fit=no"
            />
            <meta name="theme-color" content="#000000" />
            <title>React App</title>           
            <link href="${manifest.files['main.css']}" rel="stylesheet" />
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">${root}</div>
            ${stateScript}
            <script src="${manifest.files['main.js']}"></script>
        </body>
    </html>
    `;
} 

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수
const serverRender = async (req, res, next) => {
    // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해줌
    
    const context = {};
    // 리덕스 설정
    const store = createStore(rootReducer, applyMiddleware(thunk));
    // PreloadContext를 사용하여 프로미스들을 수집하고 기다렸다가 다시 렌더링하는 작업
    const preloadContext = {
        done: false,
        Promises: []
    };
    const jsx = (
        <PreloadContext.Provider value={preloadContext}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        </PreloadContext.Provider>
    );

    ReactDOMServer.renderToStaticMarkup(jsx); // renderToStaticMarkup으로 한번 렌더링 (정적 페이지)
    try {
        await Promise.all(preloadContext.Promises); // 모든 프로미스를 기다림
    } catch (e) {
        return res.status(500);
    }
    preloadContext.done = true;
    const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
    const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const stateScript = `<script>__PRELOAD_STATE__=${stateString}</script>`; // 리덕스 초기 상태를 스크립트로 주입
    res.send(createPage(root, stateScript)); // 클라이언트에게 결과물을 응답
};

const serve = express.static(path.resolve('./build'), {
    index: false // "/" 경로에서 index.html을 보여 주지 않도록 설정
});

app.use(serve); // 순서 중요. serverRender 전에 위치
app.use(serverRender);

// 5002 포트로 서버 가동
app.listen(5002, () => {
    console.log('Running on http://localhost:5002');
});