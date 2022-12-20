import ReactDOMServer from "react-dom/server";

const html = ReactDOMServer.rendeerToString(
    <div>Hello Server Side Rendering!</div>
);

console.log(html);