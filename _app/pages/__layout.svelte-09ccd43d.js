import{S as T,i as A,s as B,F as C,e as p,k as w,t as I,G as P,c as y,d as u,m as k,a as E,h as S,b as d,H as M,I as L,g as h,J as F,K as G,L as H,q as J,o as K,M as N,v as q,N as Q}from"../chunks/index-8b275e73.js";import{s as D}from"../chunks/settings-124c4c68.js";import"../chunks/index-94cde96d.js";const{document:v}=Q;function V(a){let n,r,o,c,_,i,f,l;const m=a[5].default,t=C(m,a,a[4],null);return{c(){n=p("meta"),r=w(),o=p("div"),t&&t.c(),_=w(),i=p("a"),f=I("Take a break with Pausly."),this.h()},l(e){const s=P('[data-svelte="svelte-13oa1b4"]',v.head);n=y(s,"META",{name:!0,content:!0}),s.forEach(u),r=k(e),o=y(e,"DIV",{class:!0});var b=E(o);t&&t.l(b),b.forEach(u),_=k(e),i=y(e,"A",{class:!0,href:!0});var g=E(i);f=S(g,"Take a break with Pausly."),g.forEach(u),this.h()},h(){v.title="Melodle",d(n,"name","theme-color"),d(n,"content",a[1]),d(o,"class",c=M(a[0].brightness)+" svelte-i0ony7"),d(i,"class","pausly svelte-i0ony7"),d(i,"href","https://www.pausly.app")},m(e,s){L(v.head,n),h(e,r,s),h(e,o,s),t&&t.m(o,null),h(e,_,s),h(e,i,s),L(i,f),l=!0},p(e,[s]){(!l||s&2)&&d(n,"content",e[1]),t&&t.p&&(!l||s&16)&&F(t,m,e,e[4],l?H(m,e[4],s,null):G(e[4]),null),(!l||s&1&&c!==(c=M(e[0].brightness)+" svelte-i0ony7"))&&d(o,"class",c)},i(e){l||(J(t,e),l=!0)},o(e){K(t,e),l=!1},d(e){u(n),e&&u(r),e&&u(o),t&&t.d(e),e&&u(_),e&&u(i)}}}function j(a,n,r){let o,c;N(a,D,t=>r(0,c=t));let{$$slots:_={},$$scope:i}=n;q(()=>D.subscribe(t=>{typeof document<"u"&&(document.documentElement.classList.remove("dark"),document.documentElement.classList.remove("light"),t.brightness!=="system"&&document.documentElement.classList.add(t.brightness))}));let l=(()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)()?"dark":"light";q(()=>{const t=s=>{r(2,l=s.matches?"dark":"light")},e=window.matchMedia("(prefers-color-scheme: dark)");return e.addEventListener("change",t),()=>{e.removeEventListener("change",t)}});let m;return a.$$set=t=>{"$$scope"in t&&r(4,i=t.$$scope)},a.$$.update=()=>{a.$$.dirty&5&&r(3,m=c.brightness==="system"?l:c.brightness),a.$$.dirty&8&&r(1,o=m==="light"?"#fff":"#222")},[c,o,l,m,i,_]}class U extends T{constructor(n){super(),A(this,n,j,V,B,{})}}export{U as default};
