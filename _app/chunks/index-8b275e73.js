function w(){}const K=t=>t;function _t(t,e){for(const n in e)t[n]=e[n];return t}function Q(t){return t()}function W(){return Object.create(null)}function v(t){t.forEach(Q)}function F(t){return typeof t=="function"}function Pt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function dt(t){return Object.keys(t).length===0}function U(t,...e){if(t==null)return w;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function qt(t){let e;return U(t,n=>e=n)(),e}function Lt(t,e,n){t.$$.on_destroy.push(U(e,n))}function zt(t,e,n,r){if(t){const s=V(t,e,n,r);return t[0](s)}}function V(t,e,n,r){return t[1]&&r?_t(n.ctx.slice(),t[1](r(e))):n.ctx}function Bt(t,e,n,r){if(t[2]&&r){const s=t[2](r(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],i=Math.max(e.dirty.length,s.length);for(let o=0;o<i;o+=1)c[o]=e.dirty[o]|s[o];return c}return e.dirty|s}return e.dirty}function Ft(t,e,n,r,s,c){if(s){const i=V(e,n,r,c);t.p(i,s)}}function Ht(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function It(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Wt(t){return t??""}function Gt(t,e,n){return t.set(n),e}const X=typeof window<"u";let Y=X?()=>window.performance.now():()=>Date.now(),H=X?t=>requestAnimationFrame(t):w;const $=new Set;function Z(t){$.forEach(e=>{e.c(t)||($.delete(e),e.f())}),$.size!==0&&H(Z)}function tt(t){let e;return $.size===0&&H(Z),{promise:new Promise(n=>{$.add(e={c:t,f:n})}),abort(){$.delete(e)}}}let O=!1;function ht(){O=!0}function mt(){O=!1}function pt(t,e,n,r){for(;t<e;){const s=t+(e-t>>1);n(s)<=r?t=s+1:e=s}return t}function yt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&l.push(_)}e=l}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let s=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,_=(s>0&&e[n[s]].claim_order<=u?s+1:pt(1,s,a=>e[n[a]].claim_order,u))-1;r[l]=n[_]+1;const f=_+1;n[f]=l,s=Math.max(f,s)}const c=[],i=[];let o=e.length-1;for(let l=n[s]+1;l!=0;l=r[l-1]){for(c.push(e[l-1]);o>=l;o--)i.push(e[o]);o--}for(;o>=0;o--)i.push(e[o]);c.reverse(),i.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<i.length;l++){for(;u<c.length&&i[l].claim_order>=c[u].claim_order;)u++;const _=u<c.length?c[u]:null;t.insertBefore(i[l],_)}}function gt(t,e){t.appendChild(e)}function et(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function bt(t){const e=nt("style");return xt(et(t),e),e.sheet}function xt(t,e){gt(t.head||t,e)}function $t(t,e){if(O){for(yt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Jt(t,e,n){O&&!n?$t(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function wt(t){t.parentNode.removeChild(t)}function Kt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function nt(t){return document.createElement(t)}function vt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function I(t){return document.createTextNode(t)}function Qt(){return I(" ")}function Ut(){return I("")}function Vt(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function Xt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Et(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Yt(t,e){for(const n in e)Et(t,n,e[n])}function kt(t){return Array.from(t.childNodes)}function At(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function it(t,e,n,r,s=!1){At(t);const c=(()=>{for(let i=t.claim_info.last_index;i<t.length;i++){const o=t[i];if(e(o)){const l=n(o);return l===void 0?t.splice(i,1):t[i]=l,s||(t.claim_info.last_index=i),o}}for(let i=t.claim_info.last_index-1;i>=0;i--){const o=t[i];if(e(o)){const l=n(o);return l===void 0?t.splice(i,1):t[i]=l,s?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=i,o}}return r()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function rt(t,e,n,r){return it(t,s=>s.nodeName===e,s=>{const c=[];for(let i=0;i<s.attributes.length;i++){const o=s.attributes[i];n[o.name]||c.push(o.name)}c.forEach(i=>s.removeAttribute(i))},()=>r(e))}function Zt(t,e,n){return rt(t,e,n,nt)}function te(t,e,n){return rt(t,e,n,vt)}function Nt(t,e){return it(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>I(e),!0)}function ee(t){return Nt(t," ")}function ne(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ie(t,e,n,r){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,r?"important":"")}function re(t,e,n){t.classList[n?"add":"remove"](e)}function st(t,e,n=!1){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,!1,e),r}function se(t,e=document.body){return Array.from(e.querySelectorAll(t))}const R=new Map;let T=0;function St(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function jt(t,e){const n={stylesheet:bt(e),rules:{}};return R.set(t,n),n}function L(t,e,n,r,s,c,i,o=0){const l=16.666/r;let u=`{
`;for(let m=0;m<=1;m+=l){const g=e+(n-e)*c(m);u+=m*100+`%{${i(g,1-g)}}
`}const _=u+`100% {${i(n,1-n)}}
}`,f=`__svelte_${St(_)}_${o}`,a=et(t),{stylesheet:h,rules:d}=R.get(a)||jt(a,t);d[f]||(d[f]=!0,h.insertRule(`@keyframes ${f} ${_}`,h.cssRules.length));const p=t.style.animation||"";return t.style.animation=`${p?`${p}, `:""}${f} ${r}ms linear ${s}ms 1 both`,T+=1,f}function z(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),s=n.length-r.length;s&&(t.style.animation=r.join(", "),T-=s,T||Ct())}function Ct(){H(()=>{T||(R.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),R.clear())})}let S;function A(t){S=t}function P(){if(!S)throw new Error("Function called outside component initialization");return S}function le(t){P().$$.on_mount.push(t)}function ce(t){P().$$.after_update.push(t)}function oe(){const t=P();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const s=st(e,n);r.slice().forEach(c=>{c.call(t,s)})}}}function ue(t,e){P().$$.context.set(t,e)}const k=[],G=[],M=[],J=[],lt=Promise.resolve();let B=!1;function ct(){B||(B=!0,lt.then(ot))}function ae(){return ct(),lt}function j(t){M.push(t)}const q=new Set;let C=0;function ot(){const t=S;do{for(;C<k.length;){const e=k[C];C++,A(e),Mt(e.$$)}for(A(null),k.length=0,C=0;G.length;)G.pop()();for(let e=0;e<M.length;e+=1){const n=M[e];q.has(n)||(q.add(n),n())}M.length=0}while(k.length);for(;J.length;)J.pop()();B=!1,q.clear(),A(t)}function Mt(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(j)}}let E;function ut(){return E||(E=Promise.resolve(),E.then(()=>{E=null})),E}function N(t,e,n){t.dispatchEvent(st(`${e?"intro":"outro"}${n}`))}const D=new Set;let y;function fe(){y={r:0,c:[],p:y}}function _e(){y.r||v(y.c),y=y.p}function Dt(t,e){t&&t.i&&(D.delete(t),t.i(e))}function de(t,e,n,r){if(t&&t.o){if(D.has(t))return;D.add(t),y.c.push(()=>{D.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}const at={duration:0};function he(t,e,n){let r=e(t,n),s=!1,c,i,o=0;function l(){c&&z(t,c)}function u(){const{delay:f=0,duration:a=300,easing:h=K,tick:d=w,css:p}=r||at;p&&(c=L(t,0,1,a,f,h,p,o++)),d(0,1);const m=Y()+f,g=m+a;i&&i.abort(),s=!0,j(()=>N(t,!0,"start")),i=tt(b=>{if(s){if(b>=g)return d(1,0),N(t,!0,"end"),l(),s=!1;if(b>=m){const x=h((b-m)/a);d(x,1-x)}}return s})}let _=!1;return{start(){_||(_=!0,z(t),F(r)?(r=r(),ut().then(u)):u())},invalidate(){_=!1},end(){s&&(l(),s=!1)}}}function me(t,e,n,r){let s=e(t,n),c=r?0:1,i=null,o=null,l=null;function u(){l&&z(t,l)}function _(a,h){const d=a.b-c;return h*=Math.abs(d),{a:c,b:a.b,d,duration:h,start:a.start,end:a.start+h,group:a.group}}function f(a){const{delay:h=0,duration:d=300,easing:p=K,tick:m=w,css:g}=s||at,b={start:Y()+h,b:a};a||(b.group=y,y.r+=1),i||o?o=b:(g&&(u(),l=L(t,c,a,d,h,p,g)),a&&m(0,1),i=_(b,d),j(()=>N(t,a,"start")),tt(x=>{if(o&&x>o.start&&(i=_(o,d),o=null,N(t,i.b,"start"),g&&(u(),l=L(t,c,i.b,i.duration,0,p,s.css))),i){if(x>=i.end)m(c=i.b,1-c),N(t,i.b,"end"),o||(i.b?u():--i.group.r||v(i.group.c)),i=null;else if(x>=i.start){const ft=x-i.start;c=i.a+i.d*p(ft/i.duration),m(c,1-c)}}return!!(i||o)}))}return{run(a){F(s)?ut().then(()=>{s=s(),f(a)}):f(a)},end(){u(),i=o=null}}}const pe=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function ye(t,e){const n={},r={},s={$$scope:1};let c=t.length;for(;c--;){const i=t[c],o=e[c];if(o){for(const l in i)l in o||(r[l]=1);for(const l in o)s[l]||(n[l]=o[l],s[l]=1);t[c]=o}else for(const l in i)s[l]=1}for(const i in r)i in n||(n[i]=void 0);return n}function ge(t){return typeof t=="object"&&t!==null?t:{}}function be(t){t&&t.c()}function xe(t,e){t&&t.l(e)}function Rt(t,e,n,r){const{fragment:s,on_mount:c,on_destroy:i,after_update:o}=t.$$;s&&s.m(e,n),r||j(()=>{const l=c.map(Q).filter(F);i?i.push(...l):v(l),t.$$.on_mount=[]}),o.forEach(j)}function Tt(t,e){const n=t.$$;n.fragment!==null&&(v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Ot(t,e){t.$$.dirty[0]===-1&&(k.push(t),ct(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function $e(t,e,n,r,s,c,i,o=[-1]){const l=S;A(t);const u=t.$$={fragment:null,ctx:null,props:c,update:w,not_equal:s,bound:W(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:W(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};i&&i(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(f,a,...h)=>{const d=h.length?h[0]:a;return u.ctx&&s(u.ctx[f],u.ctx[f]=d)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](d),_&&Ot(t,f)),a}):[],u.update(),_=!0,v(u.before_update),u.fragment=r?r(u.ctx):!1,e.target){if(e.hydrate){ht();const f=kt(e.target);u.fragment&&u.fragment.l(f),f.forEach(wt)}else u.fragment&&u.fragment.c();e.intro&&Dt(t.$$.fragment),Rt(t,e.target,e.anchor,e.customElement),mt(),ot()}A(l)}class we{$destroy(){Tt(this,1),this.$destroy=w}$on(e,n){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}$set(e){this.$$set&&!dt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{me as $,ge as A,Tt as B,_t as C,ae as D,w as E,zt as F,se as G,Wt as H,$t as I,Ft as J,Ht as K,Bt as L,Lt as M,pe as N,K as O,qt as P,j as Q,he as R,we as S,Kt as T,vt as U,te as V,Yt as W,It as X,Vt as Y,v as Z,re as _,kt as a,oe as a0,Xt as a1,Gt as a2,Et as b,Zt as c,wt as d,nt as e,ie as f,Jt as g,Nt as h,$e as i,ne as j,Qt as k,Ut as l,ee as m,fe as n,de as o,_e as p,Dt as q,ue as r,Pt as s,I as t,ce as u,le as v,be as w,xe as x,Rt as y,ye as z};