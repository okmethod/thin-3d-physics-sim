var t=Object.defineProperty,n=(n,e,o)=>((n,e,o)=>e in n?t(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o)(n,"symbol"!=typeof e?e+"":e,o);function e(){}const o=t=>t;function r(t,n){for(const e in n)t[e]=n[e];return t}function i(t){return t()}function s(){return Object.create(null)}function c(t){t.forEach(i)}function a(t){return"function"==typeof t}function l(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}let u;function f(t,n){return t===n||(u||(u=document.createElement("a")),u.href=n,t===u.href)}function h(t){return 0===Object.keys(t).length}function d(t,...n){if(null==t){for(const t of n)t(void 0);return e}const o=t.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function _(t){let n;return d(t,(t=>n=t))(),n}function m(t,n,e){t.$$.on_destroy.push(d(n,e))}function p(t,n,e,o){if(t){const r=g(t,n,e,o);return t[0](r)}}function g(t,n,e,o){return t[1]&&o?r(e.ctx.slice(),t[1](o(n))):e.ctx}function b(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(void 0===n.dirty)return r;if("object"==typeof r){const t=[],e=Math.max(n.dirty.length,r.length);for(let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t}return n.dirty|r}return n.dirty}function y(t,n,e,o,r,i){if(r){const s=g(n,e,o,i);t.p(s,r)}}function v(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let t=0;t<e;t++)n[t]=-1;return n}return-1}function x(t){const n={};for(const e in t)"$"!==e[0]&&(n[e]=t[e]);return n}function E(t,n){const e={};n=new Set(n);for(const o in t)n.has(o)||"$"===o[0]||(e[o]=t[o]);return e}function N(t){const n={};for(const e in t)n[e]=!0;return n}function $(t){return t&&a(t.destroy)?t.destroy:e}function w(t){const n="string"==typeof t&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return n?[parseFloat(n[1]),n[2]||"px"]:[t,"px"]}let T=!1;function A(){T=!0}function D(){T=!1}function L(t,n,e,o){for(;t<n;){const r=t+(n-t>>1);e(r)<=o?t=r+1:n=r}return t}function P(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n&&n.host?n:t.ownerDocument}function S(t){const n=B("style");return n.textContent="/* empty */",function(t,n){(function(t,n){t.appendChild(n)})(t.head||t,n),n.sheet}(P(t),n),n.sheet}function C(t,n){if(T){for(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if("HEAD"===t.nodeName){const t=[];for(let e=0;e<n.length;e++){const o=n[e];void 0!==o.claim_order&&t.push(o)}n=t}const e=new Int32Array(n.length+1),o=new Int32Array(n.length);e[0]=-1;let r=0;for(let a=0;a<n.length;a++){const t=n[a].claim_order,i=(r>0&&n[e[r]].claim_order<=t?r+1:L(1,r,(t=>n[e[t]].claim_order),t))-1;o[a]=e[i]+1;const s=i+1;e[s]=a,r=Math.max(s,r)}const i=[],s=[];let c=n.length-1;for(let a=e[r]+1;0!=a;a=o[a-1]){for(i.push(n[a-1]);c>=a;c--)s.push(n[c]);c--}for(;c>=0;c--)s.push(n[c]);i.reverse(),s.sort(((t,n)=>t.claim_order-n.claim_order));for(let a=0,l=0;a<s.length;a++){for(;l<i.length&&s[a].claim_order>=i[l].claim_order;)l++;const n=l<i.length?i[l]:null;t.insertBefore(s[a],n)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);null!==t.actual_end_child&&void 0===t.actual_end_child.claim_order;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?void 0===n.claim_order&&n.parentNode===t||t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else n.parentNode===t&&null===n.nextSibling||t.appendChild(n)}function M(t,n,e){t.insertBefore(n,e||null)}function H(t,n,e){T&&!e?C(t,n):n.parentNode===t&&n.nextSibling==e||t.insertBefore(n,e||null)}function O(t){t.parentNode&&t.parentNode.removeChild(t)}function j(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function B(t){return document.createElement(t)}function R(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function F(){return k(" ")}function G(){return k("")}function I(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function z(t){return function(n){return n.preventDefault(),t.call(this,n)}}function W(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}const q=["width","height"];function J(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const o in n)null==n[o]?t.removeAttribute(o):"style"===o?t.style.cssText=n[o]:"__value"===o?t.value=t[o]=n[o]:e[o]&&e[o].set&&-1===q.indexOf(o)?t[o]=n[o]:W(t,o,n[o])}function K(t,n){for(const e in n)W(t,e,n[e])}function Q(t){return t.dataset.svelteH}function U(t){return Array.from(t.childNodes)}function V(t){void 0===t.claim_info&&(t.claim_info={last_index:0,total_claimed:0})}function X(t,n,e,o,r=!1){V(t);const i=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const i=t[o];if(n(i)){const n=e(i);return void 0===n?t.splice(o,1):t[o]=n,r||(t.claim_info.last_index=o),i}}for(let o=t.claim_info.last_index-1;o>=0;o--){const i=t[o];if(n(i)){const n=e(i);return void 0===n?t.splice(o,1):t[o]=n,r?void 0===n&&t.claim_info.last_index--:t.claim_info.last_index=o,i}}return o()})();return i.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,i}function Y(t,n,e,o){return X(t,(t=>t.nodeName===n),(t=>{const n=[];for(let o=0;o<t.attributes.length;o++){const r=t.attributes[o];e[r.name]||n.push(r.name)}n.forEach((n=>t.removeAttribute(n)))}),(()=>o(n)))}function Z(t,n,e){return Y(t,n,e,B)}function tt(t,n,e){return Y(t,n,e,R)}function nt(t,n){return X(t,(t=>3===t.nodeType),(t=>{const e=""+n;if(t.data.startsWith(e)){if(t.data.length!==e.length)return t.splitText(e.length)}else t.data=e}),(()=>k(n)),!0)}function et(t){return nt(t," ")}function ot(t,n,e){for(let o=e;o<t.length;o+=1){const e=t[o];if(8===e.nodeType&&e.textContent.trim()===n)return o}return-1}function rt(t,n){const e=ot(t,"HTML_TAG_START",0),o=ot(t,"HTML_TAG_END",e+1);if(-1===e||-1===o)return new ht(n);V(t);const r=t.splice(e,o-e+1);O(r[0]),O(r[r.length-1]);const i=r.slice(1,r.length-1);if(0===i.length)return new ht(n);for(const s of i)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new ht(n,i)}function it(t,n){n=""+n,t.data!==n&&(t.data=n)}function st(t,n){t.value=null==n?"":n}function ct(t,n,e,o){null==e?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function at(t,n,e){t.classList.toggle(n,!!e)}function lt(t,n,{bubbles:e=!1,cancelable:o=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:o})}function ut(t,n){const e=[];let o=0;for(const r of n.childNodes)if(8===r.nodeType){const n=r.textContent.trim();n===`HEAD_${t}_END`?(o-=1,e.push(r)):n===`HEAD_${t}_START`&&(o+=1,e.push(r))}else o>0&&e.push(r);return e}class ft{constructor(t=!1){n(this,"is_svg",!1),n(this,"e"),n(this,"n"),n(this,"t"),n(this,"a"),this.is_svg=t,this.e=this.n=null}c(t){this.h(t)}m(t,n,e=null){this.e||(this.is_svg?this.e=R(n.nodeName):this.e=B(11===n.nodeType?"TEMPLATE":n.nodeName),this.t="TEMPLATE"!==n.tagName?n:n.content,this.c(t)),this.i(e)}h(t){this.e.innerHTML=t,this.n=Array.from("TEMPLATE"===this.e.nodeName?this.e.content.childNodes:this.e.childNodes)}i(t){for(let n=0;n<this.n.length;n+=1)M(this.t,this.n[n],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(O)}}class ht extends ft{constructor(t=!1,e){super(t),n(this,"l"),this.e=this.n=null,this.l=e}c(t){this.l?this.n=this.l:super.c(t)}i(t){for(let n=0;n<this.n.length;n+=1)H(this.t,this.n[n],t)}}function dt(t,n){return new t(n)}let _t;function mt(t){_t=t}function pt(){if(!_t)throw new Error("Function called outside component initialization");return _t}function gt(t){pt().$$.on_mount.push(t)}function bt(t){pt().$$.after_update.push(t)}function yt(t){pt().$$.on_destroy.push(t)}function vt(){const t=pt();return(n,e,{cancelable:o=!1}={})=>{const r=t.$$.callbacks[n];if(r){const i=lt(n,e,{cancelable:o});return r.slice().forEach((n=>{n.call(t,i)})),!i.defaultPrevented}return!0}}function xt(t,n){return pt().$$.context.set(t,n),n}function Et(t){return pt().$$.context.get(t)}function Nt(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach((t=>t.call(this,n)))}const $t=[],wt=[];let Tt=[];const At=[],Dt=Promise.resolve();let Lt=!1;function Pt(){Lt||(Lt=!0,Dt.then(jt))}function St(){return Pt(),Dt}function Ct(t){Tt.push(t)}function Mt(t){At.push(t)}const Ht=new Set;let Ot=0;function jt(){if(0!==Ot)return;const t=_t;do{try{for(;Ot<$t.length;){const t=$t[Ot];Ot++,mt(t),Bt(t.$$)}}catch(n){throw $t.length=0,Ot=0,n}for(mt(null),$t.length=0,Ot=0;wt.length;)wt.pop()();for(let t=0;t<Tt.length;t+=1){const n=Tt[t];Ht.has(n)||(Ht.add(n),n())}Tt.length=0}while($t.length);for(;At.length;)At.pop()();Lt=!1,Ht.clear(),mt(t)}function Bt(t){if(null!==t.fragment){t.update(),c(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(Ct)}}function Rt(t){const n=[],e=[];Tt.forEach((o=>-1===t.indexOf(o)?n.push(o):e.push(o))),e.forEach((t=>t())),Tt=n}export{s as $,j as A,z as B,a as C,_ as D,r as E,x as F,J as G,R as H,ht as I,tt as J,rt as K,K as L,vt as M,at as N,E as O,N as P,p as Q,y as R,v as S,b as T,Nt as U,Mt as V,P as W,S as X,Ct as Y,lt as Z,o as _,F as a,jt as a0,h as a1,Rt as a2,_t as a3,mt as a4,i as a5,$t as a6,Pt as a7,A as a8,D as a9,xt as aa,Et as ab,w as ac,$ as ad,f as ae,st as af,ut as ag,U as b,Z as c,et as d,B as e,O as f,Q as g,W as h,H as i,C as j,wt as k,yt as l,nt as m,e as n,gt as o,I as p,it as q,m as r,l as s,k as t,c as u,G as v,bt as w,ct as x,dt as y,St as z};
