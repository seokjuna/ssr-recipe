(()=>{"use strict";var e={n:n=>{var t=n&&n.__esModule?()=>n.default:()=>n;return e.d(t,{a:t}),t},d:(n,t)=>{for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n)};const n=require("react-dom/server");var t=e.n(n);const r=require("express");var i=e.n(r);const s=require("react-router-dom/server"),o=require("react-router-dom"),c=require("react/jsx-runtime"),l=function(){return(0,c.jsxs)("ul",{children:[(0,c.jsx)("li",{children:(0,c.jsx)(o.Link,{to:"/red",children:"Red"})}),(0,c.jsx)("li",{children:(0,c.jsx)(o.Link,{to:"/blue",children:"Blue"})})]})},a=function(){return(0,c.jsx)("div",{className:"Blue",children:"Blue"})},u=function(){return(0,c.jsx)(a,{})},d=function(){return(0,c.jsx)("div",{className:"Red",children:"Red"})},h=function(){return(0,c.jsx)(d,{})},j=function(){return(0,c.jsxs)("div",{children:[(0,c.jsx)(l,{}),(0,c.jsx)("hr",{}),(0,c.jsxs)(o.Routes,{children:[(0,c.jsx)(o.Route,{path:"/red",element:(0,c.jsx)(h,{})}),(0,c.jsx)(o.Route,{path:"/blue",element:(0,c.jsx)(u,{})})]})]})},x=require("path");var f=e.n(x);const m=require("fs");var v=e.n(m),p=JSON.parse(v().readFileSync(f().resolve("./build/asset-manifest.json"),"utf8")),b=i()(),R=i().static(f().resolve("./build"),{index:!1});b.use(R),b.use((function(e,n,r){var i=(0,c.jsx)(s.StaticRouter,{location:e.url,context:{},children:(0,c.jsx)(j,{})}),o=t().renderToString(i);n.send(function(e){return'<!DOCTYPE html>\n    <html lang="en">\n        <head>\n            <meta charset="utf-8" />\n            <link rel="shortcut icon" href="/favicon.ico" />\n            <meta\n                name="viewport"\n                content="width=device-width,initial-scale=1,shrink-to-fit=no"\n            />\n            <meta name="theme-color" content="#000000" />\n            <title>React App</title>           \n            <link href="'.concat(p.files["main.css"],'" rel="stylesheet" />\n        </head>\n        <body>\n            <noscript>You need to enable JavaScript to run this app.</noscript>\n            <div id="root">').concat(e,'</div>\n            <script src="').concat(p.files["main.js"],'"><\/script>\n        </body>\n    </html>\n    ')}(o))})),b.listen(5002,(function(){console.log("Running on http://localhost:5002")}))})();