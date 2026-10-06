(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,ee=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),T=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},te=/-\w/g,E=T(e=>e.replace(te,e=>e.slice(1).toUpperCase())),ne=/\B([A-Z])/g,D=T(e=>e.replace(ne,`-$1`).toLowerCase()),re=T(e=>e.charAt(0).toUpperCase()+e.slice(1)),ie=T(e=>e?`on${re(e)}`:``),O=(e,t)=>!Object.is(e,t),ae=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},k=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},oe=e=>{let t=parseFloat(e);return isNaN(t)?e:t},se,ce=()=>se||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function A(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?fe(r):A(r);if(i)for(let e in i)t[e]=i[e]}return t}if(g(e)||v(e))return e}var le=/;(?![^(]*\))/g,ue=/:([^]+)/,de=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function fe(e){let t={};return e.replace(de,e=>e.startsWith(`/*`)?``:e).split(le).forEach(e=>{if(e){let n=e.split(ue);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function j(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=j(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var pe=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,me=e(pe);pe+``;function he(e){return!!e||e===``}function ge(e,t,n){if(e.length!==t.length)return!1;let r=!0;for(let i=0;r&&i<e.length;i++)r=M(e[i],t[i],n);return r}function _e(e,t,n){if(e.size!==t.size)return!1;let r=Array.from(t),i=new Uint8Array(r.length);for(let t of e){let e=-1;for(let a=0;a<r.length;a++)if(!i[a]&&M(t,r[a],n)){e=a;break}if(e<0)return!1;i[e]=1}return!0}function ve(e,t,n){let r=f(e),i=f(t);if(r||i||(r=p(e),i=p(t),r||i))return r&&i?_e(e,t,n):!1;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let r in e){let i=e.hasOwnProperty(r),a=t.hasOwnProperty(r);if(i&&!a||!i&&a||!M(e[r],t[r],n))return!1}return String(e)===String(t)}function ye(e,t,n,r){n||=[new Map,new Map];let[i,a]=n;if(i.has(e)||a.has(t))return i.get(e)===t&&a.get(t)===e;i.set(e,t),a.set(t,e);let o=r(e,t,n);return i.delete(e),a.delete(t),o}function M(e,t,n){if(e===t)return!0;let r=m(e),i=m(t);return r||i?r&&i?e.getTime()===t.getTime():!1:(r=_(e),i=_(t),r||i?e===t:(r=d(e),i=d(t),r||i?r&&i?ye(e,t,n,ge):!1:(r=v(e),i=v(t),r||i?!r||!i?!1:ye(e,t,n,ve):String(e)===String(t))))}function be(e,t){return e.findIndex(e=>M(e,t))}var xe=e=>!!(e&&e.__v_isRef===!0),N=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?xe(e)?N(e.value):JSON.stringify(e,Se,2):String(e),Se=(e,t)=>xe(t)?Se(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[Ce(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Ce(e))}:_(t)?Ce(t):v(t)&&!d(t)&&!C(t)?String(t):t,Ce=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,P,we=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&P&&(P.active?(this.parent=P,this.index=(P.scopes||(P.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}let n=this.effects.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}}run(e){if(this._active){let t=P;try{return P=this,e()}finally{P=t}}}on(){++this._on===1&&(this.prevScope=P,P=this)}off(){if(this._on>0&&--this._on===0){if(P===this)P=this.prevScope;else{let e=P;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){let e=this.scopes.slice();for(t=0,n=e.length;t<n;t++)e[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Te(){return P}var F,Ee=new WeakSet,De=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,P&&(P.active?P.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ee.has(this)&&(Ee.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||je(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ue(this),Pe(this);let e=F,t=I;F=this,I=!0;try{return this.fn()}finally{Fe(this),F=e,I=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Re(e);this.deps=this.depsTail=void 0,Ue(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ee.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ie(this)&&this.run()}get dirty(){return Ie(this)}},Oe=0,ke,Ae;function je(e,t=!1){if(e.flags|=8,t){e.next=Ae,Ae=e;return}e.next=ke,ke=e}function Me(){Oe++}function Ne(){if(--Oe>0)return;if(Ae){let e=Ae;for(Ae=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;ke;){let t=ke;for(ke=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Pe(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Fe(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Re(r),ze(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ie(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Le(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Le(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===We)||(e.globalVersion=We,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ie(e))))return;e.flags|=2;let t=e.dep,n=F,r=I;F=e,I=!0;try{Pe(e);let n=e.fn(e._value);(t.version===0||O(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{F=n,I=r,Fe(e),e.flags&=-3}}function Re(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Re(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function ze(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var I=!0,Be=[];function Ve(){Be.push(I),I=!1}function He(){let e=Be.pop();I=e===void 0||e}function Ue(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=F;F=void 0;try{t()}finally{F=e}}}var We=0,Ge=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},Ke=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!F||!I||F===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==F)t=this.activeLink=new Ge(F,this),F.deps?(t.prevDep=F.depsTail,F.depsTail.nextDep=t,F.depsTail=t):F.deps=F.depsTail=t,qe(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=F.depsTail,t.nextDep=void 0,F.depsTail.nextDep=t,F.depsTail=t,F.deps===t&&(F.deps=e)}return t}trigger(e){this.version++,We++,this.notify(e)}notify(e){Me();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ne()}}};function qe(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)qe(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Je=new WeakMap,Ye=Symbol(``),Xe=Symbol(``),Ze=Symbol(``);function L(e,t,n){if(I&&F){let t=Je.get(e);t||Je.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new Ke),r.map=t,r.key=n),r.track()}}function Qe(e,t,n,r,i,a){let o=Je.get(e);if(!o){We++;return}let s=e=>{e&&e.trigger()};if(Me(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ze||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ze)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(Ye)),f(e)&&s(o.get(Xe)));break;case`delete`:i||(s(o.get(Ye)),f(e)&&s(o.get(Xe)));break;case`set`:f(e)&&s(o.get(Ye))}}Ne()}function $e(e){let t=z(e);return t===e||(L(t,`iterate`,Ze),R(e))?t:Lt(e)?It(e)?t.map(e=>Bt(B(e))):t.map(Bt):t.map(B)}function et(e){return L(e=z(e),`iterate`,Ze),e}function tt(e,t){return Lt(e)?Bt(It(e)?B(t):t):B(t)}var nt={__proto__:null,[Symbol.iterator](){return rt(this,Symbol.iterator,e=>tt(this,e))},concat(...e){return $e(this).concat(...e.map(e=>d(e)?$e(e):e))},entries(){return rt(this,`entries`,e=>(e[1]=tt(this,e[1]),e))},every(e,t){return at(this,`every`,e,t,void 0,arguments)},filter(e,t){return at(this,`filter`,e,t,e=>e.map(e=>tt(this,e)),arguments)},find(e,t){return at(this,`find`,e,t,e=>tt(this,e),arguments)},findIndex(e,t){return at(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return at(this,`findLast`,e,t,e=>tt(this,e),arguments)},findLastIndex(e,t){return at(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return at(this,`forEach`,e,t,void 0,arguments)},includes(...e){return st(this,`includes`,e)},indexOf(...e){return st(this,`indexOf`,e)},join(e){return $e(this).join(e)},lastIndexOf(...e){return st(this,`lastIndexOf`,e)},map(e,t){return at(this,`map`,e,t,void 0,arguments)},pop(){return ct(this,`pop`)},push(...e){return ct(this,`push`,e)},reduce(e,...t){return ot(this,`reduce`,e,t)},reduceRight(e,...t){return ot(this,`reduceRight`,e,t)},shift(){return ct(this,`shift`)},some(e,t){return at(this,`some`,e,t,void 0,arguments)},splice(...e){return ct(this,`splice`,e)},toReversed(){return $e(this).toReversed()},toSorted(e){return $e(this).toSorted(e)},toSpliced(...e){return $e(this).toSpliced(...e)},unshift(...e){return ct(this,`unshift`,e)},values(){return rt(this,`values`,e=>tt(this,e))}};function rt(e,t,n){let r=et(e),i=r[t]();return r!==e&&!R(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var it=Array.prototype;function at(e,t,n,r,i,a){let o=et(e),s=o!==e&&!R(e),c=o[t];if(c!==it[t]){let t=c.apply(e,a);return s?B(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,tt(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function ot(e,t,n,r){let i=et(e),a=i!==e&&!R(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=tt(e,t)),n.call(this,t,tt(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?tt(e,c):c}function st(e,t,n){let r=z(e);L(r,`iterate`,Ze);let i=r[t](...n);return(i===-1||i===!1)&&Rt(n[0])?(n[0]=z(n[0]),r[t](...n)):i}function ct(e,t,n=[]){Ve(),Me();let r=z(e)[t].apply(e,n);return Ne(),He(),r}var lt=e(`__proto__,__v_isRef,__isVue`),ut=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function dt(e){_(e)||(e=String(e));let t=z(this);return L(t,`has`,e),t.hasOwnProperty(e)}var ft=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?At:kt:i?Ot:Dt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=nt[t]))return e;if(t===`hasOwnProperty`)return dt}let o=Reflect.get(e,t,V(e)?e:n);if((_(t)?ut.has(t):lt(t))||(r||L(e,`get`,t),i))return o;if(V(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?Pt(e):e}return v(o)?r?Pt(o):Mt(o):o}},pt=class extends ft{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=Lt(i);if(!R(n)&&!Lt(n)&&(i=z(i),n=z(n)),!a&&V(i)&&!V(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,V(e)?e:r);return e===z(r)&&s&&(o?O(n,i)&&Qe(e,`set`,t,n,i):Qe(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Qe(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!ut.has(t))&&L(e,`has`,t),n}ownKeys(e){return L(e,`iterate`,d(e)?`length`:Ye),Reflect.ownKeys(e)}},mt=class extends ft{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},ht=new pt,gt=new mt,_t=new pt(!0),vt=e=>e,yt=e=>Reflect.getPrototypeOf(e);function bt(e,t,n){return function(...r){let i=this.__v_raw,a=z(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?vt:t?Bt:B;return!t&&L(a,`iterate`,l?Xe:Ye),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function xt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function St(e,t){let n={get(n){let r=this.__v_raw,i=z(r),a=z(n);e||(O(n,a)&&L(i,`get`,n),L(i,`get`,a));let{has:o}=yt(i),s=t?vt:e?Bt:B;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&L(z(t),`iterate`,Ye),t.size},has(t){let n=this.__v_raw,r=z(n),i=z(t);return e||(O(t,i)&&L(r,`has`,t),L(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=z(a),s=t?vt:e?Bt:B;return!e&&L(o,`iterate`,Ye),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:xt(`add`),set:xt(`set`),delete:xt(`delete`),clear:xt(`clear`)}:{add(e){let n=z(this),r=yt(n),i=z(e),a=!t&&!R(e)&&!Lt(e)?i:e;return r.has.call(n,a)||O(e,a)&&r.has.call(n,e)||O(i,a)&&r.has.call(n,i)||(n.add(a),Qe(n,`add`,a,a)),this},set(e,n){!t&&!R(n)&&!Lt(n)&&(n=z(n));let r=z(this),{has:i,get:a}=yt(r),o=i.call(r,e);o||=(e=z(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?O(n,s)&&Qe(r,`set`,e,n,s):Qe(r,`add`,e,n),this},delete(e){let t=z(this),{has:n,get:r}=yt(t),i=n.call(t,e);i||=(e=z(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Qe(t,`delete`,e,void 0,a),o},clear(){let e=z(this),t=e.size!==0,n=e.clear();return t&&Qe(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=bt(r,e,t)}),n}function Ct(e,t){let n=St(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var wt={get:Ct(!1,!1)},Tt={get:Ct(!1,!0)},Et={get:Ct(!0,!1)},Dt=new WeakMap,Ot=new WeakMap,kt=new WeakMap,At=new WeakMap;function jt(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function Mt(e){return Lt(e)?e:Ft(e,!1,ht,wt,Dt)}function Nt(e){return Ft(e,!1,_t,Tt,Ot)}function Pt(e){return Ft(e,!0,gt,Et,kt)}function Ft(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=jt(S(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function It(e){return Lt(e)?It(e.__v_raw):!!(e&&e.__v_isReactive)}function Lt(e){return!!(e&&e.__v_isReadonly)}function R(e){return!!(e&&e.__v_isShallow)}function Rt(e){return e?!!e.__v_raw:!1}function z(e){let t=e&&e.__v_raw;return t?z(t):e}function zt(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&k(e,`__v_skip`,!0),e}var B=e=>v(e)?Mt(e):e,Bt=e=>v(e)?Pt(e):e;function V(e){return e?e.__v_isRef===!0:!1}function Vt(e){return Ht(e,!1)}function Ht(e,t){return V(e)?e:new Ut(e,t)}var Ut=class{constructor(e,t){this.dep=new Ke,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:z(e),this._value=t?e:B(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||R(e)||Lt(e);e=n?e:z(e),O(e,t)&&(this._rawValue=e,this._value=n?e:B(e),this.dep.trigger())}};function Wt(e){return V(e)?e.value:e}var Gt={get:(e,t,n)=>t===`__v_raw`?e:Wt(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return V(i)&&!V(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Kt(e){return It(e)?e:new Proxy(e,Gt)}var qt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Ke(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=We-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&F!==this)return je(this,!0),!0}get value(){let e=this.dep.track();return Le(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function Jt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new qt(r,i,n)}var Yt={},Xt=new WeakMap,Zt=void 0;function Qt(e,t=!1,n=Zt){if(n){let t=Xt.get(n);t||Xt.set(n,t=[]),t.push(e)}}function $t(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:R(e)||o===!1||o===0?en(e,1):en(e),m,g,_,v,y=!1,b=!1;if(V(e)?(g=()=>e.value,y=R(e)):It(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>It(e)||R(e)),g=()=>e.map(e=>{if(V(e))return e.value;if(It(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){Ve();try{_()}finally{He()}}let t=Zt;Zt=m;try{return f?f(e,3,[v]):e(v)}finally{Zt=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>en(e(),t)}let x=Te(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{let n=e(...t);return S(),n}}let C=b?Array(e.length).fill(Yt):Yt,w=e=>{if(m.flags&1&&(m.dirty||e)){if(n){let t=m.run();if(e||o||y||(b?t.some((e,t)=>O(e,C[t])):O(t,C))){_&&_();let e=Zt;Zt=m;try{let e=[t,C===Yt?void 0:b&&C[0]===Yt?[]:C,v];C=t,f?f(n,3,e):n(...e)}finally{Zt=e}}}else m.run()}};return u&&u(w),m=new De(g),m.scheduler=l?()=>l(w,!1):w,v=e=>Qt(e,!1,m),_=m.onStop=()=>{let e=Xt.get(m);if(e){if(f)f(e,4);else for(let t of e)t();Xt.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function en(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,V(e))en(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)en(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{en(e,t,n)});else if(C(e)){for(let r in e)en(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&en(e[r],t,n)}return e}function tn(e,t,n,r){try{return r?e(...r):e()}catch(e){nn(e,t,n)}}function H(e,t,n,r){if(h(e)){let i=tn(e,t,n,r);return i&&y(i)&&i.catch(e=>{nn(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(H(e[a],t,n,r));return i}}function nn(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){Ve(),tn(o,null,10,[e,i,a]),He();return}}rn(e,r,a,i,s)}function rn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var U=[],W=-1,an=[],on=null,sn=0,cn=Promise.resolve(),ln=null;function un(e){let t=ln||cn;return e?t.then(this?e.bind(this):e):t}function dn(e){let t=W+1,n=U.length;for(;t<n;){let r=t+n>>>1,i=U[r],a=_n(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function fn(e){if(!(e.flags&1)){let t=_n(e),n=U[U.length-1];!n||!(e.flags&2)&&t>=_n(n)?U.push(e):U.splice(dn(t),0,e),e.flags|=1,pn()}}function pn(){ln||=cn.then(vn)}function mn(e){if(!d(e))on&&e.id===-1?on.splice(sn+1,0,e):e.flags&1||(an.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)an.push(e[t]);pn()}function hn(e,t,n=W+1){for(;n<U.length;n++){let t=U[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;U.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function gn(e){if(an.length){let e=[...new Set(an)].sort((e,t)=>_n(e)-_n(t));if(an.length=0,on){for(let t=0;t<e.length;t++)on.push(e[t]);return}for(on=e,sn=0;sn<on.length;sn++){let e=on[sn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}on=null,sn=0}}var _n=e=>e.id==null?e.flags&2?-1:1/0:e.id;function vn(e){try{for(W=0;W<U.length;W++){let e=U[W];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),tn(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;W<U.length;W++){let e=U[W];e&&(e.flags&=-2)}W=-1,U.length=0,gn(e),ln=null,(U.length||an.length)&&vn(e)}}var G=null,yn=null;function bn(e){let t=G;return G=e,yn=e&&e.type.__scopeId||null,t}function xn(e,t=G,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Ei(-1);let i=bn(t),a=Si.length,o;try{o=e(...n)}finally{for(let e=Si.length;e>a;e--)wi();bn(i),r._d&&Ei(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function K(e,n){if(G===null)return e;let r=sa(G),i=e.dirs||=[];for(let e=0;e<n.length;e++){let[a,o,s,c=t]=n[e];a&&(h(a)&&(a={mounted:a,updated:a}),a.deep&&en(o),i.push({dir:a,instance:r,value:o,oldValue:void 0,arg:s,modifiers:c}))}return e}function Sn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(Ve(),H(c,n,8,[e.el,s,e,t]),He())}}function Cn(e,t){if(Q){let n=Q.provides,r=Q.parent&&Q.parent.provides;r===n&&(n=Q.provides=Object.create(r)),n[e]=t}}function wn(e,t,n=!1){let r=Ji();if(r||kr){let i=kr?kr._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var Tn=Symbol.for(`v-scx`),En=()=>wn(Tn);function Dn(e,t,n){return On(e,t,n)}function On(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(ea){if(c===`sync`){let e=En();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=Q;u.call=(e,t,n)=>H(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{J(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():fn(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=$t(e,n,u);return ea&&(f?f.push(h):d&&h()),h}function kn(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?An(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=Zi(this),s=On(i,a.bind(r),n);return o(),s}function An(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var jn=Symbol(`_vte`),Mn=e=>e.__isTeleport,Nn=Symbol(`_leaveCb`);function Pn(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==bi){t=n;break}}return t}function Fn(e){if(!Un(e))return Mn(e.type)&&e.children?Pn(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&h(n.default))return n.default()}}function In(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;In(Mn(n.type)&&Fn(n)||n,t)}else e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Ln(e){e.ids=[e.ids[0]+e.ids[2]+++`-`,0,0]}function Rn(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var zn=new WeakMap;function Bn(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>Bn(e,n&&(d(n)?n[t]:n),r,a,o));return}if(Hn(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&Bn(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?sa(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=z(v),b=v===t?i:e=>!Rn(_,e)&&u(y,e),x=(e,t)=>!(t&&Rn(_,t));if(m!=null&&m!==p){if(Vn(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(V(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))tn(p,f,12,[l,_]);else{let t=g(p),n=V(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),zn.delete(e)};t.id=-1,zn.set(e,t),J(t,r)}else Vn(e),i()}}}function Vn(e){let t=zn.get(e);t&&(t.flags|=8,zn.delete(e))}ce().requestIdleCallback,ce().cancelIdleCallback;var Hn=e=>!!e.type.__asyncLoader,Un=e=>e.type.__isKeepAlive;function Wn(e,t){Kn(e,`a`,t)}function Gn(e,t){Kn(e,`da`,t)}function Kn(e,t,n=Q){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(Jn(t,r,n),n){let e=n.parent;for(;e&&e.parent;)Un(e.parent.vnode)&&qn(r,t,n,e),e=e.parent}}function qn(e,t,n,r){let i=Jn(t,e,r,!0);tr(()=>{c(r[t],i)},n)}function Jn(e,t,n=Q,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{Ve();let i=Zi(n),a=H(t,n,e,r);return i(),He(),a};return r?i.unshift(a):i.push(a),a}}var Yn=e=>(t,n=Q)=>{(!ea||e===`sp`)&&Jn(e,(...e)=>t(...e),n)},Xn=Yn(`bm`),Zn=Yn(`m`),Qn=Yn(`bu`),$n=Yn(`u`),er=Yn(`bum`),tr=Yn(`um`),nr=Yn(`sp`),rr=Yn(`rtg`),ir=Yn(`rtc`);function ar(e,t=Q){Jn(`ec`,e,t)}var or=Symbol.for(`v-ndc`),sr=e=>e?$i(e)?sa(e):sr(e.parent):null,cr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>sr(e.parent),$root:e=>sr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>_r(e),$forceUpdate:e=>e.f||=()=>{fn(e.update)},$nextTick:e=>e.n||=un.bind(e.proxy),$watch:e=>kn.bind(e)}),lr=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),ur={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(lr(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else fr&&(s[n]=0)}let d=cr[n],f,p;if(d)return n===`$attrs`&&L(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return lr(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||lr(n,c)||u(o,c)||u(i,c)||u(cr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function dr(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var fr=!0;function pr(e){let t=_r(e),n=e.proxy,i=e.ctx;fr=!1,t.beforeCreate&&hr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:ee,renderTracked:T,renderTriggered:te,errorCaptured:E,serverPrefetch:ne,expose:D,inheritAttrs:re,components:ie,directives:O,filters:ae}=t;if(u&&mr(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=Mt(t))}if(fr=!0,o)for(let e in o){let t=o[e],a=la({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)gr(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{Cn(t,e[t])})}f&&hr(f,e,`c`);function k(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(k(Xn,p),k(Zn,m),k(Qn,g),k($n,_),k(Wn,y),k(Gn,b),k(ar,E),k(ir,T),k(rr,te),k(er,S),k(tr,w),k(nr,ne),d(D)){if(D.length){let t=e.exposed||={};D.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={}}ee&&e.render===r&&(e.render=ee),re!=null&&(e.inheritAttrs=re),ie&&(e.components=ie),O&&(e.directives=O),ne&&Ln(e)}function mr(e,t,n=r){d(e)&&(e=Sr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?wn(r.from||n,r.default,!0):wn(r.from||n):wn(r),V(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function hr(e,t,n){H(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function gr(e,t,n,r){let i=r.includes(`.`)?An(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&Dn(i,n)}else if(h(e))Dn(i,e.bind(n));else if(v(e)){if(d(e))e.forEach(e=>gr(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&Dn(i,r,e)}}}function _r(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>vr(c,e,o,!0)),vr(c,t,o)),v(t)&&a.set(t,c),c}function vr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&vr(e,a,n,!0),i&&i.forEach(t=>vr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=yr[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var yr={data:br,props:wr,emits:wr,methods:Cr,computed:Cr,beforeCreate:q,created:q,beforeMount:q,mounted:q,beforeUpdate:q,updated:q,beforeDestroy:q,beforeUnmount:q,destroyed:q,unmounted:q,activated:q,deactivated:q,errorCaptured:q,serverPrefetch:q,components:Cr,directives:Cr,watch:Tr,provide:br,inject:xr};function br(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function xr(e,t){return Cr(Sr(e),Sr(t))}function Sr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function q(e,t){return e?[...new Set([].concat(e,t))]:t}function Cr(e,t){return e?s(Object.create(null),e,t):t}function wr(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),dr(e),dr(t??{})):t}function Tr(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=q(e[r],t[r]);return n}function Er(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Dr=0;function Or(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=Er(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:Dr++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:ua,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||Pi(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,sa(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(H(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=kr;kr=l;try{return e()}finally{kr=t}}};return l}}var kr=null,Ar=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${E(t)}Modifiers`]||e[`${D(t)}Modifiers`];function jr(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&Ar(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=a.map(oe)));let c,l=i[c=ie(n)]||i[c=ie(E(n))];!l&&o&&(l=i[c=ie(D(n))]),l&&H(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,H(u,e,6,a)}}var Mr=new WeakMap;function Nr(e,t,n=!1){let r=n?Mr:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=Nr(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function Pr(e,t){return!e||!a(t)?!1:(t=t.slice(2),t=t===`Once`?t:t.replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,D(t))||u(e,t))}function Fr(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=bn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Bi(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=Bi(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:Ir(c)}}catch(t){Si.length=0,nn(t,e,1),v=Pi(bi)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=Lr(y,a)),b=Li(b,y,!1,!0))}return n.dirs&&(b=Li(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&In(Mn(b.type)&&Fn(b)||b,n.transition),v=b,bn(_),v}var Ir=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},Lr=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Rr(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?zr(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(Br(o,r,n)&&!Pr(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?!o||zr(r,o,l):!!o;return!1}function zr(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(Br(t,e,a)&&!Pr(n,a))return!0}return!1}function Br(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!M(r,i):r!==i}function Vr({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var Hr={},Ur=()=>Object.create(Hr),Wr=e=>Object.getPrototypeOf(e)===Hr;function Gr(e,t,n,r=!1){let i={},a=Ur();e.propsDefaults=Object.create(null),qr(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);e.props=n?r?i:Nt(i):e.type.props?i:a,e.attrs=a}function Kr(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=z(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Pr(e.emitsOptions,o))continue;let d=t[o];if(c){if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=E(o);i[t]=Jr(c,s,t,d,e,!1)}}else d!==a[o]&&(a[o]=d,l=!0)}}}else{qr(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=D(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=Jr(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&Qe(e.attrs,`set`,``)}function qr(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(ee(t))continue;let l=n[t],d;a&&u(a,d=E(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:Pr(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=z(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=Jr(a,n,s,i[s],e,!u(i,s))}}return s}function Jr(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=Zi(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===D(n))&&(r=!0))}return r}var Yr=new WeakMap;function Xr(e,r,i=!1){let a=i?Yr:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=Xr(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=E(c[e]);Zr(n)&&(l[n]=t)}else if(c)for(let e in c){let t=E(e);if(Zr(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function Zr(e){return e[0]!==`$`&&!ee(e)}var Qr=e=>e===`_`||e===`_ctx`||e===`$stable`,$r=e=>d(e)?e.map(Bi):[Bi(e)],ei=(e,t,n)=>{if(t._n)return t;let r=xn((...e)=>$r(t(...e)),n);return r._c=!1,r},ti=(e,t,n)=>{let r=e._ctx;for(let n in e){if(Qr(n))continue;let i=e[n];if(h(i))t[n]=ei(n,i,r);else if(i!=null){let e=$r(i);t[n]=()=>e}}},ni=(e,t)=>{let n=$r(t);e.slots.default=()=>n},ri=(e,t,n)=>{for(let r in t)(n||!Qr(r))&&(e[r]=t[r])},ii=(e,t,n)=>{let r=e.slots=Ur();if(e.vnode.shapeFlag&32){let e=t._;e?(ri(r,t,n),n&&k(r,`_`,e,!0)):ti(t,r)}else t&&ni(e,t)},ai=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:ri(a,n,r):(o=!n.$stable,ti(n,a)),s=n}else n&&(ni(e,n),s={default:1});if(o)for(let e in a)!Qr(e)&&s[e]==null&&delete a[e]},J=_i;function oi(e){return si(e)}function si(e,i){let a=ce();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,r,i=null,a=null,o=null,s=void 0,c=null,l=!!t.dynamicChildren)=>{if(e===t)return;e&&!ji(e,t)&&(i=_e(e),j(e,a,o,!0),e=null),t.patchFlag===-2&&(l=!1,t.dynamicChildren=null),t.dynamicChildren&&e&&e.dynamicChildren&&e.dynamicChildren.hasOnce&&(t.dynamicChildren===n&&(t.dynamicChildren=[]),t.dynamicChildren.hasOnce=!0);let{type:u,ref:d,shapeFlag:f}=t;switch(u){case yi:y(e,t,r,i);break;case bi:b(e,t,r,i);break;case xi:e??x(t,r,i,s);break;case vi:ie(e,t,r,i,a,o,s,c,l);break;default:f&1?w(e,t,r,i,a,o,s,c,l):f&6?O(e,t,r,i,a,o,s,c,l):(f&64||f&128)&&u.process(e,t,r,i,a,o,s,c,l,M)}d!=null&&a?Bn(d,e&&e.ref,o,t||e,!t):d==null&&e&&e.ref!=null&&Bn(e.ref,null,o,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)T(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),ne(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},T=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&E(e.children,d,null,r,i,ci(e,a),s,u),_&&Sn(e,null,r,`created`),te(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!ee(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&Wi(f,r,e)}_&&Sn(e,null,r,`beforeMount`);let v=ui(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&J(()=>{try{f&&Wi(f,r,e),v&&g.enter(d),_&&Sn(e,null,r,`mounted`)}finally{}},i)},te=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||gi(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;te(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},E=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++){let c=e[l]=s?Vi(e[l]):Bi(e[l]);v(null,c,t,n,r,i,a,o,s)}},ne=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&li(r,!1),(g=h.onVnodeBeforeUpdate)&&Wi(g,r,n,e),f&&Sn(n,e,r,`beforeUpdate`),r&&li(r,!0),d&&(!e.dynamicChildren||e.dynamicChildren.length!==d.length)&&(u=0,s=!1,d=null),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?D(e.dynamicChildren,d,l,r,i,ci(n,a),o):s||le(e,n,l,null,r,i,ci(n,a),o,!1),u>0){if(u&16)re(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else!s&&d==null&&re(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&J(()=>{g&&Wi(g,r,n,e),f&&Sn(n,e,r,`updated`)},i)},D=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s],u=c.el&&(c.type===vi||!ji(c,l)||c.shapeFlag&198)?m(c.el):n;v(c,l,u,null,r,i,a,o,!0)}},re=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!ee(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(ee(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},ie=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),E(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(D(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&di(e,t,!0)):le(e,t,n,f,i,a,s,c,l)},O=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):k(t,n,r,i,a,o,c):oe(e,t,c)},k=(e,t,n,r,i,a,o)=>{let s=e.component=qi(e,r,i);if(Un(e)&&(s.ctx.renderer=M),ta(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,se,o),!e.el){let r=s.subTree=Pi(bi);b(null,r,t,n),e.placeholder=r.el}}else se(s,e,t,n,i,a,o)},oe=(e,t,n)=>{let r=t.component=e.component;if(Rr(e,t,n)){if(r.asyncDep&&!r.asyncResolved){t.el=e.el,A(r,t,n);return}r.next=t,r.update()}else t.el=e.el,r.vnode=t},se=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=pi(e);if(n){t&&(t.el=c.el,A(e,t,o)),n.asyncDep.then(()=>{J(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;li(e,!1),t?(t.el=c.el,A(e,t,o)):t=c,n&&ae(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Wi(d,s,t,c),li(e,!0);let f=Fr(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),_e(p),e,i,a),t.el=f.el,u===null&&Vr(e,f.el),r&&J(r,i),(d=t.props&&t.props.onVnodeUpdated)&&J(()=>Wi(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=Hn(t);if(li(e,!1),l&&ae(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Wi(o,d,t),li(e,!0),s&&xe){let t=()=>{e.subTree=Fr(e),xe(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=Fr(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&J(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;J(()=>Wi(o,d,e),i)}(t.shapeFlag&256||d&&Hn(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&J(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new De(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>fn(u),li(e,!0),l()},A=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,Kr(e,t.props,r,n),ai(e,t.children,n),Ve(),hn(e),He()},le=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){de(l,d,n,r,i,a,o,s,c);return}if(f&256){ue(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&ge(l,i,a),d!==l&&p(n,d)):u&16?m&16?de(l,d,n,r,i,a,o,s,c):ge(l,i,a,!0):(u&8&&p(n,``),m&16&&E(d,n,r,i,a,o,s,c))},ue=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p=0;for(;p<f;p++){let n=t[p]=l?Vi(t[p]):Bi(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?ge(e,a,o,!0,!1,f):E(t,r,i,a,o,s,c,l,f)},de=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?Vi(t[u]):Bi(t[u]);if(ji(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?Vi(t[p]):Bi(t[p]);if(ji(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?Vi(t[u]):Bi(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)j(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?Vi(t[u]):Bi(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){j(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&ji(n,t[_])){i=_;break}i===void 0?j(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?fi(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||hi(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?fe(n,r,p,2):_--)}}},fe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){fe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,M);return}if(c===vi){o(a,t,n);for(let e=0;e<u.length;e++)fe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===xi){S(e,t,n);return}if(r!==2&&d&1&&l){if(r===0)l.persisted&&!a[Nn]?o(a,t,n):(l.beforeEnter(a),o(a,t,n),J(()=>l.enter(a),i));else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{let e=a._isLeaving||!!a[Nn];a._isLeaving&&a[Nn](!0),l.persisted&&!e?u():r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}}else o(a,t,n)},j=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if((d===-2||l&&l.hasOnce)&&(i=!1),s!=null&&(Ve(),Bn(s,null,n,e,!0),He()),p!=null&&(!e.ctx||e.ctx===t)&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!Hn(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Wi(_,t,e),u&6)he(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&Sn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,M,r):l&&!l.hasOnce&&(a!==vi||d>0&&d&64)?ge(l,t,n,!1,!0):(a===vi&&d&384||!i&&u&16)&&ge(c,t,n),r&&pe(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&J(()=>{_&&Wi(_,t,e),h&&Sn(e,null,t,`unmounted`),v&&(e.el=null)},n)},pe=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===vi){me(n,r);return}if(t===xi){C(e),i&&!i.persisted&&i.afterLeave&&i.afterLeave();return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},me=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},he=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;mi(c),mi(l),r&&ae(r),i.stop(),a?(a.flags|=8,j(o,e,t,n)):e.vnode.el&&o&&(o.transition=e.vnode.transition,j(o,e,t,n)),s&&J(s,t),J(()=>{e.isUnmounted=!0},t)},ge=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)j(e[o],t,n,r,i)},_e=e=>{if(e.shapeFlag&6)return _e(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[jn];return n?h(n):t},ve=!1,ye=(e,t,n)=>{let r;e==null?t._vnode&&(j(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ve||=(ve=!0,hn(r),gn(),!1)},M={p:v,um:j,m:fe,r:pe,mt:k,mc:E,pc:le,pbc:D,n:_e,o:e},be,xe;return i&&([be,xe]=i(M)),{render:ye,hydrate:be,createApp:Or(ye,be)}}function ci({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function li({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function ui(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function di(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=Vi(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&di(t,a)),a.type===yi&&(a.patchFlag===-1&&(a=i[e]=Vi(a)),a.el=t.el),a.type===bi&&!a.el&&(a.el=t.el)}}function fi(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-->0;)n[a]=o,o=t[o];return n}function pi(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:pi(t)}function mi(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function hi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?hi(t.subTree):null}var gi=e=>e.__isSuspense;function _i(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):mn(e)}var vi=Symbol.for(`v-fgt`),yi=Symbol.for(`v-txt`),bi=Symbol.for(`v-cmt`),xi=Symbol.for(`v-stc`),Si=[],Y=null;function Ci(e=!1){Si.push(Y=e?null:[])}function wi(){Si.pop(),Y=Si[Si.length-1]||null}var Ti=1;function Ei(e,t=!1){Ti+=e,e<0&&Y&&t&&(Y.hasOnce=!0)}function Di(e){return e.dynamicChildren=Ti>0?Y||n:null,wi(),Ti>0&&Y&&Y.push(e),e}function Oi(e,t,n,r,i,a){return Di(X(e,t,n,r,i,a,!0))}function ki(e,t,n,r,i){return Di(Pi(e,t,n,r,i,!0))}function Ai(e){return e?e.__v_isVNode===!0:!1}function ji(e,t){return e.type===t.type&&e.key===t.key}var Mi=({key:e})=>e??null,Ni=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||V(e)||h(e)?{i:G,r:e,k:t,f:!!n}:e);function X(e,t=null,n=null,r=0,i=null,a=e===vi?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Mi(t),ref:t&&Ni(t),scopeId:yn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:G};return s?(Hi(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),Ti>0&&!o&&Y&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&Y.push(c),c}var Pi=Fi;function Fi(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===or)&&(e=bi),Ai(e)){let r=Li(e,t,!0);return n&&Hi(r,n),Ti>0&&!a&&Y&&(r.shapeFlag&6?Y[Y.indexOf(e)]=r:Y.push(r)),r.patchFlag=-2,r}if(ca(e)&&(e=e.__vccOpts),t){t=Ii(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=j(e)),v(n)&&(Rt(n)&&!d(n)&&(n=s({},n)),t.style=A(n))}let o=g(e)?1:gi(e)?128:Mn(e)?64:v(e)?4:h(e)?2:0;return X(e,t,n,r,i,o,a,!0)}function Ii(e){return e?Rt(e)||Wr(e)?s({},e):e:null}function Li(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?Ui(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Mi(l),ref:t&&t.ref?n&&a?d(a)?a.concat(Ni(t)):[a,Ni(t)]:Ni(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==vi?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Li(e.ssContent),ssFallback:e.ssFallback&&Li(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce,cacheIndex:e.cacheIndex};return c&&r&&In(u,c.clone(u)),u}function Z(e=` `,t=0){return Pi(yi,null,e,t)}function Ri(e,t){let n=Pi(xi,null,e);return n.staticCount=t,n}function zi(e=``,t=!1){return t?(Ci(),ki(bi,null,e)):Pi(bi,null,e)}function Bi(e){return e==null||typeof e==`boolean`?Pi(bi):d(e)?Pi(vi,null,e.slice()):Ai(e)?Vi(e):Pi(yi,null,String(e))}function Vi(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Li(e)}function Hi(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`){if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Hi(e,n()),n._c&&(n._d=!0));return}{n=32;let r=t._;!r&&!Wr(t)?t._ctx=G:r===3&&G&&(G.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}}else if(h(t)){if(r&65){Hi(e,{default:t});return}t={default:t,_ctx:G},n=32}else t=String(t),r&64?(n=16,t=[Z(t)]):n=8;e.children=t,e.shapeFlag|=n}function Ui(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=j([t.class,r.class]));else if(e===`style`)t.style=A([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function Wi(e,t,n,r=null){H(e,t,7,[n,r])}var Gi=Er(),Ki=0;function qi(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||Gi,o={uid:Ki++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new we(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Xr(i,a),emitsOptions:Nr(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=jr.bind(null,o),e.ce&&e.ce(o),o}var Q=null,Ji=()=>Q||G,Yi,Xi;{let e=ce(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};Yi=t(`__VUE_INSTANCE_SETTERS__`,e=>Q=e),Xi=t(`__VUE_SSR_SETTERS__`,e=>ea=e)}var Zi=e=>{let t=Q;return Yi(e),e.scope.on(),()=>{e.scope.off(),Yi(t)}},Qi=()=>{Q&&Q.scope.off(),Yi(null)};function $i(e){return e.vnode.shapeFlag&4}var ea=!1;function ta(e,t=!1,n=!1){t&&Xi(t);let{props:r,children:i}=e.vnode,a=$i(e);Gr(e,r,a,t),ii(e,i,n||t);let o=a?na(e,t):void 0;return t&&Xi(!1),o}function na(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,ur);let{setup:r}=n;if(r){Ve();let n=e.setupContext=r.length>1?oa(e):null,i=Zi(e),a=tn(r,e,0,[e.props,n]),o=y(a);if(He(),i(),(o||e.sp)&&!Hn(e)&&Ln(e),o){if(a.then(Qi,Qi),t)return a.then(n=>{Xi(!0);try{ra(e,n,t)}finally{Xi(!1)}}).catch(t=>{nn(t,e,0)});e.asyncDep=a}else ra(e,a,t)}else ia(e,t)}function ra(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Kt(t)),ia(e,n)}function ia(e,t,n){let i=e.type;e.render||=i.render||r;{let t=Zi(e);Ve();try{pr(e)}finally{He(),t()}}}var aa={get(e,t){return L(e,`get`,``),e[t]}};function oa(e){return{attrs:new Proxy(e.attrs,aa),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function sa(e){return e.exposed?e.exposeProxy||=new Proxy(Kt(zt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in cr)return cr[n](e)},has(e,t){return t in e||t in cr}}):e.proxy}function ca(e){return h(e)&&`__vccOpts`in e}var la=(e,t)=>Jt(e,t,ea),ua=`3.5.43`,da=void 0,fa=typeof window<`u`&&window.trustedTypes;if(fa)try{da=fa.createPolicy(`vue`,{createHTML:e=>e})}catch{}var pa=da?e=>da.createHTML(e):e=>e,ma=`http://www.w3.org/2000/svg`,ha=`http://www.w3.org/1998/Math/MathML`,ga=typeof document<`u`?document:null,_a=ga&&ga.createElement(`template`),va={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?ga.createElementNS(ma,e):t===`mathml`?ga.createElementNS(ha,e):n?ga.createElement(e,{is:n}):ga.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>ga.createTextNode(e),createComment:e=>ga.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ga.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),i!==a&&(i=i.nextSibling););else{_a.innerHTML=pa(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=_a.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},ya=Symbol(`_vtc`);function ba(e,t,n){let r=e[ya];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var xa=Symbol(`_vod`),Sa=Symbol(`_vsh`),Ca=Symbol(``),wa=/(?:^|;)\s*display\s*:/;function Ta(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t){if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??Da(r,t,``)}else for(let e in t)n[e]??Da(r,e,``)}for(let i in n){i===`display`&&(a=!0);let o=n[i];o==null?Da(r,i,``):ja(e,i,!g(t)&&t?t[i]:void 0,o)||Da(r,i,o)}}else if(i){if(t!==n){let e=r[Ca];e&&(n+=`;`+e),r.cssText=n,a=wa.test(n)}}else t&&e.removeAttribute(`style`);xa in e&&(e[xa]=a?r.display:``,e[Sa]&&(r.display=`none`))}var Ea=/\s*!important$/;function Da(e,t,n){if(d(n))n.forEach(n=>Da(e,t,n));else if(n??=``,t.startsWith(`--`))Ea.test(n)?e.setProperty(t,n.replace(Ea,``),`important`):e.setProperty(t,n);else{let r=Aa(e,t);Ea.test(n)?e.setProperty(D(r),n.replace(Ea,``),`important`):e[r]=n}}var Oa=[`Webkit`,`Moz`,`ms`],ka={};function Aa(e,t){let n=ka[t];if(n)return n;let r=E(t);if(r!==`filter`&&r in e)return ka[t]=r;r=re(r);for(let n=0;n<Oa.length;n++){let i=Oa[n]+r;if(i in e)return ka[t]=i}return t}function ja(e,t,n,r){return e.tagName===`TEXTAREA`&&(t===`width`||t===`height`)&&g(r)&&n===r}var Ma=`http://www.w3.org/1999/xlink`;function Na(e,t,n,r,i,a=me(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(Ma,t.slice(6,t.length)):e.setAttributeNS(Ma,t,n):n==null||a&&!he(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function Pa(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?pa(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=he(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function Fa(e,t,n,r){e.addEventListener(t,n,r)}function Ia(e,t,n,r){e.removeEventListener(t,n,r)}var La=Symbol(`_vei`);function Ra(e,t,n,r,i=null){let a=e[La]||(e[La]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=Va(t);r?Fa(e,n,a[t]=Ga(r,i),s):o&&(Ia(e,n,o,s),a[t]=void 0)}}var za=/(Once|Passive|Capture)$/,Ba=/^on:?(?:Once|Passive|Capture)$/;function Va(e){let t,n;for(;(n=e.match(za))&&!Ba.test(e);)t||={},e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===`:`?e.slice(3):D(e.slice(2)),t]}var Ha=0,Ua=Promise.resolve(),Wa=()=>Ha||=(Ua.then(()=>Ha=0),Date.now());function Ga(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;let r=n.value;if(d(r)){let n=e.stopImmediatePropagation;e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0};let i=r.slice(),a=[e];for(let n=0;n<i.length&&!e._stopped;n++){let e=i[n];e&&H(e,t,5,a)}}else H(r,t,5,[e])};return n.value=e,n.attached=Wa(),n}var Ka=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,qa=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?ba(e,r,c):t===`style`?Ta(e,n,r):a(t)?o(t)||Ra(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),1):t[0]===`^`?(t=t.slice(1),0):Ja(e,t,r,c))?(Pa(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&Na(e,t,r,c,s,t!==`value`)):e._isVueCE&&(Ya(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?Pa(e,E(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),Na(e,t,r,c))};function Ja(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Ka(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Ka(t)&&g(n)?!1:t in e}function Ya(e,t){let n=e._def.props;if(!n)return!1;let r=E(t);return Array.isArray(n)?n.some(e=>E(e)===r):Object.keys(n).some(e=>E(e)===r)}var Xa=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return d(t)?e=>ae(t,e):t};function Za(e){e.target.composing=!0}function Qa(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var $a=Symbol(`_assign`),eo=Symbol(`_initialValue`);function to(e,t,n){return t&&(e=e.trim()),n&&(e=oe(e)),e}var $={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e.parentNode&&(e.type===`text`?e[eo]=e.defaultValue.replace(/[\r\n]/g,``):e.type===`textarea`&&(e[eo]=e.defaultValue.replace(/\r\n?/g,`
`))),e[$a]=Xa(i);let a=r||i.props&&i.props.type===`number`;Fa(e,t?`change`:`input`,t=>{t.target.composing||e[$a](to(e.value,n,a))}),(n||a)&&Fa(e,`change`,()=>{e.value=to(e.value,n,a)}),t||(Fa(e,`compositionstart`,Za),Fa(e,`compositionend`,Qa),Fa(e,`change`,Qa))},mounted(e,{value:t,modifiers:{trim:n,number:r}}){let i=t??``,a=e[eo];delete e[eo],a!==void 0&&(e.type===`text`||e.type===`textarea`)&&e.value!==a?e[$a](to(e.value,n,r)):e.value=i},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[$a]=Xa(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?oe(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},no={deep:!0,created(e,t,n){e[$a]=Xa(n),Fa(e,`change`,()=>{let t=e._modelValue,n=so(e),r=e.checked,i=e[$a];if(d(t)){let e=be(t,n),a=e!==-1;if(r&&!a)i(t.concat(n));else if(!r&&a){let n=[...t];n.splice(e,1),i(n)}}else if(p(t)){let e=new Set(t);r?e.add(n):e.delete(n),i(e)}else i(co(e,r))})},mounted:ro,beforeUpdate(e,t,n){e[$a]=Xa(n),ro(e,t,n)}};function ro(e,{value:t,oldValue:n},r){e._modelValue=t;let i;if(d(t))i=be(t,r.props.value)>-1;else if(p(t))i=t.has(r.props.value);else{if(t===n)return;i=M(t,co(e,!0))}e.checked!==i&&(e.checked=i)}var io={deep:!0,created(e,{value:t,modifiers:{number:n}},r){e._modelValue=t,Fa(e,`change`,()=>{let t=Array.prototype.filter.call(e.options,e=>e.selected).map(e=>n?oe(so(e)):so(e)),r=e.multiple,i=r?p(e._modelValue)?new Set(t):t:t[0],a=e._pendingValue=[r,r?d(i)?t.slice():t:i];try{e[$a](i)}finally{un(()=>{e._pendingValue===a&&(e._pendingValue=void 0)})}}),e[$a]=Xa(r)},mounted(e,{value:t}){oo(e,t)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[$a]=Xa(n)},updated(e,{value:t}){let n=e._pendingValue;e._pendingValue=void 0,(!n||n[0]!==e.multiple||!ao(t,n[1],n[0]))&&oo(e,t)}};function ao(e,t,n){if(!n||d(e))return M(e,t);if(p(e)){if(e.size!==t.length)return!1;for(let n of t)if(!e.has(n))return!1;return!0}return!1}function oo(e,t){let n=e.multiple,r=d(t);if(!n||r||p(t)){for(let i=0,a=e.options.length;i<a;i++){let a=e.options[i],o=so(a);if(n){if(r){let e=typeof o;a.selected=e===`string`||e===`number`?t.some(e=>String(e)===String(o)):be(t,o)>-1}else a.selected=t.has(o)}else if(M(so(a),t)){e.selectedIndex!==i&&(e.selectedIndex=i);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function so(e){return`_value`in e?e._value:e.value}function co(e,t){let n=t?`_trueValue`:`_falseValue`;return n in e?e[n]:t}var lo=s({patchProp:qa},va),uo;function fo(){return uo||=oi(lo)}var po=((...e)=>{let t=fo().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=ho(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,mo(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function mo(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function ho(e){return g(e)?document.querySelector(e):e}var go=`// Fullscreen-triangle vertex shader.
// The only geometry in the app: 3 vertices covering the whole clip space.
// All real scene geometry (the sphere) lives as an SDF in the fragment shader.
attribute vec2 aPosition;

// NDC position passed through so the fragment shader can build camera rays.
varying vec2 vNdc;

void main() {
  vNdc = aPosition;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,_o=`// SDF raymarcher fragment shader (GLSL ES 1.0 — works on WebGL1 and WebGL2).
//
// Scene: a realistic smoke puff (participating medium, no hard surface)
// pierced by a looping bullet shot. The distorted shock cone is SUBTRACTED
// from the smoke (carved tunnel with rippled walls): it suppresses the
// smoke, turbules it, makes it glow, and shimmers the background behind it
// like hot air. The bullet is a simple sphere — the only opaque SDF.
// Everything loops seamlessly every LOOP_DURATION.
//
// Techniques:
//   - Camera ray per-pixel from camera uniforms (position + basis + FOV).
//   - Opaque march: bullet sphere + perturbed ground slab SDFs.
//   - Volume march: analytic bounds, Beer-Lambert, HG scattering, heat glow.
//   - Secondary rays: ground reflection marches the smoke volume;
//     thin-slab refraction transmits the scene behind the slab.
//   - Volume march: analytic bounds intersect, front-to-back Beer-Lambert
//     accumulation, Henyey-Greenstein-ish scattering, heat emission.
//   - Heat shimmer: hot-air column offsets the background lookup direction
//     with animated Perlin noise (optical distortion from heated air).
//   - Billow density from Perlin fBm; smoke colour / heat colour are uniforms.
//
// Uniform names must stay in sync with RaymarchCanvas.vue (cacheUniformLocations).
precision highp float;

varying vec2 vNdc;

// --- Camera uniforms ---
uniform vec3 uCameraPosition;  // ray origin
uniform vec3 uCameraForward;   // look direction (need not be normalized; normalized in-shader)
uniform vec3 uCameraUp;        // world up hint
uniform float uCameraFov;       // vertical field of view, degrees
uniform float uAspectRatio;    // canvasWidth / canvasHeight

// --- Smoke medium uniforms ---
uniform float uShapeSize;      // master size: smoke/sphere radius, cube bounding radius
uniform float uShapeYaw;       // object rotation, radians (yaw about Y)
uniform float uShapePitch;     // object rotation, radians (pitch about X)
uniform float uShapeRoll;      // object rotation, radians (roll about Z)
uniform float uSmokeDensity;   // extinction scale (absorption + scattering)
uniform vec3 uSmokeColor;      // smoke albedo / body colour
uniform float uScatter;        // directional scattering brightness
uniform float uAnisotropy;     // scattering lobe (-0.85 back .. +0.85 forward)

// --- Heat uniforms ---
uniform vec3 uHeatColor;       // hot-air emission colour
uniform float uHeatStrength;   // heat glow + shimmer strength

// --- Perlin billow uniforms ---
uniform float uNoiseAmplitude;  // silhouette erosion strength
uniform float uNoiseFrequency;  // base spatial frequency of the billows
uniform int uNoiseOctaves;      // fBm octave count, 1..MAX_OCTAVES
uniform float uLacunarity;      // frequency multiplier per octave (~2.0)
uniform float uNoiseGain;       // amplitude multiplier per octave / persistence (~0.5)
uniform float uNoiseSpeed;      // noise-time travel amount (loop-safe sine swing)

// --- Shockwave cone uniforms (uConeAngleDeg = FULL apex angle) ---
uniform float uConeAngleDeg;
uniform float uConeLength;     // shock-cone wake length behind the bullet
uniform float uPush;           // shock displacement: 0 = carve only, higher piles a compression shell

// --- Compression turbulence uniforms ---
uniform float uRippleAmp;      // turbulence strength on smoke near the cone
uniform float uRippleFreq;     // spatial frequency of the turbulence

// --- Ground slab uniforms (square surface with thickness) ---
uniform float uGroundAmp;      // near-camera perturbation strength (0 = flat)
uniform float uGroundPeriod;   // perturbation cell size in world units
uniform int uGroundOct;        // perturbation octave count, 1..MAX_OCTAVES
uniform float uGroundLac;      // perturbation frequency multiplier per octave

// --- Sphere shatter mode uniforms ---
uniform float uMode;           // 0 = smoke cloud, 1 = plastic sphere, 2 = plastic cube
// shard scale fixed at 1.0; max shard fixed at 5.0 (see shardFreqAt)
uniform float uShardMin;       // smallest allowed shard, world units (hard cap)
// (decl merged above)

// --- Visibility & debug uniforms ---
uniform float uShowGround;     // 0 = plane hidden, 1 = visible
uniform float uDebugMode;      // 0 off, 1 compression, 2 heat, 3 density, 4 cone SDF

// --- Sky & sun uniforms ---
uniform vec3 uSunColor;        // sun disc + flare tint
uniform vec3 uSkyColor;        // day zenith tint (dusk/night derived)
uniform float uFlare;          // sun flare strength

// --- Raymarch tuning ---
uniform float uEpsilon;      // opaque surface hit threshold
uniform float uMaxDistance;  // far raymarch limit (camera "far")

// --- Directional light uniforms ---
// uLightDirection: direction FROM the surface TOWARD the light (already normalized on CPU).
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
uniform float uLightIntensity;

// --- Animation / misc ---
uniform float uTime;        // elapsed seconds (looped every 16 s; bullet: 8 s sub-loop)
uniform vec2 uResolution;   // drawing-buffer size in pixels (reserved)

// Constants (LOOP_DURATION must match LOOP_SECONDS in RaymarchCanvas.vue).
const int MAX_STEPS = 64;
const int VOL_STEPS = 24; // 4D noise costs ~2x per step vs 3D; dither hides the cut
const int MAX_OCTAVES = 8;
const float LOOP_DURATION = 16.0;
const float EXPAND = 0.5; // smoke expansion phase each loop (seconds)
float gRadius = 1.0; // effective smoke/sphere radius after expansion envelope
mat3 gRot;     // object rotation for this pixel (set in main)
mat3 gRotInv;  // its transpose = inverse (rotation is orthogonal)

// Generic object rotation: yaw (Y), then pitch (X), then roll (Z).
mat3 shapeRotMat(float yaw, float pitch, float roll) {
  float cx = cos(pitch);
  float sx = sin(pitch);
  float cy = cos(yaw);
  float sy = sin(yaw);
  float cz = cos(roll);
  float sz = sin(roll);
  mat3 rx = mat3(1.0, 0.0, 0.0, 0.0, cx, sx, 0.0, -sx, cx);
  mat3 ry = mat3(cy, 0.0, -sy, 0.0, 1.0, 0.0, sy, 0.0, cy);
  mat3 rz = mat3(cz, sz, 0.0, -sz, cz, 0.0, 0.0, 0.0, 1.0);
  return ry * rx * rz;
}

// Transpose (GLSL ES 1.00 has no transpose() builtin). For rotation
// matrices this is the inverse.
mat3 transpose3(mat3 m) {
  return mat3(m[0][0], m[1][0], m[2][0],
              m[0][1], m[1][1], m[2][1],
              m[0][2], m[1][2], m[2][2]);
}
const float TAU = 6.2831853;
const float BULLET_X1 = 3.2;
const float BULLET_RADIUS = 0.14;
// (bullet rig lives below SMOKE_CENTER; GLSL needs declaration order)
const float BULLET_MIN_VIS = 0.4; // readability floor, see bullet branch
const vec3 SMOKE_CENTER = vec3(0.0, 0.0, 0.0);

// ================= BULLET RIG (generic, shape-agnostic) =================
// The ONLY bullet knowledge in the shader. Shapes consume pos/dir/speed/
// fade and compute their own response (impact, shatter, carve), so the rig
// applies unchanged to smoke, sphere, cube, or future shapes.
const vec3 BULLET_DIR = vec3(1.0, 0.0, 0.0); // flight axis (+X)
const float BULLET_REF_SPEED = 3.2;          // normalizes chunk motion
uniform float uBulletSpeed;                  // world units per second (live)

vec3 bulletSpawn() {
  return vec3(SMOKE_CENTER.x - uShapeSize, 0.0, 0.0);
}

float bulletFade(float loopT) {
  return smoothstep(0.0, EXPAND, loopT);
}

float bulletClock(float loopT) {
  return max(loopT - EXPAND, 0.0); // seconds since launch
}
// Square ground slab under the smoke: 8x8 footprint, thin 0.25 thickness.
const vec3 GROUND_HALF = vec3(4.0, 0.125, 4.0);
const float SLAB_IOR = 1.3;
const vec3 BACKGROUND_TOP = vec3(0.12, 0.18, 0.32);
const vec3 BACKGROUND_BOTTOM = vec3(0.02, 0.02, 0.05);

float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
  vec3 pa = p - a;
  vec3 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}

// Capped cone along +Y, y in [0, h], radius r1 at y=0 -> r2 at y=h (iq).
float sdRoundCone(vec3 p, float r1, float r2, float h) {
  vec2 q = vec2(length(p.xz), p.y);
  float b = (r1 - r2) / h;
  float a = sqrt(1.0 - b * b);
  float k = dot(q, vec2(-b, a));
  if (k < 0.0) return length(q) - r1;
  if (k > a * h) return length(q - vec2(0.0, h)) - r2;
  return dot(q, vec2(a, b)) - r1;
}

// --- Classic Perlin gradient noise (3D) ---
// Based on Ashima Arts / Ian McEwan classicnoise3D.glsl (MIT licence).
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.y, Pi0.y, Pi1.y, Pi1.y);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

// Fractal Brownian motion, normalized to roughly [-1, 1].
float fbm(vec3 p, int octaves, float lacunarity, float gain) {
  float sum = 0.0;
  float norm = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < MAX_OCTAVES; ++i) {
    if (i >= octaves) {
      break;
    }
    sum += amp * cnoise(p * freq);
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return (norm > 0.0) ? sum / norm : 0.0;
}

// Cheap deterministic dither to hide volume-marching bands.
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

// --- 4D Perlin gradient noise (x, y, z + time) ---
// Time rides as the 4th coordinate, so the smoke genuinely evolves instead
// of just shifting 3D noise around. Lattice gradients come from a
// deterministic hash (needs highp); loop safety comes from how w is driven
// (a sine swing that returns to base every loop).
float gradDot4(vec4 cell, vec4 delta) {
  vec4 h = fract(sin(vec4(
    dot(cell, vec4(127.1, 311.7, 74.7, 269.5)),
    dot(cell, vec4(269.5, 183.3, 246.1, 124.6)),
    dot(cell, vec4(113.5, 271.9, 124.6, 263.2)),
    dot(cell, vec4(246.1, 124.6, 269.5, 183.3)))) * 43758.5453) * 2.0 - 1.0;
  float gl = max(length(h), 0.0001);
  return dot(h / gl, delta);
}

float pnoise4(vec4 P) {
  vec4 Pi = floor(P);
  vec4 Pf = fract(P);
  vec4 f = Pf * Pf * Pf * (Pf * (Pf * 6.0 - 15.0) + 10.0);
  float n0000 = gradDot4(Pi + vec4(0.0, 0.0, 0.0, 0.0), Pf - vec4(0.0, 0.0, 0.0, 0.0));
  float n1000 = gradDot4(Pi + vec4(1.0, 0.0, 0.0, 0.0), Pf - vec4(1.0, 0.0, 0.0, 0.0));
  float n0100 = gradDot4(Pi + vec4(0.0, 1.0, 0.0, 0.0), Pf - vec4(0.0, 1.0, 0.0, 0.0));
  float n1100 = gradDot4(Pi + vec4(1.0, 1.0, 0.0, 0.0), Pf - vec4(1.0, 1.0, 0.0, 0.0));
  float n0010 = gradDot4(Pi + vec4(0.0, 0.0, 1.0, 0.0), Pf - vec4(0.0, 0.0, 1.0, 0.0));
  float n1010 = gradDot4(Pi + vec4(1.0, 0.0, 1.0, 0.0), Pf - vec4(1.0, 0.0, 1.0, 0.0));
  float n0110 = gradDot4(Pi + vec4(0.0, 1.0, 1.0, 0.0), Pf - vec4(0.0, 1.0, 1.0, 0.0));
  float n1110 = gradDot4(Pi + vec4(1.0, 1.0, 1.0, 0.0), Pf - vec4(1.0, 1.0, 1.0, 0.0));
  float n0001 = gradDot4(Pi + vec4(0.0, 0.0, 0.0, 1.0), Pf - vec4(0.0, 0.0, 0.0, 1.0));
  float n1001 = gradDot4(Pi + vec4(1.0, 0.0, 0.0, 1.0), Pf - vec4(1.0, 0.0, 0.0, 1.0));
  float n0101 = gradDot4(Pi + vec4(0.0, 1.0, 0.0, 1.0), Pf - vec4(0.0, 1.0, 0.0, 1.0));
  float n1101 = gradDot4(Pi + vec4(1.0, 1.0, 0.0, 1.0), Pf - vec4(1.0, 1.0, 0.0, 1.0));
  float n0011 = gradDot4(Pi + vec4(0.0, 0.0, 1.0, 1.0), Pf - vec4(0.0, 0.0, 1.0, 1.0));
  float n1011 = gradDot4(Pi + vec4(1.0, 0.0, 1.0, 1.0), Pf - vec4(1.0, 0.0, 1.0, 1.0));
  float n0111 = gradDot4(Pi + vec4(0.0, 1.0, 1.0, 1.0), Pf - vec4(0.0, 1.0, 1.0, 1.0));
  float n1111 = gradDot4(Pi + vec4(1.0, 1.0, 1.0, 1.0), Pf - vec4(1.0, 1.0, 1.0, 1.0));
  // Interpolate: x, then y, then z, then w.
  float x000 = mix(n0000, n1000, f.x);
  float x100 = mix(n0100, n1100, f.x);
  float x010 = mix(n0010, n1010, f.x);
  float x110 = mix(n0110, n1110, f.x);
  float x001 = mix(n0001, n1001, f.x);
  float x101 = mix(n0101, n1101, f.x);
  float x011 = mix(n0011, n1011, f.x);
  float x111 = mix(n0111, n1111, f.x);
  float y00 = mix(x000, x100, f.y);
  float y10 = mix(x010, x110, f.y);
  float y01 = mix(x001, x101, f.y);
  float y11 = mix(x011, x111, f.y);
  float z0 = mix(y00, y10, f.z);
  float z1 = mix(y01, y11, f.z);
  return mix(z0, z1, f.w) * 1.5;
}

// 4D fractal Brownian motion, normalized to roughly [-1, 1].
float fbm4(vec4 p, int octaves, float lacunarity, float gain) {
  float sum = 0.0;
  float norm = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < MAX_OCTAVES; ++i) {
    if (i >= octaves) {
      break;
    }
    sum += amp * pnoise4(p * freq);
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return (norm > 0.0) ? sum / norm : 0.0;
}

// --- 16-second loop helpers (one blazing bullet pass per loop) ---
// All animation derives from the loop phase with INTEGER cycle counts or a
// circular domain offset, so the last frame wraps seamlessly to the first.
float loopPhase() {
  return fract(uTime / LOOP_DURATION);
}

float bulletX(float phase) {
  return mix(SMOKE_CENTER.x - uShapeSize, BULLET_X1, phase);
}

void loopState(out float phase, out float fade, out float bx, out float coneOX, out float baseR) {
  phase = loopPhase();
  // One bullet: frozen at spawn during smoke expansion, then flying straight
  // at constant speed with no fade-outs until the loop restarts there.
  // Smoke radius ramps 0 -> full over EXPAND (and back down at the wrap
  // so the loop stays seamless); floor keeps every 1/R term finite.
  float loopT = phase * LOOP_DURATION;
  gRadius = uShapeSize * max(smoothstep(0.0, EXPAND, loopT) * (1.0 - smoothstep(LOOP_DURATION - EXPAND, LOOP_DURATION, loopT)), 0.001);
  vec3 bpos = bulletSpawn() + BULLET_DIR * (uBulletSpeed * bulletClock(loopT));
  bx = bpos.x;
  fade = bulletFade(loopT);
  coneOX = bx - 0.05;
  baseR = uConeLength * tan(radians(uConeAngleDeg * 0.5));
}

// Opaque scene: bullet sphere (mat 1) + ground slab (mat 2).
float bulletSDF(vec3 p, float bx, float fade) {
  return sdSphere(p - vec3(bx, 0.0, 0.0), BULLET_RADIUS * fade);
}

// Ground slab perturbed by Perlin fBm ONLY near the camera:
// the displacement fades out with distance, far field stays flat.
// Ground slab perturbed by Perlin fBm + a traveling wave that starts at
// one corner (-x,-z) and fades to zero toward the other corners
// (2 wavefronts per loop -> seamless).
// Plane height follows the radius slider so it never touches the sphere:
// sphere mode kisses the ball's underside, cloud mode clears the wispy extent.
vec3 groundCenter() {
  float top = (uMode > 0.5)
    ? -uShapeSize - 0.1
    : -(uShapeSize * 1.35 + 0.2);
  return vec3(0.0, top - GROUND_HALF.y, 0.0);
}

float groundSDF(vec3 p, vec3 ro) {
  float d = sdBox(p - groundCenter(), GROUND_HALF);
  if (uGroundAmp > 0.0) {
    float phase = loopPhase();
    float dc = length(p.xz - vec2(-GROUND_HALF.x, -GROUND_HALF.z));
    float env = exp(-dc * 0.45);
    if (env > 0.004) {
      vec3 gp = p / max(uGroundPeriod, 0.05);
      float bumps = fbm(gp, uGroundOct, uGroundLac, 0.5) * 0.6
        + sin(dc * 6.0 - phase * TAU * 4.0) * 0.4;
      d += bumps * uGroundAmp * env;
    }
  }
  return d;
}

// 3D voronoi: F1, F2 and a per-cell id seed (iq-style exhaustive 27 taps).
vec3 vhash3(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 74.7)),
    dot(p, vec3(269.5, 183.3, 246.1)),
    dot(p, vec3(113.5, 271.9, 124.6)));
  return fract(sin(p) * 43758.5453);
}

vec4 voronoi(vec3 p, out vec3 feat) {
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float f1 = 8.0;
  float f2 = 8.0;
  float id = 0.0;
  vec3 bestR = vec3(0.0);
  for (int k = -1; k <= 1; ++k) {
    for (int j = -1; j <= 1; ++j) {
      for (int i = -1; i <= 1; ++i) {
        vec3 g = vec3(float(i), float(j), float(k));
        vec3 o = vhash3(ip + g);
        vec3 r = g + o - fp;
        float d = dot(r, r);
        if (d < f1) {
          f2 = f1;
          f1 = d;
          id = o.x * 7.0 + o.y * 5.0 + o.z * 3.0;
          bestR = r;
        } else if (d < f2) {
          f2 = d;
        }
      }
    }
  }
  feat = bestR; // p + feat = feature point, stable per chunk forever
  return vec4(sqrt(f1), sqrt(f2), id, 0.0);
}

// Plastic sphere (same radius as the smoke) that shatters along voronoi
// partitions once the bullet touches it. The partition field is frozen in
// object space (graded once by the impact crater, never by the moving
// bullet) so the initial pieces persist along the whole animation.
// Each partition moves as a rigid body driven by the SAME air-pressure
// field that squeezes the smoke: centroid-sampled shell/stagnation push
// throws it along the shock-surface normal, and it rolls off that surface
// with pressure-scaled spin. No hard-coded bullet push, no gravity.
// tSince = seconds since impact (0 = intact sphere).
// Cell size grades with distance from the impact crater (frozen, static):
// small dense shards near the hit, big plates far away. Impact-only —
// never time- or bullet-varying — so the split stays intact forever.
// (With graded frequency the pivot is approximate to ~8% of a cell, a
// static micro-bend, invisible next to the chunks themselves.)
// uShardMin floors the piece size as a safety cap.
// Cell density grades with distance from the impact crater, evaluated in
// OBJECT space (rel = shape-frame offset from center) so the dense zone
// rotates with the shape. Frozen/static: impact-only, never time-varying.
float shardFreqAt(vec3 rel) {
  vec3 craterObj = gRotInv * vec3(-uShapeSize, 0.0, 0.0);
  float dI = length(rel - craterObj);
  // Far field settles to ~4 coarse plates; the crater term subdivides down
  // to rubble as distance -> 0.
  float far = smoothstep(0.0, 2.0 * gRadius, dI);
  float crater = 1.0 - far;
  float freq = mix(1.0, 0.18, far) + crater * crater * 2.5;
  freq = clamp(freq, 1.0 / 5.0, 1.0 / max(uShardMin, 0.02));
  return freq;
}

// Gap half-width along partition borders: opens fast after impact, holds.
// Scaled to the cell size; opens softly (smoothstep, no hard cut) so gaps
// read as empty at any shard frequency without swallowing whole pieces.
float gapHalfWidth(float tSince, float freq) {
  return (0.175 / freq) * smoothstep(0.0, 1.2, tSince);
}

// Proper rotation matrix (Rodrigues, column-major): det +1, orthogonal.
mat3 rotAxisAngle(vec3 ax, float an) {
  float c = cos(an);
  float s = sin(an);
  float ic = 1.0 - c;
  float x = ax.x;
  float y = ax.y;
  float z = ax.z;
  return mat3(
    c + x * x * ic, y * x * ic + z * s, z * x * ic - y * s,
    x * y * ic - z * s, c + y * y * ic, z * y * ic + x * s,
    x * z * ic + y * s, y * z * ic - x * s, c + z * z * ic);
}

float coneField(vec3 p, float phase, float fade, float coneOX, float baseR);

// Last chunk-frame border from marching (SDF -> shading handoff, below).
float gBorderW = 10.0;

// Generic solid in unit space: sphere, or cube whose bounding sphere is 1
// (half extent 1/sqrt(3)), selected by uMode. World d = local * SIZE.
float solidBaseSDF(vec3 pl) {
  if (uMode < 1.5) {
    return length(pl) - 1.0;
  }
  return sdBox(pl, vec3(0.5773503));
}

float sphereShatterSDF(vec3 p, float tSince) {
  if (tSince <= 0.0) {
    return solidBaseSDF((gRotInv * (p - SMOKE_CENTER)) / gRadius) * gRadius;
  }
  vec3 rel = p - SMOKE_CENTER;
  vec3 obj = gRotInv * rel;
  float freq = shardFreqAt(obj);
  // Cheap far exit: all debris stays within reach of the original shell,
  // so distant samples return a valid bound with zero voronoi cost.
  // (This is also what restores full speed: most march steps exit here.)
  float reach = 3.5 / freq + 0.3;
  float dFar = length(rel) - gRadius - reach;
  if (dFar > 0.0) {
    return dFar;
  }
  vec3 feat;
  vec4 v = voronoi(obj * freq, feat);
  vec3 pivot = obj + feat * min(1.0 / freq, 0.75); // chunk centroid, offset clamped:
  // far cells would otherwise place it units away, turning the whole chunk
  // frame (motion, normals, shading) into background speckle. Near-sphere
  // cells (freq > 1.33) are untouched.
  vec3 rnd = vhash3(vec3(v.z * 3.1, v.z * 7.7, v.z * 5.3)) - 0.5;
  // Impact-frozen loop state (spawn puts the bullet center exactly on the
  // surface, so impact is at window start): chunk ballistics lock to
  // hit-time conditions, so every fragment keeps its exact dimensions
  // and shape for the whole animation.
  float coneOX = SMOKE_CENTER.x - uShapeSize - 0.05;
  float baseR = uConeLength * tan(radians(uConeAngleDeg * 0.5));
  // Air pressure sampled ONCE at impact time from the SMOOTH base cone
  // (same shell/stagnation model as the smoke, minus ripple detail so
  // neighboring chunks agree and the debris flows coherently instead of
  // tearing into jitter). Everything below derives from the pivot (never
  // from p or from live bullet state), so each chunk moves as one rigid
  // body: constant velocity, constant spin.
  vec3 pW = SMOKE_CENTER + gRot * pivot; // chunk centroid back in world
  vec3 conePs = vec3(pW.y, coneOX - pW.x, pW.z);
  float dCp = sdRoundCone(conePs, 0.03, baseR, uConeLength);
  float sbp = (dCp - 0.12) * 9.0;
  float shellp = exp(-sbp * sbp);
  float sAh = pW.x - (coneOX + 0.19);
  float qa = sAh / 0.35;
  float qr = length(pW.yz) / 0.30;
  float stagp = (sAh > -0.1)
    ? exp(-(qa * qa + qr * qr)) * smoothstep(-0.1, 0.15, sAh)
    : 0.0;
  float press = shellp * 1.2 + stagp * 0.8
    - (1.0 - smoothstep(-0.35, 0.05, dCp)) * 0.9;
  float push = max(press, 0.0);
  vec3 n0 = pivot / max(length(pivot), 0.001);
  vec3 R = reflect(vec3(1.0, 0.0, 0.0), n0);
  float facing = clamp(dot(n0, vec3(-1.0, 0.0, 0.0)), 0.0, 1.0);
  // Smoke-coupled flight: advect with the same shock flow that streams the
  // smoke itself (radial from the cone axis, scaled by the Shock push
  // slider), blended toward the bullet-reflection spray by impact facing.
  // Bounded ease-out hover keeps the cell lookup valid while rotation (exact
  // at any angle) provides the drama. All inputs frozen per chunk.
  float pb = dCp * 3.0;
  float flowBand = exp(-pb * pb);
  // Bullet-wave direction: mostly +X travel with a touch of reflection
  // deflection; pieces translate rigidly (never distort) and rotate.
  vec3 flyRaw = vec3(1.0, 0.0, 0.0) + R * (0.3 * facing) + rnd * 0.2;
  vec3 flyDir = flyRaw / max(length(flyRaw), 0.05);
  float drive = clamp(push + facing * 0.5 + flowBand * uPush * 0.5, 0.0, 2.0);
  float sepMax = min((0.10 + 0.30 * (drive / 2.0)) / freq, 0.30);
  float speedRatio = uBulletSpeed / BULLET_REF_SPEED; // chunks follow bullet speed
  // Eject out of the void along the cone wall (object frame): chunks leave
  // the cone interior instead of lingering in it. Capped with the hover so
  // total travel stays lookup-valid.
  vec3 coneAxisObj = gRotInv * vec3(1.0, 0.0, 0.0);
  vec3 radObj = pivot - coneAxisObj * dot(pivot, coneAxisObj);
  vec3 ejectDir = (coneAxisObj * 0.35 + radObj) / max(length(coneAxisObj * 0.35 + radObj), 0.05);
  float core = 1.0 - smoothstep(-0.5, 0.05, dCp);
  vec3 Traw = flyDir * sepMax + ejectDir * (0.45 * core);
  float capT = min(0.5 / freq + 0.08, 0.5);
  vec3 T = Traw * min(1.0, capT / max(length(Traw), 0.0001)) * (1.0 - exp(-tSince * 2.2 * speedRatio));
  // Own rotation: roll in the deflection plane, harder where pressure peaks.
  vec3 ax = cross(R, vec3(1.0, 0.0, 0.0)) + rnd * 0.9;
  float axl = length(ax);
  ax = (axl > 0.001) ? ax / axl : vec3(0.0, 1.0, 0.0);
  float ang = min(0.16 * clamp(freq * 0.4, 0.2, 1.0) * (0.4 + min(push, 1.2)) * (0.5 + rnd.y * 1.5) * tSince * speedRatio, 2.5);
  mat3 Ri = rotAxisAngle(ax, -ang);
  vec3 q = pivot + Ri * (obj - pivot - T);
  // Vaporize inside the void: uniform shrink toward the pivot (similarity,
  // shape preserved) driven by cone depth at the centroid.
  float shrink = mix(0.25, 1.0, smoothstep(-0.5, 0.05, dCp));
  vec3 qs = pivot + (q - pivot) / shrink;
  float dChunk = solidBaseSDF(qs / gRadius) * gRadius * shrink;
  // Borders are tested in the chunk frame (they move with the pieces): a
  // second voronoi at q keeps the carve glued to the rotating chunks, so no
  // ghost shell lingers in the gaps and no static grid slices the pieces.
  vec3 dummy2;
  vec4 vq = voronoi(q * freq, dummy2);
  float borderW = (vq.y - vq.x) / freq;
  gBorderW = borderW;
  float dOpen = max(dChunk, gapHalfWidth(tSince, freq) - borderW);
  // Far-field bound: a rotated/translated chunk field under-reports distance
  // far away (phantom shapes, e.g. along the flight axis). Clamp it to a
  // bounding sphere of the debris; near chunks are unaffected.
  return max(dOpen, length(rel) - (gRadius + 4.5));
}

vec2 opaqueScene(vec3 p, vec3 ro, float bx, float fade, float tSince) {
  float b = bulletSDF(p, bx, fade);
  float g = (uShowGround > 0.5) ? groundSDF(p, ro) : 1000.0;
  vec2 best = (b < g) ? vec2(b, 1.0) : vec2(g, 2.0);
  if (uMode > 0.5) {
    float s = sphereShatterSDF(p, tSince);
    if (s < best.x) {
      best = vec2(s, 3.0);
    }
  }
  return best;
}

vec3 groundNormal(vec3 p, vec3 ro) {
  const float h = 0.004;
  return normalize(vec3(
    groundSDF(p + vec3(h, 0.0, 0.0), ro) - groundSDF(p - vec3(h, 0.0, 0.0), ro),
    groundSDF(p + vec3(0.0, h, 0.0), ro) - groundSDF(p - vec3(0.0, h, 0.0), ro),
    groundSDF(p + vec3(0.0, 0.0, h), ro) - groundSDF(p - vec3(0.0, 0.0, h), ro)));
}

// Distorted shock-cone SDF: base cone + animated compression ripple.
// Integer phase cycles keep the ripple loop-safe.
float coneField(vec3 p, float phase, float fade, float coneOX, float baseR) {
  // baseR unused (kept for call-site stability); the cone below is infinite.
  float behind = coneOX - p.x; // >0 trailing the bullet
  float halfA = radians(uConeAngleDeg * 0.5);
  float sa = sin(halfA);
  float ca = cos(halfA);
  float r = length(vec2(p.y, p.z));
  float t = r * sa + behind * ca;
  // Exact flank distance where the perpendicular foot lands on the surface,
  // apex distance otherwise. Under-reports slightly off-flank: safe for
  // marching (conservative steps), exact sign everywhere.
  float d = (t <= 0.0) ? length(vec2(r, behind)) : r * ca - behind * sa;
  vec3 rq = p * uRippleFreq + vec3(phase * TAU * 4.0, phase * TAU * 6.0, 0.0);
  return d + cnoise(rq) * uRippleAmp * fade;
}

// Smoke density 0..~1: soft ball falloff shaped by fbm billows,
// with the distorted shock cone SUBTRACTED (carved tunnel, rippled walls)
// and the density adapted to air compression (shock shell squeeze,
// core rarefaction, nose stagnation). Returns vec2(density, heat).
vec2 smokeDensityAt(vec3 p, float phase, float dCone, float fade, float coneOX) {
  float heat = 0.0;
  float pushBand = 0.0;
  float shell = 0.0;
  if (fade > 0.0) {
    float cb = dCone * 4.0;
    heat = exp(-cb * cb) * fade;
    float pb = dCone * 3.0;
    pushBand = exp(-pb * pb) * fade;
    float sb = (dCone - 0.12) * 9.0;
    shell = exp(-sb * sb) * fade;
  }
  // Wake trail frame (shared by the heat envelope below and the carve
  // further down): flared at the cone angle so the trail continues the
  // shock-cone surface with no radius step at the junction.
  float trailTan = tan(radians(uConeAngleDeg * 0.5));
  float trailR0 = 0.08;
  float trailAx1 = coneOX + 0.29;
  // Lingering wake heat: analytic age since the nose passed this x-station
  // (straight constant-speed flight inverts exactly: no memory needed).
  // No attenuation: visited trail holds full heat until the loop restarts;
  // unvisited air (including everything behind spawn) stays cold.
  // Feeds glow, churn, suppression and shimmer like live heat.
  if (fade > 0.0) {
    float noseX0 = SMOKE_CENTER.x - uShapeSize + 0.14;
    float tPass = 0.5 + (p.x - noseX0) / 3.2;
    float age = phase * LOOP_DURATION - tPass;
    if (age > 0.0 && tPass > 0.4 && p.x < coneOX + 0.39) {
      float rr = length(p.yz) / max(trailR0 + max(trailAx1 - p.x, 0.0) * trailTan, 0.08);
      heat += exp(-rr * rr) * fade;
    }
  }
  float r = length(p - SMOKE_CENTER) / gRadius;
  if (r > 1.35) {
    return vec2(0.0, heat);
  }
  float fall = clamp(1.0 - r * r, 0.0, 1.0);
  // Shock push: stream the billow domain radially outward around the cone,
  // so smoke slides past the tunnel instead of crossing it.
  vec3 radial = vec3(0.0, p.y, p.z);
  float rl = length(radial);
  vec3 rdir = rl > 0.0001 ? radial / rl : vec3(0.0, 1.0, 0.0);
  // Fixed noise space: xyz is static, only the 4th coordinate (time) moves.
  // Billow domain rotates with the shape; shock push stays world-fixed.
  vec3 sp = gRotInv * (p - SMOKE_CENTER);
  // Persistent wake distance (reused for carving below).
  vec3 conePt = vec3(p.y, trailAx1 - p.x, p.z);
  float trailBackLen = trailAx1 - (SMOKE_CENTER.x - uShapeSize - 0.2);
  float trailR1 = (trailR0 + trailBackLen * trailTan) * fade;
  float dTrail = (fade > 0.0)
    ? sdRoundCone(conePt, trailR0 * fade, trailR1, max(trailBackLen, 0.01))
    : 1e5;
  // Residual bullet wind: circular drift (constant speed, never stalls;
  // integer cycles keep the loop seamless), boosted inside the wake so the
  // smoke animates until end of loop.
  float wakeProx = exp(-pow(max(dTrail, 0.0) * 2.5, 2.0));
  float wAng = loopPhase() * TAU;
  vec3 windOff = vec3(cos(wAng), 0.35 * sin(wAng * 2.0), sin(wAng))
    * (0.12 + wakeProx * (0.25 + uNoiseSpeed * 0.6));
  // Stream smoke out of the cone void (empties it) + wake-confined circular
  // swirl (one seamless turn per loop; zero outside the wake so the noise
  // space stays fixed elsewhere).
  float coneClear = (1.0 - smoothstep(-0.06, 0.15, dCone)) * fade;
  float swS = sin(wAng);
  float swC = cos(wAng);
  vec2 spSwirl = mix(sp.yz, mat2(swC, swS, -swS, swC) * sp.yz, clamp(wakeProx, 0.0, 1.0));
  vec3 q = (vec3(sp.x, spSwirl.x, spSwirl.y) + rdir * (pushBand * uPush * 0.6 + coneClear * 0.5) + windOff) * uNoiseFrequency;
  // 4th dimension = loop-safe noise-time: swings out and back every loop,
  // so the last frame wraps seamlessly while the pattern truly evolves.
  float wAmp = 0.15 + 0.85 * uNoiseSpeed;
  float wTime = sin(phase * TAU * 2.0) * wAmp;
  float f = fbm4(vec4(q, wTime), uNoiseOctaves, uLacunarity, uNoiseGain);
  float filament = smoothstep(-0.25, 0.65, f);
  float dens = pow(fall, 1.5) * mix(0.25, 1.0, filament);
  // Billow erosion chews the silhouette.
  dens *= smoothstep(0.0, 0.45, fall + f * uNoiseAmplitude);
  // Hot air expands: thinner smoke, rippled by compression turbulence.
  if (heat > 0.01) {
    vec3 rq = p * uRippleFreq + vec3(phase * TAU * 4.0, phase * TAU * 6.0, 0.0);
    dens *= (1.0 - 0.7 * heat) * (1.0 + heat * uRippleAmp * 9.0 * cnoise(rq));
  }
  // Air compression adapts the smoke density: the shock front squeezes
  // smoke into a denser shell, the hot core rarefies, and stagnation piles
  // air ahead of the bullet nose. uPush scales the whole response
  // (0 = uniform smoke, carve only).
  float stag = 0.0;
  if (fade > 0.0) {
    float sAhead = p.x - (coneOX + 0.19);
    if (sAhead > -0.1) {
      float sa = sAhead / 0.35;
      float sr = length(p.yz) / 0.30;
      stag = exp(-(sa * sa + sr * sr)) * fade * smoothstep(-0.1, 0.15, sAhead);
    }
  }
  float coreRare = (1.0 - smoothstep(-0.35, 0.05, dCone)) * fade;
  float compression = shell * 1.2 + stag * 0.8 - coreRare * 0.9;
  dens *= clamp(1.0 + uPush * compression, 0.0, 3.0);
  // Only the hot core itself is deleted.
  dens *= mix(1.0, smoothstep(-0.06, 0.06, dCone), fade);
  // Bow-shock channel ahead of the nose: cleared air the bullet flies in,
  // so it stays visible through the cloud (faded with the bullet).
  if (fade > 0.0) {
    // Channel encloses the WHOLE bullet, tail margin overlapping the cone
    // void behind: previously only the nose tip was cleared (cone mouth is
    // narrower than the bullet), so the rear half sat in dense smoke and
    // rendered nibbled, then swallowed.
    vec3 tail = vec3(coneOX - 0.16, 0.0, 0.0);
    vec3 noseTip = vec3(coneOX + 0.19, 0.0, 0.0) + vec3(1.6, 0.0, 0.0);
    float dBow = sdCapsule(p, tail, noseTip, 0.26 * fade);
    dens *= mix(1.0, smoothstep(-0.05, 0.12, dBow), fade);
  }
  // Persistent wake trail: everything the nose has passed stays deleted
  // until the loop restarts (when the bullet teleports home the trail
  // collapses with it). Gated by fade so nothing carves pre-pass.
  dens *= mix(1.0, smoothstep(-0.06, 0.10, dTrail), fade);
  return vec2(max(dens, 0.0), heat);
}

// Henyey-Greenstein-ish scattering lobe (g in [-0.85, 0.85]).
float hgPhase(float cosT, float g) {
  float gg = g * g;
  float denom = 1.0 + gg - 2.0 * g * cosT;
  return (1.0 - gg) / pow(max(denom, 0.001), 1.5);
}

// Analytic ray / bounding-sphere intersect (center = origin).
vec2 intersectSmokeBounds(vec3 ro, vec3 rd, float Rb) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - Rb * Rb;
  float h = b * b - c;
  if (h < 0.0) {
    return vec2(-1.0);
  }
  h = sqrt(h);
  return vec2(-b - h, -b + h);
}

// Analytic ray vs hot wake tube around the flight axis (slab x0..x1,
// radius rad). The volume march can't span 50 units at 24 steps, so the
// glow beyond the smoke ball is integrated in closed form instead —
// no step count, no distance cap. Returns (tEnter, tExit), empty = (1,-1).
vec2 wakeInterval(vec3 ro, vec3 rd, float x0, float x1, float rad) {
  float t0 = 0.0;
  float t1 = uMaxDistance;
  if (abs(rd.x) > 0.0001) {
    float tx0 = (x0 - ro.x) / rd.x;
    float tx1 = (x1 - ro.x) / rd.x;
    t0 = max(t0, min(tx0, tx1));
    t1 = min(t1, max(tx0, tx1));
  } else if (ro.x < x0 || ro.x > x1) {
    return vec2(1.0, -1.0);
  }
  float a = rd.y * rd.y + rd.z * rd.z;
  if (a < 0.00000001) {
    if (dot(ro.yz, ro.yz) > rad * rad) {
      return vec2(1.0, -1.0);
    }
  } else {
    float b = ro.y * rd.y + ro.z * rd.z;
    float c = dot(ro.yz, ro.yz) - rad * rad;
    float h = b * b - a * c;
    if (h < 0.0) {
      return vec2(1.0, -1.0);
    }
    h = sqrt(h);
    t0 = max(t0, (-b - h) / a);
    t1 = min(t1, (-b + h) / a);
  }
  return vec2(t0, t1);
}

// Procedural star field: sparse magnitude-weighted cells, night only.
// Density ~0.8% of cells carry a star (a few thousand across the sky,
// few bright / many dim like the real sky). Twinkle uses integer loop
// cycles so the 8 s loop stays seamless.
vec3 starField(vec3 d, float phase, float nightF) {
  if (d.y < 0.05 || nightF <= 0.0) {
    return vec3(0.0);
  }
  vec2 sp = d.xz / max(d.y, 0.08) * 60.0;
  vec2 cell = floor(sp);
  vec2 pos = fract(sp) - 0.5;
  float h = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
  if (h < 0.992) {
    return vec3(0.0);
  }
  vec2 off = vec2(
    fract(sin(dot(cell, vec2(269.5, 183.3))) * 43758.5453),
    fract(sin(dot(cell, vec2(113.5, 271.9))) * 43758.5453)) - 0.5;
  float dist = length(pos - off * 0.7);
  float mag = pow(fract(h * 57.0), 12.0);
  float tw = 0.75 + 0.25 * sin(phase * TAU * 6.0 + h * 40.0);
  float star = smoothstep(0.08, 0.0, dist) * (0.15 + mag) * tw;
  return vec3(0.9, 0.95, 1.0) * star * nightF;
}

// Physical-ish sky: day/dusk/night blend from sun elevation, sun disc +
// flare, stars at night. uLightDirection IS the sun (set CPU-side from
// azimuth/elevation). Every reflection/refraction in the scene resolves
// through this function, so they all see the same sky.
vec3 backgroundColor(vec3 d, float phase) {
  vec3 sd = normalize(uLightDirection);
  float dayF = smoothstep(-0.10, 0.25, sd.y);   // 0 night -> 1 day
  float nightF = 1.0 - dayF;
  float cb = sd.y * 4.0;
  float duskF = exp(-cb * cb);                  // band around horizon sun
  vec3 zen = mix(vec3(0.008, 0.012, 0.03), uSkyColor * 0.55, dayF);
  vec3 hor = mix(vec3(0.02, 0.03, 0.07),
    mix(vec3(0.65, 0.75, 0.9), uSkyColor, 0.35), dayF);
  float h = clamp(d.y, -1.0, 1.0);
  float grad = pow(clamp(h * 0.5 + 0.5, 0.0, 1.0), 1.4);
  float sunAmt = max(dot(d, sd), 0.0);
  vec3 col = mix(hor, zen, grad)
    + uSunColor * duskF * pow(sunAmt * 0.5 + 0.5, 3.0) * 0.6;
  // Sun disc + flare, gone once the sun sinks past the horizon.
  float sunUp = smoothstep(-0.12, 0.05, sd.y);
  float disc = smoothstep(0.9996, 0.99985, sunAmt);
  float glow = pow(sunAmt, 600.0) * 1.2 + pow(sunAmt, 24.0) * 0.25;
  col += uSunColor * (disc * 3.0 + glow * uFlare) * sunUp;
  // Below horizon: dark ground haze.
  col = mix(col, hor * 0.35, 1.0 - smoothstep(-0.25, 0.0, h));
  // Stars take over at night.
  col += starField(d, phase, nightF * smoothstep(0.02, 0.25, h));
  return col;
}

// Front-to-back volume integration between t0 and t1.
// Returns vec4(rgb, transmittance); heatOD gathers the hot-air column
// (drives the background shimmer after the march).
vec4 marchSmoke(vec3 ro, vec3 rd, float t0, float t1,
    float phase, float fade, float bx, float coneOX, float baseR, float gg,
    inout float heatOD, inout float hitB) {
  vec3 lightDir = normalize(uLightDirection);
  float phaseF = hgPhase(dot(rd, lightDir), gg);
  float dt = (t1 - t0) / float(VOL_STEPS);
  float t = t0 + dt * hash12(gl_FragCoord.xy);
  vec3 col = vec3(0.0);
  float trans = 1.0;
  for (int i = 0; i < VOL_STEPS; ++i) {
    if (t > t1) {
      break;
    }
    vec3 p = ro + rd * t;
    if (bulletSDF(p, bx, fade) < -0.01) {
      hitB = 1.0;  // solid bullet inside the volume kills the ray
      trans = 0.0;
      break;
    }
    float dCone = coneField(p, phase, fade, coneOX, baseR);
    vec2 dh = smokeDensityAt(p, phase, dCone, fade, coneOX);
    float dens = dh.x;
    float heat = dh.y;
    heatOD += heat * trans * dt;
    if (dens > 0.001) {
      float a = 1.0 - exp(-dens * uSmokeDensity * dt);
      vec3 scatter = uSmokeColor * (0.22 + 0.45 * dens)
        + uLightColor * phaseF * uScatter
        + uHeatColor * (heat * uHeatStrength * 2.0);
      col += trans * scatter * a;
      trans *= 1.0 - a;
      if (trans < 0.02) {
        trans = 0.0;
        break;
      }
    }
    // Hot air itself glows even where the smoke runs thin.
    col += trans * uHeatColor * (heat * uHeatStrength * 0.35) * dt;
    t += dt;
  }
  return vec4(col, trans);
}

// Blue -> cyan -> green -> yellow -> red field ramp for debug views.
vec3 debugRamp(float v) {
  v = clamp(v, 0.0, 1.0);
  vec3 c = mix(vec3(0.05, 0.1, 0.5), vec3(0.0, 0.8, 1.0), smoothstep(0.0, 0.35, v));
  c = mix(c, vec3(0.1, 0.9, 0.3), smoothstep(0.35, 0.6, v));
  c = mix(c, vec3(1.0, 0.85, 0.1), smoothstep(0.6, 0.8, v));
  return mix(c, vec3(1.0, 0.1, 0.1), smoothstep(0.8, 1.0, v));
}

// Debug field view through the smoke bounds: peak value along the ray.
// 1 = air compression, 2 = heat, 3 = density, 4 = cone SDF.
vec3 debugMarch(vec3 ro, vec3 rd, float t0, float t1,
    float phase, float fade, float coneOX, float baseR) {
  float dt = (t1 - t0) / float(VOL_STEPS);
  float t = t0;
  float acc = 0.0;
  for (int i = 0; i < VOL_STEPS; ++i) {
    if (t > t1) {
      break;
    }
    vec3 p = ro + rd * t;
    float dCone = coneField(p, phase, fade, coneOX, baseR);
    float v;
    if (uDebugMode < 1.5) {
      // Same compression model as smokeDensityAt (keep in sync).
      float sb = (dCone - 0.12) * 9.0;
      float shell = (fade > 0.0) ? exp(-sb * sb) * fade : 0.0;
      float stag = 0.0;
      if (fade > 0.0) {
        float sAhead = p.x - (coneOX + 0.19);
        if (sAhead > -0.1) {
          float sa = sAhead / 0.35;
          float sr = length(p.yz) / 0.30;
          stag = exp(-(sa * sa + sr * sr)) * fade * smoothstep(-0.1, 0.15, sAhead);
        }
      }
      float coreRare = (1.0 - smoothstep(-0.35, 0.05, dCone)) * fade;
      v = (shell * 1.2 + stag * 0.8 - coreRare * 0.9 + 1.0) / 2.5;
    } else if (uDebugMode < 2.5) {
      v = smokeDensityAt(p, phase, dCone, fade, coneOX).y;
    } else if (uDebugMode < 3.5) {
      v = smokeDensityAt(p, phase, dCone, fade, coneOX).x / 1.5;
    } else {
      v = (dCone + 1.0) * 0.5;
    }
    acc = max(acc, v);
    t += dt;
  }
  return debugRamp(acc);
}

void main() {
  float phase;
  float fade;
  float bx;
  float coneOX;
  float baseR;
  loopState(phase, fade, bx, coneOX, baseR);
  gRot = shapeRotMat(uShapeYaw, uShapePitch, uShapeRoll);
  gRotInv = transpose3(gRot);
  float gg = clamp(uAnisotropy, -0.85, 0.85);

  // --- Build camera basis ---
  vec3 forward = normalize(uCameraForward);
  vec3 right = normalize(cross(forward, uCameraUp));
  vec3 camUp = cross(right, forward);

  // --- Per-pixel ray direction ---
  vec2 uv = vec2(vNdc.x * uAspectRatio, vNdc.y);
  float tanHalfFov = tan(radians(uCameraFov * 0.5));
  vec3 rayOrigin = uCameraPosition;
  vec3 rayDirection = normalize(
    uv.x * tanHalfFov * right +
    uv.y * tanHalfFov * camUp +
    forward
  );

  // --- Opaque march: bullet sphere + perturbed ground slab ---
  // Depth fix: displaced SDF overestimates distance, so a relaxed step can
  // jump OVER the thin slab (tunneling -> smoke renders through the plane).
  // Relax harder with amplitude AND cap near-field steps below the slab
  // thickness; far field keeps full steps.
  float relaxO = 1.0 - 0.6 * clamp(uGroundAmp * 10.0, 0.0, 1.0);
  // Spawn puts the bullet center exactly on the surface: impact at t = 0.
  // Debris motion capped at 6.3 s (all validity bounds hold), then held
  // while smoke and loop continue to 16 s.
  float tSince = min(max(phase * LOOP_DURATION - EXPAND, 0.0), 6.3);
  float tb = uMaxDistance;
  bool opaqueHit = false;
  float hitMat = 0.0;
  vec3 hitPos = vec3(0.0);
  float t = 0.0;
  float prevD = 1e5;
  float prevT = 0.0;
  for (int i = 0; i < MAX_STEPS; ++i) {
    vec3 p = rayOrigin + rayDirection * t;
    vec2 s = opaqueScene(p, rayOrigin, bx, fade, tSince);
    // Hit only when approaching from outside (prevD > 0): a bare d < eps
    // test also fires deep inside hollow regions (gaps capped with noise,
    // banded stop depths). Crossings bracket + bisect to the true wall.
    if (s.x < uEpsilon && prevD > 0.0) {
      if (s.x < 0.0) {
        float ta = prevT;
        float tb2 = t;
        float da = prevD;
        for (int k = 0; k < 6; ++k) {
          float tm = 0.5 * (ta + tb2);
          float dm = opaqueScene(rayOrigin + rayDirection * tm, rayOrigin, bx, fade, tSince).x;
          if ((dm < 0.0) == (da < 0.0)) {
            ta = tm;
            da = dm;
          } else {
            tb2 = tm;
          }
        }
        t = 0.5 * (ta + tb2);
        vec2 sh = opaqueScene(rayOrigin + rayDirection * t, rayOrigin, bx, fade, tSince);
        opaqueHit = true;
        hitMat = sh.y;
        hitPos = rayOrigin + rayDirection * t;
        tb = t;
      } else {
        opaqueHit = true;
        hitMat = s.y;
        hitPos = p;
        tb = t;
      }
      break;
    }
    prevD = s.x;
    prevT = t;
    // abs(): inside, |d| still bounds the forward distance (never step back).
    // Sphere chunks march near-relaxed (smooth rigid pieces converge fast);
    // bullet/slab keep the conservative global factor.
    float rlx = (uMode > 0.5 && s.y > 2.5) ? 0.9 : relaxO;
    float stepO = abs(s.x) * rlx;
    if (abs(s.x) < 1.0) {
      // Tighter cap once shattered: chunk borders are discontinuous, and big
      // steps across them leak rays (flicker / phantom bridges between pieces).
      // Resolution-aware: never step over the local cell size (crater rubble
      // needs finer steps than far plates).
      float nearCap = 0.3;
      if (uMode > 0.5 && tSince > 0.001) {
        nearCap = min(0.12, 0.6 / shardFreqAt(gRotInv * (p - SMOKE_CENTER)));
      }
      stepO = min(stepO, nearCap); // never jump the thin slab near a surface
    }
    t += stepO;
    if (t > uMaxDistance) {
      break;
    }
  }

  // --- Volume march (cloud mode only; sphere mode has no smoke) ---
  float Rb = gRadius * 1.35 + uNoiseAmplitude + 0.3;
  vec2 bounds = intersectSmokeBounds(rayOrigin, rayDirection, Rb);
  float heatOD = 0.0;
  float dummyHit = 0.0;
  vec4 vol = vec4(0.0, 0.0, 0.0, 1.0);
  if (uMode < 0.5 && (bounds.x >= 0.0 || bounds.y > 0.0)) {
    float t0 = max(bounds.x, 0.0);
    float t1 = min(bounds.y, opaqueHit ? tb : bounds.y);
    if (t1 > t0) {
      vol = marchSmoke(rayOrigin, rayDirection, t0, t1,
        phase, fade, bx, coneOX, baseR, gg, heatOD, dummyHit);
    }
  }

  // --- Wake glow beyond the smoke ball (analytic segment, uncapped) ---
  // The volume march covers only the ball; the hot trail runs ~50 units.
  float wlen = 0.0;
  if (uMode < 0.5 && fade > 0.0) {
    vec2 wt = wakeInterval(rayOrigin, rayDirection,
      SMOKE_CENTER.x - uShapeSize - 0.2, coneOX + 0.29, 0.5);
    float tBallExit = (bounds.x >= 0.0 || bounds.y > 0.0) ? max(bounds.y, 0.0) : 0.0;
    wlen = max(min(wt.y, uMaxDistance) - max(wt.x, tBallExit), 0.0);
    heatOD += wlen * 0.15;
  }
  // --- Heat shimmer: hot-air column wobbles the background lookup ---
  float heatN = clamp(heatOD * 2.5, 0.0, 1.0);
  float shimmer = 0.10 * uHeatStrength * heatN;
  vec2 suv = vNdc * 3.0;
  vec2 shim = vec2(
    cnoise(vec3(suv * 2.0, phase * TAU * 2.0)),
    cnoise(vec3(suv * 2.0 + vec2(13.7, 7.1), phase * TAU * 2.0))) * 0.5;
  vec3 bgDir = normalize(rayDirection + (right * shim.x + camUp * shim.y) * shimmer);
  vec3 bg = backgroundColor(bgDir, phase);

  vec3 color;
  if (uDebugMode > 0.5) {
    // Debug field view through the smoke bounds (opaque = dark silhouette).
    color = vec3(0.015, 0.02, 0.04);
    if (bounds.x >= 0.0 || bounds.y > 0.0) {
      float t0 = max(bounds.x, 0.0);
      if (bounds.y > t0) {
        color = debugMarch(rayOrigin, rayDirection, t0, bounds.y,
          phase, fade, coneOX, baseR);
      }
    }
    if (opaqueHit) {
      color *= 0.2;
    }
  } else {
    color = vol.rgb + vol.a * bg;
    // Saturated wake emission (bounded: never blows up down a long tube).
    color += vol.a * uHeatColor * (uHeatStrength * 0.35) * (1.0 - exp(-wlen * 0.8)) * fade;
  }

  // NOTE: no tb-vs-bounds gate on purpose. The volume already stops at
  // min(tb, bounds), so an opaque hit anywhere composites correctly over it.
  // Gating on tb <= bounds.y dropped far hits (outer plane, distant bullet).
  if (uDebugMode < 0.5 && opaqueHit) {
    vec3 lightDir = normalize(uLightDirection);
    if (hitMat < 1.5) {
      // --- Bullet shading over the smoke ---
      const float h = 0.0005;
      vec3 n = normalize(vec3(
        bulletSDF(hitPos + vec3(h, 0.0, 0.0), bx, fade) - bulletSDF(hitPos - vec3(h, 0.0, 0.0), bx, fade),
        bulletSDF(hitPos + vec3(0.0, h, 0.0), bx, fade) - bulletSDF(hitPos - vec3(0.0, h, 0.0), bx, fade),
        bulletSDF(hitPos + vec3(0.0, 0.0, h), bx, fade) - bulletSDF(hitPos - vec3(0.0, 0.0, h), bx, fade)));
      vec3 hvec = normalize(lightDir - rayDirection + vec3(1e-4));
      float diffuseFactor = max(dot(n, lightDir), 0.0);
      float spec = pow(max(dot(n, hvec), 0.0), 90.0);
      float rim = pow(1.0 - clamp(dot(-rayDirection, n), 0.0, 1.0), 3.0);
      vec3 bulletCol = vec3(0.035, 0.04, 0.05)
        + vec3(0.45, 0.5, 0.6) * diffuseFactor * 0.7 * uLightIntensity
        + uLightColor * spec * 1.5
        + uHeatColor * rim * 0.4;
      // Readability floor: smoke between camera and bullet absorbs it to a
      // few percent (Beer-Lambert at density 2), so without this the bullet
      // vanishes inside the cloud from most angles/distances. The floor
      // keeps it rendered everywhere; thin smoke is unaffected (vol.a ~ 1).
      color = vol.rgb + max(vol.a, BULLET_MIN_VIS) * bulletCol;
    } else if (hitMat < 2.5) {
      // --- Ground slab: diffuse + traced smoke reflection + thin-slab refraction ---
      vec3 n = groundNormal(hitPos, rayOrigin);
      float cosT = clamp(dot(-rayDirection, n), 0.0, 1.0);
      float diff = clamp(dot(n, lightDir) * 0.5 + 0.5, 0.0, 1.0);
      vec3 hvec = normalize(lightDir - rayDirection + vec3(1e-4));
      float spec = pow(max(dot(n, hvec), 0.0), 60.0);
      vec3 base = vec3(0.14, 0.16, 0.20) * (0.25 + 0.75 * diff) * uLightIntensity;
      // Reflection ray: march it through the smoke volume.
      vec3 R = reflect(rayDirection, n);
      vec3 roR = hitPos + R * 0.02;
      vec2 rb = intersectSmokeBounds(roR, R, Rb);
      vec3 reflCol = backgroundColor(R, phase);
      if (rb.x >= 0.0 || rb.y > 0.0) {
        float rt0 = max(rb.x, 0.0);
        if (rb.y > rt0) {
          float rHeat = 0.0;
          float rHitB = 0.0;
          vec4 rvol = marchSmoke(roR, R, rt0, rb.y,
            phase, fade, bx, coneOX, baseR, gg, rHeat, rHitB);
          reflCol = rvol.rgb + rvol.a * backgroundColor(R, phase);
          reflCol = mix(reflCol, vec3(0.03, 0.032, 0.04), rHitB);
        }
      }
      // Refraction through the thin slab: bend in, traverse, bend out.
      vec3 refr = refract(rayDirection, n, 1.0 / SLAB_IOR);
      vec3 refrOut = refract(refr, -n, SLAB_IOR);
      if (dot(refrOut, refrOut) < 0.001) {
        refrOut = refr; // grazing total internal reflection: keep inner dir
      }
      float trav = (2.0 * GROUND_HALF.y) / max(dot(-refr, n), 0.25);
      vec3 transCol = backgroundColor(refrOut, phase)
        * exp(-trav * 1.2) * vec3(0.5, 0.6, 0.75);
      float fres = 0.04 + 0.96 * pow(1.0 - cosT, 5.0);
      color = base + uLightColor * spec * 0.5
        + fres * reflCol + (1.0 - fres) * transCol * 0.55;
    } else {
      // --- Plastic red sphere: dielectric shading + voronoi crack lines ---
      // hitBorder must come from the exact hit point: the bisect taps above
      // overwrote the handoff with bracket interiors, so re-evaluate once
      // (return discarded) before the normal taps below overwrite it again.
      sphereShatterSDF(hitPos, tSince);
      float hitBorder = gBorderW;
      const float h = 0.003;
      vec3 n = normalize(vec3(
        sphereShatterSDF(hitPos + vec3(h, 0.0, 0.0), tSince) - sphereShatterSDF(hitPos - vec3(h, 0.0, 0.0), tSince),
        sphereShatterSDF(hitPos + vec3(0.0, h, 0.0), tSince) - sphereShatterSDF(hitPos - vec3(0.0, h, 0.0), tSince),
        sphereShatterSDF(hitPos + vec3(0.0, 0.0, h), tSince) - sphereShatterSDF(hitPos - vec3(0.0, 0.0, h), tSince)));
      vec3 albedo = vec3(0.62, 0.03, 0.04);
      float diffuseFactor = max(dot(n, lightDir), 0.0);
      vec3 hvec = normalize(lightDir - rayDirection + vec3(1e-4));
      float ndh = max(dot(n, hvec), 0.0);
      float spec = pow(ndh, 120.0);
      float clear = pow(ndh, 250.0);
      float fresS = pow(1.0 - clamp(dot(-rayDirection, n), 0.0, 1.0), 5.0);
      vec3 scol = albedo * (0.12 + diffuseFactor) * uLightColor * uLightIntensity
        + vec3(1.0) * spec * 1.1
        + vec3(1.0) * clear * 2.0
        + albedo * fresS * 0.6;
      // Dark crack lines along the moved partition borders.
      float crack = (1.0 - smoothstep(0.0, max(gapHalfWidth(tSince, shardFreqAt(gRotInv * (hitPos - SMOKE_CENTER))) * 1.5, 0.004), hitBorder))
        * clamp(tSince * 2.0, 0.0, 1.0);
      scol *= 1.0 - crack * 0.8;
      color = vol.rgb + vol.a * scol;
    }
  }

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`,vo=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},yo={class:`raymarch-container`},bo={class:`hud`},xo={class:`loop-track`},So={class:`hud-row`},Co={class:`hud-row`},wo={class:`hud-row`},To={class:`hud-row`},Eo={class:`hud-row`},Do={key:0,class:`hud-error`},Oo={class:`controls`},ko={class:`ctl`},Ao={class:`ctl`},jo={class:`ctl`},Mo={class:`ctl`},No={class:`ctl`},Po={class:`ctl`},Fo={key:0},Io={class:`ctl`},Lo={class:`ctl`},Ro={class:`ctl`},zo={class:`ctl`},Bo={class:`ctl`},Vo={class:`ctl`},Ho={class:`ctl`},Uo={class:`ctl`},Wo={class:`ctl`},Go={class:`ctl`},Ko={class:`ctl`},qo={class:`ctl`},Jo={class:`ctl`},Yo={class:`ctl ctl-check`},Xo={class:`ctl`},Zo={class:`ctl`},Qo={class:`ctl`},$o={class:`ctl`},es={class:`ctl`},ts={key:1,class:`controls-note`},ns={key:2,class:`ctl`},rs={class:`ctl`},is={class:`ctl`},as={class:`ctl`},os={class:`ctl`},ss={class:`ctl`},cs={class:`ctl`},ls={class:`ctl`},us={class:`ctl`},ds={class:`ctl`},fs={class:`ctl`},ps=16,ms=1.8,hs=1.3,gs=4,_s=1.2,vs=2.8,ys=12,bs=.0052,xs=vo({__name:`RaymarchCanvas`,setup(e){let t=Mt({maxSteps:64,epsilon:.004,maxDistance:200,camYaw:-1.157,camPitch:-.041,camDist:3.16,cameraUp:[0,1,0],cameraFov:60,sunAzimuth:320,sunElevation:46,sunColor:`#fff3e0`,skyColor:`#4a7ec2`,flare:1.2,size:1.7,shapeYaw:0,shapePitch:0,shapeRoll:0,bulletSpeed:3.2,smokeDensity:2,noiseAmplitude:.8,noiseFrequency:4,noiseOctaves:4,noiseLacunarity:2,noiseGain:.8,noiseSpeed:0,coneAngle:35,coneLength:3.5,rippleAmp:.05,rippleFreq:9,push:1.5,mode:`cloud`,shardMin:.1,groundAmp:.08,groundPeriod:1.2,groundOct:4,groundLac:2,showGround:!1,debugMode:`off`,smokeColor:`#8ea2c8`,heatColor:`#ff7a26`,anisotropy:.3,heatStrength:0,scatter:1,maxDevicePixelRatio:2}),n=la({get:()=>1/t.noiseFrequency,set:e=>{e>0&&(t.noiseFrequency=1/e)}}),r=Vt(null),i=Vt(null),a=Vt(null),o=Vt(null),s=Vt(null),c=Vt(``),l=null,u=null,d={},f=0,p=0,m=0,h=-1,g=0,_=0,v=0,y=new Set,b=0,x=0,S=5;function C(e,t,n,r){let i=e.createShader(t);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(i);throw Error(`${r} compilation failed:\n${t}`)}return i}function w(e,t,n){let r=C(e,e.VERTEX_SHADER,t,`Vertex shader`),i=C(e,e.FRAGMENT_SHADER,n,`Fragment shader`),a=e.createProgram();if(e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){let t=e.getProgramInfoLog(a);throw Error(`Program linking failed:\n${t}`)}return a}function ee(e){let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}function T(e){let t=/^#?([0-9a-f]{6})$/i.exec(String(e).trim());if(!t)return[1,1,1];let n=parseInt(t[1],16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function te(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}function E(){let e=t.sunAzimuth*Math.PI/180,n=t.sunElevation*Math.PI/180,r=[Math.cos(n)*Math.sin(e),Math.sin(n),Math.cos(n)*Math.cos(e)],i=te(-.1,.25,r[1]),a=T(t.sunColor),o=.12+.88*i;return{dir:ee(r),dayF:i,lightColor:[a[0]*o,a[1]*o,a[2]*o],lightIntensity:.04+1.35*i}}function ne(){let e=r.value,n=e.clientWidth||window.innerWidth,i=e.clientHeight||window.innerHeight,a=Math.min(window.devicePixelRatio||1,t.maxDevicePixelRatio),o=Math.floor(n*a),s=Math.floor(i*a),c=2073600,u=o*s;if(u>c){let e=Math.sqrt(c/u);o=Math.max(1,Math.floor(o*e)),s=Math.max(1,Math.floor(s*e))}(e.width!==o||e.height!==s)&&(e.width=o,e.height=s),l.viewport(0,0,e.width,e.height)}function D(){for(let e of`uCameraPosition.uCameraForward.uCameraUp.uCameraFov.uAspectRatio.uShapeSize.uShapeYaw.uShapePitch.uShapeRoll.uBulletSpeed.uSmokeDensity.uSmokeColor.uScatter.uAnisotropy.uHeatColor.uHeatStrength.uNoiseAmplitude.uNoiseFrequency.uNoiseOctaves.uLacunarity.uNoiseGain.uNoiseSpeed.uConeAngleDeg.uConeLength.uPush.uRippleAmp.uRippleFreq.uGroundAmp.uGroundPeriod.uGroundOct.uGroundLac.uMode.uShardMin.uShowGround.uDebugMode.uSunColor.uSkyColor.uFlare.uEpsilon.uMaxDistance.uLightDirection.uLightColor.uLightIntensity.uTime.uResolution`.split(`.`))d[e]=l.getUniformLocation(u,e)}function re(){let e=d;e.uCameraUp&&l.uniform3fv(e.uCameraUp,t.cameraUp),e.uCameraFov&&l.uniform1f(e.uCameraFov,t.cameraFov),e.uEpsilon&&l.uniform1f(e.uEpsilon,t.epsilon),e.uMaxDistance&&l.uniform1f(e.uMaxDistance,t.maxDistance)}function ie(e){let n=r.value,i=d;i.uTime&&l.uniform1f(i.uTime,e),i.uAspectRatio&&l.uniform1f(i.uAspectRatio,n.width/n.height),i.uResolution&&l.uniform2f(i.uResolution,n.width,n.height),i.uShapeSize&&l.uniform1f(i.uShapeSize,t.size),i.uShapeYaw&&l.uniform1f(i.uShapeYaw,t.shapeYaw*Math.PI/180),i.uShapePitch&&l.uniform1f(i.uShapePitch,t.shapePitch*Math.PI/180),i.uShapeRoll&&l.uniform1f(i.uShapeRoll,t.shapeRoll*Math.PI/180),i.uBulletSpeed&&l.uniform1f(i.uBulletSpeed,t.bulletSpeed),i.uSmokeDensity&&l.uniform1f(i.uSmokeDensity,t.smokeDensity),i.uNoiseAmplitude&&l.uniform1f(i.uNoiseAmplitude,t.noiseAmplitude),i.uNoiseFrequency&&l.uniform1f(i.uNoiseFrequency,t.noiseFrequency),i.uNoiseOctaves&&l.uniform1i(i.uNoiseOctaves,Math.max(1,Math.min(8,Math.round(t.noiseOctaves)))),i.uLacunarity&&l.uniform1f(i.uLacunarity,t.noiseLacunarity),i.uNoiseGain&&l.uniform1f(i.uNoiseGain,t.noiseGain),i.uNoiseSpeed&&l.uniform1f(i.uNoiseSpeed,t.noiseSpeed),i.uConeAngleDeg&&l.uniform1f(i.uConeAngleDeg,t.coneAngle),i.uConeLength&&l.uniform1f(i.uConeLength,t.coneLength),i.uPush&&l.uniform1f(i.uPush,t.push),i.uGroundAmp&&l.uniform1f(i.uGroundAmp,t.groundAmp),i.uGroundPeriod&&l.uniform1f(i.uGroundPeriod,t.groundPeriod),i.uGroundOct&&l.uniform1i(i.uGroundOct,Math.max(1,Math.min(8,Math.round(t.groundOct)))),i.uGroundLac&&l.uniform1f(i.uGroundLac,t.groundLac),i.uMode&&l.uniform1f(i.uMode,{cloud:0,sphere:1,cube:2}[t.mode]??0),i.uShardMin&&l.uniform1f(i.uShardMin,t.shardMin),i.uShowGround&&l.uniform1f(i.uShowGround,+!!t.showGround),i.uDebugMode&&l.uniform1f(i.uDebugMode,{off:0,compression:1,heat:2,density:3,cone:4}[t.debugMode]??0),i.uRippleAmp&&l.uniform1f(i.uRippleAmp,t.rippleAmp),i.uRippleFreq&&l.uniform1f(i.uRippleFreq,t.rippleFreq),i.uSmokeColor&&l.uniform3fv(i.uSmokeColor,T(t.smokeColor)),i.uScatter&&l.uniform1f(i.uScatter,t.scatter),i.uAnisotropy&&l.uniform1f(i.uAnisotropy,t.anisotropy),i.uHeatColor&&l.uniform3fv(i.uHeatColor,T(t.heatColor)),i.uHeatStrength&&l.uniform1f(i.uHeatStrength,t.heatStrength);let a=E();i.uLightDirection&&l.uniform3fv(i.uLightDirection,a.dir),i.uLightColor&&l.uniform3fv(i.uLightColor,a.lightColor),i.uLightIntensity&&l.uniform1f(i.uLightIntensity,a.lightIntensity),i.uSunColor&&l.uniform3fv(i.uSunColor,T(t.sunColor)),i.uSkyColor&&l.uniform3fv(i.uSkyColor,T(t.skyColor)),i.uFlare&&l.uniform1f(i.uFlare,t.flare)}function O(e){if(e.ctrlKey||e.metaKey||e.altKey)return;let t=e.target&&e.target.tagName||``;if(t===`INPUT`||t===`TEXTAREA`||t===`SELECT`)return;let n=e.key.toLowerCase();(n===`w`||n===`a`||n===`s`||n===`d`||n===`q`||n===`e`||n===`shift`||n===`arrowup`||n===`arrowdown`||n===`arrowleft`||n===`arrowright`)&&(y.add(n),e.preventDefault())}function ae(e){y.delete(e.key.toLowerCase())}function k(e){let n=y.has(`shift`)?2.5:1;(y.has(`a`)||y.has(`arrowleft`))&&(t.camYaw-=ms*n*e),(y.has(`d`)||y.has(`arrowright`))&&(t.camYaw+=ms*n*e),(y.has(`w`)||y.has(`arrowup`))&&(t.camPitch+=hs*n*e),(y.has(`s`)||y.has(`arrowdown`))&&(t.camPitch-=hs*n*e),y.has(`q`)&&(t.camDist-=gs*n*e),y.has(`e`)&&(t.camDist+=gs*n*e),t.camPitch=Math.max(-1.2,Math.min(_s,t.camPitch)),t.camDist=Math.max(vs,Math.min(ys,t.camDist));let r=1-Math.exp(-e*10);b+=(t.camYaw-b)*r,x+=(t.camPitch-x)*r,S+=(t.camDist-S)*r;let i=Math.cos(x),a=[S*i*Math.sin(b),S*Math.sin(x),S*i*Math.cos(b)],s=ee([-a[0],-a[1],-a[2]]),c=d;c.uCameraPosition&&l.uniform3fv(c.uCameraPosition,a),c.uCameraForward&&l.uniform3fv(c.uCameraForward,s),o.value&&(o.value.textContent=`[${a.map(e=>e.toFixed(2)).join(`, `)}]`)}function oe(e){ne();let t=(e-p)/1e3,n=m?e-m:16.7,r=Math.min(.1,n/1e3||.016);if(m=e,h=h<0?n:h+(n-h)*.08,g+=1,_=Math.max(_,n),v+=n,v>=500&&s.value){let e=g*1e3/v;s.value.textContent=`${h.toFixed(1)}ms · ${e.toFixed(0)}fps · worst ${_.toFixed(1)}ms`,g=0,_=0,v=0}k(r),ie(t);let o=t%ps/ps;i.value&&(i.value.style.transform=`scaleX(${o})`),a.value&&(a.value.textContent=`${(o*ps).toFixed(1)}s / ${ps.toFixed(0)}s`),l.drawArrays(l.TRIANGLES,0,3),f=requestAnimationFrame(oe)}function se(){l&&ne()}function ce(){y.clear()}let A=new Map,le=0;function ue(e){if(e.pointerType!==`mouse`||e.button===0){try{r.value.setPointerCapture(e.pointerId)}catch{}if(A.set(e.pointerId,{x:e.clientX,y:e.clientY}),A.size===2){let[e,t]=[...A.values()];le=Math.hypot(e.x-t.x,e.y-t.y)}}}function de(e){let n=A.get(e.pointerId);if(!n)return;let r={x:e.clientX,y:e.clientY};if(A.set(e.pointerId,r),A.size===1)t.camYaw+=(r.x-n.x)*bs,t.camPitch-=(r.y-n.y)*bs;else if(A.size===2){let[e,n]=[...A.values()],r=Math.hypot(e.x-n.x,e.y-n.y);le>0&&r>0&&(t.camDist=Math.max(vs,Math.min(ys,t.camDist*(le/r)))),le=r}}function fe(e){A.delete(e.pointerId),le=0}function j(e){e.preventDefault();let n=e.deltaMode===1?e.deltaY*16:e.deltaY;t.camDist=Math.max(vs,Math.min(ys,t.camDist*Math.exp(n*.001)))}return Zn(()=>{let e=r.value;try{let n={antialias:!1,depth:!1,stencil:!1,alpha:!1,preserveDrawingBuffer:!1,desynchronized:!0,powerPreference:`high-performance`};if(l=e.getContext(`webgl2`,n)||e.getContext(`webgl`,n)||e.getContext(`experimental-webgl`),!l)throw Error(`WebGL is not supported by this browser.`);u=w(l,go,_o),l.useProgram(u);let r=new Float32Array([-1,-1,3,-1,-1,3]),i=l.createBuffer();l.bindBuffer(l.ARRAY_BUFFER,i),l.bufferData(l.ARRAY_BUFFER,r,l.STATIC_DRAW);let a=l.getAttribLocation(u,`aPosition`);if(a<0)throw Error(`Attribute 'aPosition' not found in vertex shader.`);l.enableVertexAttribArray(a),l.vertexAttribPointer(a,2,l.FLOAT,!1,0,0),D(),re(),window.addEventListener(`resize`,se),window.addEventListener(`keydown`,O),window.addEventListener(`keyup`,ae),window.addEventListener(`blur`,ce),e.addEventListener(`pointerdown`,ue),e.addEventListener(`pointermove`,de),e.addEventListener(`pointerup`,fe),e.addEventListener(`pointercancel`,fe),e.addEventListener(`wheel`,j,{passive:!1}),b=t.camYaw,x=t.camPitch,S=t.camDist,ne(),p=performance.now(),m=0,f=requestAnimationFrame(oe)}catch(e){c.value=e instanceof Error?e.message:String(e),console.error(e)}}),tr(()=>{cancelAnimationFrame(f),window.removeEventListener(`resize`,se),window.removeEventListener(`keydown`,O),window.removeEventListener(`keyup`,ae),window.removeEventListener(`blur`,ce),r.value?.removeEventListener(`pointerdown`,ue),r.value?.removeEventListener(`pointermove`,de),r.value?.removeEventListener(`pointerup`,fe),r.value?.removeEventListener(`pointercancel`,fe),r.value?.removeEventListener(`wheel`,j),y.clear(),A.clear(),l&&u&&(l.deleteProgram(u),u=null)}),(e,l)=>(Ci(),Oi(`div`,yo,[X(`canvas`,{ref_key:`canvasRef`,ref:r,class:`raymarch-canvas`},null,512),X(`div`,bo,[l[41]||=X(`div`,{class:`hud-title`},`Smoke + Shockwave`,-1),X(`div`,xo,[X(`div`,{ref_key:`loopBarRef`,ref:i,class:`loop-fill`},null,512)]),X(`div`,So,[l[36]||=X(`span`,null,`March steps`,-1),X(`code`,null,N(t.maxSteps),1)]),X(`div`,Co,[l[37]||=X(`span`,null,`Frame`,-1),X(`code`,{ref_key:`frameMsEl`,ref:s},`-- ms · -- fps`,512)]),X(`div`,wo,[l[38]||=X(`span`,null,`Camera pos`,-1),X(`code`,{ref_key:`camPosEl`,ref:o},`[0.00, 0.00, 5.00]`,512)]),l[42]||=X(`div`,{class:`hud-row hud-hint`},[X(`span`,null,`Drag / WASD orbit · wheel zoom`)],-1),X(`div`,To,[l[39]||=X(`span`,null,`Sun`,-1),X(`code`,null,N(t.sunAzimuth.toFixed(0))+`° / `+N(t.sunElevation.toFixed(0))+`°`,1)]),X(`div`,Eo,[l[40]||=X(`span`,null,`Loop`,-1),X(`code`,{ref_key:`phaseEl`,ref:a},`0.0s / 16s`,512)]),c.value?(Ci(),Oi(`div`,Do,N(c.value),1)):zi(``,!0)]),X(`div`,Oo,[l[82]||=X(`div`,{class:`controls-title`},`Shape`,-1),X(`label`,ko,[l[44]||=X(`span`,null,`Shape`,-1),K(X(`select`,{"onUpdate:modelValue":l[0]||=e=>t.mode=e,class:`debug-select`},[...l[43]||=[X(`option`,{value:`cloud`},`Cloud`,-1),X(`option`,{value:`sphere`},`Sphere`,-1),X(`option`,{value:`cube`},`Cube`,-1)]],512),[[io,t.mode]])]),X(`label`,Ao,[X(`span`,null,[l[45]||=Z(`Size `,-1),X(`code`,null,N(t.size.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`1`,max:`2.5`,step:`0.05`,"onUpdate:modelValue":l[1]||=e=>t.size=e},null,512),[[$,t.size,void 0,{number:!0}]])]),X(`label`,jo,[X(`span`,null,[l[46]||=Z(`Yaw `,-1),X(`code`,null,N(t.shapeYaw.toFixed(0))+`°`,1)]),K(X(`input`,{type:`range`,min:`-180`,max:`180`,step:`1`,"onUpdate:modelValue":l[2]||=e=>t.shapeYaw=e},null,512),[[$,t.shapeYaw,void 0,{number:!0}]])]),X(`label`,Mo,[X(`span`,null,[l[47]||=Z(`Pitch `,-1),X(`code`,null,N(t.shapePitch.toFixed(0))+`°`,1)]),K(X(`input`,{type:`range`,min:`-180`,max:`180`,step:`1`,"onUpdate:modelValue":l[3]||=e=>t.shapePitch=e},null,512),[[$,t.shapePitch,void 0,{number:!0}]])]),X(`label`,No,[X(`span`,null,[l[48]||=Z(`Roll `,-1),X(`code`,null,N(t.shapeRoll.toFixed(0))+`°`,1)]),K(X(`input`,{type:`range`,min:`-180`,max:`180`,step:`1`,"onUpdate:modelValue":l[4]||=e=>t.shapeRoll=e},null,512),[[$,t.shapeRoll,void 0,{number:!0}]])]),l[83]||=X(`div`,{class:`controls-title`},`Bullet`,-1),X(`label`,Po,[X(`span`,null,[l[49]||=Z(`Speed `,-1),X(`code`,null,N(t.bulletSpeed.toFixed(1)),1)]),K(X(`input`,{type:`range`,min:`0.5`,max:`8`,step:`0.1`,"onUpdate:modelValue":l[5]||=e=>t.bulletSpeed=e},null,512),[[$,t.bulletSpeed,void 0,{number:!0}]])]),t.mode===`cloud`?(Ci(),Oi(`div`,Fo,[l[58]||=X(`div`,{class:`controls-title`},`Smoke`,-1),X(`label`,Io,[X(`span`,null,[l[50]||=Z(`Density `,-1),X(`code`,null,N(t.smokeDensity.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`2`,step:`0.05`,"onUpdate:modelValue":l[6]||=e=>t.smokeDensity=e},null,512),[[$,t.smokeDensity,void 0,{number:!0}]])]),X(`label`,Lo,[X(`span`,null,[l[51]||=Z(`Billow `,-1),X(`code`,null,N(t.noiseAmplitude.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`0.8`,step:`0.01`,"onUpdate:modelValue":l[7]||=e=>t.noiseAmplitude=e},null,512),[[$,t.noiseAmplitude,void 0,{number:!0}]])]),X(`label`,Ro,[X(`span`,null,[l[52]||=Z(`Frequency `,-1),X(`code`,null,N(t.noiseFrequency.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0.5`,max:`4`,step:`0.05`,"onUpdate:modelValue":l[8]||=e=>t.noiseFrequency=e},null,512),[[$,t.noiseFrequency,void 0,{number:!0}]])]),X(`label`,zo,[X(`span`,null,[l[53]||=Z(`Period `,-1),X(`code`,null,N(n.value.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0.25`,max:`2`,step:`0.05`,"onUpdate:modelValue":l[9]||=e=>n.value=e},null,512),[[$,n.value,void 0,{number:!0}]])]),X(`label`,Bo,[X(`span`,null,[l[54]||=Z(`Octaves `,-1),X(`code`,null,N(t.noiseOctaves),1)]),K(X(`input`,{type:`range`,min:`1`,max:`8`,step:`1`,"onUpdate:modelValue":l[10]||=e=>t.noiseOctaves=e},null,512),[[$,t.noiseOctaves,void 0,{number:!0}]])]),X(`label`,Vo,[X(`span`,null,[l[55]||=Z(`Lacunarity `,-1),X(`code`,null,N(t.noiseLacunarity.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`1.5`,max:`4`,step:`0.05`,"onUpdate:modelValue":l[11]||=e=>t.noiseLacunarity=e},null,512),[[$,t.noiseLacunarity,void 0,{number:!0}]])]),X(`label`,Ho,[X(`span`,null,[l[56]||=Z(`Gain `,-1),X(`code`,null,N(t.noiseGain.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0.2`,max:`0.8`,step:`0.01`,"onUpdate:modelValue":l[12]||=e=>t.noiseGain=e},null,512),[[$,t.noiseGain,void 0,{number:!0}]])]),X(`label`,Uo,[X(`span`,null,[l[57]||=Z(`Flow speed `,-1),X(`code`,null,N(t.noiseSpeed.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`1.5`,step:`0.05`,"onUpdate:modelValue":l[13]||=e=>t.noiseSpeed=e},null,512),[[$,t.noiseSpeed,void 0,{number:!0}]])])])):zi(``,!0),l[84]||=X(`div`,{class:`controls-title`},`Shockwave`,-1),X(`label`,Wo,[X(`span`,null,[l[59]||=Z(`Cone angle `,-1),X(`code`,null,N(t.coneAngle.toFixed(1))+`°`,1)]),K(X(`input`,{type:`range`,min:`10`,max:`35`,step:`0.5`,"onUpdate:modelValue":l[14]||=e=>t.coneAngle=e},null,512),[[$,t.coneAngle,void 0,{number:!0}]])]),X(`label`,Go,[X(`span`,null,[l[60]||=Z(`Cone length `,-1),X(`code`,null,N(t.coneLength.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`1.5`,max:`3.5`,step:`0.1`,"onUpdate:modelValue":l[15]||=e=>t.coneLength=e},null,512),[[$,t.coneLength,void 0,{number:!0}]])]),X(`label`,Ko,[X(`span`,null,[l[61]||=Z(`Ripple amp `,-1),X(`code`,null,N(t.rippleAmp.toFixed(3)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`0.15`,step:`0.005`,"onUpdate:modelValue":l[16]||=e=>t.rippleAmp=e},null,512),[[$,t.rippleAmp,void 0,{number:!0}]])]),X(`label`,qo,[X(`span`,null,[l[62]||=Z(`Ripple freq `,-1),X(`code`,null,N(t.rippleFreq.toFixed(1)),1)]),K(X(`input`,{type:`range`,min:`2`,max:`20`,step:`0.5`,"onUpdate:modelValue":l[17]||=e=>t.rippleFreq=e},null,512),[[$,t.rippleFreq,void 0,{number:!0}]])]),X(`label`,Jo,[X(`span`,null,[l[63]||=Z(`Shock push `,-1),X(`code`,null,N(t.push.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`1.5`,step:`0.05`,"onUpdate:modelValue":l[18]||=e=>t.push=e},null,512),[[$,t.push,void 0,{number:!0}]])]),l[85]||=X(`div`,{class:`controls-title`},`Ground`,-1),X(`label`,Yo,[X(`span`,null,[l[64]||=Z(`Visible `,-1),K(X(`input`,{type:`checkbox`,"onUpdate:modelValue":l[19]||=e=>t.showGround=e},null,512),[[no,t.showGround]])])]),X(`label`,Xo,[X(`span`,null,[l[65]||=Z(`Perturb amp `,-1),X(`code`,null,N(t.groundAmp.toFixed(3)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`0.3`,step:`0.005`,"onUpdate:modelValue":l[20]||=e=>t.groundAmp=e},null,512),[[$,t.groundAmp,void 0,{number:!0}]])]),X(`label`,Zo,[X(`span`,null,[l[66]||=Z(`Period `,-1),X(`code`,null,N(t.groundPeriod.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0.25`,max:`4`,step:`0.05`,"onUpdate:modelValue":l[21]||=e=>t.groundPeriod=e},null,512),[[$,t.groundPeriod,void 0,{number:!0}]])]),X(`label`,Qo,[X(`span`,null,[l[67]||=Z(`Octaves `,-1),X(`code`,null,N(t.groundOct),1)]),K(X(`input`,{type:`range`,min:`1`,max:`8`,step:`1`,"onUpdate:modelValue":l[22]||=e=>t.groundOct=e},null,512),[[$,t.groundOct,void 0,{number:!0}]])]),X(`label`,$o,[X(`span`,null,[l[68]||=Z(`Lacunarity `,-1),X(`code`,null,N(t.groundLac.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`1.5`,max:`4`,step:`0.05`,"onUpdate:modelValue":l[23]||=e=>t.groundLac=e},null,512),[[$,t.groundLac,void 0,{number:!0}]])]),l[86]||=X(`div`,{class:`controls-title`},`Debug`,-1),X(`label`,es,[l[70]||=X(`span`,null,`Field view`,-1),K(X(`select`,{"onUpdate:modelValue":l[24]||=e=>t.debugMode=e,class:`debug-select`},[...l[69]||=[Ri(`<option value="off" data-v-5f8991a3>Off</option><option value="compression" data-v-5f8991a3>Air compression</option><option value="heat" data-v-5f8991a3>Heat</option><option value="density" data-v-5f8991a3>Density</option><option value="cone" data-v-5f8991a3>Cone SDF</option>`,5)]],512),[[io,t.debugMode]])]),l[87]||=X(`div`,{class:`controls-title`},`Shatter`,-1),t.mode===`cloud`?(Ci(),Oi(`div`,ts,`Switch to a solid mode above.`)):zi(``,!0),t.mode===`cloud`?zi(``,!0):(Ci(),Oi(`label`,ns,[X(`span`,null,[l[71]||=Z(`Min shard `,-1),X(`code`,null,N(t.shardMin.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0.02`,max:`0.5`,step:`0.01`,"onUpdate:modelValue":l[25]||=e=>t.shardMin=e},null,512),[[$,t.shardMin,void 0,{number:!0}]])])),l[88]||=X(`div`,{class:`controls-title`},`Sky & sun`,-1),X(`label`,rs,[X(`span`,null,[l[72]||=Z(`Azimuth `,-1),X(`code`,null,N(t.sunAzimuth.toFixed(0))+`°`,1)]),K(X(`input`,{type:`range`,min:`0`,max:`360`,step:`1`,"onUpdate:modelValue":l[26]||=e=>t.sunAzimuth=e},null,512),[[$,t.sunAzimuth,void 0,{number:!0}]])]),X(`label`,is,[X(`span`,null,[l[73]||=Z(`Elevation `,-1),X(`code`,null,N(t.sunElevation.toFixed(0))+`°`,1)]),K(X(`input`,{type:`range`,min:`-15`,max:`90`,step:`1`,"onUpdate:modelValue":l[27]||=e=>t.sunElevation=e},null,512),[[$,t.sunElevation,void 0,{number:!0}]])]),X(`label`,as,[l[74]||=X(`span`,null,`Sun colour`,-1),K(X(`input`,{type:`color`,"onUpdate:modelValue":l[28]||=e=>t.sunColor=e},null,512),[[$,t.sunColor]])]),X(`label`,os,[l[75]||=X(`span`,null,`Sky colour`,-1),K(X(`input`,{type:`color`,"onUpdate:modelValue":l[29]||=e=>t.skyColor=e},null,512),[[$,t.skyColor]])]),X(`label`,ss,[X(`span`,null,[l[76]||=Z(`Flare `,-1),X(`code`,null,N(t.flare.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`3`,step:`0.05`,"onUpdate:modelValue":l[30]||=e=>t.flare=e},null,512),[[$,t.flare,void 0,{number:!0}]])]),l[89]||=X(`div`,{class:`controls-title`},`Light & heat`,-1),X(`label`,cs,[l[77]||=X(`span`,null,`Smoke colour`,-1),K(X(`input`,{type:`color`,"onUpdate:modelValue":l[31]||=e=>t.smokeColor=e},null,512),[[$,t.smokeColor]])]),X(`label`,ls,[l[78]||=X(`span`,null,`Heat colour`,-1),K(X(`input`,{type:`color`,"onUpdate:modelValue":l[32]||=e=>t.heatColor=e},null,512),[[$,t.heatColor]])]),X(`label`,us,[X(`span`,null,[l[79]||=Z(`Anisotropy `,-1),X(`code`,null,N(t.anisotropy.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`-0.85`,max:`0.85`,step:`0.05`,"onUpdate:modelValue":l[33]||=e=>t.anisotropy=e},null,512),[[$,t.anisotropy,void 0,{number:!0}]])]),X(`label`,ds,[X(`span`,null,[l[80]||=Z(`Heat `,-1),X(`code`,null,N(t.heatStrength.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`3`,step:`0.05`,"onUpdate:modelValue":l[34]||=e=>t.heatStrength=e},null,512),[[$,t.heatStrength,void 0,{number:!0}]])]),X(`label`,fs,[X(`span`,null,[l[81]||=Z(`Scatter `,-1),X(`code`,null,N(t.scatter.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`2.5`,step:`0.05`,"onUpdate:modelValue":l[35]||=e=>t.scatter=e},null,512),[[$,t.scatter,void 0,{number:!0}]])])])]))}},[[`__scopeId`,`data-v-5f8991a3`]]);po({__name:`App`,setup(e){return(e,t)=>(Ci(),ki(xs))}}).mount(`#app`);