(this["webpackJsonpsimple-toast-example"]=this["webpackJsonpsimple-toast-example"]||[]).push([[0],{11:function(e,t,n){e.exports=n(18)},12:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);n(12);var a=n(0),o=n.n(a),r=n(5),s=n.n(r),c=n(9),l=n(3),u={"toast-wrapper":"_Toaster__toast-wrapper__2tzRf",toast:"_Toaster__toast__2oYpK",light:"_Toaster__light__D02k4","toast-btn":"_Toaster__toast-btn__MiV0i",dark:"_Toaster__dark__2nbNP",success:"_Toaster__success__2cyYG",info:"_Toaster__info__3NO6s",danger:"_Toaster__danger__2ke0x",warning:"_Toaster__warning__2yadJ"},m=Object(a.createContext)(),i=Object(a.createContext)();function f(e,t){switch(t.type){case"show":return console.log(t),{messages:[].concat(Object(l.a)(e.messages),[t.toast])};case"remove":var n=e.messages,a=n.filter((function(e){return e.timestamp===t.timestamp})),o=n.filter((function(e){return e.timestamp!==t.timestamp}));if(a.length){var r=a[0];clearTimeout(r.timer())}return{messages:Object(l.a)(o)};default:throw new Error("Unhandled action type: ".concat(t.type))}}function p(e){var t=e.children,n=Object(a.useReducer)(f,{messages:[]}),r=Object(c.a)(n,2),s=r[0],l=r[1];return o.a.createElement(m.Provider,{value:s},o.a.createElement(i.Provider,{value:l},o.a.createElement(h,null,t)))}function _(){var e=Object(a.useContext)(m);if(void 0===e)throw new Error("useToastState must be used within a ToastProvider");return e}function b(){var e=Object(a.useContext)(i);if(void 0===e)throw new Error("useToastDispatch must be used within a ToastProvider");return e}function d(){var e=b();return function(t,n,a,o,r){if(t){var s=Date.now(),c=function(){return setTimeout((function(){e({type:"remove",timestamp:s})}),n||5e3)};e({type:"show",toast:{msg:t,timer:()=>c(),timestamp:s,theme:a,customStyle:r,className:o}}),c()}}}function h(e){var t=e.children,n=_();return console.log(n),Object(a.useEffect)((function(){var e=document.querySelector(".toast-wrapper");e&&e.lastChild&&e.lastChild.scrollIntoView({behavior:"smooth"})}),[n]),o.a.createElement(m.Consumer,null,(function(e){if(void 0===e)throw new Error("ToastConsumer must be used within a ToastProvider");var n=e.messages;return o.a.createElement(i.Consumer,null,(function(e){return o.a.createElement("div",null,t,n.length?o.a.createElement("div",{className:"toast-wrapper ".concat(u["toast-wrapper"])},n.map((function(t){return o.a.createElement("div",{className:"toast ".concat(u.toast).concat(" "+u[t.theme]||!1).concat(" "+t.className||!1),role:"alert",key:"_"+Math.random()*t.timestamp,style:t.customStyle&&t.customStyle.toaster?t.customStyle.toaster:{}},o.a.createElement("span",null,t.msg),o.a.createElement("br",null),o.a.createElement("button",{className:u["toast-btn"],onClick:function(){return e({type:"remove",timestamp:t.timestamp})},style:t.customStyle&&t.customStyle.button?t.customStyle.button:{}},"\xd7"))}))):null)}))}))}n(17);var v,E=n(6),T=n(7),w=n(10),g=n(8),C=function(e){Object(w.a)(n,e);var t=Object(g.a)(n);function n(){return Object(E.a)(this,n),t.apply(this,arguments)}return Object(T.a)(n,[{key:"render",value:function(){var e=this.props.showToast;return o.a.createElement("div",{className:"container"},o.a.createElement("h1",null,"Class Component"),o.a.createElement("br",null),o.a.createElement("button",{className:"btn",onClick:function(){return e("Toast from Class based component")}},"ClassComponent Button"))}}]),n}(o.a.Component),y=(v=C,function(e){var t=d();return o.a.createElement(v,Object.assign({},e,{showToast:t}))}),k=function(){var e=d();return o.a.createElement("div",{className:"container"},o.a.createElement("h1",null,"Functional Component"),o.a.createElement("button",{onClick:function(){return e("Toast from functional component",1e6)},className:"btn"},"Show Toast"),o.a.createElement("button",{onClick:function(){return e("Toast from functional component",1e6,"dark")},className:"btn dark"},"Dark Theme"),o.a.createElement("button",{onClick:function(){return e("Toast from functional component",1e6,"success")},className:"btn success"},"Success Theme"),o.a.createElement("button",{onClick:function(){return e("Toast from functional component",1e6,"danger")},className:"btn danger"},"Danger Theme"),o.a.createElement("button",{onClick:function(){return e("Toast from functional component",1e6,"warning")},className:"btn warning"},"Warning Theme"),o.a.createElement("button",{onClick:function(){return e("Toast from functional component",1e6,"info")},className:"btn info"},"Info Theme"))},N=function(){return o.a.createElement(p,null,o.a.createElement("div",{className:"App"},o.a.createElement(k,null),o.a.createElement(y,null)))};s.a.render(o.a.createElement(N,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.6010e0ad.chunk.js.map