!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}n.r(t);var a=[],i=function(){function e(t,n,o,a,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.x=t,this.y=n,this.width=o,this.height=a,this.style=i}var t,n,a;return t=e,(n=[{key:"mouseInShape",value:function(e,t){return this.x<=e&&this.x+this.width>=e&&this.y<=t&&this.y+this.height>=t}}])&&o(t.prototype,n),a&&o(t,a),e}();function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var s=function(){function e(t,n,o){var i=this,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.editorContainerID=t,this.height=n,this.width=o,this.options=r,this.plugins=s,this.activeTool=void 0,this.valid=!1,this.elements=a,this.dragging=!1,this.selection=null,this.dragoffx=0,this.dragoffy=0;var u={};u.container=document.getElementById(this.editorContainerID),u.canvas=document.createElement("canvas"),u.rowA=document.createElement("div"),u.rowA.setAttribute("class","row"),u.rowA.setAttribute("id","rowA"),u.rowB=document.createElement("div"),u.rowB.setAttribute("class","row"),u.rowB.setAttribute("id","rowB"),u.container.appendChild(u.rowA),u.container.appendChild(u.rowB),u.mainToolbar=document.createElement("div"),u.mainToolbar.setAttribute("id","letse-canvas-maintoolbar-container"),u.mainToolbar.setAttribute("class","letse-maintoolbar"),u.mainToolbar.style.width="".concat(this.width+50,"px"),u.rowA.appendChild(u.mainToolbar),u.canvasContainer=document.createElement("div"),u.canvasContainer.setAttribute("id","letse-canvas-container"),u.rowB.appendChild(u.canvasContainer),u.canvas.setAttribute("height",this.height),u.canvas.setAttribute("width",this.width),u.canvas.setAttribute("id","letse-canvas"),u.canvas.ctx=u.canvas.getContext("2d"),u.canvasContainer.appendChild(u.canvas),u.secondToolbar=document.createElement("div"),u.secondToolbar.setAttribute("id","letse-canvas-secondtoolbar-container"),u.secondToolbar.setAttribute("class","letse-secondtoolbar"),u.secondToolbar.style.height="".concat(this.height,"px"),u.rowB.appendChild(u.secondToolbar),u.upperCanvas=document.createElement("canvas"),u.canvasContainer.appendChild(u.upperCanvas),u.upperCanvas.setAttribute("height",this.height),u.upperCanvas.setAttribute("width",this.width),u.upperCanvas.setAttribute("id","letse-upper-canvas"),u.upperCanvas.ctx=u.upperCanvas.getContext("2d"),u.upperCanvas.addEventListener("mousedown",function(t){var n=e.checkMousePosition(t,i.canvas),o={positionX:n.x,positionY:n.y};i.elements.forEach(function(e){if(e.mouseInShape(o.positionX,o.positionY)){i.dragoffx=o.positionX-e.x,i.dragoffy=o.positionY-e.y,i.dragging=!0,i.selection=e;var t=i.selection;return i.valid=!1,i.canvas.upperCanvas.ctx.strokeStyle="#CC0000",i.canvas.upperCanvas.ctx.lineWidth=2,void i.canvas.upperCanvas.ctx.strokeRect(t.x,t.y,t.width,t.height)}})}),u.upperCanvas.addEventListener("mousemove",function(t){if(i.dragging){var n=e.checkMousePosition(t,i.canvas);i.selection.x=n.x-i.dragoffx,i.selection.y=n.y-i.dragoffy,i.valid=!1}}),u.upperCanvas.addEventListener("mouseup",function(e){i.dragging=!1}),this.canvas=u}var t,n,o;return t=e,o=[{key:"checkMousePosition",value:function(e,t){var n=0,o=0,a=document.body.parentNode,i=t.upperCanvas;if(void 0!==i.offsetParent)do{n+=i.offsetLeft,o+=i.offsetTop}while(i=i.offsetParent);i=t.upperCanvas;var r=parseInt(document.defaultView.getComputedStyle(i).paddingLeft,10)||0,s=parseInt(document.defaultView.getComputedStyle(i).paddingTop,10)||0,u=parseInt(document.defaultView.getComputedStyle(i).borderLeftWidth,10)||0,c=parseInt(document.defaultView.getComputedStyle(i).borderTopWidth,10)||0;return n+=r+u+a.offsetLeft,o+=s+c+a.offsetTop,{x:e.pageX-n,y:e.pageY-o}}}],(n=null)&&r(t.prototype,n),o&&r(t,o),e}();function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name="rectangle",this.properties={enable:!0,toolbar:"main",icon:"/assets/images/sweep.png",active:!1,events:{start:"mousedown",end:"mouseup",control:"mousemove"}},this.mouse={x:0,y:0,startX:0,startY:0,width:0,height:0},this.ctx=null,this.started=!1}var t,n,o;return t=e,o=[{key:"canvasUpdate",value:function(e,t,n){e.drawImage(n.upperCanvas,0,0),t.clearRect(0,0,n.upperCanvas.width,n.upperCanvas.height)}}],(n=[{key:"mouseDown",value:function(e){this.started=!0,this.mouse.startX=e.clientX,this.mouse.startY=e.clientY}},{key:"mouseMove",value:function(e,t){this.started&&(this.mouse.x=Math.min(e.screenX,this.mouse.startX),this.mouse.y=Math.min(e.screenY,this.mouse.startY),this.mouse.width=Math.abs(e.screenX-this.mouse.startX),this.mouse.height=Math.abs(e.screenY-this.mouse.startY),this.ctx=t.canvas.getContext("2d"),this.upperCTX=t.upperCanvas.getContext("2d"),this.upperCTX.clearRect(0,0,t.upperCanvas.width,t.upperCanvas.height),this.upperCTX.strokeRect(this.mouse.x,this.mouse.y,this.mouse.width,this.mouse.height))}},{key:"mouseUp",value:function(t,n){if(this.started){this.mouseMove(t,n),this.started=!1,e.canvasUpdate(this.ctx,this.upperCTX,n);var o=new i(this.mouse.x,this.mouse.y,this.mouse.width,this.mouse.height);a.push(o)}}}])&&u(t.prototype,n),o&&u(t,o),e}();function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.plugins=t,this.tools=function(){var e=[];return t.forEach(function(t){"tool"===t.properties.field&&e.push(t)}),e}}var t,n,o;return t=e,(n=[{key:"buildToolbar",value:function(e,t){var n=this;e.plugins.forEach(function(e){var o=document.createElement("div");o.style.backgroundImage='url("'.concat(e.tool.properties.icon,'")'),o.setAttribute("id",e.name),o.setAttribute("class","tool enable unactive"),o.addEventListener("click",function(){return n.toolHandler(e,t)}),"main"===e.tool.properties.toolbar?t.mainToolbar.appendChild(o):"second"===e.tool.properties.toolbar&&t.secondToolbar.appendChild(o)})}},{key:"toolHandler",value:function(e,t){e.tool.properties.active=!0,t.upperCanvas.addEventListener(e.tool.properties.events.start,function(t){e.tool.mouseDown(t)}),t.upperCanvas.addEventListener(e.tool.properties.events.control,function(n){e.tool.mouseMove(n,t)}),t.upperCanvas.addEventListener(e.tool.properties.events.end,function(n){e.tool.mouseUp(n,t)}),this.activeToolName(e.tool.name)}},{key:"activeToolName",value:function(e){this.activeTool=e}}])&&l(t.prototype,n),o&&l(t,o),e}(),p=[{tool:new c}],h=new s("letse-canvas-container",300,300,null,p),v=new d(p);v.buildToolbar(v,h.canvas)}]);
//# sourceMappingURL=bundle.js.map