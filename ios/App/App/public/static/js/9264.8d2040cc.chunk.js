"use strict";(self.webpackChunkremembrance=self.webpackChunkremembrance||[]).push([[9264],{9264:function(e,t,n){n.r(t),n.d(t,{startTapClick:function(){return o}});var i=n(3652),o=function(e){var t,n,o,l,v=10*-f,p=0,m=e.getBoolean("animated",!0)&&e.getBoolean("rippleEffect",!0),L=new WeakMap,h=function(e){v=(0,i.o)(e),b(e)},E=function(){clearTimeout(l),l=void 0,n&&(S(!1),n=void 0)},w=function(e){n||void 0!==t&&null!==t.parentElement||(t=void 0,g(a(e),e))},b=function(e){g(void 0,e)},g=function(e,t){if(!e||e!==n){clearTimeout(l),l=void 0;var o=(0,i.p)(t),a=o.x,c=o.y;if(n){if(L.has(n))throw new Error("internal error");n.classList.contains(s)||k(n,a,c),S(!0)}if(e){var d=L.get(e);d&&(clearTimeout(d),L.delete(e));var f=r(e)?0:u;e.classList.remove(s),l=setTimeout((function(){k(e,a,c),l=void 0}),f)}n=e}},k=function(e,t,n){p=Date.now(),e.classList.add(s);var i=m&&c(e);i&&i.addRipple&&(T(),o=i.addRipple(t,n))},T=function(){void 0!==o&&(o.then((function(e){return e()})),o=void 0)},S=function(e){T();var t=n;if(t){var i=d-Date.now()+p;if(e&&i>0&&!r(t)){var o=setTimeout((function(){t.classList.remove(s),L.delete(t)}),d);L.set(t,o)}else t.classList.remove(s)}},C=document;C.addEventListener("ionScrollStart",(function(e){t=e.target,E()})),C.addEventListener("ionScrollEnd",(function(){t=void 0})),C.addEventListener("ionGestureCaptured",E),C.addEventListener("touchstart",(function(e){v=(0,i.o)(e),w(e)}),!0),C.addEventListener("touchcancel",h,!0),C.addEventListener("touchend",h,!0),C.addEventListener("mousedown",(function(e){var t=(0,i.o)(e)-f;v<t&&w(e)}),!0),C.addEventListener("mouseup",(function(e){var t=(0,i.o)(e)-f;v<t&&b(e)}),!0)},a=function(e){if(!e.composedPath)return e.target.closest(".ion-activatable");for(var t=e.composedPath(),n=0;n<t.length-2;n++){var i=t[n];if(i.classList&&i.classList.contains("ion-activatable"))return i}},r=function(e){return e.classList.contains("ion-activatable-instant")},c=function(e){if(e.shadowRoot){var t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")},s="ion-activated",u=200,d=200,f=2500}}]);
//# sourceMappingURL=9264.8d2040cc.chunk.js.map