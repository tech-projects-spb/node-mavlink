"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.waitFor=exports.sleep=exports.dump=exports.hex=void 0;function hex(t,o=2,e="0x"){return`${e}${t.toString(16).padStart(o,"0")}`}exports.hex=hex;function dump(t,o=16){const e=[];let r=0;for(let n=0;n<t.length;n++)e.push(hex(t[n],2,"0x")),e.length===o&&(console.log(hex(r,4),"|",e.join(" ")),r+=o,e.length=0);e.length>0&&console.log(hex(r,4),"|",e.join(" "))}exports.dump=dump;function sleep(t){return new Promise(o=>setTimeout(o,t))}exports.sleep=sleep;async function waitFor(t,o=1e4,e=100){return new Promise((r,n)=>{const l=setTimeout(()=>{s(),n("Timeout")},o),u=setInterval(()=>{const i=t();i&&(s(),r(i))}),s=()=>{clearTimeout(l),clearTimeout(u)}})}exports.waitFor=waitFor;