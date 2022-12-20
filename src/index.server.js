import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

const app = express();

// 서버 사이드 렌더리을 처리할 핸들러 함수
const serverRender = (req, res, next) => {
    // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해줌
    
    const context = {};
    const jsx = (
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );
    const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고
    res.send(root); // 클라이언트에게 결과물을 응답
};

app.use(serverRender);

// 5002 포트로 서버 가동
app.listen(5002, () => {
    console.log('Running on http://localhost:5002');
});