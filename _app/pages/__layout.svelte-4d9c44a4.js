import{S as k,i as w,s as E,F as L,e as f,k as j,G as q,c as p,d as m,m as D,a as B,b as u,H as g,I as C,g as v,J as I,K as S,L as A,q as F,o as G,M as H,v as y,N as J}from"../chunks/index-8b275e73.js";import{s as b}from"../chunks/settings-124c4c68.js";import"../chunks/index-94cde96d.js";const{document:_}=J;function K(n){let o,r,l,c,i;const d=n[5].default,t=L(d,n,n[4],null);return{c(){o=f("meta"),r=j(),l=f("div"),t&&t.c(),this.h()},l(e){const s=q('[data-svelte="svelte-13oa1b4"]',_.head);o=p(s,"META",{name:!0,content:!0}),s.forEach(m),r=D(e),l=p(e,"DIV",{class:!0});var a=B(l);t&&t.l(a),a.forEach(m),this.h()},h(){_.title="Melodle",u(o,"name","theme-color"),u(o,"content",n[1]),u(l,"class",c=g(n[0].brightness)+" svelte-37jjd5")},m(e,s){C(_.head,o),v(e,r,s),v(e,l,s),t&&t.m(l,null),i=!0},p(e,[s]){(!i||s&2)&&u(o,"content",e[1]),t&&t.p&&(!i||s&16)&&I(t,d,e,e[4],i?A(d,e[4],s,null):S(e[4]),null),(!i||s&1&&c!==(c=g(e[0].brightness)+" svelte-37jjd5"))&&u(l,"class",c)},i(e){i||(F(t,e),i=!0)},o(e){G(t,e),i=!1},d(e){m(o),e&&m(r),e&&m(l),t&&t.d(e)}}}function N(n,o,r){let l,c;H(n,b,a=>r(0,c=a));let{$$slots:i={},$$scope:d}=o;y(()=>b.subscribe(a=>{typeof document<"u"&&(document.documentElement.classList.remove("dark"),document.documentElement.classList.remove("light"),a.brightness!=="system"&&document.documentElement.classList.add(a.brightness))}));let e=(()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)()?"dark":"light";y(()=>{const a=M=>{r(2,e=M.matches?"dark":"light")},h=window.matchMedia("(prefers-color-scheme: dark)");return h.addEventListener("change",a),()=>{h.removeEventListener("change",a)}});let s;return n.$$set=a=>{"$$scope"in a&&r(4,d=a.$$scope)},n.$$.update=()=>{n.$$.dirty&5&&r(3,s=c.brightness==="system"?e:c.brightness),n.$$.dirty&8&&r(1,l=s==="light"?"#fff":"#222")},[c,l,e,s,d,i]}class z extends k{constructor(o){super(),w(this,o,N,K,E,{})}}export{z as default};