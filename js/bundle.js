!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const o={pencil:n(1)};new function(e,t,n,i){this.canvas={},this.canvas.initCanvas=(()=>{const i=document.createElement("div");i.setAttribute("class","row"),i.setAttribute("id","rowA");const r=document.createElement("div");r.setAttribute("class","row"),r.setAttribute("id","rowB"),r.style.position="absolute";const s=document.getElementById(e);s.appendChild(i),s.appendChild(r);const c=document.createElement("div");c.setAttribute("id","letse-canvas-maintoolbar-container"),c.style.width=`${n+50}px`,c.style.height="50px",c.style.border="1px solid rgb(0, 0, 0)",i.appendChild(c);const l=document.createElement("div");l.setAttribute("id","letse-canvas-container"),l.style.cssFloat="left",r.appendChild(l);const a=document.createElement("canvas");a.setAttribute("height",t),a.setAttribute("width",n),a.setAttribute("id","letse-canvas"),a.style.border="1px solid #000",l.appendChild(a);const d=document.createElement("div");d.setAttribute("id","letse-canvas-secondtoolbar-container"),d.style.height=`${t}px`,d.style.width="50px",d.style.border="1px solid rgb(0, 0, 0)",d.style.cssFloat="right",r.appendChild(d);for(let e=0;e<o.length;e++){const t=document.createElement("div");t.setAttribute("id",o[e].options.name),t.style.backgroundImage=o[e].options.icon,d.appendChild(t)}})()}("letse-canvas-container",300,300)},function(e,t){e.exports.pencil=function(){this.options={name:"pencil",enable:!0,event:"click",icon:"/assets/images/pencil-icon.png"}}()}]);