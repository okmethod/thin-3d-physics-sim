const e={},t=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){const t=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),s=(null==l?void 0:l.nonce)||(null==l?void 0:l.getAttribute("nonce"));o=Promise.all(n.map((n=>{if(n=function(e,t){return new URL(e,t).href}(n,r),n in e)return;e[n]=!0;const o=n.endsWith(".css"),l=o?'[rel="stylesheet"]':"";if(!!r)for(let e=t.length-1;e>=0;e--){const r=t[e];if(r.href===n&&(!o||"stylesheet"===r.rel))return}else if(document.querySelector(`link[href="${n}"]${l}`))return;const i=document.createElement("link");return i.rel=o?"stylesheet":"modulepreload",o||(i.as="script",i.crossOrigin=""),i.href=n,s&&i.setAttribute("nonce",s),document.head.appendChild(i),o?new Promise(((e,t)=>{i.addEventListener("load",e),i.addEventListener("error",(()=>t(new Error(`Unable to preload CSS for ${n}`))))})):void 0})))}return o.then((()=>t())).catch((e=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}))};export{t as _};
