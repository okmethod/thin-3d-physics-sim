import{t,a as e}from"./index.Dw4ZbNqI.js";import{r as n}from"./scheduler.Cvti5IDW.js";import{g as s,b as o}from"./entry.Bvqg2So3.js";function r(t){return void 0!==(null==t?void 0:t.length)?t:Array.from(t)}function a(t,n){t.f(),function(t,n){e(t,1,1,(()=>{n.delete(t.key)}))}(t,n)}function f(e,s,o,r,a,f,i,c,u,h,d,l){let m=e.length,p=f.length,y=m;const g={};for(;y--;)g[e[y].key]=y;const k=[],w=new Map,b=new Map,j=[];for(y=p;y--;){const t=l(a,f,y),e=o(t);let n=i.get(e);n?j.push((()=>n.p(t,s))):(n=h(e,t),n.c()),w.set(e,k[y]=n),e in g&&b.set(e,Math.abs(y-g[e]))}const M=new Set,v=new Set;function x(e){t(e,1),e.m(c,d),i.set(e.key,e),d=e.first,p--}for(;m&&p;){const t=k[p-1],n=e[m-1],s=t.key,o=n.key;t===n?(d=t.first,m--,p--):w.has(o)?!i.has(s)||M.has(s)?x(t):v.has(o)?m--:b.get(s)>b.get(o)?(v.add(s),x(t)):(M.add(o),m--):(u(n,i),m--)}for(;m--;){const t=e[m];w.has(t.key)||u(t,i)}for(;p;)x(k[p-1]);return n(j),k}function i(t){s(`${o}${t}`)}export{r as e,a as f,i as n,f as u};
