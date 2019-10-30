!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.gtjsbridge=t():e.gtjsbridge=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e){return isNaN(e.x)||isNaN(e.y)?0:Math.sqrt(e.x*e.x+e.y*e.y)}function c(e,t){let n=function(e,t){const n=o(e)*o(t);if(0===n)return 0;let c=function(e,t){return e.x*t.x+e.y*t.y}(e,t)/n;return c>1&&(c=1),Math.acos(c)}(e,t);return function(e,t){return e.x*t.y-t.x*e.y}(e,t)>0&&(n*=-1),180*n/Math.PI}function i(e){e.config={preV:{x:null,y:null},pinchStartLen:null,scale:1,isDoubleTap:!1,touchStart(){},touchMove(){},touchEnd(){},touchCancel(){},tap(){},singleTap(){},longTap(){},doubleTap(){},pressMove(){},multipointStart(){},multipointEnd(){},swipe(){},pinch(){},rotate(){},delta:null,last:null,now:null,tapTimeout:null,touchTimeout:null,longTapTimeout:null,swipeTimeout:null,x1:null,x2:null,y1:null,y2:null,preTapPosition:{x:null,y:null}},e.start=function(t){if(!t.touches)return;t.preventDefault(),e.config.now=Date.now(),e.config.x1=t.touches[0].pageX,e.config.y1=t.touches[0].pageY,e.config.delta=e.config.now-(e.config.last||e.config.now),e.config.touchStart(t),null!==e.config.preTapPosition.x&&(e.config.isDoubleTap=e.config.delta>0&&e.config.delta<=250&&Math.abs(e.config.preTapPosition.x-e.config.x1)<30&&Math.abs(e.config.preTapPosition.y-e.config.y1)<30),e.config.preTapPosition.x=e.config.x1,e.config.preTapPosition.y=e.config.y1,e.config.last=e.config.now;const{preV:n}=e.config;if(t.touches.length>1){e._cancelLongTap();const c={x:t.touches[1].pageX-e.config.x1,y:t.touches[1].pageY-e.config.y1};n.x=c.x,n.y=c.y,e.config.pinchStartLen=o(n),e.config.multipointStart(t)}e.config.longTapTimeout=setTimeout(()=>{e.config.longTap(t)},750)},e.move=function(t){if(!t.touches)return;t.preventDefault();const{preV:n}=e.config,i=t.touches.length,a=t.touches[0].pageX,u=t.touches[0].pageY;if(e.config.isDoubleTap=!1,i>1){const i={x:t.touches[1].pageX-a,y:t.touches[1].pageY-u};null!==n.x&&(e.config.pinchStartLen>0&&(t.scale=o(i)/e.config.pinchStartLen,e.config.pinch(t)),t.angle=c(i,n),e.config.rotate(t)),n.x=i.x,n.y=i.y}else null!==e.config.x2?(t.deltaX=a-e.config.x2,t.deltaY=u-e.config.y2):(t.deltaX=0,t.deltaY=0),e.config.pressMove(t);e.config.touchMove(t),e._cancelLongTap(),e.config.x2=a,e.config.y2=u,t.touches.length>1&&(e._cancelLongTap(),t.preventDefault())},e.end=function(t){t.touches&&(t.preventDefault(),e._cancelLongTap(),t.touches.length<2&&e.config.multipointEnd(t),e.config.touchEnd(t),e.config.x2&&Math.abs(e.config.x1-e.config.x2)>30||e.config.y2&&Math.abs(e.config.preV.y-e.config.y2)>30?(t.direction=e._swipeDirection(e.config.x1,e.config.x2,e.config.y1,e.config.y2),e.config.swipeTimeout=setTimeout(()=>{e.config.swipe(t)},0)):e.config.tapTimeout=setTimeout(()=>{e.config.tap(t),e.config.isDoubleTap?(e.config.doubleTap(t),clearTimeout(e.config.touchTimeout),e.config.isDoubleTap=!1):e.config.touchTimeout=setTimeout(()=>{e.config.singleTap(t)},250)},0),e.config.preV.x=0,e.config.preV.y=0,e.config.scale=1,e.config.pinchStartLen=null,e.config.x1=e.config.x2=e.config.y1=e.config.y2=null)},e.cancel=function(t){clearTimeout(e.config.touchTimeout),clearTimeout(e.config.tapTimeout),clearTimeout(e.config.longTapTimeout),clearTimeout(e.config.swipeTimeout),e.config.touchCancel(t)},e._cancelLongTap=function(t){clearTimeout(e.config.longTapTimeout)},e._swipeDirection=function(e,t,n,o){return Math.abs(e-t)>=Math.abs(n-o)?e-t>0?"Left":"Right":n-o>0?"Up":"Down"}}n.r(t);const a={install:function(e,t){e.directive("tap",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.tap=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}}),e.directive("singleTap",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.singleTap=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}}),e.directive("longTap",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.longTap=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}}),e.directive("doubleTap",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.doubleTap=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}}),e.directive("pressMove",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.pressMove=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}}),e.directive("multipointStart",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.multipointStart=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}}),e.directive("multipointEnd",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.multipointEnd=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}}),e.directive("swipe",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.swipe=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}}),e.directive("pinch",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.pinch=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}}),e.directive("rotate",{bind(e,t,n,o){const c=t.value.arg||{};c.el=e;const a={};i(a),a.config.pinch=function(e){t.value.methods.call(t.value.methods,e,c)},e.addEventListener("touchstart",a.start,!1),e.addEventListener("touchmove",a.move,!1),e.addEventListener("touchend",a.end,!1),e.addEventListener("touchcancel",a.cancel,!1)}})}};t.default=a}])});