import{n as t,e as s}from"../chunks/navigation.client.CUXbZd4l.js";import{s as e,e as a,a as n,c as l,b as i,m as r,f as o,g as c,h,i as u,j as d,n as p,q as f,t as m,d as v,u as g,k as y,v as k,w as S}from"../chunks/scheduler.BPgOSdDr.js";import{S as b,i as x}from"../chunks/index.Ci0jfHND.js";const T=[{title:"simple",action:"navigate",route:"/simple"},{title:"github repository",action:"redirect",route:"https://github.com/okmethod/thin-3d-physics-sim"}];const j=Object.freeze(Object.defineProperty({__proto__:null,load:async function(){function s(s,e){return{navigate:()=>t(e),redirect:()=>window.open(e,"_blank")}[s]||(()=>{})}return{propsArray:T.map((t=>({title:t.title,onClick:s(t.action,t.route)})))}}},Symbol.toStringTag,{value:"Module"}));function E(t,s,e){const a=t.slice();return a[1]=s[e],a}function P(t){let s,e,r,p,f,b,x,T=t[1].title+"";return{c(){s=a("div"),e=a("button"),r=a("span"),p=m(T),f=n(),this.h()},l(t){s=l(t,"DIV",{class:!0});var a=i(s);e=l(a,"BUTTON",{class:!0});var n=i(e);r=l(n,"SPAN",{class:!0});var h=i(r);p=v(h,T),h.forEach(c),n.forEach(c),f=o(a),a.forEach(c),this.h()},h(){h(r,"class","cLinkButtonStyle md:!text-2xl"),h(e,"class","flex items-center"),h(s,"class","")},m(a,n){u(a,s,n),d(s,e),d(e,r),d(r,p),d(s,f),b||(x=g(e,"click",k((function(){S(t[1].onClick)&&t[1].onClick.apply(this,arguments)}))),b=!0)},p(s,e){t=s,1&e&&T!==(T=t[1].title+"")&&y(p,T)},d(t){t&&c(s),b=!1,x()}}}function _(t){let e,m,v,g,y='<h1 class="cTitleStyle md:!text-3xl">Three.js without Physics Sim</h1>',k=s(t[0].propsArray),S=[];for(let s=0;s<k.length;s+=1)S[s]=P(E(t,k,s));return{c(){e=a("div"),m=a("div"),m.innerHTML=y,v=n(),g=a("div");for(let t=0;t<S.length;t+=1)S[t].c();this.h()},l(t){e=l(t,"DIV",{class:!0});var s=i(e);m=l(s,"DIV",{class:!0,"data-svelte-h":!0}),"svelte-ikvadg"!==r(m)&&(m.innerHTML=y),v=o(s),g=l(s,"DIV",{class:!0});var a=i(g);for(let e=0;e<S.length;e+=1)S[e].l(a);a.forEach(c),s.forEach(c),this.h()},h(){h(m,"class","cTitlePartStyle md:!mb-4"),h(g,"class","cContentPartStyle !m-4"),h(e,"class","cRouteBodyStyle")},m(t,s){u(t,e,s),d(e,m),d(e,v),d(e,g);for(let e=0;e<S.length;e+=1)S[e]&&S[e].m(g,null)},p(t,[e]){if(1&e){let a;for(k=s(t[0].propsArray),a=0;a<k.length;a+=1){const s=E(t,k,a);S[a]?S[a].p(s,e):(S[a]=P(s),S[a].c(),S[a].m(g,null))}for(;a<S.length;a+=1)S[a].d(1);S.length=k.length}},i:p,o:p,d(t){t&&c(e),f(S,t)}}}function w(t,s,e){let{data:a}=s;return t.$$set=t=>{"data"in t&&e(0,a=t.data)},[a]}class A extends b{constructor(t){super(),x(this,t,w,_,e,{data:0})}}export{A as component,j as universal};
