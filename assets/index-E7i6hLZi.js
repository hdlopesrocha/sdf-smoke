(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var t={},n=[],r=()=>{},i=()=>!1,a=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),o=e=>e.startsWith(`onUpdate:`),s=Object.assign,c=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},l=Object.prototype.hasOwnProperty,u=(e,t)=>l.call(e,t),d=Array.isArray,f=e=>x(e)===`[object Map]`,p=e=>x(e)===`[object Set]`,m=e=>x(e)===`[object Date]`,h=e=>typeof e==`function`,g=e=>typeof e==`string`,_=e=>typeof e==`symbol`,v=e=>typeof e==`object`&&!!e,y=e=>(v(e)||h(e))&&h(e.then)&&h(e.catch),b=Object.prototype.toString,x=e=>b.call(e),S=e=>x(e).slice(8,-1),C=e=>x(e)===`[object Object]`,w=e=>g(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,ee=e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),te=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ne=/-\w/g,T=te(e=>e.replace(ne,e=>e.slice(1).toUpperCase())),re=/\B([A-Z])/g,E=te(e=>e.replace(re,`-$1`).toLowerCase()),D=te(e=>e.charAt(0).toUpperCase()+e.slice(1)),O=te(e=>e?`on${D(e)}`:``),k=(e,t)=>!Object.is(e,t),ie=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},A=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},ae=e=>{let t=parseFloat(e);return isNaN(t)?e:t},oe,se=()=>oe||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function ce(e){if(d(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=g(r)?fe(r):ce(r);if(i)for(let e in i)t[e]=i[e]}return t}if(g(e)||v(e))return e}var le=/;(?![^(]*\))/g,ue=/:([^]+)/,de=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function fe(e){let t={};return e.replace(de,e=>e.startsWith(`/*`)?``:e).split(le).forEach(e=>{if(e){let n=e.split(ue);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function j(e){let t=``;if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){let r=j(e[n]);r&&(t+=r+` `)}else if(v(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var pe=`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`,me=e(pe);pe+``;function he(e){return!!e||e===``}function ge(e,t,n){if(e.length!==t.length)return!1;let r=!0;for(let i=0;r&&i<e.length;i++)r=be(e[i],t[i],n);return r}function _e(e,t,n){if(e.size!==t.size)return!1;let r=Array.from(t),i=new Uint8Array(r.length);for(let t of e){let e=-1;for(let a=0;a<r.length;a++)if(!i[a]&&be(t,r[a],n)){e=a;break}if(e<0)return!1;i[e]=1}return!0}function ve(e,t,n){let r=f(e),i=f(t);if(r||i||(r=p(e),i=p(t),r||i))return r&&i?_e(e,t,n):!1;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let r in e){let i=e.hasOwnProperty(r),a=t.hasOwnProperty(r);if(i&&!a||!i&&a||!be(e[r],t[r],n))return!1}return String(e)===String(t)}function ye(e,t,n,r){n||=[new Map,new Map];let[i,a]=n;if(i.has(e)||a.has(t))return i.get(e)===t&&a.get(t)===e;i.set(e,t),a.set(t,e);let o=r(e,t,n);return i.delete(e),a.delete(t),o}function be(e,t,n){if(e===t)return!0;let r=m(e),i=m(t);return r||i?r&&i?e.getTime()===t.getTime():!1:(r=_(e),i=_(t),r||i?e===t:(r=d(e),i=d(t),r||i?r&&i?ye(e,t,n,ge):!1:(r=v(e),i=v(t),r||i?!r||!i?!1:ye(e,t,n,ve):String(e)===String(t))))}var xe=e=>!!(e&&e.__v_isRef===!0),M=e=>g(e)?e:e==null?``:d(e)||v(e)&&(e.toString===b||!h(e.toString))?xe(e)?M(e.value):JSON.stringify(e,Se,2):String(e),Se=(e,t)=>xe(t)?Se(e,t.value):f(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[Ce(t,r)+` =>`]=n,e),{})}:p(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Ce(e))}:_(t)?Ce(t):v(t)&&!d(t)&&!C(t)?String(t):t,Ce=(e,t=``)=>_(e)?`Symbol(${e.description??t})`:e,N,we=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&N&&(N.active?(this.parent=N,this.index=(N.scopes||(N.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}let n=this.effects.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}}run(e){if(this._active){let t=N;try{return N=this,e()}finally{N=t}}}on(){++this._on===1&&(this.prevScope=N,N=this)}off(){if(this._on>0&&--this._on===0){if(N===this)N=this.prevScope;else{let e=N;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){let e=this.scopes.slice();for(t=0,n=e.length;t<n;t++)e[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Te(){return N}var P,Ee=new WeakSet,De=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,N&&(N.active?N.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ee.has(this)&&(Ee.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||je(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ue(this),Pe(this);let e=P,t=F;P=this,F=!0;try{return this.fn()}finally{Fe(this),P=e,F=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Re(e);this.deps=this.depsTail=void 0,Ue(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ee.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ie(this)&&this.run()}get dirty(){return Ie(this)}},Oe=0,ke,Ae;function je(e,t=!1){if(e.flags|=8,t){e.next=Ae,Ae=e;return}e.next=ke,ke=e}function Me(){Oe++}function Ne(){if(--Oe>0)return;if(Ae){let e=Ae;for(Ae=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;ke;){let t=ke;for(ke=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Pe(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Fe(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Re(r),ze(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ie(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Le(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Le(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===We)||(e.globalVersion=We,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ie(e))))return;e.flags|=2;let t=e.dep,n=P,r=F;P=e,F=!0;try{Pe(e);let n=e.fn(e._value);(t.version===0||k(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{P=n,F=r,Fe(e),e.flags&=-3}}function Re(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Re(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function ze(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var F=!0,Be=[];function Ve(){Be.push(F),F=!1}function He(){let e=Be.pop();F=e===void 0||e}function Ue(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=P;P=void 0;try{t()}finally{P=e}}}var We=0,Ge=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},Ke=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!P||!F||P===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==P)t=this.activeLink=new Ge(P,this),P.deps?(t.prevDep=P.depsTail,P.depsTail.nextDep=t,P.depsTail=t):P.deps=P.depsTail=t,qe(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=P.depsTail,t.nextDep=void 0,P.depsTail.nextDep=t,P.depsTail=t,P.deps===t&&(P.deps=e)}return t}trigger(e){this.version++,We++,this.notify(e)}notify(e){Me();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ne()}}};function qe(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)qe(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Je=new WeakMap,Ye=Symbol(``),Xe=Symbol(``),Ze=Symbol(``);function I(e,t,n){if(F&&P){let t=Je.get(e);t||Je.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new Ke),r.map=t,r.key=n),r.track()}}function Qe(e,t,n,r,i,a){let o=Je.get(e);if(!o){We++;return}let s=e=>{e&&e.trigger()};if(Me(),t===`clear`)o.forEach(s);else{let i=d(e),a=i&&w(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Ze||!_(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Ze)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(Ye)),f(e)&&s(o.get(Xe)));break;case`delete`:i||(s(o.get(Ye)),f(e)&&s(o.get(Xe)));break;case`set`:f(e)&&s(o.get(Ye))}}Ne()}function $e(e){let t=z(e);return t===e||(I(t,`iterate`,Ze),R(e))?t:It(e)?Ft(e)?t.map(e=>zt(B(e))):t.map(zt):t.map(B)}function et(e){return I(e=z(e),`iterate`,Ze),e}function L(e,t){return It(e)?zt(Ft(e)?B(t):t):B(t)}var tt={__proto__:null,[Symbol.iterator](){return nt(this,Symbol.iterator,e=>L(this,e))},concat(...e){return $e(this).concat(...e.map(e=>d(e)?$e(e):e))},entries(){return nt(this,`entries`,e=>(e[1]=L(this,e[1]),e))},every(e,t){return it(this,`every`,e,t,void 0,arguments)},filter(e,t){return it(this,`filter`,e,t,e=>e.map(e=>L(this,e)),arguments)},find(e,t){return it(this,`find`,e,t,e=>L(this,e),arguments)},findIndex(e,t){return it(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return it(this,`findLast`,e,t,e=>L(this,e),arguments)},findLastIndex(e,t){return it(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return it(this,`forEach`,e,t,void 0,arguments)},includes(...e){return ot(this,`includes`,e)},indexOf(...e){return ot(this,`indexOf`,e)},join(e){return $e(this).join(e)},lastIndexOf(...e){return ot(this,`lastIndexOf`,e)},map(e,t){return it(this,`map`,e,t,void 0,arguments)},pop(){return st(this,`pop`)},push(...e){return st(this,`push`,e)},reduce(e,...t){return at(this,`reduce`,e,t)},reduceRight(e,...t){return at(this,`reduceRight`,e,t)},shift(){return st(this,`shift`)},some(e,t){return it(this,`some`,e,t,void 0,arguments)},splice(...e){return st(this,`splice`,e)},toReversed(){return $e(this).toReversed()},toSorted(e){return $e(this).toSorted(e)},toSpliced(...e){return $e(this).toSpliced(...e)},unshift(...e){return st(this,`unshift`,e)},values(){return nt(this,`values`,e=>L(this,e))}};function nt(e,t,n){let r=et(e),i=r[t]();return r!==e&&!R(e)&&(i._next=i.next,i.next=()=>{let e=i._next();return e.done||(e.value=n(e.value)),e}),i}var rt=Array.prototype;function it(e,t,n,r,i,a){let o=et(e),s=o!==e&&!R(e),c=o[t];if(c!==rt[t]){let t=c.apply(e,a);return s?B(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,L(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function at(e,t,n,r){let i=et(e),a=i!==e&&!R(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=L(e,t)),n.call(this,t,L(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?L(e,c):c}function ot(e,t,n){let r=z(e);I(r,`iterate`,Ze);let i=r[t](...n);return(i===-1||i===!1)&&Lt(n[0])?(n[0]=z(n[0]),r[t](...n)):i}function st(e,t,n=[]){Ve(),Me();let r=z(e)[t].apply(e,n);return Ne(),He(),r}var ct=e(`__proto__,__v_isRef,__isVue`),lt=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(_));function ut(e){_(e)||(e=String(e));let t=z(this);return I(t,`has`,e),t.hasOwnProperty(e)}var dt=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?kt:Ot:i?Dt:Et).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=d(e);if(!r){let e;if(a&&(e=tt[t]))return e;if(t===`hasOwnProperty`)return ut}let o=Reflect.get(e,t,V(e)?e:n);if((_(t)?lt.has(t):ct(t))||(r||I(e,`get`,t),i))return o;if(V(o)){let e=a&&w(t)?o:o.value;return r&&v(e)?Nt(e):e}return v(o)?r?Nt(o):jt(o):o}},ft=class extends dt{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=d(e)&&w(t);if(!this._isShallow){let e=It(i);if(!R(n)&&!It(n)&&(i=z(i),n=z(n)),!a&&V(i)&&!V(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:u(e,t),s=Reflect.set(e,t,n,V(e)?e:r);return e===z(r)&&s&&(o?k(n,i)&&Qe(e,`set`,t,n,i):Qe(e,`add`,t,n)),s}deleteProperty(e,t){let n=u(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&Qe(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return(!_(t)||!lt.has(t))&&I(e,`has`,t),n}ownKeys(e){return I(e,`iterate`,d(e)?`length`:Ye),Reflect.ownKeys(e)}},pt=class extends dt{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},mt=new ft,ht=new pt,gt=new ft(!0),_t=e=>e,vt=e=>Reflect.getPrototypeOf(e);function yt(e,t,n){return function(...r){let i=this.__v_raw,a=z(i),o=f(a),c=e===`entries`||e===Symbol.iterator&&o,l=e===`keys`&&o,u=i[e](...r),d=n?_t:t?zt:B;return!t&&I(a,`iterate`,l?Xe:Ye),s(Object.create(u),{next(){let{value:e,done:t}=u.next();return t?{value:e,done:t}:{value:c?[d(e[0]),d(e[1])]:d(e),done:t}}})}}function bt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function xt(e,t){let n={get(n){let r=this.__v_raw,i=z(r),a=z(n);e||(k(n,a)&&I(i,`get`,n),I(i,`get`,a));let{has:o}=vt(i),s=t?_t:e?zt:B;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&I(z(t),`iterate`,Ye),t.size},has(t){let n=this.__v_raw,r=z(n),i=z(t);return e||(k(t,i)&&I(r,`has`,t),I(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=z(a),s=t?_t:e?zt:B;return!e&&I(o,`iterate`,Ye),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return s(n,e?{add:bt(`add`),set:bt(`set`),delete:bt(`delete`),clear:bt(`clear`)}:{add(e){let n=z(this),r=vt(n),i=z(e),a=!t&&!R(e)&&!It(e)?i:e;return r.has.call(n,a)||k(e,a)&&r.has.call(n,e)||k(i,a)&&r.has.call(n,i)||(n.add(a),Qe(n,`add`,a,a)),this},set(e,n){!t&&!R(n)&&!It(n)&&(n=z(n));let r=z(this),{has:i,get:a}=vt(r),o=i.call(r,e);o||=(e=z(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?k(n,s)&&Qe(r,`set`,e,n,s):Qe(r,`add`,e,n),this},delete(e){let t=z(this),{has:n,get:r}=vt(t),i=n.call(t,e);i||=(e=z(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&Qe(t,`delete`,e,void 0,a),o},clear(){let e=z(this),t=e.size!==0,n=e.clear();return t&&Qe(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=yt(r,e,t)}),n}function St(e,t){let n=xt(e,t);return(t,r,i)=>r===`__v_isReactive`?!e:r===`__v_isReadonly`?e:r===`__v_raw`?t:Reflect.get(u(n,r)&&r in t?n:t,r,i)}var Ct={get:St(!1,!1)},wt={get:St(!1,!0)},Tt={get:St(!0,!1)},Et=new WeakMap,Dt=new WeakMap,Ot=new WeakMap,kt=new WeakMap;function At(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function jt(e){return It(e)?e:Pt(e,!1,mt,Ct,Et)}function Mt(e){return Pt(e,!1,gt,wt,Dt)}function Nt(e){return Pt(e,!0,ht,Tt,Ot)}function Pt(e,t,n,r,i){if(!v(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=At(S(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function Ft(e){return It(e)?Ft(e.__v_raw):!!(e&&e.__v_isReactive)}function It(e){return!!(e&&e.__v_isReadonly)}function R(e){return!!(e&&e.__v_isShallow)}function Lt(e){return e?!!e.__v_raw:!1}function z(e){let t=e&&e.__v_raw;return t?z(t):e}function Rt(e){return!u(e,`__v_skip`)&&Object.isExtensible(e)&&A(e,`__v_skip`,!0),e}var B=e=>v(e)?jt(e):e,zt=e=>v(e)?Nt(e):e;function V(e){return e?e.__v_isRef===!0:!1}function Bt(e){return Vt(e,!1)}function Vt(e,t){return V(e)?e:new Ht(e,t)}var Ht=class{constructor(e,t){this.dep=new Ke,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:z(e),this._value=t?e:B(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||R(e)||It(e);e=n?e:z(e),k(e,t)&&(this._rawValue=e,this._value=n?e:B(e),this.dep.trigger())}};function Ut(e){return V(e)?e.value:e}var Wt={get:(e,t,n)=>t===`__v_raw`?e:Ut(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return V(i)&&!V(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Gt(e){return Ft(e)?e:new Proxy(e,Wt)}var Kt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Ke(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=We-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&P!==this)return je(this,!0),!0}get value(){let e=this.dep.track();return Le(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function qt(e,t,n=!1){let r,i;return h(e)?r=e:(r=e.get,i=e.set),new Kt(r,i,n)}var Jt={},Yt=new WeakMap,Xt=void 0;function Zt(e,t=!1,n=Xt){if(n){let t=Yt.get(n);t||Yt.set(n,t=[]),t.push(e)}}function Qt(e,n,i=t){let{immediate:a,deep:o,once:s,scheduler:l,augmentJob:u,call:f}=i,p=e=>o?e:R(e)||o===!1||o===0?$t(e,1):$t(e),m,g,_,v,y=!1,b=!1;if(V(e)?(g=()=>e.value,y=R(e)):Ft(e)?(g=()=>p(e),y=!0):d(e)?(b=!0,y=e.some(e=>Ft(e)||R(e)),g=()=>e.map(e=>{if(V(e))return e.value;if(Ft(e))return p(e);if(h(e))return f?f(e,2):e()})):g=h(e)?n?f?()=>f(e,2):e:()=>{if(_){Ve();try{_()}finally{He()}}let t=Xt;Xt=m;try{return f?f(e,3,[v]):e(v)}finally{Xt=t}}:r,n&&o){let e=g,t=o===!0?1/0:o;g=()=>$t(e(),t)}let x=Te(),S=()=>{m.stop(),x&&x.active&&c(x.effects,m)};if(s&&n){let e=n;n=(...t)=>{let n=e(...t);return S(),n}}let C=b?Array(e.length).fill(Jt):Jt,w=e=>{if(m.flags&1&&(m.dirty||e)){if(n){let t=m.run();if(e||o||y||(b?t.some((e,t)=>k(e,C[t])):k(t,C))){_&&_();let e=Xt;Xt=m;try{let e=[t,C===Jt?void 0:b&&C[0]===Jt?[]:C,v];C=t,f?f(n,3,e):n(...e)}finally{Xt=e}}}else m.run()}};return u&&u(w),m=new De(g),m.scheduler=l?()=>l(w,!1):w,v=e=>Zt(e,!1,m),_=m.onStop=()=>{let e=Yt.get(m);if(e){if(f)f(e,4);else for(let t of e)t();Yt.delete(m)}},n?a?w(!0):C=m.run():l?l(w.bind(null,!0),!0):m.run(),S.pause=m.pause.bind(m),S.resume=m.resume.bind(m),S.stop=S,S}function $t(e,t=1/0,n){if(t<=0||!v(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,V(e))$t(e.value,t,n);else if(d(e))for(let r=0;r<e.length;r++)$t(e[r],t,n);else if(p(e)||f(e))e.forEach(e=>{$t(e,t,n)});else if(C(e)){for(let r in e)$t(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&$t(e[r],t,n)}return e}function en(e,t,n,r){try{return r?e(...r):e()}catch(e){tn(e,t,n)}}function H(e,t,n,r){if(h(e)){let i=en(e,t,n,r);return i&&y(i)&&i.catch(e=>{tn(e,t,n)}),i}if(d(e)){let i=[];for(let a=0;a<e.length;a++)i.push(H(e[a],t,n,r));return i}}function tn(e,n,r,i=!0){let a=n?n.vnode:null,{errorHandler:o,throwUnhandledErrorInProduction:s}=n&&n.appContext.config||t;if(n){let t=n.parent,i=n.proxy,a=`https://vuejs.org/error-reference/#runtime-${r}`;for(;t;){let n=t.ec;if(n){for(let t=0;t<n.length;t++)if(n[t](e,i,a)===!1)return}t=t.parent}if(o){Ve(),en(o,null,10,[e,i,a]),He();return}}nn(e,r,a,i,s)}function nn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var U=[],W=-1,rn=[],an=null,on=0,sn=Promise.resolve(),cn=null;function ln(e){let t=cn||sn;return e?t.then(this?e.bind(this):e):t}function un(e){let t=W+1,n=U.length;for(;t<n;){let r=t+n>>>1,i=U[r],a=gn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function dn(e){if(!(e.flags&1)){let t=gn(e),n=U[U.length-1];!n||!(e.flags&2)&&t>=gn(n)?U.push(e):U.splice(un(t),0,e),e.flags|=1,fn()}}function fn(){cn||=sn.then(_n)}function pn(e){if(!d(e))an&&e.id===-1?an.splice(on+1,0,e):e.flags&1||(rn.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)rn.push(e[t]);fn()}function mn(e,t,n=W+1){for(;n<U.length;n++){let t=U[n];if(t&&t.flags&2){if(e&&t.id!==e.uid)continue;U.splice(n,1),n--,t.flags&4&&(t.flags&=-2),t(),t.flags&4||(t.flags&=-2)}}}function hn(e){if(rn.length){let e=[...new Set(rn)].sort((e,t)=>gn(e)-gn(t));if(rn.length=0,an){for(let t=0;t<e.length;t++)an.push(e[t]);return}for(an=e,on=0;on<an.length;on++){let e=an[on];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}an=null,on=0}}var gn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function _n(e){try{for(W=0;W<U.length;W++){let e=U[W];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),en(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;W<U.length;W++){let e=U[W];e&&(e.flags&=-2)}W=-1,U.length=0,hn(e),cn=null,(U.length||rn.length)&&_n(e)}}var G=null,vn=null;function yn(e){let t=G;return G=e,vn=e&&e.type.__scopeId||null,t}function bn(e,t=G,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Ti(-1);let i=yn(t),a=xi.length,o;try{o=e(...n)}finally{for(let e=xi.length;e>a;e--)Ci();yn(i),r._d&&Ti(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function K(e,n){if(G===null)return e;let r=aa(G),i=e.dirs||=[];for(let e=0;e<n.length;e++){let[a,o,s,c=t]=n[e];a&&(h(a)&&(a={mounted:a,updated:a}),a.deep&&$t(o),i.push({dir:a,instance:r,value:o,oldValue:void 0,arg:s,modifiers:c}))}return e}function xn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(Ve(),H(c,n,8,[e.el,s,e,t]),He())}}function Sn(e,t){if(Q){let n=Q.provides,r=Q.parent&&Q.parent.provides;r===n&&(n=Q.provides=Object.create(r)),n[e]=t}}function Cn(e,t,n=!1){let r=Ki();if(r||Or){let i=Or?Or._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&h(t)?t.call(r&&r.proxy):t}}var wn=Symbol.for(`v-scx`),Tn=()=>Cn(wn);function En(e,t,n){return Dn(e,t,n)}function Dn(e,n,i=t){let{immediate:a,deep:o,flush:c,once:l}=i,u=s({},i),d=n&&a||!n&&c!==`post`,f;if(Qi){if(c===`sync`){let e=Tn();f=e.__watcherHandles||=[]}else if(!d){let e=()=>{};return e.stop=r,e.resume=r,e.pause=r,e}}let p=Q;u.call=(e,t,n)=>H(e,p,t,n);let m=!1;c===`post`?u.scheduler=e=>{J(e,p&&p.suspense)}:c!==`sync`&&(m=!0,u.scheduler=(e,t)=>{t?e():dn(e)}),u.augmentJob=e=>{n&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=Qt(e,n,u);return Qi&&(f?f.push(h):d&&h()),h}function On(e,t,n){let r=this.proxy,i=g(e)?e.includes(`.`)?kn(r,e):()=>r[e]:e.bind(r,r),a;h(t)?a=t:(a=t.handler,n=t);let o=Yi(this),s=Dn(i,a.bind(r),n);return o(),s}function kn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var An=Symbol(`_vte`),jn=e=>e.__isTeleport,Mn=Symbol(`_leaveCb`);function Nn(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==yi){t=n;break}}return t}function Pn(e){if(!Hn(e))return jn(e.type)&&e.children?Nn(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&h(n.default))return n.default()}}function Fn(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;Fn(jn(n.type)&&Pn(n)||n,t)}else e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function In(e){e.ids=[e.ids[0]+e.ids[2]+++`-`,0,0]}function Ln(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var Rn=new WeakMap;function zn(e,n,r,a,o=!1){if(d(e)){e.forEach((e,t)=>zn(e,n&&(d(n)?n[t]:n),r,a,o));return}if(Vn(a)&&!o){a.shapeFlag&512&&a.type.__asyncResolved&&a.component.subTree.component&&zn(e,n,r,a.component.subTree);return}let s=a.shapeFlag&4?aa(a.component):a.el,l=o?null:s,{i:f,r:p}=e,m=n&&n.r,_=f.refs===t?f.refs={}:f.refs,v=f.setupState,y=z(v),b=v===t?i:e=>!Ln(_,e)&&u(y,e),x=(e,t)=>!(t&&Ln(_,t));if(m!=null&&m!==p){if(Bn(n),g(m))_[m]=null,b(m)&&(v[m]=null);else if(V(m)){let e=n;x(m,e.k)&&(m.value=null),e.k&&(_[e.k]=null)}}if(h(p))en(p,f,12,[l,_]);else{let t=g(p),n=V(p);if(t||n){let i=()=>{if(e.f){let n=t?b(p)?v[p]:_[p]:x(p)||!e.k?p.value:_[e.k];if(o)d(n)&&c(n,s);else if(d(n))n.includes(s)||n.push(s);else if(t)_[p]=[s],b(p)&&(v[p]=_[p]);else{let t=[s];x(p,e.k)&&(p.value=t),e.k&&(_[e.k]=t)}}else t?(_[p]=l,b(p)&&(v[p]=l)):n&&(x(p,e.k)&&(p.value=l),e.k&&(_[e.k]=l))};if(l){let t=()=>{i(),Rn.delete(e)};t.id=-1,Rn.set(e,t),J(t,r)}else Bn(e),i()}}}function Bn(e){let t=Rn.get(e);t&&(t.flags|=8,Rn.delete(e))}se().requestIdleCallback,se().cancelIdleCallback;var Vn=e=>!!e.type.__asyncLoader,Hn=e=>e.type.__isKeepAlive;function Un(e,t){Gn(e,`a`,t)}function Wn(e,t){Gn(e,`da`,t)}function Gn(e,t,n=Q){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(qn(t,r,n),n){let e=n.parent;for(;e&&e.parent;)Hn(e.parent.vnode)&&Kn(r,t,n,e),e=e.parent}}function Kn(e,t,n,r){let i=qn(t,e,r,!0);er(()=>{c(r[t],i)},n)}function qn(e,t,n=Q,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{Ve();let i=Yi(n),a=H(t,n,e,r);return i(),He(),a};return r?i.unshift(a):i.push(a),a}}var Jn=e=>(t,n=Q)=>{(!Qi||e===`sp`)&&qn(e,(...e)=>t(...e),n)},Yn=Jn(`bm`),Xn=Jn(`m`),Zn=Jn(`bu`),Qn=Jn(`u`),$n=Jn(`bum`),er=Jn(`um`),tr=Jn(`sp`),nr=Jn(`rtg`),rr=Jn(`rtc`);function ir(e,t=Q){qn(`ec`,e,t)}var ar=Symbol.for(`v-ndc`),or=e=>e?Zi(e)?aa(e):or(e.parent):null,sr=s(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>or(e.parent),$root:e=>or(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>gr(e),$forceUpdate:e=>e.f||=()=>{dn(e.update)},$nextTick:e=>e.n||=ln.bind(e.proxy),$watch:e=>On.bind(e)}),cr=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),lr={get({_:e},n){if(n===`__v_skip`)return!0;let{ctx:r,setupState:i,data:a,props:o,accessCache:s,type:c,appContext:l}=e;if(n[0]!==`$`){let e=s[n];if(e!==void 0)switch(e){case 1:return i[n];case 2:return a[n];case 4:return r[n];case 3:return o[n]}else if(cr(i,n))return s[n]=1,i[n];else if(a!==t&&u(a,n))return s[n]=2,a[n];else if(u(o,n))return s[n]=3,o[n];else if(r!==t&&u(r,n))return s[n]=4,r[n];else dr&&(s[n]=0)}let d=sr[n],f,p;if(d)return n===`$attrs`&&I(e.attrs,`get`,``),d(e);if((f=c.__cssModules)&&(f=f[n]))return f;if(r!==t&&u(r,n))return s[n]=4,r[n];if(p=l.config.globalProperties,u(p,n))return p[n]},set({_:e},n,r){let{data:i,setupState:a,ctx:o}=e;return cr(a,n)?(a[n]=r,!0):i!==t&&u(i,n)?(i[n]=r,!0):u(e.props,n)||n[0]===`$`&&n.slice(1)in e?!1:(o[n]=r,!0)},has({_:{data:e,setupState:n,accessCache:r,ctx:i,appContext:a,props:o,type:s}},c){let l;return!!(r[c]||e!==t&&c[0]!==`$`&&u(e,c)||cr(n,c)||u(o,c)||u(i,c)||u(sr,c)||u(a.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?u(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function ur(e){return d(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var dr=!0;function fr(e){let t=gr(e),n=e.proxy,i=e.ctx;dr=!1,t.beforeCreate&&mr(t.beforeCreate,e,`bc`);let{data:a,computed:o,methods:s,watch:c,provide:l,inject:u,created:f,beforeMount:p,mounted:m,beforeUpdate:g,updated:_,activated:y,deactivated:b,beforeDestroy:x,beforeUnmount:S,destroyed:C,unmounted:w,render:ee,renderTracked:te,renderTriggered:ne,errorCaptured:T,serverPrefetch:re,expose:E,inheritAttrs:D,components:O,directives:k,filters:ie}=t;if(u&&pr(u,i,null),s)for(let e in s){let t=s[e];h(t)&&(i[e]=t.bind(n))}if(a){let t=a.call(n,n);v(t)&&(e.data=jt(t))}if(dr=!0,o)for(let e in o){let t=o[e],a=sa({get:h(t)?t.bind(n,n):h(t.get)?t.get.bind(n,n):r,set:!h(t)&&h(t.set)?t.set.bind(n):r});Object.defineProperty(i,e,{enumerable:!0,configurable:!0,get:()=>a.value,set:e=>a.value=e})}if(c)for(let e in c)hr(c[e],i,n,e);if(l){let e=h(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{Sn(t,e[t])})}f&&mr(f,e,`c`);function A(e,t){d(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(A(Yn,p),A(Xn,m),A(Zn,g),A(Qn,_),A(Un,y),A(Wn,b),A(ir,T),A(rr,te),A(nr,ne),A($n,S),A(er,w),A(tr,re),d(E)){if(E.length){let t=e.exposed||={};E.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={}}ee&&e.render===r&&(e.render=ee),D!=null&&(e.inheritAttrs=D),O&&(e.components=O),k&&(e.directives=k),re&&In(e)}function pr(e,t,n=r){d(e)&&(e=xr(e));for(let n in e){let r=e[n],i;i=v(r)?`default`in r?Cn(r.from||n,r.default,!0):Cn(r.from||n):Cn(r),V(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function mr(e,t,n){H(d(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function hr(e,t,n,r){let i=r.includes(`.`)?kn(n,r):()=>n[r];if(g(e)){let n=t[e];h(n)&&En(i,n)}else if(h(e))En(i,e.bind(n));else if(v(e)){if(d(e))e.forEach(e=>hr(e,t,n,r));else{let r=h(e.handler)?e.handler.bind(n):t[e.handler];h(r)&&En(i,r,e)}}}function gr(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>_r(c,e,o,!0)),_r(c,t,o)),v(t)&&a.set(t,c),c}function _r(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&_r(e,a,n,!0),i&&i.forEach(t=>_r(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=vr[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var vr={data:yr,props:Cr,emits:Cr,methods:Sr,computed:Sr,beforeCreate:q,created:q,beforeMount:q,mounted:q,beforeUpdate:q,updated:q,beforeDestroy:q,beforeUnmount:q,destroyed:q,unmounted:q,activated:q,deactivated:q,errorCaptured:q,serverPrefetch:q,components:Sr,directives:Sr,watch:wr,provide:yr,inject:br};function yr(e,t){return t?e?function(){return s(h(e)?e.call(this,this):e,h(t)?t.call(this,this):t)}:t:e}function br(e,t){return Sr(xr(e),xr(t))}function xr(e){if(d(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function q(e,t){return e?[...new Set([].concat(e,t))]:t}function Sr(e,t){return e?s(Object.create(null),e,t):t}function Cr(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:s(Object.create(null),ur(e),ur(t??{})):t}function wr(e,t){if(!e)return t;if(!t)return e;let n=s(Object.create(null),e);for(let r in t)n[r]=q(e[r],t[r]);return n}function Tr(){return{app:null,config:{isNativeTag:i,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Er=0;function Dr(e,t){return function(n,r=null){h(n)||(n=s({},n)),r!=null&&!v(r)&&(r=null);let i=Tr(),a=new WeakSet,o=[],c=!1,l=i.app={_uid:Er++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:ca,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&h(e.install)?(a.add(e),e.install(l,...t)):h(e)&&(a.add(e),e(l,...t))),l},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),l},component(e,t){return t?(i.components[e]=t,l):i.components[e]},directive(e,t){return t?(i.directives[e]=t,l):i.directives[e]},mount(a,o,s){if(!c){let u=l._ceVNode||Ni(n,r);return u.appContext=i,s===!0?s=`svg`:s===!1&&(s=void 0),o&&t?t(u,a):e(u,a,s),c=!0,l._container=a,a.__vue_app__=l,aa(u.component)}},onUnmount(e){o.push(e)},unmount(){c&&(H(o,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return i.provides[e]=t,l},runWithContext(e){let t=Or;Or=l;try{return e()}finally{Or=t}}};return l}}var Or=null,kr=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${T(t)}Modifiers`]||e[`${E(t)}Modifiers`];function Ar(e,n,...r){if(e.isUnmounted)return;let i=e.vnode.props||t,a=r,o=n.startsWith(`update:`),s=o&&kr(i,n.slice(7));s&&(s.trim&&(a=r.map(e=>g(e)?e.trim():e)),s.number&&(a=a.map(ae)));let c,l=i[c=O(n)]||i[c=O(T(n))];!l&&o&&(l=i[c=O(E(n))]),l&&H(l,e,6,a);let u=i[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,H(u,e,6,a)}}var jr=new WeakMap;function Mr(e,t,n=!1){let r=n?jr:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},c=!1;if(!h(e)){let r=e=>{let n=Mr(e,t,!0);n&&(c=!0,s(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!c?(v(e)&&r.set(e,null),null):(d(a)?a.forEach(e=>o[e]=null):s(o,a),v(e)&&r.set(e,o),o)}function Nr(e,t){return!e||!a(t)?!1:(t=t.slice(2),t=t===`Once`?t:t.replace(/Once$/,``),u(e,t[0].toLowerCase()+t.slice(1))||u(e,E(t))||u(e,t))}function Pr(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:s,attrs:c,emit:l,render:u,renderCache:d,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=yn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=Ri(u.call(t,e,d,f,m,p,h)),y=c}else{let e=t;v=Ri(e.length>1?e(f,{attrs:c,slots:s,emit:l}):e(f,null)),y=t.props?c:Fr(c)}}catch(t){xi.length=0,tn(t,e,1),v=Ni(yi)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(o)&&(y=Ir(y,a)),b=Ii(b,y,!1,!0))}return n.dirs&&(b=Ii(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&Fn(jn(b.type)&&Pn(b)||b,n.transition),v=b,yn(_),v}var Fr=e=>{let t;for(let n in e)(n===`class`||n===`style`||a(n))&&((t||={})[n]=e[n]);return t},Ir=(e,t)=>{let n={};for(let r in e)(!o(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Lr(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Rr(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(zr(o,r,n)&&!Nr(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?!o||Rr(r,o,l):!!o;return!1}function Rr(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(zr(t,e,a)&&!Nr(n,a))return!0}return!1}function zr(e,t,n){let r=e[n],i=t[n];return n===`style`&&v(r)&&v(i)?!be(r,i):r!==i}function Br({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var Vr={},Hr=()=>Object.create(Vr),Ur=e=>Object.getPrototypeOf(e)===Vr;function Wr(e,t,n,r=!1){let i={},a=Hr();e.propsDefaults=Object.create(null),Kr(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);e.props=n?r?i:Mt(i):e.type.props?i:a,e.attrs=a}function Gr(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=z(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(Nr(e.emitsOptions,o))continue;let d=t[o];if(c){if(u(a,o))d!==a[o]&&(a[o]=d,l=!0);else{let t=T(o);i[t]=qr(c,s,t,d,e,!1)}}else d!==a[o]&&(a[o]=d,l=!0)}}}else{Kr(e,t,i,a)&&(l=!0);let r;for(let a in s)(!t||!u(t,a)&&((r=E(a))===a||!u(t,r)))&&(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=qr(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)(!t||!u(t,e))&&(delete a[e],l=!0)}l&&Qe(e.attrs,`set`,``)}function Kr(e,n,r,i){let[a,o]=e.propsOptions,s=!1,c;if(n)for(let t in n){if(ee(t))continue;let l=n[t],d;a&&u(a,d=T(t))?!o||!o.includes(d)?r[d]=l:(c||={})[d]=l:Nr(e.emitsOptions,t)||(!(t in i)||l!==i[t])&&(i[t]=l,s=!0)}if(o){let n=z(r),i=c||t;for(let t=0;t<o.length;t++){let s=o[t];r[s]=qr(a,n,s,i[s],e,!u(i,s))}}return s}function qr(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=u(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&h(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=Yi(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===E(n))&&(r=!0))}return r}var Jr=new WeakMap;function Yr(e,r,i=!1){let a=i?Jr:r.propsCache,o=a.get(e);if(o)return o;let c=e.props,l={},f=[],p=!1;if(!h(e)){let t=e=>{p=!0;let[t,n]=Yr(e,r,!0);s(l,t),n&&f.push(...n)};!i&&r.mixins.length&&r.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!p)return v(e)&&a.set(e,n),n;if(d(c))for(let e=0;e<c.length;e++){let n=T(c[e]);Xr(n)&&(l[n]=t)}else if(c)for(let e in c){let t=T(e);if(Xr(t)){let n=c[e],r=l[t]=d(n)||h(n)?{type:n}:s({},n),i=r.type,a=!1,o=!0;if(d(i))for(let e=0;e<i.length;++e){let t=i[e],n=h(t)&&t.name;if(n===`Boolean`){a=!0;break}n===`String`&&(o=!1)}else a=h(i)&&i.name===`Boolean`;r[0]=a,r[1]=o,(a||u(r,`default`))&&f.push(t)}}let m=[l,f];return v(e)&&a.set(e,m),m}function Xr(e){return e[0]!==`$`&&!ee(e)}var Zr=e=>e===`_`||e===`_ctx`||e===`$stable`,Qr=e=>d(e)?e.map(Ri):[Ri(e)],$r=(e,t,n)=>{if(t._n)return t;let r=bn((...e)=>Qr(t(...e)),n);return r._c=!1,r},ei=(e,t,n)=>{let r=e._ctx;for(let n in e){if(Zr(n))continue;let i=e[n];if(h(i))t[n]=$r(n,i,r);else if(i!=null){let e=Qr(i);t[n]=()=>e}}},ti=(e,t)=>{let n=Qr(t);e.slots.default=()=>n},ni=(e,t,n)=>{for(let r in t)(n||!Zr(r))&&(e[r]=t[r])},ri=(e,t,n)=>{let r=e.slots=Hr();if(e.vnode.shapeFlag&32){let e=t._;e?(ni(r,t,n),n&&A(r,`_`,e,!0)):ei(t,r)}else t&&ti(e,t)},ii=(e,n,r)=>{let{vnode:i,slots:a}=e,o=!0,s=t;if(i.shapeFlag&32){let e=n._;e?r&&e===1?o=!1:ni(a,n,r):(o=!n.$stable,ei(n,a)),s=n}else n&&(ti(e,n),s={default:1});if(o)for(let e in a)!Zr(e)&&s[e]==null&&delete a[e]},J=gi;function ai(e){return oi(e)}function oi(e,i){let a=se();a.__VUE__=!0;let{insert:o,remove:s,patchProp:c,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=r,insertStaticContent:_}=e,v=(e,t,r,i=null,a=null,o=null,s=void 0,c=null,l=!!t.dynamicChildren)=>{if(e===t)return;e&&!Ai(e,t)&&(i=_e(e),j(e,a,o,!0),e=null),t.patchFlag===-2&&(l=!1,t.dynamicChildren=null),t.dynamicChildren&&e&&e.dynamicChildren&&e.dynamicChildren.hasOnce&&(t.dynamicChildren===n&&(t.dynamicChildren=[]),t.dynamicChildren.hasOnce=!0);let{type:u,ref:d,shapeFlag:f}=t;switch(u){case vi:y(e,t,r,i);break;case yi:b(e,t,r,i);break;case bi:e??x(t,r,i,s);break;case _i:O(e,t,r,i,a,o,s,c,l);break;default:f&1?w(e,t,r,i,a,o,s,c,l):f&6?k(e,t,r,i,a,o,s,c,l):(f&64||f&128)&&u.process(e,t,r,i,a,o,s,c,l,be)}d!=null&&a?zn(d,e&&e.ref,o,t||e,!t):d==null&&e&&e.ref!=null&&zn(e.ref,null,o,e,!0)},y=(e,t,n,r)=>{if(e==null)o(t.el=u(t.children),n,r);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,r)=>{e==null?o(t.el=d(t.children||``),n,r):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,r)=>{let i;for(;e&&e!==t;)i=h(e),o(e,n,r),e=i;o(t,n,r)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),s(e),e=n;s(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)te(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),re(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},te=(e,t,n,r,i,a,s,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,a,m&&m.is,m),h&8?p(d,e.children):h&16&&T(e.children,d,null,r,i,si(e,a),s,u),_&&xn(e,null,r,`created`),ne(d,e,e.scopeId,s,r),m){for(let e in m)e!==`value`&&!ee(e)&&c(d,e,null,m[e],a,r);`value`in m&&c(d,`value`,null,m.value,a),(f=m.onVnodeBeforeMount)&&Hi(f,r,e)}_&&xn(e,null,r,`beforeMount`);let v=li(i,g);v&&g.beforeEnter(d),o(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&J(()=>{try{f&&Hi(f,r,e),v&&g.enter(d),_&&xn(e,null,r,`mounted`)}finally{}},i)},ne=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||hi(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;ne(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},T=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++){let c=e[l]=s?zi(e[l]):Ri(e[l]);v(null,c,t,n,r,i,a,o,s)}},re=(e,n,r,i,a,o,s)=>{let l=n.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=n;u|=e.patchFlag&16;let m=e.props||t,h=n.props||t,g;if(r&&ci(r,!1),(g=h.onVnodeBeforeUpdate)&&Hi(g,r,n,e),f&&xn(n,e,r,`beforeUpdate`),r&&ci(r,!0),d&&(!e.dynamicChildren||e.dynamicChildren.length!==d.length)&&(u=0,s=!1,d=null),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?E(e.dynamicChildren,d,l,r,i,si(n,a),o):s||le(e,n,l,null,r,i,si(n,a),o,!1),u>0){if(u&16)D(l,m,h,r,a);else if(u&2&&m.class!==h.class&&c(l,`class`,null,h.class,a),u&4&&c(l,`style`,m.style,h.style,a),u&8){let e=n.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t],i=m[n],o=h[n];(o!==i||n===`value`)&&c(l,n,i,o,a,r)}}u&1&&e.children!==n.children&&p(l,n.children)}else!s&&d==null&&D(l,m,h,r,a);((g=h.onVnodeUpdated)||f)&&J(()=>{g&&Hi(g,r,n,e),f&&xn(n,e,r,`updated`)},i)},E=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s],u=c.el&&(c.type===_i||!Ai(c,l)||c.shapeFlag&198)?m(c.el):n;v(c,l,u,null,r,i,a,o,!0)}},D=(e,n,r,i,a)=>{if(n!==r){if(n!==t)for(let t in n)!ee(t)&&!(t in r)&&c(e,t,n[t],null,a,i);for(let t in r){if(ee(t))continue;let o=r[t],s=n[t];o!==s&&t!==`value`&&c(e,t,s,o,a,i)}`value`in r&&c(e,`value`,n.value,r.value,a)}},O=(e,t,n,r,i,a,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(o(d,n,r),o(f,n,r),T(t.children||[],n,f,i,a,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(E(e.dynamicChildren,m,n,i,a,s,c),(t.key!=null||i&&t===i.subTree)&&ui(e,t,!0)):le(e,t,n,f,i,a,s,c,l)},k=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):A(t,n,r,i,a,o,c):ae(e,t,c)},A=(e,t,n,r,i,a,o)=>{let s=e.component=Gi(e,r,i);if(Hn(e)&&(s.ctx.renderer=be),$i(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,oe,o),!e.el){let r=s.subTree=Ni(yi);b(null,r,t,n),e.placeholder=r.el}}else oe(s,e,t,n,i,a,o)},ae=(e,t,n)=>{let r=t.component=e.component;if(Lr(e,t,n)){if(r.asyncDep&&!r.asyncResolved){t.el=e.el,ce(r,t,n);return}r.next=t,r.update()}else t.el=e.el,r.vnode=t},oe=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=fi(e);if(n){t&&(t.el=c.el,ce(e,t,o)),n.asyncDep.then(()=>{J(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;ci(e,!1),t?(t.el=c.el,ce(e,t,o)):t=c,n&&ie(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&Hi(d,s,t,c),ci(e,!0);let f=Pr(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),_e(p),e,i,a),t.el=f.el,u===null&&Br(e,f.el),r&&J(r,i),(d=t.props&&t.props.onVnodeUpdated)&&J(()=>Hi(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=Vn(t);if(ci(e,!1),l&&ie(l),!m&&(o=c&&c.onVnodeBeforeMount)&&Hi(o,d,t),ci(e,!0),s&&M){let t=()=>{e.subTree=Pr(e),M(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=Pr(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&J(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;J(()=>Hi(o,d,e),i)}(t.shapeFlag&256||d&&Vn(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&J(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new De(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>dn(u),ci(e,!0),l()},ce=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,Gr(e,t.props,r,n),ii(e,t.children,n),Ve(),mn(e),He()},le=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){de(l,d,n,r,i,a,o,s,c);return}if(f&256){ue(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&ge(l,i,a),d!==l&&p(n,d)):u&16?m&16?de(l,d,n,r,i,a,o,s,c):ge(l,i,a,!0):(u&8&&p(n,``),m&16&&T(d,n,r,i,a,o,s,c))},ue=(e,t,r,i,a,o,s,c,l)=>{e||=n,t||=n;let u=e.length,d=t.length,f=Math.min(u,d),p=0;for(;p<f;p++){let n=t[p]=l?zi(t[p]):Ri(t[p]);v(e[p],n,r,null,a,o,s,c,l)}u>d?ge(e,a,o,!0,!1,f):T(t,r,i,a,o,s,c,l,f)},de=(e,t,r,i,a,o,s,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let n=e[u],i=t[u]=l?zi(t[u]):Ri(t[u]);if(Ai(n,i))v(n,i,r,null,a,o,s,c,l);else break;u++}for(;u<=f&&u<=p;){let n=e[f],i=t[p]=l?zi(t[p]):Ri(t[p]);if(Ai(n,i))v(n,i,r,null,a,o,s,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,n=e<d?t[e].el:i;for(;u<=p;)v(null,t[u]=l?zi(t[u]):Ri(t[u]),r,n,a,o,s,c,l),u++}}else if(u>p)for(;u<=f;)j(e[u],a,o,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?zi(t[u]):Ri(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let n=e[u];if(y>=b){j(n,a,o,!0);continue}let i;if(n.key!=null)i=g.get(n.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&Ai(n,t[_])){i=_;break}i===void 0?j(n,a,o,!0):(C[i-h]=u+1,i>=S?S=i:x=!0,v(n,t[i],r,null,a,o,s,c,l),y++)}let w=x?di(C):n;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,n=t[e],f=t[e+1],p=e+1<d?f.el||mi(f):i;C[u]===0?v(null,n,r,p,a,o,s,c,l):x&&(_<0||u!==w[_]?fe(n,r,p,2):_--)}}},fe=(e,t,n,r,i=null)=>{let{el:a,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6){fe(e.component.subTree,t,n,r);return}if(d&128){e.suspense.move(t,n,r);return}if(d&64){c.move(e,t,n,be);return}if(c===_i){o(a,t,n);for(let e=0;e<u.length;e++)fe(u[e],t,n,r);o(e.anchor,t,n);return}if(c===bi){S(e,t,n);return}if(r!==2&&d&1&&l){if(r===0)l.persisted&&!a[Mn]?o(a,t,n):(l.beforeEnter(a),o(a,t,n),J(()=>l.enter(a),i));else{let{leave:r,delayLeave:i,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?s(a):o(a,t,n)},d=()=>{let e=a._isLeaving||!!a[Mn];a._isLeaving&&a[Mn](!0),l.persisted&&!e?u():r(a,()=>{u(),c&&c()})};i?i(a,u,d):d()}}else o(a,t,n)},j=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if((d===-2||l&&l.hasOnce)&&(i=!1),s!=null&&(Ve(),zn(s,null,n,e,!0),He()),p!=null&&(!e.ctx||e.ctx===t)&&(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!Vn(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&Hi(_,t,e),u&6)he(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&xn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,be,r):l&&!l.hasOnce&&(a!==_i||d>0&&d&64)?ge(l,t,n,!1,!0):(a===_i&&d&384||!i&&u&16)&&ge(c,t,n),r&&pe(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&J(()=>{_&&Hi(_,t,e),h&&xn(e,null,t,`unmounted`),v&&(e.el=null)},n)},pe=e=>{let{type:t,el:n,anchor:r,transition:i}=e;if(t===_i){me(n,r);return}if(t===bi){C(e),i&&!i.persisted&&i.afterLeave&&i.afterLeave();return}let a=()=>{s(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(e.shapeFlag&1&&i&&!i.persisted){let{leave:t,delayLeave:r}=i,o=()=>t(n,a);r?r(e.el,a,o):o()}else a()},me=(e,t)=>{let n;for(;e!==t;)n=h(e),s(e),e=n;s(t)},he=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;pi(c),pi(l),r&&ie(r),i.stop(),a?(a.flags|=8,j(o,e,t,n)):e.vnode.el&&o&&(o.transition=e.vnode.transition,j(o,e,t,n)),s&&J(s,t),J(()=>{e.isUnmounted=!0},t)},ge=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)j(e[o],t,n,r,i)},_e=e=>{if(e.shapeFlag&6)return _e(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[An];return n?h(n):t},ve=!1,ye=(e,t,n)=>{let r;e==null?t._vnode&&(j(t._vnode,null,null,!0),r=t._vnode.component):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ve||=(ve=!0,mn(r),hn(),!1)},be={p:v,um:j,m:fe,r:pe,mt:A,mc:T,pc:le,pbc:E,n:_e,o:e},xe,M;return i&&([xe,M]=i(be)),{render:ye,hydrate:xe,createApp:Dr(ye,xe)}}function si({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function ci({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function li(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function ui(e,t,n=!1){let r=e.children,i=t.children;if(d(r)&&d(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=zi(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&ui(t,a)),a.type===vi&&(a.patchFlag===-1&&(a=i[e]=zi(a)),a.el=t.el),a.type===yi&&!a.el&&(a.el=t.el)}}function di(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-->0;)n[a]=o,o=t[o];return n}function fi(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:fi(t)}function pi(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function mi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?mi(t.subTree):null}var hi=e=>e.__isSuspense;function gi(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):pn(e)}var _i=Symbol.for(`v-fgt`),vi=Symbol.for(`v-txt`),yi=Symbol.for(`v-cmt`),bi=Symbol.for(`v-stc`),xi=[],Y=null;function Si(e=!1){xi.push(Y=e?null:[])}function Ci(){xi.pop(),Y=xi[xi.length-1]||null}var wi=1;function Ti(e,t=!1){wi+=e,e<0&&Y&&t&&(Y.hasOnce=!0)}function Ei(e){return e.dynamicChildren=wi>0?Y||n:null,Ci(),wi>0&&Y&&Y.push(e),e}function Di(e,t,n,r,i,a){return Ei(X(e,t,n,r,i,a,!0))}function Oi(e,t,n,r,i){return Ei(Ni(e,t,n,r,i,!0))}function ki(e){return e?e.__v_isVNode===!0:!1}function Ai(e,t){return e.type===t.type&&e.key===t.key}var ji=({key:e})=>e??null,Mi=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:g(e)||V(e)||h(e)?{i:G,r:e,k:t,f:!!n}:e);function X(e,t=null,n=null,r=0,i=null,a=e===_i?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ji(t),ref:t&&Mi(t),scopeId:vn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:G};return s?(Bi(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),wi>0&&!o&&Y&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&Y.push(c),c}var Ni=Pi;function Pi(e,t=null,n=null,r=0,i=null,a=!1){if((!e||e===ar)&&(e=yi),ki(e)){let r=Ii(e,t,!0);return n&&Bi(r,n),wi>0&&!a&&Y&&(r.shapeFlag&6?Y[Y.indexOf(e)]=r:Y.push(r)),r.patchFlag=-2,r}if(oa(e)&&(e=e.__vccOpts),t){t=Fi(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=j(e)),v(n)&&(Lt(n)&&!d(n)&&(n=s({},n)),t.style=ce(n))}let o=g(e)?1:hi(e)?128:jn(e)?64:v(e)?4:h(e)?2:0;return X(e,t,n,r,i,o,a,!0)}function Fi(e){return e?Lt(e)||Ur(e)?s({},e):e:null}function Ii(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?Vi(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&ji(l),ref:t&&t.ref?n&&a?d(a)?a.concat(Mi(t)):[a,Mi(t)]:Mi(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==_i?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ii(e.ssContent),ssFallback:e.ssFallback&&Ii(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce,cacheIndex:e.cacheIndex};return c&&r&&Fn(u,c.clone(u)),u}function Z(e=` `,t=0){return Ni(vi,null,e,t)}function Li(e=``,t=!1){return t?(Si(),Oi(yi,null,e)):Ni(yi,null,e)}function Ri(e){return e==null||typeof e==`boolean`?Ni(yi):d(e)?Ni(_i,null,e.slice()):ki(e)?zi(e):Ni(vi,null,String(e))}function zi(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Ii(e)}function Bi(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(d(t))n=16;else if(typeof t==`object`){if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),Bi(e,n()),n._c&&(n._d=!0));return}{n=32;let r=t._;!r&&!Ur(t)?t._ctx=G:r===3&&G&&(G.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}}else if(h(t)){if(r&65){Bi(e,{default:t});return}t={default:t,_ctx:G},n=32}else t=String(t),r&64?(n=16,t=[Z(t)]):n=8;e.children=t,e.shapeFlag|=n}function Vi(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=j([t.class,r.class]));else if(e===`style`)t.style=ce([t.style,r.style]);else if(a(e)){let n=t[e],i=r[e];i&&n!==i&&!(d(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!o(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function Hi(e,t,n,r=null){H(e,t,7,[n,r])}var Ui=Tr(),Wi=0;function Gi(e,n,r){let i=e.type,a=(n?n.appContext:e.appContext)||Ui,o={uid:Wi++,vnode:e,type:i,parent:n,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new we(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(a.provides),ids:n?n.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Yr(i,a),emitsOptions:Mr(i,a),emit:null,emitted:null,propsDefaults:t,inheritAttrs:i.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,suspense:r,suspenseId:r?r.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=n?n.root:o,o.emit=Ar.bind(null,o),e.ce&&e.ce(o),o}var Q=null,Ki=()=>Q||G,qi,Ji;{let e=se(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};qi=t(`__VUE_INSTANCE_SETTERS__`,e=>Q=e),Ji=t(`__VUE_SSR_SETTERS__`,e=>Qi=e)}var Yi=e=>{let t=Q;return qi(e),e.scope.on(),()=>{e.scope.off(),qi(t)}},Xi=()=>{Q&&Q.scope.off(),qi(null)};function Zi(e){return e.vnode.shapeFlag&4}var Qi=!1;function $i(e,t=!1,n=!1){t&&Ji(t);let{props:r,children:i}=e.vnode,a=Zi(e);Wr(e,r,a,t),ri(e,i,n||t);let o=a?ea(e,t):void 0;return t&&Ji(!1),o}function ea(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,lr);let{setup:r}=n;if(r){Ve();let n=e.setupContext=r.length>1?ia(e):null,i=Yi(e),a=en(r,e,0,[e.props,n]),o=y(a);if(He(),i(),(o||e.sp)&&!Vn(e)&&In(e),o){if(a.then(Xi,Xi),t)return a.then(n=>{Ji(!0);try{ta(e,n,t)}finally{Ji(!1)}}).catch(t=>{tn(t,e,0)});e.asyncDep=a}else ta(e,a,t)}else na(e,t)}function ta(e,t,n){h(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:v(t)&&(e.setupState=Gt(t)),na(e,n)}function na(e,t,n){let i=e.type;e.render||=i.render||r;{let t=Yi(e);Ve();try{fr(e)}finally{He(),t()}}}var ra={get(e,t){return I(e,`get`,``),e[t]}};function ia(e){return{attrs:new Proxy(e.attrs,ra),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function aa(e){return e.exposed?e.exposeProxy||=new Proxy(Gt(Rt(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in sr)return sr[n](e)},has(e,t){return t in e||t in sr}}):e.proxy}function oa(e){return h(e)&&`__vccOpts`in e}var sa=(e,t)=>qt(e,t,Qi),ca=`3.5.43`,la=void 0,ua=typeof window<`u`&&window.trustedTypes;if(ua)try{la=ua.createPolicy(`vue`,{createHTML:e=>e})}catch{}var da=la?e=>la.createHTML(e):e=>e,fa=`http://www.w3.org/2000/svg`,pa=`http://www.w3.org/1998/Math/MathML`,ma=typeof document<`u`?document:null,ha=ma&&ma.createElement(`template`),ga={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?ma.createElementNS(fa,e):t===`mathml`?ma.createElementNS(pa,e):n?ma.createElement(e,{is:n}):ma.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>ma.createTextNode(e),createComment:e=>ma.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ma.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),i!==a&&(i=i.nextSibling););else{ha.innerHTML=da(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=ha.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},_a=Symbol(`_vtc`);function va(e,t,n){let r=e[_a];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var ya=Symbol(`_vod`),ba=Symbol(`_vsh`),xa=Symbol(``),Sa=/(?:^|;)\s*display\s*:/;function Ca(e,t,n){let r=e.style,i=g(n),a=!1;if(n&&!i){if(t){if(g(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??Ta(r,t,``)}else for(let e in t)n[e]??Ta(r,e,``)}for(let i in n){i===`display`&&(a=!0);let o=n[i];o==null?Ta(r,i,``):ka(e,i,!g(t)&&t?t[i]:void 0,o)||Ta(r,i,o)}}else if(i){if(t!==n){let e=r[xa];e&&(n+=`;`+e),r.cssText=n,a=Sa.test(n)}}else t&&e.removeAttribute(`style`);ya in e&&(e[ya]=a?r.display:``,e[ba]&&(r.display=`none`))}var wa=/\s*!important$/;function Ta(e,t,n){if(d(n))n.forEach(n=>Ta(e,t,n));else if(n??=``,t.startsWith(`--`))wa.test(n)?e.setProperty(t,n.replace(wa,``),`important`):e.setProperty(t,n);else{let r=Oa(e,t);wa.test(n)?e.setProperty(E(r),n.replace(wa,``),`important`):e[r]=n}}var Ea=[`Webkit`,`Moz`,`ms`],Da={};function Oa(e,t){let n=Da[t];if(n)return n;let r=T(t);if(r!==`filter`&&r in e)return Da[t]=r;r=D(r);for(let n=0;n<Ea.length;n++){let i=Ea[n]+r;if(i in e)return Da[t]=i}return t}function ka(e,t,n,r){return e.tagName===`TEXTAREA`&&(t===`width`||t===`height`)&&g(r)&&n===r}var Aa=`http://www.w3.org/1999/xlink`;function ja(e,t,n,r,i,a=me(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(Aa,t.slice(6,t.length)):e.setAttributeNS(Aa,t,n):n==null||a&&!he(n)?e.removeAttribute(t):e.setAttribute(t,a?``:_(n)?String(n):n)}function Ma(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?da(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);(r!==i||!(`_value`in e))&&(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=he(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function Na(e,t,n,r){e.addEventListener(t,n,r)}function Pa(e,t,n,r){e.removeEventListener(t,n,r)}var Fa=Symbol(`_vei`);function Ia(e,t,n,r,i=null){let a=e[Fa]||(e[Fa]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=za(t);r?Na(e,n,a[t]=Ua(r,i),s):o&&(Pa(e,n,o,s),a[t]=void 0)}}var La=/(Once|Passive|Capture)$/,Ra=/^on:?(?:Once|Passive|Capture)$/;function za(e){let t,n;for(;(n=e.match(La))&&!Ra.test(e);)t||={},e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===`:`?e.slice(3):E(e.slice(2)),t]}var Ba=0,Va=Promise.resolve(),Ha=()=>Ba||=(Va.then(()=>Ba=0),Date.now());function Ua(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;let r=n.value;if(d(r)){let n=e.stopImmediatePropagation;e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0};let i=r.slice(),a=[e];for(let n=0;n<i.length&&!e._stopped;n++){let e=i[n];e&&H(e,t,5,a)}}else H(r,t,5,[e])};return n.value=e,n.attached=Ha(),n}var Wa=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Ga=(e,t,n,r,i,s)=>{let c=i===`svg`;t===`class`?va(e,r,c):t===`style`?Ca(e,n,r):a(t)?o(t)||Ia(e,t,n,r,s):(t[0]===`.`?(t=t.slice(1),1):t[0]===`^`?(t=t.slice(1),0):Ka(e,t,r,c))?(Ma(e,t,r),!e.tagName.includes(`-`)&&(t===`value`||t===`checked`||t===`selected`)&&ja(e,t,r,c,s,t!==`value`)):e._isVueCE&&(qa(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!g(r)))?Ma(e,T(t),r,s,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),ja(e,t,r,c))};function Ka(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Wa(t)&&h(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Wa(t)&&g(n)?!1:t in e}function qa(e,t){let n=e._def.props;if(!n)return!1;let r=T(t);return Array.isArray(n)?n.some(e=>T(e)===r):Object.keys(n).some(e=>T(e)===r)}var Ja=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return d(t)?e=>ie(t,e):t};function Ya(e){e.target.composing=!0}function Xa(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var Za=Symbol(`_assign`),Qa=Symbol(`_initialValue`);function $a(e,t,n){return t&&(e=e.trim()),n&&(e=ae(e)),e}var $={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e.parentNode&&(e.type===`text`?e[Qa]=e.defaultValue.replace(/[\r\n]/g,``):e.type===`textarea`&&(e[Qa]=e.defaultValue.replace(/\r\n?/g,`
`))),e[Za]=Ja(i);let a=r||i.props&&i.props.type===`number`;Na(e,t?`change`:`input`,t=>{t.target.composing||e[Za]($a(e.value,n,a))}),(n||a)&&Na(e,`change`,()=>{e.value=$a(e.value,n,a)}),t||(Na(e,`compositionstart`,Ya),Na(e,`compositionend`,Xa),Na(e,`change`,Xa))},mounted(e,{value:t,modifiers:{trim:n,number:r}}){let i=t??``,a=e[Qa];delete e[Qa],a!==void 0&&(e.type===`text`||e.type===`textarea`)&&e.value!==a?e[Za]($a(e.value,n,r)):e.value=i},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[Za]=Ja(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?ae(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},eo=s({patchProp:Ga},ga),to;function no(){return to||=ai(eo)}var ro=((...e)=>{let t=no().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=ao(e);if(!r)return;let i=t._component;!h(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,io(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function io(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function ao(e){return g(e)?document.querySelector(e):e}var oo=`// Fullscreen-triangle vertex shader.
// The only geometry in the app: 3 vertices covering the whole clip space.
// All real scene geometry (the sphere) lives as an SDF in the fragment shader.
attribute vec2 aPosition;

// NDC position passed through so the fragment shader can build camera rays.
varying vec2 vNdc;

void main() {
  vNdc = aPosition;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,so=`// SDF raymarcher fragment shader (GLSL ES 1.0 — works on WebGL1 and WebGL2).
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
//   - Opaque march: bullet sphere SDF only.
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
uniform float uSmokeRadius;    // base radius of the smoke puff
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
uniform float uNoiseSpeed;      // scales the loop-safe morph wobble

// --- Shockwave cone uniforms (uConeAngleDeg = FULL apex angle) ---
uniform float uConeAngleDeg;
uniform float uConeLength;     // shock-cone wake length behind the bullet
uniform float uPush;           // shock displacement: 0 = carve only, higher piles a compression shell

// --- Compression turbulence uniforms ---
uniform float uRippleAmp;      // turbulence strength on smoke near the cone
uniform float uRippleFreq;     // spatial frequency of the turbulence

// --- Raymarch tuning ---
uniform float uEpsilon;      // opaque surface hit threshold
uniform float uMaxDistance;  // far raymarch limit (camera "far")

// --- Directional light uniforms ---
// uLightDirection: direction FROM the surface TOWARD the light (already normalized on CPU).
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
uniform float uLightIntensity;

// --- Animation / misc ---
uniform float uTime;        // elapsed seconds (looped internally every 8 s)
uniform vec2 uResolution;   // drawing-buffer size in pixels (reserved)

// Constants (LOOP_DURATION must match LOOP_SECONDS in RaymarchCanvas.vue).
const int MAX_STEPS = 64;
const int VOL_STEPS = 32;
const int MAX_OCTAVES = 8;
const float LOOP_DURATION = 8.0;
const float TAU = 6.2831853;
const float BULLET_X0 = -3.2;
const float BULLET_X1 = 3.2;
const float BULLET_RADIUS = 0.14;
const vec3 SMOKE_CENTER = vec3(0.0, 0.0, 0.0);
const vec3 BACKGROUND_TOP = vec3(0.12, 0.18, 0.32);
const vec3 BACKGROUND_BOTTOM = vec3(0.02, 0.02, 0.05);

float sdSphere(vec3 p, float r) {
  return length(p) - r;
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

// --- 8-second loop helpers ---
// All animation derives from the loop phase with INTEGER cycle counts or a
// circular domain offset, so the last frame wraps seamlessly to the first.
float loopPhase() {
  return fract(uTime / LOOP_DURATION);
}

// Circular domain offset: continuous at the wrap, churns the billows.
vec2 smokeWobble(float phase) {
  float a = phase * TAU;
  float amp = 0.1 + uNoiseSpeed * 0.6;
  return vec2(cos(a), sin(a)) * amp;
}

float bulletX(float phase) {
  return mix(BULLET_X0, BULLET_X1, phase);
}

// Shrinks bullet + heat cone to nothing at the wrap so the jump stays invisible.
float endFade(float phase) {
  return smoothstep(0.0, 0.03, phase) * (1.0 - smoothstep(0.97, 1.0, phase));
}

void loopState(out float phase, out float fade, out float bx, out float coneOX, out float baseR) {
  phase = loopPhase();
  fade = endFade(phase);
  bx = bulletX(phase);
  coneOX = bx - 0.05;
  baseR = uConeLength * tan(radians(uConeAngleDeg * 0.5));
}

// Opaque scene: the bullet sphere is the ONLY solid surface.
float bulletSDF(vec3 p, float bx, float fade) {
  return sdSphere(p - vec3(bx, 0.0, 0.0), BULLET_RADIUS * fade);
}

// Distorted shock-cone SDF: base cone + animated compression ripple.
// Integer phase cycles keep the ripple loop-safe.
float coneField(vec3 p, float phase, float fade, float coneOX, float baseR) {
  vec3 coneP = vec3(p.y, coneOX - p.x, p.z);
  float d = sdRoundCone(coneP, 0.03 * fade, baseR * fade, uConeLength);
  float apexW = clamp(1.0 - (coneOX - p.x) / uConeLength, 0.0, 1.0);
  vec3 rq = p * uRippleFreq + vec3(phase * TAU * 2.0, phase * TAU * 3.0, 0.0);
  return d + cnoise(rq) * uRippleAmp * (0.35 + 0.65 * apexW) * fade;
}

// Smoke density 0..~1: soft ball falloff shaped by fbm billows,
// with the distorted shock cone SUBTRACTED (carved tunnel, rippled walls)
// and the density adapted to air compression (shock shell squeeze,
// core rarefaction, nose stagnation). Returns vec2(density, heat).
vec2 smokeDensityAt(vec3 p, float phase, vec2 wob, float dCone, float fade, float coneOX) {
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
  float r = length(p - SMOKE_CENTER) / uSmokeRadius;
  if (r > 1.35) {
    return vec2(0.0, heat);
  }
  float fall = clamp(1.0 - r * r, 0.0, 1.0);
  // Shock push: stream the billow domain radially outward around the cone,
  // so smoke slides past the tunnel instead of crossing it.
  vec3 radial = vec3(0.0, p.y, p.z);
  float rl = length(radial);
  vec3 rdir = rl > 0.0001 ? radial / rl : vec3(0.0, 1.0, 0.0);
  vec3 q = (p - SMOKE_CENTER + rdir * (pushBand * uPush * 0.6)) * uNoiseFrequency
    + vec3(wob.x, wob.y, 0.0);
  float f = fbm(q, uNoiseOctaves, uLacunarity, uNoiseGain);
  float filament = smoothstep(-0.25, 0.65, f);
  float dens = pow(fall, 1.5) * mix(0.25, 1.0, filament);
  // Billow erosion chews the silhouette.
  dens *= smoothstep(0.0, 0.45, fall + f * uNoiseAmplitude);
  // Hot air expands: thinner smoke, rippled by compression turbulence.
  if (heat > 0.01) {
    vec3 rq = p * uRippleFreq + vec3(phase * TAU * 2.0, phase * TAU * 3.0, 0.0);
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
  dens *= smoothstep(-0.06, 0.06, dCone);
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

vec3 backgroundColor(vec3 d) {
  float g = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(BACKGROUND_BOTTOM, BACKGROUND_TOP, g);
  float sun = pow(clamp(dot(d, normalize(uLightDirection)), 0.0, 1.0), 250.0);
  col += uLightColor * sun * 1.5;
  return col;
}

// Front-to-back volume integration between t0 and t1.
// Returns vec4(rgb, transmittance); heatOD gathers the hot-air column
// (drives the background shimmer after the march).
vec4 marchSmoke(vec3 ro, vec3 rd, float t0, float t1, vec2 wob,
    float phase, float fade, float coneOX, float baseR, float gg,
    inout float heatOD) {
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
    float dCone = coneField(p, phase, fade, coneOX, baseR);
    vec2 dh = smokeDensityAt(p, phase, wob, dCone, fade, coneOX);
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

void main() {
  float phase;
  float fade;
  float bx;
  float coneOX;
  float baseR;
  loopState(phase, fade, bx, coneOX, baseR);
  vec2 wob = smokeWobble(phase);
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

  // --- Opaque march: bullet sphere only ---
  float tb = uMaxDistance;
  bool bulletHit = false;
  vec3 bulletPos = vec3(0.0);
  float t = 0.0;
  for (int i = 0; i < MAX_STEPS; ++i) {
    vec3 p = rayOrigin + rayDirection * t;
    float d = bulletSDF(p, bx, fade);
    if (d < uEpsilon) {
      bulletHit = true;
      bulletPos = p;
      tb = t;
      break;
    }
    t += d;
    if (t > uMaxDistance) {
      break;
    }
  }

  // --- Volume march through the smoke bounds (stops at the bullet) ---
  float Rb = uSmokeRadius * 1.35 + uNoiseAmplitude + 0.3;
  vec2 bounds = intersectSmokeBounds(rayOrigin, rayDirection, Rb);
  float heatOD = 0.0;
  vec4 vol = vec4(0.0, 0.0, 0.0, 1.0);
  if (bounds.x >= 0.0 || bounds.y > 0.0) {
    float t0 = max(bounds.x, 0.0);
    float t1 = min(bounds.y, bulletHit ? tb : bounds.y);
    if (t1 > t0) {
      vol = marchSmoke(rayOrigin, rayDirection, t0, t1, wob,
        phase, fade, coneOX, baseR, gg, heatOD);
    }
  }

  // --- Heat shimmer: hot-air column wobbles the background lookup ---
  float heatN = clamp(heatOD * 2.5, 0.0, 1.0);
  float shimmer = 0.10 * uHeatStrength * heatN;
  vec2 suv = vNdc * 3.0;
  vec2 shim = vec2(
    cnoise(vec3(suv * 2.0, phase * TAU)),
    cnoise(vec3(suv * 2.0 + vec2(13.7, 7.1), phase * TAU))) * 0.5;
  vec3 bgDir = normalize(rayDirection + (right * shim.x + camUp * shim.y) * shimmer);
  vec3 bg = backgroundColor(bgDir);

  vec3 color = vol.rgb + vol.a * bg;

  // --- Bullet shading over the smoke ---
  if (bulletHit && tb <= bounds.y + 0.001) {
    const float h = 0.0005;
    vec3 n = normalize(vec3(
      bulletSDF(bulletPos + vec3(h, 0.0, 0.0), bx, fade) - bulletSDF(bulletPos - vec3(h, 0.0, 0.0), bx, fade),
      bulletSDF(bulletPos + vec3(0.0, h, 0.0), bx, fade) - bulletSDF(bulletPos - vec3(0.0, h, 0.0), bx, fade),
      bulletSDF(bulletPos + vec3(0.0, 0.0, h), bx, fade) - bulletSDF(bulletPos - vec3(0.0, 0.0, h), bx, fade)));
    vec3 lightDir = normalize(uLightDirection);
    vec3 hvec = normalize(lightDir - rayDirection);
    float diffuseFactor = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(n, hvec), 0.0), 90.0);
    float rim = pow(1.0 - clamp(dot(-rayDirection, n), 0.0, 1.0), 3.0);
    vec3 bulletCol = vec3(0.035, 0.04, 0.05)
      + vec3(0.45, 0.5, 0.6) * diffuseFactor * 0.7 * uLightIntensity
      + uLightColor * spec * 1.5
      + uHeatColor * rim * 0.4;
    color = vol.rgb + vol.a * bulletCol;
  }

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`,co=(e,t)=>{let n=e.__vccOpts||e;for(let[e,r]of t)n[e]=r;return n},lo={class:`raymarch-container`},uo={class:`hud`},fo={class:`loop-track`},po={class:`hud-row`},mo={class:`hud-row`},ho={class:`hud-row`},go={class:`hud-row`},_o={key:0,class:`hud-error`},vo={class:`controls`},yo={class:`ctl`},bo={class:`ctl`},xo={class:`ctl`},So={class:`ctl`},Co={class:`ctl`},wo={class:`ctl`},To={class:`ctl`},Eo={class:`ctl`},Do={class:`ctl`},Oo={class:`ctl`},ko={class:`ctl`},Ao={class:`ctl`},jo={class:`ctl`},Mo={class:`ctl`},No={class:`ctl`},Po={class:`ctl`},Fo={class:`ctl`},Io={class:`ctl`},Lo=8,Ro=1.8,zo=1.3,Bo=4,Vo=1.2,Ho=2.8,Uo=12,Wo=.0052,Go=co({__name:`RaymarchCanvas`,setup(e){let t=jt({maxSteps:64,epsilon:.004,maxDistance:100,camYaw:-1.951,camPitch:-.077,camDist:3.49,cameraUp:[0,1,0],cameraFov:60,lightDirection:[-.5,.8,.6],lightColor:[1,1,1],lightIntensity:1.2,smokeRadius:1.7,smokeDensity:2,noiseAmplitude:.45,noiseFrequency:2,noiseOctaves:4,noiseLacunarity:2,noiseGain:.8,noiseSpeed:.5,coneAngle:35,coneLength:3.5,rippleAmp:.05,rippleFreq:9,push:1.5,smokeColor:`#8ea2c8`,heatColor:`#ff7a26`,anisotropy:.45,heatStrength:0,scatter:1,maxDevicePixelRatio:2}),n=Bt(null),r=Bt(null),i=Bt(null),a=Bt(null),o=Bt(``),s=null,c=null,l={},u=0,d=0,f=0,p=new Set,m=0,h=0,g=5;function _(e,t,n,r){let i=e.createShader(t);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(i);throw Error(`${r} compilation failed:\n${t}`)}return i}function v(e,t,n){let r=_(e,e.VERTEX_SHADER,t,`Vertex shader`),i=_(e,e.FRAGMENT_SHADER,n,`Fragment shader`),a=e.createProgram();if(e.attachShader(a,r),e.attachShader(a,i),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)){let t=e.getProgramInfoLog(a);throw Error(`Program linking failed:\n${t}`)}return a}function y(e){let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}function b(e){let t=/^#?([0-9a-f]{6})$/i.exec(String(e).trim());if(!t)return[1,1,1];let n=parseInt(t[1],16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function x(){let e=n.value,r=e.clientWidth||window.innerWidth,i=e.clientHeight||window.innerHeight,a=Math.min(window.devicePixelRatio||1,t.maxDevicePixelRatio),o=Math.floor(r*a),c=Math.floor(i*a),l=2073600,u=o*c;if(u>l){let e=Math.sqrt(l/u);o=Math.max(1,Math.floor(o*e)),c=Math.max(1,Math.floor(c*e))}(e.width!==o||e.height!==c)&&(e.width=o,e.height=c),s.viewport(0,0,e.width,e.height)}function S(){for(let e of`uCameraPosition.uCameraForward.uCameraUp.uCameraFov.uAspectRatio.uSmokeRadius.uSmokeDensity.uSmokeColor.uScatter.uAnisotropy.uHeatColor.uHeatStrength.uNoiseAmplitude.uNoiseFrequency.uNoiseOctaves.uLacunarity.uNoiseGain.uNoiseSpeed.uConeAngleDeg.uConeLength.uPush.uRippleAmp.uRippleFreq.uEpsilon.uMaxDistance.uLightDirection.uLightColor.uLightIntensity.uTime.uResolution`.split(`.`))l[e]=s.getUniformLocation(c,e)}function C(){let e=l,n=y(t.lightDirection);e.uCameraUp&&s.uniform3fv(e.uCameraUp,t.cameraUp),e.uCameraFov&&s.uniform1f(e.uCameraFov,t.cameraFov),e.uEpsilon&&s.uniform1f(e.uEpsilon,t.epsilon),e.uMaxDistance&&s.uniform1f(e.uMaxDistance,t.maxDistance),e.uLightDirection&&s.uniform3fv(e.uLightDirection,n),e.uLightColor&&s.uniform3fv(e.uLightColor,t.lightColor),e.uLightIntensity&&s.uniform1f(e.uLightIntensity,t.lightIntensity)}function w(e){let r=n.value,i=l;i.uTime&&s.uniform1f(i.uTime,e),i.uAspectRatio&&s.uniform1f(i.uAspectRatio,r.width/r.height),i.uResolution&&s.uniform2f(i.uResolution,r.width,r.height),i.uSmokeRadius&&s.uniform1f(i.uSmokeRadius,t.smokeRadius),i.uSmokeDensity&&s.uniform1f(i.uSmokeDensity,t.smokeDensity),i.uNoiseAmplitude&&s.uniform1f(i.uNoiseAmplitude,t.noiseAmplitude),i.uNoiseFrequency&&s.uniform1f(i.uNoiseFrequency,t.noiseFrequency),i.uNoiseOctaves&&s.uniform1i(i.uNoiseOctaves,Math.max(1,Math.min(8,Math.round(t.noiseOctaves)))),i.uLacunarity&&s.uniform1f(i.uLacunarity,t.noiseLacunarity),i.uNoiseGain&&s.uniform1f(i.uNoiseGain,t.noiseGain),i.uNoiseSpeed&&s.uniform1f(i.uNoiseSpeed,t.noiseSpeed),i.uConeAngleDeg&&s.uniform1f(i.uConeAngleDeg,t.coneAngle),i.uConeLength&&s.uniform1f(i.uConeLength,t.coneLength),i.uPush&&s.uniform1f(i.uPush,t.push),i.uRippleAmp&&s.uniform1f(i.uRippleAmp,t.rippleAmp),i.uRippleFreq&&s.uniform1f(i.uRippleFreq,t.rippleFreq),i.uSmokeColor&&s.uniform3fv(i.uSmokeColor,b(t.smokeColor)),i.uScatter&&s.uniform1f(i.uScatter,t.scatter),i.uAnisotropy&&s.uniform1f(i.uAnisotropy,t.anisotropy),i.uHeatColor&&s.uniform3fv(i.uHeatColor,b(t.heatColor)),i.uHeatStrength&&s.uniform1f(i.uHeatStrength,t.heatStrength)}function ee(e){if(e.ctrlKey||e.metaKey||e.altKey)return;let t=e.target&&e.target.tagName||``;if(t===`INPUT`||t===`TEXTAREA`||t===`SELECT`)return;let n=e.key.toLowerCase();(n===`w`||n===`a`||n===`s`||n===`d`||n===`q`||n===`e`||n===`shift`||n===`arrowup`||n===`arrowdown`||n===`arrowleft`||n===`arrowright`)&&(p.add(n),e.preventDefault())}function te(e){p.delete(e.key.toLowerCase())}function ne(e){let n=p.has(`shift`)?2.5:1;(p.has(`a`)||p.has(`arrowleft`))&&(t.camYaw-=Ro*n*e),(p.has(`d`)||p.has(`arrowright`))&&(t.camYaw+=Ro*n*e),(p.has(`w`)||p.has(`arrowup`))&&(t.camPitch+=zo*n*e),(p.has(`s`)||p.has(`arrowdown`))&&(t.camPitch-=zo*n*e),p.has(`q`)&&(t.camDist-=Bo*n*e),p.has(`e`)&&(t.camDist+=Bo*n*e),t.camPitch=Math.max(-1.2,Math.min(Vo,t.camPitch)),t.camDist=Math.max(Ho,Math.min(Uo,t.camDist));let r=1-Math.exp(-e*10);m+=(t.camYaw-m)*r,h+=(t.camPitch-h)*r,g+=(t.camDist-g)*r;let i=Math.cos(h),o=[g*i*Math.sin(m),g*Math.sin(h),g*i*Math.cos(m)],c=y([-o[0],-o[1],-o[2]]),u=l;u.uCameraPosition&&s.uniform3fv(u.uCameraPosition,o),u.uCameraForward&&s.uniform3fv(u.uCameraForward,c),a.value&&(a.value.textContent=`[${o.map(e=>e.toFixed(2)).join(`, `)}]`)}function T(e){x();let t=(e-d)/1e3,n=Math.min(.1,f?(e-f)/1e3:.016);f=e,ne(n),w(t);let a=t%Lo/Lo;r.value&&(r.value.style.transform=`scaleX(${a})`),i.value&&(i.value.textContent=`${(a*Lo).toFixed(1)}s / ${Lo.toFixed(0)}s`),s.drawArrays(s.TRIANGLES,0,3),u=requestAnimationFrame(T)}function re(){s&&x()}function E(){p.clear()}let D=new Map,O=0;function k(e){if(e.pointerType!==`mouse`||e.button===0){try{n.value.setPointerCapture(e.pointerId)}catch{}if(D.set(e.pointerId,{x:e.clientX,y:e.clientY}),D.size===2){let[e,t]=[...D.values()];O=Math.hypot(e.x-t.x,e.y-t.y)}}}function ie(e){let n=D.get(e.pointerId);if(!n)return;let r={x:e.clientX,y:e.clientY};if(D.set(e.pointerId,r),D.size===1)t.camYaw+=(r.x-n.x)*Wo,t.camPitch-=(r.y-n.y)*Wo;else if(D.size===2){let[e,n]=[...D.values()],r=Math.hypot(e.x-n.x,e.y-n.y);O>0&&r>0&&(t.camDist=Math.max(Ho,Math.min(Uo,t.camDist*(O/r)))),O=r}}function A(e){D.delete(e.pointerId),O=0}function ae(e){e.preventDefault();let n=e.deltaMode===1?e.deltaY*16:e.deltaY;t.camDist=Math.max(Ho,Math.min(Uo,t.camDist*Math.exp(n*.001)))}return Xn(()=>{let e=n.value;try{if(s=e.getContext(`webgl2`,{antialias:!1})||e.getContext(`webgl`,{antialias:!1})||e.getContext(`experimental-webgl`),!s)throw Error(`WebGL is not supported by this browser.`);c=v(s,oo,so),s.useProgram(c);let n=new Float32Array([-1,-1,3,-1,-1,3]),r=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,r),s.bufferData(s.ARRAY_BUFFER,n,s.STATIC_DRAW);let i=s.getAttribLocation(c,`aPosition`);if(i<0)throw Error(`Attribute 'aPosition' not found in vertex shader.`);s.enableVertexAttribArray(i),s.vertexAttribPointer(i,2,s.FLOAT,!1,0,0),S(),C(),window.addEventListener(`resize`,re),window.addEventListener(`keydown`,ee),window.addEventListener(`keyup`,te),window.addEventListener(`blur`,E),e.addEventListener(`pointerdown`,k),e.addEventListener(`pointermove`,ie),e.addEventListener(`pointerup`,A),e.addEventListener(`pointercancel`,A),e.addEventListener(`wheel`,ae,{passive:!1}),m=t.camYaw,h=t.camPitch,g=t.camDist,x(),d=performance.now(),f=0,u=requestAnimationFrame(T)}catch(e){o.value=e instanceof Error?e.message:String(e),console.error(e)}}),er(()=>{cancelAnimationFrame(u),window.removeEventListener(`resize`,re),window.removeEventListener(`keydown`,ee),window.removeEventListener(`keyup`,te),window.removeEventListener(`blur`,E),n.value?.removeEventListener(`pointerdown`,k),n.value?.removeEventListener(`pointermove`,ie),n.value?.removeEventListener(`pointerup`,A),n.value?.removeEventListener(`pointercancel`,A),n.value?.removeEventListener(`wheel`,ae),p.clear(),D.clear(),s&&c&&(s.deleteProgram(c),c=null)}),(e,s)=>(Si(),Di(`div`,lo,[X(`canvas`,{ref_key:`canvasRef`,ref:n,class:`raymarch-canvas`},null,512),X(`div`,uo,[s[22]||=X(`div`,{class:`hud-title`},`Smoke + Shockwave`,-1),X(`div`,fo,[X(`div`,{ref_key:`loopBarRef`,ref:r,class:`loop-fill`},null,512)]),X(`div`,po,[s[18]||=X(`span`,null,`March steps`,-1),X(`code`,null,M(t.maxSteps),1)]),X(`div`,mo,[s[19]||=X(`span`,null,`Camera pos`,-1),X(`code`,{ref_key:`camPosEl`,ref:a},`[0.00, 0.00, 5.00]`,512)]),s[23]||=X(`div`,{class:`hud-row hud-hint`},[X(`span`,null,`Drag / WASD orbit · wheel zoom`)],-1),X(`div`,ho,[s[20]||=X(`span`,null,`Light dir`,-1),X(`code`,null,`[`+M(t.lightDirection.join(`, `))+`]`,1)]),X(`div`,go,[s[21]||=X(`span`,null,`Loop`,-1),X(`code`,{ref_key:`phaseEl`,ref:i},`0.0s / 8s`,512)]),o.value?(Si(),Di(`div`,_o,M(o.value),1)):Li(``,!0)]),X(`div`,vo,[s[42]||=X(`div`,{class:`controls-title`},`Smoke`,-1),X(`label`,yo,[X(`span`,null,[s[24]||=Z(`Density `,-1),X(`code`,null,M(t.smokeDensity.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`2`,step:`0.05`,"onUpdate:modelValue":s[0]||=e=>t.smokeDensity=e},null,512),[[$,t.smokeDensity,void 0,{number:!0}]])]),X(`label`,bo,[X(`span`,null,[s[25]||=Z(`Radius `,-1),X(`code`,null,M(t.smokeRadius.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`1`,max:`2.5`,step:`0.05`,"onUpdate:modelValue":s[1]||=e=>t.smokeRadius=e},null,512),[[$,t.smokeRadius,void 0,{number:!0}]])]),X(`label`,xo,[X(`span`,null,[s[26]||=Z(`Billow `,-1),X(`code`,null,M(t.noiseAmplitude.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`0.8`,step:`0.01`,"onUpdate:modelValue":s[2]||=e=>t.noiseAmplitude=e},null,512),[[$,t.noiseAmplitude,void 0,{number:!0}]])]),X(`label`,So,[X(`span`,null,[s[27]||=Z(`Frequency `,-1),X(`code`,null,M(t.noiseFrequency.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0.5`,max:`4`,step:`0.05`,"onUpdate:modelValue":s[3]||=e=>t.noiseFrequency=e},null,512),[[$,t.noiseFrequency,void 0,{number:!0}]])]),X(`label`,Co,[X(`span`,null,[s[28]||=Z(`Octaves `,-1),X(`code`,null,M(t.noiseOctaves),1)]),K(X(`input`,{type:`range`,min:`1`,max:`8`,step:`1`,"onUpdate:modelValue":s[4]||=e=>t.noiseOctaves=e},null,512),[[$,t.noiseOctaves,void 0,{number:!0}]])]),X(`label`,wo,[X(`span`,null,[s[29]||=Z(`Lacunarity `,-1),X(`code`,null,M(t.noiseLacunarity.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`1.5`,max:`4`,step:`0.05`,"onUpdate:modelValue":s[5]||=e=>t.noiseLacunarity=e},null,512),[[$,t.noiseLacunarity,void 0,{number:!0}]])]),X(`label`,To,[X(`span`,null,[s[30]||=Z(`Gain `,-1),X(`code`,null,M(t.noiseGain.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0.2`,max:`0.8`,step:`0.01`,"onUpdate:modelValue":s[6]||=e=>t.noiseGain=e},null,512),[[$,t.noiseGain,void 0,{number:!0}]])]),X(`label`,Eo,[X(`span`,null,[s[31]||=Z(`Drift `,-1),X(`code`,null,M(t.noiseSpeed.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`1.5`,step:`0.05`,"onUpdate:modelValue":s[7]||=e=>t.noiseSpeed=e},null,512),[[$,t.noiseSpeed,void 0,{number:!0}]])]),s[43]||=X(`div`,{class:`controls-title`},`Shockwave`,-1),X(`label`,Do,[X(`span`,null,[s[32]||=Z(`Cone angle `,-1),X(`code`,null,M(t.coneAngle.toFixed(1))+`°`,1)]),K(X(`input`,{type:`range`,min:`10`,max:`35`,step:`0.5`,"onUpdate:modelValue":s[8]||=e=>t.coneAngle=e},null,512),[[$,t.coneAngle,void 0,{number:!0}]])]),X(`label`,Oo,[X(`span`,null,[s[33]||=Z(`Cone length `,-1),X(`code`,null,M(t.coneLength.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`1.5`,max:`3.5`,step:`0.1`,"onUpdate:modelValue":s[9]||=e=>t.coneLength=e},null,512),[[$,t.coneLength,void 0,{number:!0}]])]),X(`label`,ko,[X(`span`,null,[s[34]||=Z(`Ripple amp `,-1),X(`code`,null,M(t.rippleAmp.toFixed(3)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`0.15`,step:`0.005`,"onUpdate:modelValue":s[10]||=e=>t.rippleAmp=e},null,512),[[$,t.rippleAmp,void 0,{number:!0}]])]),X(`label`,Ao,[X(`span`,null,[s[35]||=Z(`Ripple freq `,-1),X(`code`,null,M(t.rippleFreq.toFixed(1)),1)]),K(X(`input`,{type:`range`,min:`2`,max:`20`,step:`0.5`,"onUpdate:modelValue":s[11]||=e=>t.rippleFreq=e},null,512),[[$,t.rippleFreq,void 0,{number:!0}]])]),X(`label`,jo,[X(`span`,null,[s[36]||=Z(`Shock push `,-1),X(`code`,null,M(t.push.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`1.5`,step:`0.05`,"onUpdate:modelValue":s[12]||=e=>t.push=e},null,512),[[$,t.push,void 0,{number:!0}]])]),s[44]||=X(`div`,{class:`controls-title`},`Light & heat`,-1),X(`label`,Mo,[s[37]||=X(`span`,null,`Smoke colour`,-1),K(X(`input`,{type:`color`,"onUpdate:modelValue":s[13]||=e=>t.smokeColor=e},null,512),[[$,t.smokeColor]])]),X(`label`,No,[s[38]||=X(`span`,null,`Heat colour`,-1),K(X(`input`,{type:`color`,"onUpdate:modelValue":s[14]||=e=>t.heatColor=e},null,512),[[$,t.heatColor]])]),X(`label`,Po,[X(`span`,null,[s[39]||=Z(`Anisotropy `,-1),X(`code`,null,M(t.anisotropy.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`-0.85`,max:`0.85`,step:`0.05`,"onUpdate:modelValue":s[15]||=e=>t.anisotropy=e},null,512),[[$,t.anisotropy,void 0,{number:!0}]])]),X(`label`,Fo,[X(`span`,null,[s[40]||=Z(`Heat `,-1),X(`code`,null,M(t.heatStrength.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`3`,step:`0.05`,"onUpdate:modelValue":s[16]||=e=>t.heatStrength=e},null,512),[[$,t.heatStrength,void 0,{number:!0}]])]),X(`label`,Io,[X(`span`,null,[s[41]||=Z(`Scatter `,-1),X(`code`,null,M(t.scatter.toFixed(2)),1)]),K(X(`input`,{type:`range`,min:`0`,max:`2.5`,step:`0.05`,"onUpdate:modelValue":s[17]||=e=>t.scatter=e},null,512),[[$,t.scatter,void 0,{number:!0}]])])])]))}},[[`__scopeId`,`data-v-b4260f19`]]);ro({__name:`App`,setup(e){return(e,t)=>(Si(),Oi(Go))}}).mount(`#app`);