var va="186";var hl=0,Yo=1,ul=2;var nr=1,dl=2,gs=3,bi=0,sn=1,Hn=2,Gn=0,_s=1,Ko=2,Zo=3,Jo=4,fl=5;var Oi=100,pl=101,ml=102,gl=103,_l=104,vl=200,xl=201,yl=202,Sl=203,$o=204,Qo=205,bl=206,Ml=207,Tl=208,wl=209,El=210,Al=211,Cl=212,Rl=213,Pl=214,zr=0,Vr=1,Hr=2,rs=3,Gr=4,Wr=5,qr=6,Xr=7,jo=0,Il=1,Ll=2,Cn=0,tc=1,ec=2,nc=3,ic=4,sc=5,rc=6,ac=7;var oc=300,Mi=301,ki=302,xa=303,ya=304,ir=306,Yr=1e3,Bn=1001,Kr=1002,ke=1003,Nl=1004;var sr=1005;var He=1006,Sa=1007;var Wn=1008;var on=1009,cc=1010,lc=1011,vs=1012,ba=1013,Rn=1014,Pn=1015,In=1016,Ma=1017,Ta=1018,xs=1020,hc=35902,uc=35899,dc=1021,fc=1022,xn=1023,On=1026,Ti=1027,pc=1028,wa=1029,wi=1030,Ea=1031;var Aa=1033,rr=33776,ar=33777,or=33778,cr=33779,Ca=35840,Ra=35841,Pa=35842,Ia=35843,La=36196,Na=37492,Ua=37496,Da=37488,Fa=37489,lr=37490,Ba=37491,Oa=37808,ka=37809,za=37810,Va=37811,Ha=37812,Ga=37813,Wa=37814,qa=37815,Xa=37816,Ya=37817,Ka=37818,Za=37819,Ja=37820,$a=37821,Qa=36492,ja=36494,to=36495,eo=36283,no=36284,hr=36285,io=36286;var Bs=2300,Zr=2301,Br=2302,zo=2303,Vo=2400,Ho=2401,Go=2402;var Ul=3200;var so=0,Dl=1,ri="",Ke="srgb",Os="srgb-linear",ks="linear",he="srgb";var Or=7680;var Fl=519,Bl=512,Ol=513,kl=514,ro=515,zl=516,Vl=517,ao=518,Hl=519,Gl=35044;var mc="300 es",An=2e3,as=2001;function Dh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Fh(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function os(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wl(){let i=os("canvas");return i.style.display="block",i}var Vc={},cs=null;function gc(...i){let t="THREE."+i.shift();cs?cs("log",t,...i):console.log(t,...i)}function ql(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Dt(...i){i=ql(i);let t="THREE."+i.shift();if(cs)cs("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Bt(...i){i=ql(i);let t="THREE."+i.shift();if(cs)cs("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Bi(...i){let t=i.join(" ");t in Vc||(Vc[t]=!0,Dt(...i))}function Xl(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Yl={[zr]:Vr,[Hr]:qr,[Gr]:Xr,[rs]:Wr,[Vr]:zr,[qr]:Hr,[Xr]:Gr,[Wr]:rs},kn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hc=1234567,Ds=Math.PI/180,ls=180/Math.PI;function ys(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xe[i&255]+Xe[i>>8&255]+Xe[i>>16&255]+Xe[i>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[e&63|128]+Xe[e>>8&255]+"-"+Xe[e>>16&255]+Xe[e>>24&255]+Xe[n&255]+Xe[n>>8&255]+Xe[n>>16&255]+Xe[n>>24&255]).toLowerCase()}function jt(i,t,e){return Math.max(t,Math.min(e,i))}function _c(i,t){return(i%t+t)%t}function Bh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Oh(i,t,e){return i!==t?(e-i)/(t-i):0}function Fs(i,t,e){return(1-e)*i+e*t}function kh(i,t,e,n){return Fs(i,t,1-Math.exp(-e*n))}function zh(i,t=1){return t-Math.abs(_c(i,t*2)-t)}function Vh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Hh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Gh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Wh(i,t){return i+Math.random()*(t-i)}function qh(i){return i*(.5-Math.random())}function Xh(i){i!==void 0&&(Hc=i);let t=Hc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Yh(i){return i*Ds}function Kh(i){return i*ls}function Zh(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Jh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function $h(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Qh(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),f=r((t-n)/2),h=a((t-n)/2),m=r((n-t)/2),x=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*f,c*h,o*l);break;case"YZY":i.set(c*h,o*u,c*f,o*l);break;case"ZXZ":i.set(c*f,c*h,o*u,o*l);break;case"XZX":i.set(o*u,c*x,c*m,o*l);break;case"YXY":i.set(c*m,o*u,c*x,o*l);break;case"ZYZ":i.set(c*x,c*m,o*u,o*l);break;default:Dt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function is(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function tn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Ss={DEG2RAD:Ds,RAD2DEG:ls,generateUUID:ys,clamp:jt,euclideanModulo:_c,mapLinear:Bh,inverseLerp:Oh,lerp:Fs,damp:kh,pingpong:zh,smoothstep:Vh,smootherstep:Hh,randInt:Gh,randFloat:Wh,randFloatSpread:qh,seededRandom:Xh,degToRad:Yh,radToDeg:Kh,isPowerOfTwo:Zh,ceilPowerOfTwo:Jh,floorPowerOfTwo:$h,setQuaternionFromProperEuler:Qh,normalize:tn,denormalize:is},Zt=class i{static{i.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},zn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],h=r[a+0],m=r[a+1],x=r[a+2],T=r[a+3];if(f!==T||c!==h||l!==m||u!==x){let g=c*h+l*m+u*x+f*T;g<0&&(h=-h,m=-m,x=-x,T=-T,g=-g);let d=1-o;if(g<.9995){let E=Math.acos(g),R=Math.sin(E);d=Math.sin(d*E)/R,o=Math.sin(o*E)/R,c=c*d+h*o,l=l*d+m*o,u=u*d+x*o,f=f*d+T*o}else{c=c*d+h*o,l=l*d+m*o,u=u*d+x*o,f=f*d+T*o;let E=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=E,l*=E,u*=E,f*=E}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],f=r[a],h=r[a+1],m=r[a+2],x=r[a+3];return t[e]=o*x+u*f+c*m-l*h,t[e+1]=c*x+u*h+l*f-o*m,t[e+2]=l*x+u*m+o*h-c*f,t[e+3]=u*x-o*f-c*h-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),f=o(r/2),h=c(n/2),m=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=h*u*f+l*m*x,this._y=l*m*f-h*u*x,this._z=l*u*x+h*m*f,this._w=l*u*f-h*m*x;break;case"YXZ":this._x=h*u*f+l*m*x,this._y=l*m*f-h*u*x,this._z=l*u*x-h*m*f,this._w=l*u*f+h*m*x;break;case"ZXY":this._x=h*u*f-l*m*x,this._y=l*m*f+h*u*x,this._z=l*u*x+h*m*f,this._w=l*u*f-h*m*x;break;case"ZYX":this._x=h*u*f-l*m*x,this._y=l*m*f+h*u*x,this._z=l*u*x-h*m*f,this._w=l*u*f+h*m*x;break;case"YZX":this._x=h*u*f+l*m*x,this._y=l*m*f+h*u*x,this._z=l*u*x-h*m*f,this._w=l*u*f-h*m*x;break;case"XZY":this._x=h*u*f-l*m*x,this._y=l*m*f-h*u*x,this._z=l*u*x+h*m*f,this._w=l*u*f+h*m*x;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=n+o+f;if(h>0){let m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>f){let m=2*Math.sqrt(1+n-o-f);this._w=(u-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>f){let m=2*Math.sqrt(1+o-n-f);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+u)/m}else{let m=2*Math.sqrt(1+f-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},z=class i{static{i.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+c*l+a*f-o*u,this.y=n+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xo.copy(this).projectOnVector(t),this.sub(xo)}reflect(t){return this.sub(xo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},xo=new z,Gc=new zn,zt=class i{static{i.prototype.isMatrix3=!0}constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],m=n[5],x=n[8],T=s[0],g=s[3],d=s[6],E=s[1],R=s[4],y=s[7],b=s[2],M=s[5],C=s[8];return r[0]=a*T+o*E+c*b,r[3]=a*g+o*R+c*M,r[6]=a*d+o*y+c*C,r[1]=l*T+u*E+f*b,r[4]=l*g+u*R+f*M,r[7]=l*d+u*y+f*C,r[2]=h*T+m*E+x*b,r[5]=h*g+m*R+x*M,r[8]=h*d+m*y+x*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=u*a-o*l,h=o*c-u*r,m=l*r-a*c,x=e*f+n*h+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let T=1/x;return t[0]=f*T,t[1]=(s*l-u*n)*T,t[2]=(o*n-s*a)*T,t[3]=h*T,t[4]=(u*e-s*c)*T,t[5]=(s*r-o*e)*T,t[6]=m*T,t[7]=(n*c-l*e)*T,t[8]=(a*e-n*r)*T,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return Bi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(yo.makeScale(t,e)),this}rotate(t){return Bi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(yo.makeRotation(-t)),this}translate(t,e){return Bi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(yo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},yo=new zt,Wc=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qc=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jh(){let i={enabled:!0,workingColorSpace:Os,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===he&&(s.r=ni(s.r),s.g=ni(s.g),s.b=ni(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===he&&(s.r=ss(s.r),s.g=ss(s.g),s.b=ss(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?ks:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Bi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Bi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Os]:{primaries:t,whitePoint:n,transfer:ks,toXYZ:Wc,fromXYZ:qc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:t,whitePoint:n,transfer:he,toXYZ:Wc,fromXYZ:qc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}}),i}var Qt=jh();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ss(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Gi,Jr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Gi===void 0&&(Gi=os("canvas")),Gi.width=t.width,Gi.height=t.height;let s=Gi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Gi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=os("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ni(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ni(e[n]/255)*255):e[n]=ni(e[n]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},tu=0,hs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=ys(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(So(s[a].image)):r.push(So(s[a]))}else r=So(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function So(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}var eu=0,bo=new z,en=class i extends kn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Bn,s=Bn,r=He,a=Wn,o=xn,c=on,l=i.DEFAULT_ANISOTROPY,u=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=ys(),this.name="",this.source=new hs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(bo).x}get height(){return this.source.getSize(bo).y}get depth(){return this.source.getSize(bo).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==oc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Yr:t.x=t.x-Math.floor(t.x);break;case Bn:t.x=t.x<0?0:1;break;case Kr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Yr:t.y=t.y-Math.floor(t.y);break;case Bn:t.y=t.y<0?0:1;break;case Kr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=oc;en.DEFAULT_ANISOTROPY=1;var Me=class i{static{i.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],m=c[5],x=c[9],T=c[2],g=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-T)<.01&&Math.abs(x-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+T)<.1&&Math.abs(x+g)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let R=(l+1)/2,y=(m+1)/2,b=(d+1)/2,M=(u+h)/4,C=(f+T)/4,_=(x+g)/4;return R>y&&R>b?R<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(R),s=M/n,r=C/n):y>b?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=M/s,r=_/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=C/r,s=_/r),this.set(n,s,r,e),this}let E=Math.sqrt((g-x)*(g-x)+(f-T)*(f-T)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(g-x)/E,this.y=(f-T)/E,this.z=(h-u)/E,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this.w=jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this.w=jt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},$r=class extends kn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:He,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new en(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:He,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new hs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},an=class extends $r{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},zs=class extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qr=class extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var we=class i{static{i.prototype.isMatrix4=!0}constructor(t,e,n,s,r,a,o,c,l,u,f,h,m,x,T,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,f,h,m,x,T,g)}set(t,e,n,s,r,a,o,c,l,u,f,h,m,x,T,g){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=f,d[14]=h,d[3]=m,d[7]=x,d[11]=T,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Wi.setFromMatrixColumn(t,0).length(),r=1/Wi.setFromMatrixColumn(t,1).length(),a=1/Wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let h=a*u,m=a*f,x=o*u,T=o*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=m+x*l,e[5]=h-T*l,e[9]=-o*c,e[2]=T-h*l,e[6]=x+m*l,e[10]=a*c}else if(t.order==="YXZ"){let h=c*u,m=c*f,x=l*u,T=l*f;e[0]=h+T*o,e[4]=x*o-m,e[8]=a*l,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=m*o-x,e[6]=T+h*o,e[10]=a*c}else if(t.order==="ZXY"){let h=c*u,m=c*f,x=l*u,T=l*f;e[0]=h-T*o,e[4]=-a*f,e[8]=x+m*o,e[1]=m+x*o,e[5]=a*u,e[9]=T-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let h=a*u,m=a*f,x=o*u,T=o*f;e[0]=c*u,e[4]=x*l-m,e[8]=h*l+T,e[1]=c*f,e[5]=T*l+h,e[9]=m*l-x,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let h=a*c,m=a*l,x=o*c,T=o*l;e[0]=c*u,e[4]=T-h*f,e[8]=x*f+m,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=m*f+x,e[10]=h-T*f}else if(t.order==="XZY"){let h=a*c,m=a*l,x=o*c,T=o*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+T,e[5]=a*u,e[9]=m*f-x,e[2]=x*f-m,e[6]=o*u,e[10]=T*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(nu,t,iu)}lookAt(t,e,n){let s=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),oi.crossVectors(n,hn),oi.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),oi.crossVectors(n,hn)),oi.normalize(),vr.crossVectors(hn,oi),s[0]=oi.x,s[4]=vr.x,s[8]=hn.x,s[1]=oi.y,s[5]=vr.y,s[9]=hn.y,s[2]=oi.z,s[6]=vr.z,s[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],m=n[13],x=n[2],T=n[6],g=n[10],d=n[14],E=n[3],R=n[7],y=n[11],b=n[15],M=s[0],C=s[4],_=s[8],w=s[12],I=s[1],F=s[5],B=s[9],V=s[13],N=s[2],G=s[6],J=s[10],Q=s[14],at=s[3],K=s[7],nt=s[11],st=s[15];return r[0]=a*M+o*I+c*N+l*at,r[4]=a*C+o*F+c*G+l*K,r[8]=a*_+o*B+c*J+l*nt,r[12]=a*w+o*V+c*Q+l*st,r[1]=u*M+f*I+h*N+m*at,r[5]=u*C+f*F+h*G+m*K,r[9]=u*_+f*B+h*J+m*nt,r[13]=u*w+f*V+h*Q+m*st,r[2]=x*M+T*I+g*N+d*at,r[6]=x*C+T*F+g*G+d*K,r[10]=x*_+T*B+g*J+d*nt,r[14]=x*w+T*V+g*Q+d*st,r[3]=E*M+R*I+y*N+b*at,r[7]=E*C+R*F+y*G+b*K,r[11]=E*_+R*B+y*J+b*nt,r[15]=E*w+R*V+y*Q+b*st,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],m=t[14],x=t[3],T=t[7],g=t[11],d=t[15],E=c*m-l*h,R=o*m-l*f,y=o*h-c*f,b=a*m-l*u,M=a*h-c*u,C=a*f-o*u;return e*(T*E-g*R+d*y)-n*(x*E-g*b+d*M)+s*(x*R-T*b+d*C)-r*(x*y-T*M+g*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10];return e*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],m=t[11],x=t[12],T=t[13],g=t[14],d=t[15],E=e*o-n*a,R=e*c-s*a,y=e*l-r*a,b=n*c-s*o,M=n*l-r*o,C=s*l-r*c,_=u*T-f*x,w=u*g-h*x,I=u*d-m*x,F=f*g-h*T,B=f*d-m*T,V=h*d-m*g,N=E*V-R*B+y*F+b*I-M*w+C*_;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/N;return t[0]=(o*V-c*B+l*F)*G,t[1]=(s*B-n*V-r*F)*G,t[2]=(T*C-g*M+d*b)*G,t[3]=(h*M-f*C-m*b)*G,t[4]=(c*I-a*V-l*w)*G,t[5]=(e*V-s*I+r*w)*G,t[6]=(g*y-x*C-d*R)*G,t[7]=(u*C-h*y+m*R)*G,t[8]=(a*B-o*I+l*_)*G,t[9]=(n*I-e*B-r*_)*G,t[10]=(x*M-T*y+d*E)*G,t[11]=(f*y-u*M-m*E)*G,t[12]=(o*w-a*F-c*_)*G,t[13]=(e*F-n*w+s*_)*G,t[14]=(T*R-x*b-g*E)*G,t[15]=(u*b-f*R+h*E)*G,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,f=o+o,h=r*l,m=r*u,x=r*f,T=a*u,g=a*f,d=o*f,E=c*l,R=c*u,y=c*f,b=n.x,M=n.y,C=n.z;return s[0]=(1-(T+d))*b,s[1]=(m+y)*b,s[2]=(x-R)*b,s[3]=0,s[4]=(m-y)*M,s[5]=(1-(h+d))*M,s[6]=(g+E)*M,s[7]=0,s[8]=(x+R)*C,s[9]=(g-E)*C,s[10]=(1-(h+T))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Wi.set(s[0],s[1],s[2]).length(),o=Wi.set(s[4],s[5],s[6]).length(),c=Wi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Mn.copy(this);let l=1/a,u=1/o,f=1/c;return Mn.elements[0]*=l,Mn.elements[1]*=l,Mn.elements[2]*=l,Mn.elements[4]*=u,Mn.elements[5]*=u,Mn.elements[6]*=u,Mn.elements[8]*=f,Mn.elements[9]*=f,Mn.elements[10]*=f,e.setFromRotationMatrix(Mn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=An,c=!1){let l=this.elements,u=2*r/(e-t),f=2*r/(n-s),h=(e+t)/(e-t),m=(n+s)/(n-s),x,T;if(c)x=r/(a-r),T=a*r/(a-r);else if(o===An)x=-(a+r)/(a-r),T=-2*a*r/(a-r);else if(o===as)x=-a/(a-r),T=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=T,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=An,c=!1){let l=this.elements,u=2/(e-t),f=2/(n-s),h=-(e+t)/(e-t),m=-(n+s)/(n-s),x,T;if(c)x=1/(a-r),T=a/(a-r);else if(o===An)x=-2/(a-r),T=-(a+r)/(a-r);else if(o===as)x=-1/(a-r),T=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=T,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Wi=new z,Mn=new we,nu=new z(0,0,0),iu=new z(1,1,1),oi=new z,vr=new z,hn=new z,Xc=new we,Yc=new zn,ii=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-jt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Xc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yc.setFromEuler(this),this.setFromQuaternion(Yc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ii.DEFAULT_ORDER="XYZ";var Vs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},su=0,Kc=new z,qi=new zn,$n=new we,xr=new z,Is=new z,ru=new z,au=new zn,Zc=new z(1,0,0),Jc=new z(0,1,0),$c=new z(0,0,1),Qc={type:"added"},ou={type:"removed"},Xi={type:"childadded",child:null},Mo={type:"childremoved",child:null},Ze=class i extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=ys(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new z,e=new ii,n=new zn,s=new z(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new we},normalMatrix:{value:new zt}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(Zc,t)}rotateY(t){return this.rotateOnAxis(Jc,t)}rotateZ(t){return this.rotateOnAxis($c,t)}translateOnAxis(t,e){return Kc.copy(t).applyQuaternion(this.quaternion),this.position.add(Kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zc,t)}translateY(t){return this.translateOnAxis(Jc,t)}translateZ(t){return this.translateOnAxis($c,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?xr.copy(t):xr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(Is,xr,this.up):$n.lookAt(xr,Is,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),qi.setFromRotationMatrix($n),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Bt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qc),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null):Bt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ou),Mo.child=t,this.dispatchEvent(Mo),Mo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),$n.multiply(t.parent.matrixWorld)),t.applyMatrix4($n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qc),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,t,ru),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,au,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),m=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ze.DEFAULT_UP=new z(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var re=class extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},cu={type:"move"},us=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let T of t.hand.values()){let g=e.getJointPose(T,n),d=this._getHandJoint(l,T);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),m=.02,x=.005;l.inputState.pinching&&h>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cu)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Kl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},yr={h:0,s:0,l:0};function To(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ht=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Qt.workingColorSpace){if(t=_c(t,1),e=jt(e,0,1),n=jt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=To(a,r,t+1/3),this.g=To(a,r,t),this.b=To(a,r,t-1/3)}return Qt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ke){function n(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){let n=Kl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=ss(t.r),this.g=ss(t.g),this.b=ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return Qt.workingToColorSpace(Ye.copy(this),t),Math.round(jt(Ye.r*255,0,255))*65536+Math.round(jt(Ye.g*255,0,255))*256+Math.round(jt(Ye.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.workingToColorSpace(Ye.copy(this),e);let n=Ye.r,s=Ye.g,r=Ye.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Qt.workingColorSpace){return Qt.workingToColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=Ke){Qt.workingToColorSpace(Ye.copy(this),t);let e=Ye.r,n=Ye.g,s=Ye.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ci),this.setHSL(ci.h+t,ci.s+e,ci.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ci),t.getHSL(yr);let n=Fs(ci.h,yr.h,e),s=Fs(ci.s,yr.s,e),r=Fs(ci.l,yr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ye=new Ht;Ht.NAMES=Kl;var Hs=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Gs=class extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Tn=new z,Qn=new z,wo=new z,jn=new z,Yi=new z,Ki=new z,jc=new z,Eo=new z,Ao=new z,Co=new z,Ro=new Me,Po=new Me,Io=new Me,di=class i{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Tn.subVectors(t,e),s.cross(Tn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Tn.subVectors(s,e),Qn.subVectors(n,e),wo.subVectors(t,e);let a=Tn.dot(Tn),o=Tn.dot(Qn),c=Tn.dot(wo),l=Qn.dot(Qn),u=Qn.dot(wo),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let h=1/f,m=(l*c-o*u)*h,x=(a*u-o*c)*h;return r.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,jn.x),c.addScaledVector(a,jn.y),c.addScaledVector(o,jn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ro.setScalar(0),Po.setScalar(0),Io.setScalar(0),Ro.fromBufferAttribute(t,e),Po.fromBufferAttribute(t,n),Io.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ro,r.x),a.addScaledVector(Po,r.y),a.addScaledVector(Io,r.z),a}static isFrontFacing(t,e,n,s){return Tn.subVectors(n,e),Qn.subVectors(t,e),Tn.cross(Qn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Tn.cross(Qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Yi.subVectors(s,n),Ki.subVectors(r,n),Eo.subVectors(t,n);let c=Yi.dot(Eo),l=Ki.dot(Eo);if(c<=0&&l<=0)return e.copy(n);Ao.subVectors(t,s);let u=Yi.dot(Ao),f=Ki.dot(Ao);if(u>=0&&f<=u)return e.copy(s);let h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Yi,a);Co.subVectors(t,r);let m=Yi.dot(Co),x=Ki.dot(Co);if(x>=0&&m<=x)return e.copy(r);let T=m*l-c*x;if(T<=0&&l>=0&&x<=0)return o=l/(l-x),e.copy(n).addScaledVector(Ki,o);let g=u*x-m*f;if(g<=0&&f-u>=0&&m-x>=0)return jc.subVectors(r,s),o=(f-u)/(f-u+(m-x)),e.copy(s).addScaledVector(jc,o);let d=1/(g+T+h);return a=T*d,o=h*d,e.copy(n).addScaledVector(Yi,a).addScaledVector(Ki,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},fi=class{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,wn):wn.fromBufferAttribute(r,a),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Sr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Sr.copy(n.boundingBox)),Sr.applyMatrix4(t.matrixWorld),this.union(Sr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ls),br.subVectors(this.max,Ls),Zi.subVectors(t.a,Ls),Ji.subVectors(t.b,Ls),$i.subVectors(t.c,Ls),li.subVectors(Ji,Zi),hi.subVectors($i,Ji),Ni.subVectors(Zi,$i);let e=[0,-li.z,li.y,0,-hi.z,hi.y,0,-Ni.z,Ni.y,li.z,0,-li.x,hi.z,0,-hi.x,Ni.z,0,-Ni.x,-li.y,li.x,0,-hi.y,hi.x,0,-Ni.y,Ni.x,0];return!Lo(e,Zi,Ji,$i,br)||(e=[1,0,0,0,1,0,0,0,1],!Lo(e,Zi,Ji,$i,br))?!1:(Mr.crossVectors(li,hi),e=[Mr.x,Mr.y,Mr.z],Lo(e,Zi,Ji,$i,br))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ti),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},ti=[new z,new z,new z,new z,new z,new z,new z,new z],wn=new z,Sr=new fi,Zi=new z,Ji=new z,$i=new z,li=new z,hi=new z,Ni=new z,Ls=new z,br=new z,Mr=new z,Ui=new z;function Lo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ui.fromArray(i,r);let o=s.x*Math.abs(Ui.x)+s.y*Math.abs(Ui.y)+s.z*Math.abs(Ui.z),c=t.dot(Ui),l=e.dot(Ui),u=n.dot(Ui);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var Le=new z,Tr=new Zt,lu=0,_n=class extends kn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Gl,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Tr.fromBufferAttribute(this,e),Tr.applyMatrix3(t),this.setXY(e,Tr.x,Tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=is(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=tn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=is(e,this.array)),e}setX(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=is(e,this.array)),e}setY(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=is(e,this.array)),e}setZ(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=is(e,this.array)),e}setW(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),n=tn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),n=tn(n,this.array),s=tn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),n=tn(n,this.array),s=tn(s,this.array),r=tn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Ws=class extends _n{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var qs=class extends _n{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Re=class extends _n{constructor(t,e,n){super(new Float32Array(t),e,n)}},hu=new fi,Ns=new z,No=new z,ds=class{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):hu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ns.subVectors(t,this.center);let e=Ns.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ns,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(No.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ns.copy(t.center).add(No)),this.expandByPoint(Ns.copy(t.center).sub(No))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},uu=0,gn=new we,Uo=new Ze,Qi=new z,un=new fi,Us=new fi,Oe=new z,dn=class i extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=ys(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dh(t)?qs:Ws)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return Uo.lookAt(t),Uo.updateMatrix(),this.applyMatrix4(Uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Re(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Oe.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Oe),Oe.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Oe)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ds);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){let n=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Us.setFromBufferAttribute(o),this.morphTargetsRelative?(Oe.addVectors(un.min,Us.min),un.expandByPoint(Oe),Oe.addVectors(un.max,Us.max),un.expandByPoint(Oe)):(un.expandByPoint(Us.min),un.expandByPoint(Us.max))}un.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Oe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Oe));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Oe.fromBufferAttribute(o,l),c&&(Qi.fromBufferAttribute(t,l),Oe.add(Qi)),s=Math.max(s,n.distanceToSquared(Oe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new _n(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let _=0;_<n.count;_++)o[_]=new z,c[_]=new z;let l=new z,u=new z,f=new z,h=new Zt,m=new Zt,x=new Zt,T=new z,g=new z;function d(_,w,I){l.fromBufferAttribute(n,_),u.fromBufferAttribute(n,w),f.fromBufferAttribute(n,I),h.fromBufferAttribute(r,_),m.fromBufferAttribute(r,w),x.fromBufferAttribute(r,I),u.sub(l),f.sub(l),m.sub(h),x.sub(h);let F=1/(m.x*x.y-x.x*m.y);isFinite(F)&&(T.copy(u).multiplyScalar(x.y).addScaledVector(f,-m.y).multiplyScalar(F),g.copy(f).multiplyScalar(m.x).addScaledVector(u,-x.x).multiplyScalar(F),o[_].add(T),o[w].add(T),o[I].add(T),c[_].add(g),c[w].add(g),c[I].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let _=0,w=E.length;_<w;++_){let I=E[_],F=I.start,B=I.count;for(let V=F,N=F+B;V<N;V+=3)d(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let R=new z,y=new z,b=new z,M=new z;function C(_){b.fromBufferAttribute(s,_),M.copy(b);let w=o[_];R.copy(w),R.sub(b.multiplyScalar(b.dot(w))).normalize(),y.crossVectors(M,w);let F=y.dot(c[_])<0?-1:1;a.setXYZW(_,R.x,R.y,R.z,F)}for(let _=0,w=E.length;_<w;++_){let I=E[_],F=I.start,B=I.count;for(let V=F,N=F+B;V<N;V+=3)C(t.getX(V+0)),C(t.getX(V+1)),C(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new _n(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);let s=new z,r=new z,a=new z,o=new z,c=new z,l=new z,u=new z,f=new z;if(t)for(let h=0,m=t.count;h<m;h+=3){let x=t.getX(h+0),T=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,T),a.fromBufferAttribute(e,g),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,T),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(T,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,m=e.count;h<m;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Oe.fromBufferAttribute(t,e),Oe.normalize(),t.setXYZ(e,Oe.x,Oe.y,Oe.z)}toNonIndexed(){function t(o,c){let l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u),m=0,x=0;for(let T=0,g=c.length;T<g;T++){o.isInterleavedBufferAttribute?m=c[T]*o.data.stride+o.offset:m=c[T]*u;for(let d=0;d<u;d++)h[x++]=l[m++]}return new _n(h,u,f)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){let h=l[u],m=t(h,n);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){let m=l[f];u.push(m.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],f=r[l];for(let h=0,m=f.length;h<m;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,u=a.length;l<u;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Do=new z,du=new z,fu=new zt,En=class{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Do.subVectors(n,e).cross(du.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Do),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||fu.getNormalMatrix(t),s=this.coplanarPoint(Do).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},pu=0,pi=class extends kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pu++}),this.uuid=ys(),this.name="",this.type="Material",this.blending=_s,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$o,this.blendDst=Qo,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Or,this.stencilZFail=Or,this.stencilZPass=Or,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ht().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new En().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Zt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Zt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var ei=new z,Fo=new z,wr=new z,Er=new z,jr=class{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ei)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ei.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ei.copy(this.origin).addScaledVector(this.direction,e),ei.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Fo.copy(t).add(e).multiplyScalar(.5),wr.copy(e).sub(t).normalize(),Er.copy(this.origin).sub(Fo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(wr),o=Er.dot(this.direction),c=-Er.dot(wr),l=Er.lengthSq(),u=Math.abs(1-a*a),f,h,m,x;if(u>0)if(f=a*c-o,h=a*o-c,x=r*u,f>=0)if(h>=-x)if(h<=x){let T=1/u;f*=T,h*=T,m=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=r,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*c)+l;else h<=-x?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+h*(h+2*c)+l):h<=x?(f=0,h=Math.min(Math.max(-r,-c),r),m=h*(h+2*c)+l):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+h*(h+2*c)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Fo).addScaledVector(wr,h),m}intersectSphere(t,e){if(t.radius<0)return null;ei.subVectors(t.center,this.origin);let n=ei.dot(this.direction),s=ei.dot(ei)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ei)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,f=t.x-a.x,h=t.y-a.y,m=t.z-a.z,x=e.x-a.x,T=e.y-a.y,g=e.z-a.z,d=n.x-a.x,E=n.y-a.y,R=n.z-a.z,y=Math.abs(c),b=Math.abs(l),M=Math.abs(u),C,_,w,I,F,B,V,N,G,J,Q,at;if(y>=b&&y>=M?(w=c,B=f,G=x,at=d,c>=0?(C=l,_=u,I=h,F=m,V=T,N=g,J=E,Q=R):(C=u,_=l,I=m,F=h,V=g,N=T,J=R,Q=E)):b>=M?(w=l,B=h,G=T,at=E,l>=0?(C=u,_=c,I=m,F=f,V=g,N=x,J=R,Q=d):(C=c,_=u,I=f,F=m,V=x,N=g,J=d,Q=R)):(w=u,B=m,G=g,at=R,u>=0?(C=c,_=l,I=f,F=h,V=x,N=T,J=d,Q=E):(C=l,_=c,I=h,F=f,V=T,N=x,J=E,Q=d)),w===0)return null;let K=C/w,nt=_/w,st=1/w,Lt=I-K*B,vt=F-nt*B,ue=V-K*G,Kt=N-nt*G,te=J-K*at,Z=Q-nt*at,et=te*Kt-Z*ue,St=Lt*Z-vt*te,Ot=ue*vt-Kt*Lt;if(s){if(et<0||St<0||Ot<0)return null}else if((et<0||St<0||Ot<0)&&(et>0||St>0||Ot>0))return null;let xt=et+St+Ot;if(xt===0)return null;let Gt=st*(et*B+St*G+Ot*at);return(xt>0?Gt<0:Gt>0)?null:this.at(Gt/xt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vn=class extends pi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},tl=new we,Di=new jr,Ar=new ds,el=new z,Cr=new z,Rr=new z,Pr=new z,Bo=new z,Ir=new z,nl=new z,Lr=new z,be=class extends Ze{constructor(t=new dn,e=new vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Ir.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],f=r[c];u!==0&&(Bo.fromBufferAttribute(f,t),a?Ir.addScaledVector(Bo,u):Ir.addScaledVector(Bo.sub(e),u))}e.add(Ir)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(r),Di.copy(t.ray).recast(t.near),!(Ar.containsPoint(Di.origin)===!1&&(Di.intersectSphere(Ar,el)===null||Di.origin.distanceToSquared(el)>(t.far-t.near)**2))&&(tl.copy(r).invert(),Di.copy(t.ray).applyMatrix4(tl),!(n.boundingBox!==null&&Di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Di)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,T=h.length;x<T;x++){let g=h[x],d=a[g.materialIndex],E=Math.max(g.start,m.start),R=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let y=E,b=R;y<b;y+=3){let M=o.getX(y),C=o.getX(y+1),_=o.getX(y+2);s=Nr(this,d,t,n,l,u,f,M,C,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let x=Math.max(0,m.start),T=Math.min(o.count,m.start+m.count);for(let g=x,d=T;g<d;g+=3){let E=o.getX(g),R=o.getX(g+1),y=o.getX(g+2);s=Nr(this,a,t,n,l,u,f,E,R,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,T=h.length;x<T;x++){let g=h[x],d=a[g.materialIndex],E=Math.max(g.start,m.start),R=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let y=E,b=R;y<b;y+=3){let M=y,C=y+1,_=y+2;s=Nr(this,d,t,n,l,u,f,M,C,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let x=Math.max(0,m.start),T=Math.min(c.count,m.start+m.count);for(let g=x,d=T;g<d;g+=3){let E=g,R=g+1,y=g+2;s=Nr(this,a,t,n,l,u,f,E,R,y),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function mu(i,t,e,n,s,r,a,o){let c;if(t.side===sn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===bi,o),c===null)return null;Lr.copy(o),Lr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Lr);return l<e.near||l>e.far?null:{distance:l,point:Lr.clone(),object:i}}function Nr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Cr),i.getVertexPosition(c,Rr),i.getVertexPosition(l,Pr);let u=mu(i,t,e,n,Cr,Rr,Pr,nl);if(u){let f=new z;di.getBarycoord(nl,Cr,Rr,Pr,f),s&&(u.uv=di.getInterpolatedAttribute(s,o,c,l,f,new Zt)),r&&(u.uv1=di.getInterpolatedAttribute(r,o,c,l,f,new Zt)),a&&(u.normal=di.getInterpolatedAttribute(a,o,c,l,f,new z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:c,c:l,normal:new z,materialIndex:0};di.getNormal(Cr,Rr,Pr,h.normal),u.face=h,u.barycoord=f}return u}var ta=class extends en{constructor(t=null,e=1,n=1,s,r,a,o,c,l=ke,u=ke,f,h){super(null,a,o,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Fi=new ds,gu=new Zt(.5,.5),Ur=new z,fs=class{constructor(t=new En,e=new En,n=new En,s=new En,r=new En,a=new En){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=An,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],m=r[7],x=r[8],T=r[9],g=r[10],d=r[11],E=r[12],R=r[13],y=r[14],b=r[15];if(s[0].setComponents(l-a,m-u,d-x,b-E).normalize(),s[1].setComponents(l+a,m+u,d+x,b+E).normalize(),s[2].setComponents(l+o,m+f,d+T,b+R).normalize(),s[3].setComponents(l-o,m-f,d-T,b-R).normalize(),n)s[4].setComponents(c,h,g,y).normalize(),s[5].setComponents(l-c,m-h,d-g,b-y).normalize();else if(s[4].setComponents(l-c,m-h,d-g,b-y).normalize(),e===An)s[5].setComponents(l+c,m+h,d+g,b+y).normalize();else if(e===as)s[5].setComponents(c,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(t){Fi.center.set(0,0,0);let e=gu.distanceTo(t.center);return Fi.radius=.7071067811865476+e,Fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ur.x=s.normal.x>0?t.max.x:t.min.x,Ur.y=s.normal.y>0?t.max.y:t.min.y,Ur.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Xs=class extends en{constructor(t=[],e=Mi,n,s,r,a,o,c,l,u){super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var mi=class extends en{constructor(t,e,n=Rn,s,r,a,o=ke,c=ke,l,u=On,f=1){if(u!==On&&u!==Ti)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:e,depth:f};super(h,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new hs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ea=class extends mi{constructor(t,e=Rn,n=Mi,s,r,a=ke,o=ke,c,l=On){let u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ys=class extends en{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},gi=class i extends dn{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],f=[],h=0,m=0;x("z","y","x",-1,-1,n,e,t,a,r,0),x("z","y","x",1,-1,n,e,-t,a,r,1),x("x","z","y",1,1,t,n,e,s,a,2),x("x","z","y",1,-1,t,n,-e,s,a,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(u,3)),this.setAttribute("uv",new Re(f,2));function x(T,g,d,E,R,y,b,M,C,_,w){let I=y/C,F=b/_,B=y/2,V=b/2,N=M/2,G=C+1,J=_+1,Q=0,at=0,K=new z;for(let nt=0;nt<J;nt++){let st=nt*F-V;for(let Lt=0;Lt<G;Lt++){let vt=Lt*I-B;K[T]=vt*E,K[g]=st*R,K[d]=N,l.push(K.x,K.y,K.z),K[T]=0,K[g]=0,K[d]=M>0?1:-1,u.push(K.x,K.y,K.z),f.push(Lt/C),f.push(1-nt/_),Q+=1}}for(let nt=0;nt<_;nt++)for(let st=0;st<C;st++){let Lt=h+st+G*nt,vt=h+st+G*(nt+1),ue=h+(st+1)+G*(nt+1),Kt=h+(st+1)+G*nt;c.push(Lt,vt,Kt),c.push(vt,ue,Kt),at+=6}o.addGroup(m,at,w),m+=at,h+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var si=class i extends dn{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],c=[],l=new z,u=new Zt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,h=3;f<=e;f++,h+=3){let m=n+f/e*s;l.x=t*Math.cos(m),l.y=t*Math.sin(m),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[h]/t+1)/2,u.y=(a[h+1]/t+1)/2,c.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Re(a,3)),this.setAttribute("normal",new Re(o,3)),this.setAttribute("uv",new Re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ps=class i extends dn{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],f=[],h=[],m=[],x=0,T=[],g=n/2,d=0;E(),a===!1&&(t>0&&R(!0),e>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new Re(f,3)),this.setAttribute("normal",new Re(h,3)),this.setAttribute("uv",new Re(m,2));function E(){let y=new z,b=new z,M=0,C=(e-t)/n;for(let _=0;_<=r;_++){let w=[],I=_/r,F=I*(e-t)+t;for(let B=0;B<=s;B++){let V=B/s,N=V*c+o,G=Math.sin(N),J=Math.cos(N);b.x=F*G,b.y=-I*n+g,b.z=F*J,f.push(b.x,b.y,b.z),y.set(G,C,J).normalize(),h.push(y.x,y.y,y.z),m.push(V,1-I),w.push(x++)}T.push(w)}for(let _=0;_<s;_++)for(let w=0;w<r;w++){let I=T[w][_],F=T[w+1][_],B=T[w+1][_+1],V=T[w][_+1];(t>0||w!==0)&&(u.push(I,F,V),M+=3),(e>0||w!==r-1)&&(u.push(F,B,V),M+=3)}l.addGroup(d,M,0),d+=M}function R(y){let b=x,M=new Zt,C=new z,_=0,w=y===!0?t:e,I=y===!0?1:-1;for(let B=1;B<=s;B++)f.push(0,g*I,0),h.push(0,I,0),m.push(.5,.5),x++;let F=x;for(let B=0;B<=s;B++){let N=B/s*c+o,G=Math.cos(N),J=Math.sin(N);C.x=w*J,C.y=g*I,C.z=w*G,f.push(C.x,C.y,C.z),h.push(0,I,0),M.x=G*.5+.5,M.y=J*.5*I+.5,m.push(M.x,M.y),x++}for(let B=0;B<s;B++){let V=b+B,N=F+B;y===!0?u.push(N,N+1,V):u.push(N+1,N,V),_+=3}l.addGroup(d,_,y===!0?1:2),d+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Vn=class i extends ps{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var _i=class i extends dn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,f=t/o,h=e/c,m=[],x=[],T=[],g=[];for(let d=0;d<u;d++){let E=d*h-a;for(let R=0;R<l;R++){let y=R*f-r;x.push(y,-E,0),T.push(0,0,1),g.push(R/o),g.push(1-d/c)}}for(let d=0;d<c;d++)for(let E=0;E<o;E++){let R=E+l*d,y=E+l*(d+1),b=E+1+l*(d+1),M=E+1+l*d;m.push(R,y,M),m.push(y,b,M)}this.setIndex(m),this.setAttribute("position",new Re(x,3)),this.setAttribute("normal",new Re(T,3)),this.setAttribute("uv",new Re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ks=class i extends dn{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],f=new z,h=new z,m=[],x=[],T=[],g=[];for(let d=0;d<=n;d++){let E=[],R=d/n,y=a+R*o,b=t*Math.cos(y),M=Math.sqrt(t*t-b*b),C=0;d===0&&a===0?C=.5/e:d===n&&c===Math.PI&&(C=-.5/e);for(let _=0;_<=e;_++){let w=_/e,I=s+w*r;f.x=-M*Math.cos(I),f.y=b,f.z=M*Math.sin(I),x.push(f.x,f.y,f.z),h.copy(f).normalize(),T.push(h.x,h.y,h.z),g.push(w+C,1-R),E.push(l++)}u.push(E)}for(let d=0;d<n;d++)for(let E=0;E<e;E++){let R=u[d][E+1],y=u[d][E],b=u[d+1][E],M=u[d+1][E+1];(d!==0||a>0)&&m.push(R,y,M),(d!==n-1||c<Math.PI)&&m.push(y,b,M)}this.setIndex(m),this.setAttribute("position",new Re(x,3)),this.setAttribute("normal",new Re(T,3)),this.setAttribute("uv",new Re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function zi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(il(s))s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(il(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Je(i){let t={};for(let e=0;e<i.length;e++){let n=zi(i[e]);for(let s in n)t[s]=n[s]}return t}function il(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function _u(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function vc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}var Zl={clone:zi,merge:Je},vu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,nn=class extends pi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vu,this.fragmentShader=xu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=zi(t.uniforms),this.uniformsGroups=_u(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ht().setHex(s.value);break;case"v2":this.uniforms[n].value=new Zt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new z().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Me().fromArray(s.value);break;case"m3":this.uniforms[n].value=new zt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new we().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},na=class extends nn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Zs=class extends pi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new Zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ia=class extends pi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ul,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},sa=class extends pi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ji(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Oo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var vi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ra=class extends vi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vo,endingEnd:Vo}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ho:r=t,o=2*e-n;break;case Go:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ho:a=t,c=2*n-e;break;case Go:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,m=this._weightNext,x=(n-e)/(s-e),T=x*x,g=T*x,d=-h*g+2*h*T-h*x,E=(1+h)*g+(-1.5-2*h)*T+(-.5+h)*x+1,R=(-1-m)*g+(1.5+m)*T+.5*x,y=m*g-m*T;for(let b=0;b!==o;++b)r[b]=d*a[u+b]+E*a[l+b]+R*a[c+b]+y*a[f+b];return r}},aa=class extends vi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),f=1-u;for(let h=0;h!==o;++h)r[h]=a[l+h]*f+a[c+h]*u;return r}},oa=class extends vi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ca=class extends vi{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this.inTangents,f=this.outTangents;if(!u||!f){let x=(n-e)/(s-e),T=1-x;for(let g=0;g!==o;++g)r[g]=a[l+g]*T+a[c+g]*x;return r}let h=o*2,m=t-1;for(let x=0;x!==o;++x){let T=a[l+x],g=a[c+x],d=m*h+x*2,E=f[d],R=f[d+1],y=t*h+x*2,b=u[y],M=u[y+1],C=Su(n,e,E,b,s);r[x]=Jl(C,T,R,M,g)}return r}};function Jl(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function yu(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Su(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Jl(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let c=yu(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var fn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ji(e,this.TimeBufferType),this.values=ji(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ji(t.times,Array),values:ji(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Oo(t.settings)&&(n.settings={inTangents:ji(t.settings.inTangents,Array),outTangents:ji(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new oa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new aa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ra(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new ca(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Bs:e=this.InterpolantFactoryMethodDiscrete;break;case Zr:e=this.InterpolantFactoryMethodLinear;break;case Br:e=this.InterpolantFactoryMethodSmooth;break;case zo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Dt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bs;case this.InterpolantFactoryMethodLinear:return Zr;case this.InterpolantFactoryMethodSmooth:return Br;case this.InterpolantFactoryMethodBezier:return zo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Oo(this.settings)&&(sl(this.settings.inTangents,t),sl(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Bt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Bt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Bt("KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){Bt("KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&Fh(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Bt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Br,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{let f=o*n,h=f-n,m=f+n;for(let x=0;x!==n;++x){let T=e[f+x];if(T!==e[h+x]||T!==e[m+x]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let f=o*n,h=a*n;for(let m=0;m!==n;++m)e[h+m]=e[f+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Oo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function sl(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}fn.prototype.ValueTypeName="";fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=Zr;var xi=class extends fn{constructor(t,e,n){super(t,e,n)}};xi.prototype.ValueTypeName="bool";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=Bs;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;var la=class extends fn{constructor(t,e,n,s){super(t,e,n,s)}};la.prototype.ValueTypeName="color";var ha=class extends fn{constructor(t,e,n,s){super(t,e,n,s)}};ha.prototype.ValueTypeName="number";var ua=class extends vi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let u=l+o;l!==u;l+=4)zn.slerpFlat(r,0,a,l-o,a,l,c);return r}},Js=class extends fn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new ua(this.times,this.values,this.getValueSize(),t)}};Js.prototype.ValueTypeName="quaternion";Js.prototype.InterpolantFactoryMethodSmooth=void 0;var yi=class extends fn{constructor(t,e,n){super(t,e,n)}};yi.prototype.ValueTypeName="string";yi.prototype.ValueBufferType=Array;yi.prototype.DefaultInterpolation=Bs;yi.prototype.InterpolantFactoryMethodLinear=void 0;yi.prototype.InterpolantFactoryMethodSmooth=void 0;var da=class extends fn{constructor(t,e,n,s){super(t,e,n,s)}};da.prototype.ValueTypeName="vector";var kr={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(rl(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!rl(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function rl(i){try{let t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}var fa=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){let f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=l.length;f<h;f+=2){let m=l[f],x=l[f+1];if(m.global&&(m.lastIndex=0),m.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},$l=new fa,ms=class{constructor(t){this.manager=t!==void 0?t:$l,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ms.DEFAULT_MATERIAL_NAME="__DEFAULT";var ts=new WeakMap,pa=class extends ms{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,a=kr.get(`image:${t}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0);else{let f=ts.get(a);f===void 0&&(f=[],ts.set(a,f)),f.push({onLoad:e,onError:s})}return a}let o=os("img");function c(){u(),e&&e(this);let f=ts.get(this)||[];for(let h=0;h<f.length;h++){let m=f[h];m.onLoad&&m.onLoad(this)}ts.delete(this),r.manager.itemEnd(t)}function l(f){u(),s&&s(f),kr.remove(`image:${t}`);let h=ts.get(this)||[];for(let m=0;m<h.length;m++){let x=h[m];x.onError&&x.onError(f)}ts.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),kr.add(`image:${t}`,o),r.manager.itemStart(t),o.src=t,o}};var $s=class extends ms{constructor(t){super(t)}load(t,e,n,s){let r=new en,a=new pa(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){r.image=o,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Qs=class extends Ze{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},js=class extends Qs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},ko=new we,al=new z,ol=new z,ma=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Zt(512,512),this.mapType=on,this.map=null,this.mapPass=null,this.matrix=new we,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fs,this._frameExtents=new Zt(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;al.setFromMatrixPosition(t.matrixWorld),e.position.copy(al),ol.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ol),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){ko.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(ko,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===as||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(ko)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Dr=new z,Fr=new zn,Fn=new z,tr=class extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=An,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Dr,Fr,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Dr,Fr,Fn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Dr,Fr,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Dr,Fr,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ui=new z,cl=new Zt,ll=new Zt,rn=class extends tr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ls*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ls*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ui.x,ui.y).multiplyScalar(-t/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-t/ui.z)}getViewSize(t,e){return this.getViewBounds(t,cl,ll),e.subVectors(ll,cl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Si=class extends tr{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Wo=class extends ma{constructor(){super(new Si(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},er=class extends Qs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new Wo}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var es=-90,ns=1,ga=class extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new rn(es,ns,t,e);s.layers=this.layers,this.add(s);let r=new rn(es,ns,t,e);r.layers=this.layers,this.add(r);let a=new rn(es,ns,t,e);a.layers=this.layers,this.add(a);let o=new rn(es,ns,t,e);o.layers=this.layers,this.add(o);let c=new rn(es,ns,t,e);c.layers=this.layers,this.add(c);let l=new rn(es,ns,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===An)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===as)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let T=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=T,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},_a=class extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var xc="\\[\\]\\.:\\/",bu=new RegExp("["+xc+"]","g"),yc="[^"+xc+"]",Mu="[^"+xc.replace("\\.","")+"]",Tu=/((?:WC+[\/:])*)/.source.replace("WC",yc),wu=/(WCOD+)?/.source.replace("WCOD",Mu),Eu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yc),Au=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yc),Cu=new RegExp("^"+Tu+wu+Eu+Au+"$"),Ru=["material","materials","bones","map"],qo=class{constructor(t,e,n){let s=n||Se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Se=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(bu,"")}static parseTrackName(t){let e=Cu.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Ru.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Dt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Bt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Bt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Bt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Bt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Bt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Bt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;Bt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Bt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Se.Composite=qo;Se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Se.prototype.GetterByBindingType=[Se.prototype._getValue_direct,Se.prototype._getValue_array,Se.prototype._getValue_arrayElement,Se.prototype._getValue_toArray];Se.prototype.SetterByBindingTypeAndVersioning=[[Se.prototype._setValue_direct,Se.prototype._setValue_direct_setNeedsUpdate,Se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_array,Se.prototype._setValue_array_setNeedsUpdate,Se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_arrayElement,Se.prototype._setValue_arrayElement_setNeedsUpdate,Se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Se.prototype._setValue_fromArray,Se.prototype._setValue_fromArray_setNeedsUpdate,Se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Kg=new Float32Array(1);var Xo=class i{static{i.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};function Sc(i,t,e,n){let s=Pu(n);switch(e){case dc:return i*t;case pc:return i*t/s.components*s.byteLength;case wa:return i*t/s.components*s.byteLength;case wi:return i*t*2/s.components*s.byteLength;case Ea:return i*t*2/s.components*s.byteLength;case fc:return i*t*3/s.components*s.byteLength;case xn:return i*t*4/s.components*s.byteLength;case Aa:return i*t*4/s.components*s.byteLength;case rr:case ar:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case or:case cr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ra:case Ia:return Math.max(i,16)*Math.max(t,8)/4;case Ca:case Pa:return Math.max(i,8)*Math.max(t,8)/2;case La:case Na:case Da:case Fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ua:case lr:case Ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case za:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ha:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ga:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ja:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case $a:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Qa:case ja:case to:return Math.ceil(i/4)*Math.ceil(t/4)*16;case eo:case no:return Math.ceil(i/4)*Math.ceil(t/4)*8;case hr:case io:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pu(i){switch(i){case on:case cc:return{byteLength:1,components:1};case vs:case lc:case In:return{byteLength:2,components:1};case Ma:case Ta:return{byteLength:2,components:4};case Rn:case ba:case Pn:return{byteLength:4,components:1};case hc:case uc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:va}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=va);function xh(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Iu(i){let t=new WeakMap;function e(o,c){let l=o.array,u=o.usage,f=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let u=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,u);else{f.sort((m,x)=>m.start-x.start);let h=0;for(let m=1;m<f.length;m++){let x=f[h],T=f[m];T.start<=x.start+x.count+1?x.count=Math.max(x.count,T.start+T.count-x.start):(++h,f[h]=T)}f.length=h+1;for(let m=0,x=f.length;m<x;m++){let T=f[m];i.bufferSubData(l,T.start*u.BYTES_PER_ELEMENT,u,T.start,T.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Lu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Uu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Du=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ou=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ku=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Vu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Xu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ju=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$u=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Qu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ju=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,td=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ed=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,nd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,id=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,sd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ad=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,od=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cd="gl_FragColor = linearToOutputTexel( gl_FragColor );",ld=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ud=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,dd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,fd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,md=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_d=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,yd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Md=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Td=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,wd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ed=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ad=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Pd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Id=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ld=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Nd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ud=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Dd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Od=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Hd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Wd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Zd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$d=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ef=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,nf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,af=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,of=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,lf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,uf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,df=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ff=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,gf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_f=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,vf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Sf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ef=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Af=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Lf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Nf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Uf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ff=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Of=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Vf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Hf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Kf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$f=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,tp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ep=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,np=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ap=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,op=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,up=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:Lu,alphahash_pars_fragment:Nu,alphamap_fragment:Uu,alphamap_pars_fragment:Du,alphatest_fragment:Fu,alphatest_pars_fragment:Bu,aomap_fragment:Ou,aomap_pars_fragment:ku,batching_pars_vertex:zu,batching_vertex:Vu,begin_vertex:Hu,beginnormal_vertex:Gu,bsdfs:Wu,iridescence_fragment:qu,bumpmap_pars_fragment:Xu,clipping_planes_fragment:Yu,clipping_planes_pars_fragment:Ku,clipping_planes_pars_vertex:Zu,clipping_planes_vertex:Ju,color_fragment:$u,color_pars_fragment:Qu,color_pars_vertex:ju,color_vertex:td,common:ed,cube_uv_reflection_fragment:nd,defaultnormal_vertex:id,displacementmap_pars_vertex:sd,displacementmap_vertex:rd,emissivemap_fragment:ad,emissivemap_pars_fragment:od,colorspace_fragment:cd,colorspace_pars_fragment:ld,envmap_fragment:hd,envmap_common_pars_fragment:ud,envmap_pars_fragment:dd,envmap_pars_vertex:fd,envmap_physical_pars_fragment:Td,envmap_vertex:pd,fog_vertex:md,fog_pars_vertex:gd,fog_fragment:_d,fog_pars_fragment:vd,gradientmap_pars_fragment:xd,lightmap_pars_fragment:yd,lights_lambert_fragment:Sd,lights_lambert_pars_fragment:bd,lights_pars_begin:Md,lights_toon_fragment:wd,lights_toon_pars_fragment:Ed,lights_phong_fragment:Ad,lights_phong_pars_fragment:Cd,lights_physical_fragment:Rd,lights_physical_pars_fragment:Pd,lights_fragment_begin:Id,lights_fragment_maps:Ld,lights_fragment_end:Nd,lightprobes_pars_fragment:Ud,logdepthbuf_fragment:Dd,logdepthbuf_pars_fragment:Fd,logdepthbuf_pars_vertex:Bd,logdepthbuf_vertex:Od,map_fragment:kd,map_pars_fragment:zd,map_particle_fragment:Vd,map_particle_pars_fragment:Hd,metalnessmap_fragment:Gd,metalnessmap_pars_fragment:Wd,morphinstance_vertex:qd,morphcolor_vertex:Xd,morphnormal_vertex:Yd,morphtarget_pars_vertex:Kd,morphtarget_vertex:Zd,normal_fragment_begin:Jd,normal_fragment_maps:$d,normal_pars_fragment:Qd,normal_pars_vertex:jd,normal_vertex:tf,normalmap_pars_fragment:ef,clearcoat_normal_fragment_begin:nf,clearcoat_normal_fragment_maps:sf,clearcoat_pars_fragment:rf,iridescence_pars_fragment:af,opaque_fragment:of,packing:cf,premultiplied_alpha_fragment:lf,project_vertex:hf,dithering_fragment:uf,dithering_pars_fragment:df,roughnessmap_fragment:ff,roughnessmap_pars_fragment:pf,shadowmap_pars_fragment:mf,shadowmap_pars_vertex:gf,shadowmap_vertex:_f,shadowmask_pars_fragment:vf,skinbase_vertex:xf,skinning_pars_vertex:yf,skinning_vertex:Sf,skinnormal_vertex:bf,specularmap_fragment:Mf,specularmap_pars_fragment:Tf,tonemapping_fragment:wf,tonemapping_pars_fragment:Ef,transmission_fragment:Af,transmission_pars_fragment:Cf,uv_pars_fragment:Rf,uv_pars_vertex:Pf,uv_vertex:If,worldpos_vertex:Lf,background_vert:Nf,background_frag:Uf,backgroundCube_vert:Df,backgroundCube_frag:Ff,cube_vert:Bf,cube_frag:Of,depth_vert:kf,depth_frag:zf,distance_vert:Vf,distance_frag:Hf,equirect_vert:Gf,equirect_frag:Wf,linedashed_vert:qf,linedashed_frag:Xf,meshbasic_vert:Yf,meshbasic_frag:Kf,meshlambert_vert:Zf,meshlambert_frag:Jf,meshmatcap_vert:$f,meshmatcap_frag:Qf,meshnormal_vert:jf,meshnormal_frag:tp,meshphong_vert:ep,meshphong_frag:np,meshphysical_vert:ip,meshphysical_frag:sp,meshtoon_vert:rp,meshtoon_frag:ap,points_vert:op,points_frag:cp,shadow_vert:lp,shadow_frag:hp,sprite_vert:up,sprite_frag:dp},gt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},Xn={basic:{uniforms:Je([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:Je([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Ht(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:Je([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:Je([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:Je([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:Je([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:Je([gt.points,gt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:Je([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:Je([gt.common,gt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:Je([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:Je([gt.sprite,gt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:Je([gt.common,gt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:Je([gt.lights,gt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Xn.physical={uniforms:Je([Xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new Zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};var oo={r:0,b:0,g:0},fp=new we,yh=new zt;yh.set(-1,0,0,0,1,0,0,0,1);function pp(i,t,e,n,s,r){let a=new Ht(0),o=s===!0?0:1,c,l,u=null,f=0,h=null;function m(E){let R=E.isScene===!0?E.background:null;if(R&&R.isTexture){let y=E.backgroundBlurriness>0;R=t.get(R,y)}return R}function x(E){let R=!1,y=m(E);y===null?g(a,o):y&&y.isColor&&(g(y,1),R=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||R)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function T(E,R){let y=m(R);y&&(y.isCubeTexture||y.mapping===ir)?(l===void 0&&(l=new be(new gi(1,1,1),new nn({name:"BackgroundCubeMaterial",uniforms:zi(Xn.backgroundCube.uniforms),vertexShader:Xn.backgroundCube.vertexShader,fragmentShader:Xn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,M,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(fp.makeRotationFromEuler(R.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(yh),l.material.toneMapped=Qt.getTransfer(y.colorSpace)!==he,(u!==y||f!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new be(new _i(2,2),new nn({name:"BackgroundMaterial",uniforms:zi(Xn.background.uniforms),vertexShader:Xn.background.vertexShader,fragmentShader:Xn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(y.colorSpace)!==he,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,h=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function g(E,R){E.getRGB(oo,vc(i)),e.buffers.color.setClear(oo.r,oo.g,oo.b,R,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,R=1){a.set(E),o=R,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(E){o=E,g(a,o)},render:x,addToRenderList:T,dispose:d}}function mp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,a=!1;function o(F,B,V,N,G){let J=!1,Q=f(F,N,V,B);r!==Q&&(r=Q,l(r.object)),J=m(F,N,V,G),J&&x(F,N,V,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,y(F,B,V,N),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return i.createVertexArray()}function l(F){return i.bindVertexArray(F)}function u(F){return i.deleteVertexArray(F)}function f(F,B,V,N){let G=N.wireframe===!0,J=n[B.id];J===void 0&&(J={},n[B.id]=J);let Q=F.isInstancedMesh===!0?F.id:0,at=J[Q];at===void 0&&(at={},J[Q]=at);let K=at[V.id];K===void 0&&(K={},at[V.id]=K);let nt=K[G];return nt===void 0&&(nt=h(c()),K[G]=nt),nt}function h(F){let B=[],V=[],N=[];for(let G=0;G<e;G++)B[G]=0,V[G]=0,N[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:V,attributeDivisors:N,object:F,attributes:{},index:null}}function m(F,B,V,N){let G=r.attributes,J=B.attributes,Q=0,at=V.getAttributes();for(let K in at)if(at[K].location>=0){let st=G[K],Lt=J[K];if(Lt===void 0&&(K==="instanceMatrix"&&F.instanceMatrix&&(Lt=F.instanceMatrix),K==="instanceColor"&&F.instanceColor&&(Lt=F.instanceColor)),st===void 0||st.attribute!==Lt||Lt&&st.data!==Lt.data)return!0;Q++}return r.attributesNum!==Q||r.index!==N}function x(F,B,V,N){let G={},J=B.attributes,Q=0,at=V.getAttributes();for(let K in at)if(at[K].location>=0){let st=J[K];st===void 0&&(K==="instanceMatrix"&&F.instanceMatrix&&(st=F.instanceMatrix),K==="instanceColor"&&F.instanceColor&&(st=F.instanceColor));let Lt={};Lt.attribute=st,st&&st.data&&(Lt.data=st.data),G[K]=Lt,Q++}r.attributes=G,r.attributesNum=Q,r.index=N}function T(){let F=r.newAttributes;for(let B=0,V=F.length;B<V;B++)F[B]=0}function g(F){d(F,0)}function d(F,B){let V=r.newAttributes,N=r.enabledAttributes,G=r.attributeDivisors;V[F]=1,N[F]===0&&(i.enableVertexAttribArray(F),N[F]=1),G[F]!==B&&(i.vertexAttribDivisor(F,B),G[F]=B)}function E(){let F=r.newAttributes,B=r.enabledAttributes;for(let V=0,N=B.length;V<N;V++)B[V]!==F[V]&&(i.disableVertexAttribArray(V),B[V]=0)}function R(F,B,V,N,G,J,Q){Q===!0?i.vertexAttribIPointer(F,B,V,G,J):i.vertexAttribPointer(F,B,V,N,G,J)}function y(F,B,V,N){T();let G=N.attributes,J=V.getAttributes(),Q=B.defaultAttributeValues;for(let at in J){let K=J[at];if(K.location>=0){let nt=G[at];if(nt===void 0&&(at==="instanceMatrix"&&F.instanceMatrix&&(nt=F.instanceMatrix),at==="instanceColor"&&F.instanceColor&&(nt=F.instanceColor)),nt!==void 0){let st=nt.normalized,Lt=nt.itemSize,vt=t.get(nt);if(vt===void 0)continue;let ue=vt.buffer,Kt=vt.type,te=vt.bytesPerElement,Z=Kt===i.INT||Kt===i.UNSIGNED_INT||nt.gpuType===ba;if(nt.isInterleavedBufferAttribute){let et=nt.data,St=et.stride,Ot=nt.offset;if(et.isInstancedInterleavedBuffer){for(let xt=0;xt<K.locationSize;xt++)d(K.location+xt,et.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let xt=0;xt<K.locationSize;xt++)g(K.location+xt);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let xt=0;xt<K.locationSize;xt++)R(K.location+xt,Lt/K.locationSize,Kt,st,St*te,(Ot+Lt/K.locationSize*xt)*te,Z)}else{if(nt.isInstancedBufferAttribute){for(let et=0;et<K.locationSize;et++)d(K.location+et,nt.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let et=0;et<K.locationSize;et++)g(K.location+et);i.bindBuffer(i.ARRAY_BUFFER,ue);for(let et=0;et<K.locationSize;et++)R(K.location+et,Lt/K.locationSize,Kt,st,Lt*te,Lt/K.locationSize*et*te,Z)}}else if(Q!==void 0){let st=Q[at];if(st!==void 0)switch(st.length){case 2:i.vertexAttrib2fv(K.location,st);break;case 3:i.vertexAttrib3fv(K.location,st);break;case 4:i.vertexAttrib4fv(K.location,st);break;default:i.vertexAttrib1fv(K.location,st)}}}}E()}function b(){w();for(let F in n){let B=n[F];for(let V in B){let N=B[V];for(let G in N){let J=N[G];for(let Q in J)u(J[Q].object),delete J[Q];delete N[G]}}delete n[F]}}function M(F){if(n[F.id]===void 0)return;let B=n[F.id];for(let V in B){let N=B[V];for(let G in N){let J=N[G];for(let Q in J)u(J[Q].object),delete J[Q];delete N[G]}}delete n[F.id]}function C(F){for(let B in n){let V=n[B];for(let N in V){let G=V[N];if(G[F.id]===void 0)continue;let J=G[F.id];for(let Q in J)u(J[Q].object),delete J[Q];delete G[F.id]}}}function _(F){for(let B in n){let V=n[B],N=F.isInstancedMesh===!0?F.id:0,G=V[N];if(G!==void 0){for(let J in G){let Q=G[J];for(let at in Q)u(Q[at].object),delete Q[at];delete G[J]}delete V[N],Object.keys(V).length===0&&delete n[B]}}}function w(){I(),a=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:I,dispose:b,releaseStatesOfGeometry:M,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:T,enableAttribute:g,disableUnusedAttributes:E}}function gp(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let m=0;m<u;m++)h+=l[m];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function _p(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==xn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let _=C===In&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==on&&C!==Pn&&!_&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(Dt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:x,maxTextureSize:T,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:E,maxVaryings:R,maxFragmentUniforms:y,maxSamples:b,samples:M}}function vp(i){let t=this,e=null,n=0,s=!1,r=!1,a=new En,o=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let m=f.length!==0||h||n!==0||s;return s=h,n=f.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,m){let x=f.clippingPlanes,T=f.clipIntersection,g=f.clipShadows,d=i.get(f);if(!s||x===null||x.length===0||r&&!g)r?u(null):l();else{let E=r?0:n,R=E*4,y=d.clippingState||null;c.value=y,y=u(x,h,R,m);for(let b=0;b!==R;++b)y[b]=e[b];d.clippingState=y,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,m,x){let T=f!==null?f.length:0,g=null;if(T!==0){if(g=c.value,x!==!0||g===null){let d=m+T*4,E=h.matrixWorldInverse;o.getNormalMatrix(E),(g===null||g.length<d)&&(g=new Float32Array(d));for(let R=0,y=m;R!==T;++R,y+=4)a.copy(f[R]).applyMatrix4(E,o),a.normal.toArray(g,y),g[y+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,g}}var Ms=4,xp=6,yp=20,Sp=256,ur=new Si,Ql=new Ht,bc=null,Mc=0,Tc=0,wc=!1,bp=new z,Vi=new z,lo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=bp}=r;bc=this._renderer.getRenderTarget(),Mc=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel(),wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(bc,Mc,Tc),this._renderer.xr.enabled=wc,t.scissorTest=!1,bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Mi||t.mapping===ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),bc=this._renderer.getRenderTarget(),Mc=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel(),wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:He,minFilter:He,generateMipmaps:!1,type:In,format:xn,colorSpace:Os,depthBuffer:!1},s=jl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jl(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Mp(r)),this._blurMaterial=wp(r,t,e),this._ggxMaterial=Tp(r,t,e)}return s}_compileMaterial(t){let e=new be(new dn,t);this._renderer.compile(e,ur)}_sceneToCubeUV(t,e,n,s,r){let c=new rn(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,m=f.toneMapping;f.getClearColor(Ql),f.toneMapping=Cn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new be(new gi,new vn({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));let T=this._backgroundBox,g=T.material,d=!1,E=t.background;E?E.isColor&&(g.color.copy(E),t.background=null,d=!0):(g.color.copy(Ql),d=!0);for(let R=0;R<6;R++){let y=R%3;y===0?(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[R],r.y,r.z)):y===1?(c.up.set(0,0,l[R]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[R],r.z)):(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[R]));let b=this._cubeSize;bs(s,y*b,R>2?b:0,b,b),f.setRenderTarget(s),d&&f.render(T,c),f.render(t,c)}f.toneMapping=m,f.autoClear=h,t.background=E}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Mi||t.mapping===ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=th());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;bs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,ur)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,m=f*h,{_lodMax:x}=this,T=this._sizeLods[n],g=3*T*(n>x-Ms?n-x+Ms:0),d=4*(this._cubeSize-T);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=x-e,bs(r,g,d,3*T,2*T),s.setRenderTarget(r),s.render(o,ur),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-n,bs(t,g,d,3*T,2*T),s.setRenderTarget(t),s.render(o,ur)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],f=3*u*(s>this._lodMax-Ms?s-this._lodMax+Ms:0),h=4*(this._cubeSize-u);bs(e,f,h,3*u,2*u),a.setRenderTarget(e),a.render(c,ur)}};function Mp(i){let t=[],e=[],n=i,s=i-Ms+1+xp;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,m=3,x=new Float32Array(m*h*f),T=new Float32Array(m*h*f);for(let d=0;d<f;d++){let E=d%3*2/3-1,R=d>2?0:-1,y=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];x.set(y,m*h*d);for(let b=0;b<h;b++){let M=u[b*2]*2-1,C=u[b*2+1]*2-1;d===0?Vi.set(1,C,M):d===1?Vi.set(-M,1,-C):d===2?Vi.set(-M,C,1):d===3?Vi.set(-1,C,-M):d===4?Vi.set(-M,-1,C):Vi.set(M,C,-1),Vi.toArray(T,(d*h+b)*m)}}let g=new dn;g.setAttribute("position",new _n(x,m)),g.setAttribute("outputDirection",new _n(T,m)),e.push(new be(g,null)),n>Ms&&n--}return{lodMeshes:e,sizeLods:t}}function jl(i,t,e){let n=new an(i,t,e);return n.texture.mapping=ir,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Tp(i,t,e){return new nn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Sp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function wp(i,t,e){return new nn({name:"SphericalGaussianBlur",defines:{SAMPLES:yp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:fo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function th(){return new nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function eh(){return new nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function fo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ho=class extends an{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Xs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new gi(5,5,5),r=new nn({name:"CubemapFromEquirect",uniforms:zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:Gn});r.uniforms.tEquirect.value=e;let a=new be(s,r),o=e.minFilter;return e.minFilter===Wn&&(e.minFilter=He),new ga(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function Ep(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){let m=h.mapping;if(m===xa||m===ya)if(t.has(h)){let x=t.get(h).texture;return o(x,h.mapping)}else{let x=h.image;if(x&&x.height>0){let T=new ho(x.height);return T.fromEquirectangularTexture(i,h),t.set(h,T),h.addEventListener("dispose",l),o(T.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let m=h.mapping,x=m===xa||m===ya,T=m===Mi||m===ki;if(x||T){let g=e.get(h),d=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return n===null&&(n=new lo(i)),g=x?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{let E=h.image;return x&&E&&E.height>0||T&&E&&c(E)?(n===null&&(n=new lo(i)),g=x?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,m){return m===xa?h.mapping=Mi:m===ya&&(h.mapping=ki),h}function c(h){let m=0,x=6;for(let T=0;T<x;T++)h[T]!==void 0&&m++;return m===x}function l(h){let m=h.target;m.removeEventListener("dispose",l);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function u(h){let m=h.target;m.removeEventListener("dispose",u);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Ap(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Bi("WebGLRenderer: "+n+" extension not supported."),s}}}function Cp(i,t,e,n){let s={},r=new WeakMap;function a(f){let h=f.target;h.index!==null&&t.remove(h.index);for(let x in h.attributes)t.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete s[h.id];let m=r.get(h);m&&(t.remove(m),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function c(f){let h=f.attributes;for(let m in h)t.update(h[m],i.ARRAY_BUFFER)}function l(f){let h=[],m=f.index,x=f.attributes.position,T=0;if(x===void 0)return;if(m!==null){let E=m.array;T=m.version;for(let R=0,y=E.length;R<y;R+=3){let b=E[R+0],M=E[R+1],C=E[R+2];h.push(b,M,M,C,C,b)}}else{let E=x.array;T=x.version;for(let R=0,y=E.length/3-1;R<y;R+=3){let b=R+0,M=R+1,C=R+2;h.push(b,M,M,C,C,b)}}let g=new(x.count>=65535?qs:Ws)(h,1);g.version=T;let d=r.get(f);d&&t.remove(d),r.set(f,g)}function u(f){let h=r.get(f);if(h){let m=f.index;m!==null&&h.version<m.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function Rp(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,h){i.drawElements(n,h,r,f*a),e.update(h,n,1)}function l(f,h,m){m!==0&&(i.drawElementsInstanced(n,h,r,f*a,m),e.update(h,n,m))}function u(f,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,m);let T=0;for(let g=0;g<m;g++)T+=h[g];e.update(T,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Pp(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Bt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Ip(i,t,e){let n=new WeakMap,s=new Me;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(o);if(h===void 0||h.count!==f){let w=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,T=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],E=o.morphAttributes.color||[],R=0;m===!0&&(R=1),x===!0&&(R=2),T===!0&&(R=3);let y=o.attributes.position.count*R,b=1;y>t.maxTextureSize&&(b=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let M=new Float32Array(y*b*4*f),C=new zs(M,y,b,f);C.type=Pn,C.needsUpdate=!0;let _=R*4;for(let I=0;I<f;I++){let F=g[I],B=d[I],V=E[I],N=y*b*4*I;for(let G=0;G<F.count;G++){let J=G*_;m===!0&&(s.fromBufferAttribute(F,G),M[N+J+0]=s.x,M[N+J+1]=s.y,M[N+J+2]=s.z,M[N+J+3]=0),x===!0&&(s.fromBufferAttribute(B,G),M[N+J+4]=s.x,M[N+J+5]=s.y,M[N+J+6]=s.z,M[N+J+7]=0),T===!0&&(s.fromBufferAttribute(V,G),M[N+J+8]=s.x,M[N+J+9]=s.y,M[N+J+10]=s.z,M[N+J+11]=V.itemSize===4?s.w:1)}}h={count:f,texture:C,size:new Zt(y,b)},n.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let T=0;T<l.length;T++)m+=l[T];let x=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Lp(i,t,e,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let m=l.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return h}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var Np={[tc]:"LINEAR_TONE_MAPPING",[ec]:"REINHARD_TONE_MAPPING",[nc]:"CINEON_TONE_MAPPING",[ic]:"ACES_FILMIC_TONE_MAPPING",[rc]:"AGX_TONE_MAPPING",[ac]:"NEUTRAL_TONE_MAPPING",[sc]:"CUSTOM_TONE_MAPPING"};function Up(i,t,e,n,s,r){let a=new an(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new dn;l.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Re([0,2,0,0,2,0],2));let u=new na({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new be(l,u),h=new Si(-1,1,1,-1,0,1),m=null,x=null,T=!1,g,d=null,E=[],R=!1;this.setSize=function(y,b){a.setSize(y,b),o!==null&&o.setSize(y,b),c!==null&&c.setSize(y,b);for(let M=0;M<E.length;M++){let C=E[M];C.setSize&&C.setSize(y,b)}},this.setEffects=function(y){E=y,R=E.length>0&&E[0].isRenderPass===!0;let b=a.width,M=a.height;E.length>0&&o===null&&(o=new an(b,M,{type:In,depthBuffer:!1,stencilBuffer:!1}),c=new an(b,M,{type:In,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<E.length;C++){let _=E[C];_.setSize&&_.setSize(b,M)}},this.begin=function(y,b){if(T||y.toneMapping===Cn&&E.length===0)return!1;if(d=b,b!==null){let M=b.width,C=b.height;(a.width!==M||a.height!==C)&&this.setSize(M,C)}return R===!1&&y.setRenderTarget(a),g=y.toneMapping,y.toneMapping=Cn,!0},this.hasRenderPass=function(){return R},this.end=function(y,b){y.toneMapping=g,T=!0;let M=a,C=o;for(let _=0;_<E.length;_++){let w=E[_];w.enabled!==!1&&(w.render(y,C,M,b),w.needsSwap!==!1&&(M=C,C=C===o?c:o))}if(m!==y.outputColorSpace||x!==y.toneMapping){m=y.outputColorSpace,x=y.toneMapping,u.defines={},Qt.getTransfer(m)===he&&(u.defines.SRGB_TRANSFER="");let _=Np[x];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=M.texture,y.setRenderTarget(d),y.render(f,h),d=null,T=!1},this.isCompositing=function(){return T},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Sh=new en,Cc=new mi(1,1),bh=new zs,Mh=new Qr,Th=new Xs,nh=[],ih=[],sh=new Float32Array(16),rh=new Float32Array(9),ah=new Float32Array(4);function ws(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=nh[s];if(r===void 0&&(r=new Float32Array(s),nh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ue(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function De(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function po(i,t){let e=ih[t];e===void 0&&(e=new Int32Array(t),ih[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Dp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Fp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;i.uniform2fv(this.addr,t),De(e,t)}}function Bp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;i.uniform3fv(this.addr,t),De(e,t)}}function Op(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;i.uniform4fv(this.addr,t),De(e,t)}}function kp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Ue(e,n))return;ah.set(n),i.uniformMatrix2fv(this.addr,!1,ah),De(e,n)}}function zp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Ue(e,n))return;rh.set(n),i.uniformMatrix3fv(this.addr,!1,rh),De(e,n)}}function Vp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Ue(e,n))return;sh.set(n),i.uniformMatrix4fv(this.addr,!1,sh),De(e,n)}}function Hp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Gp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;i.uniform2iv(this.addr,t),De(e,t)}}function Wp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;i.uniform3iv(this.addr,t),De(e,t)}}function qp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;i.uniform4iv(this.addr,t),De(e,t)}}function Xp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Yp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;i.uniform2uiv(this.addr,t),De(e,t)}}function Kp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;i.uniform3uiv(this.addr,t),De(e,t)}}function Zp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;i.uniform4uiv(this.addr,t),De(e,t)}}function Jp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Cc.compareFunction=e.isReversedDepthBuffer()?ao:ro,r=Cc):r=Sh,e.setTexture2D(t||r,s)}function $p(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Mh,s)}function Qp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Th,s)}function jp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||bh,s)}function tm(i){switch(i){case 5126:return Dp;case 35664:return Fp;case 35665:return Bp;case 35666:return Op;case 35674:return kp;case 35675:return zp;case 35676:return Vp;case 5124:case 35670:return Hp;case 35667:case 35671:return Gp;case 35668:case 35672:return Wp;case 35669:case 35673:return qp;case 5125:return Xp;case 36294:return Yp;case 36295:return Kp;case 36296:return Zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Jp;case 35679:case 36299:case 36307:return $p;case 35680:case 36300:case 36308:case 36293:return Qp;case 36289:case 36303:case 36311:case 36292:return jp}}function em(i,t){i.uniform1fv(this.addr,t)}function nm(i,t){let e=ws(t,this.size,2);i.uniform2fv(this.addr,e)}function im(i,t){let e=ws(t,this.size,3);i.uniform3fv(this.addr,e)}function sm(i,t){let e=ws(t,this.size,4);i.uniform4fv(this.addr,e)}function rm(i,t){let e=ws(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function am(i,t){let e=ws(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function om(i,t){let e=ws(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function cm(i,t){i.uniform1iv(this.addr,t)}function lm(i,t){i.uniform2iv(this.addr,t)}function hm(i,t){i.uniform3iv(this.addr,t)}function um(i,t){i.uniform4iv(this.addr,t)}function dm(i,t){i.uniform1uiv(this.addr,t)}function fm(i,t){i.uniform2uiv(this.addr,t)}function pm(i,t){i.uniform3uiv(this.addr,t)}function mm(i,t){i.uniform4uiv(this.addr,t)}function gm(i,t,e){let n=this.cache,s=t.length,r=po(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),De(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Cc:a=Sh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function _m(i,t,e){let n=this.cache,s=t.length,r=po(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Mh,r[a])}function vm(i,t,e){let n=this.cache,s=t.length,r=po(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Th,r[a])}function xm(i,t,e){let n=this.cache,s=t.length,r=po(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||bh,r[a])}function ym(i){switch(i){case 5126:return em;case 35664:return nm;case 35665:return im;case 35666:return sm;case 35674:return rm;case 35675:return am;case 35676:return om;case 5124:case 35670:return cm;case 35667:case 35671:return lm;case 35668:case 35672:return hm;case 35669:case 35673:return um;case 5125:return dm;case 36294:return fm;case 36295:return pm;case 36296:return mm;case 35678:case 36198:case 36298:case 36306:case 35682:return gm;case 35679:case 36299:case 36307:return _m;case 35680:case 36300:case 36308:case 36293:return vm;case 36289:case 36303:case 36311:case 36292:return xm}}var Rc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=tm(e.type)}},Pc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ym(e.type)}},Ic=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Ec=/(\w+)(\])?(\[|\.)?/g;function oh(i,t){i.seq.push(t),i.map[t.id]=t}function Sm(i,t,e){let n=i.name,s=n.length;for(Ec.lastIndex=0;;){let r=Ec.exec(n),a=Ec.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){oh(e,l===void 0?new Rc(o,i,t):new Pc(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new Ic(o),oh(e,f)),e=f}}}var Ts=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Sm(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function ch(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var bm=37297,Mm=0;function Tm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var lh=new zt;function wm(i){Qt._getMatrix(lh,Qt.workingColorSpace,i);let t=`mat3( ${lh.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(i)){case ks:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function hh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Tm(i.getShaderSource(t),o)}else return r}function Em(i,t){let e=wm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var Am={[tc]:"Linear",[ec]:"Reinhard",[nc]:"Cineon",[ic]:"ACESFilmic",[rc]:"AgX",[ac]:"Neutral",[sc]:"Custom"};function Cm(i,t){let e=Am[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var co=new z;function Rm(){Qt.getLuminanceCoefficients(co);let i=co.x.toFixed(4),t=co.y.toFixed(4),e=co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Pm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fr).join(`
`)}function Im(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Lm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function fr(i){return i!==""}function uh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Nm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lc(i){return i.replace(Nm,Dm)}var Um=new Map;function Dm(i,t){let e=qt[t];if(e===void 0){let n=Um.get(t);if(n!==void 0)e=qt[n],Dt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Lc(e)}var Fm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fh(i){return i.replace(Fm,Bm)}function Bm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ph(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Om={[nr]:"SHADOWMAP_TYPE_PCF",[gs]:"SHADOWMAP_TYPE_VSM"};function km(i){return Om[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var zm={[Mi]:"ENVMAP_TYPE_CUBE",[ki]:"ENVMAP_TYPE_CUBE",[ir]:"ENVMAP_TYPE_CUBE_UV"};function Vm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":zm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Hm={[ki]:"ENVMAP_MODE_REFRACTION"};function Gm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Hm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Wm={[jo]:"ENVMAP_BLENDING_MULTIPLY",[Il]:"ENVMAP_BLENDING_MIX",[Ll]:"ENVMAP_BLENDING_ADD"};function qm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Wm[i.combine]||"ENVMAP_BLENDING_NONE"}function Xm(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Ym(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=km(e),l=Vm(e),u=Gm(e),f=qm(e),h=Xm(e),m=Pm(e),x=Im(r),T=s.createProgram(),g,d,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(fr).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(fr).join(`
`),d.length>0&&(d+=`
`)):(g=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fr).join(`
`),d=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Cn?"#define TONE_MAPPING":"",e.toneMapping!==Cn?qt.tonemapping_pars_fragment:"",e.toneMapping!==Cn?Cm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Em("linearToOutputTexel",e.outputColorSpace),Rm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fr).join(`
`)),a=Lc(a),a=uh(a,e),a=dh(a,e),o=Lc(o),o=uh(o,e),o=dh(o,e),a=fh(a),o=fh(o),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",e.glslVersion===mc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===mc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let R=E+g+a,y=E+d+o,b=ch(s,s.VERTEX_SHADER,R),M=ch(s,s.FRAGMENT_SHADER,y);s.attachShader(T,b),s.attachShader(T,M),e.index0AttributeName!==void 0?s.bindAttribLocation(T,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(T,0,"position"),s.linkProgram(T);function C(F){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(T)||"",V=s.getShaderInfoLog(b)||"",N=s.getShaderInfoLog(M)||"",G=B.trim(),J=V.trim(),Q=N.trim(),at=!0,K=!0;if(s.getProgramParameter(T,s.LINK_STATUS)===!1)if(at=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,T,b,M);else{let nt=hh(s,b,"vertex"),st=hh(s,M,"fragment");Bt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(T,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+G+`
`+nt+`
`+st)}else G!==""?Dt("WebGLProgram: Program Info Log:",G):(J===""||Q==="")&&(K=!1);K&&(F.diagnostics={runnable:at,programLog:G,vertexShader:{log:J,prefix:g},fragmentShader:{log:Q,prefix:d}})}s.deleteShader(b),s.deleteShader(M),_=new Ts(s,T),w=Lm(s,T)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(T,bm)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(T),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Mm++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=b,this.fragmentShader=M,this}var Km=0,Nc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Uc(t),e.set(t,n)),n}},Uc=class{constructor(t){this.id=Km++,this.code=t,this.usedTimes=0}};function Zm(i){return i===wi||i===lr||i===hr}function Jm(i,t,e,n,s,r){let a=new Vs,o=new Nc,c=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return c.add(_),_===0?"uv":`uv${_}`}function T(_,w,I,F,B,V){let N=F.fog,G=B.geometry,J=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?F.environment:null,Q=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,at=t.get(_.envMap||J,Q),K=at&&at.mapping===ir?at.image.height:null,nt=m[_.type];_.precision!==null&&(h=n.getMaxPrecision(_.precision),h!==_.precision&&Dt("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));let st=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Lt=st!==void 0?st.length:0,vt=0;G.morphAttributes.position!==void 0&&(vt=1),G.morphAttributes.normal!==void 0&&(vt=2),G.morphAttributes.color!==void 0&&(vt=3);let ue,Kt,te,Z;if(nt){let Wt=Xn[nt];ue=Wt.vertexShader,Kt=Wt.fragmentShader}else{ue=_.vertexShader,Kt=_.fragmentShader;let Wt=o.getVertexShaderStage(_),se=o.getFragmentShaderStage(_);o.update(_,Wt,se),te=Wt.id,Z=se.id}let et=i.getRenderTarget(),St=i.state.buffers.depth.getReversed(),Ot=B.isInstancedMesh===!0,xt=B.isBatchedMesh===!0,Gt=!!_.map,Ae=!!_.matcap,Ft=!!at,ee=!!_.aoMap,ae=!!_.lightMap,Yt=!!_.bumpMap&&_.wireframe===!1,me=!!_.normalMap,Ie=!!_.displacementMap,We=!!_.emissiveMap,_e=!!_.metalnessMap,Ce=!!_.roughnessMap,U=_.anisotropy>0,ve=_.clearcoat>0,Jt=_.dispersion>0,S=_.retroreflectivity>0,p=_.iridescence>0,D=_.sheen>0,H=_.transmission>0,Y=U&&!!_.anisotropyMap,ct=ve&&!!_.clearcoatMap,ot=ve&&!!_.clearcoatNormalMap,$=ve&&!!_.clearcoatRoughnessMap,tt=p&&!!_.iridescenceMap,dt=p&&!!_.iridescenceThicknessMap,Rt=D&&!!_.sheenColorMap,ft=D&&!!_.sheenRoughnessMap,lt=!!_.specularMap,At=!!_.specularColorMap,It=!!_.specularIntensityMap,kt=H&&!!_.transmissionMap,L=H&&!!_.thicknessMap,ht=!!_.gradientMap,j=!!_.alphaMap,ut=_.alphaTest>0,_t=!!_.alphaHash,rt=!!_.extensions,Pt=Cn;_.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Pt=i.toneMapping);let Ct={shaderID:nt,shaderType:_.type,shaderName:_.name,vertexShader:ue,fragmentShader:Kt,defines:_.defines,customVertexShaderID:te,customFragmentShaderID:Z,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:xt,batchingColor:xt&&B._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&B.instanceColor!==null,instancingMorph:Ot&&B.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Qt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Gt,matcap:Ae,envMap:Ft,envMapMode:Ft&&at.mapping,envMapCubeUVHeight:K,aoMap:ee,lightMap:ae,bumpMap:Yt,normalMap:me,displacementMap:Ie,emissiveMap:We,normalMapObjectSpace:me&&_.normalMapType===Dl,normalMapTangentSpace:me&&_.normalMapType===so,packedNormalMap:me&&_.normalMapType===so&&Zm(_.normalMap.format),metalnessMap:_e,roughnessMap:Ce,anisotropy:U,anisotropyMap:Y,clearcoat:ve,clearcoatMap:ct,clearcoatNormalMap:ot,clearcoatRoughnessMap:$,dispersion:Jt,retroreflection:S,iridescence:p,iridescenceMap:tt,iridescenceThicknessMap:dt,sheen:D,sheenColorMap:Rt,sheenRoughnessMap:ft,specularMap:lt,specularColorMap:At,specularIntensityMap:It,transmission:H,transmissionMap:kt,thicknessMap:L,gradientMap:ht,opaque:_.transparent===!1&&_.blending===_s&&_.alphaToCoverage===!1,alphaMap:j,alphaTest:ut,alphaHash:_t,combine:_.combine,mapUv:Gt&&x(_.map.channel),aoMapUv:ee&&x(_.aoMap.channel),lightMapUv:ae&&x(_.lightMap.channel),bumpMapUv:Yt&&x(_.bumpMap.channel),normalMapUv:me&&x(_.normalMap.channel),displacementMapUv:Ie&&x(_.displacementMap.channel),emissiveMapUv:We&&x(_.emissiveMap.channel),metalnessMapUv:_e&&x(_.metalnessMap.channel),roughnessMapUv:Ce&&x(_.roughnessMap.channel),anisotropyMapUv:Y&&x(_.anisotropyMap.channel),clearcoatMapUv:ct&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:ot&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:ft&&x(_.sheenRoughnessMap.channel),specularMapUv:lt&&x(_.specularMap.channel),specularColorMapUv:At&&x(_.specularColorMap.channel),specularIntensityMapUv:It&&x(_.specularIntensityMap.channel),transmissionMapUv:kt&&x(_.transmissionMap.channel),thicknessMapUv:L&&x(_.thicknessMap.channel),alphaMapUv:j&&x(_.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(me||U),vertexNormals:!!G.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!G.attributes.uv&&(Gt||j),fog:!!N,useFog:_.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||G.attributes.normal===void 0&&me===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:St,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Lt,morphTextureStride:vt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Pt,decodeVideoTexture:Gt&&_.map.isVideoTexture===!0&&Qt.getTransfer(_.map.colorSpace)===he,decodeVideoTextureEmissive:We&&_.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(_.emissiveMap.colorSpace)===he,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Hn,flipSided:_.side===sn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:rt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&_.extensions.multiDraw===!0||xt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ct.vertexUv1s=c.has(1),Ct.vertexUv2s=c.has(2),Ct.vertexUv3s=c.has(3),c.clear(),Ct}function g(_){let w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(let I in _.defines)w.push(I),w.push(_.defines[I]);return _.isRawShaderMaterial===!1&&(d(w,_),E(w,_),w.push(i.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function d(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numSunLights),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numSunLightShadows),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function E(_,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function R(_){let w=m[_.type],I;if(w){let F=Xn[w];I=Zl.clone(F.uniforms)}else I=_.uniforms;return I}function y(_,w){let I=u.get(w);return I!==void 0?++I.usedTimes:(I=new Ym(i,w,_,s),l.push(I),u.set(w,I)),I}function b(_){if(--_.usedTimes===0){let w=l.indexOf(_);l[w]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function M(_){o.remove(_)}function C(){o.dispose()}return{getParameters:T,getProgramCacheKey:g,getUniforms:R,acquireProgram:y,releaseProgram:b,releaseShaderCache:M,programs:l,dispose:C}}function $m(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Qm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function mh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function gh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,x,T,g,d){let E=i[t];return E===void 0?(E={id:h.id,object:h,geometry:m,material:x,materialVariant:a(h),groupOrder:T,renderOrder:h.renderOrder,z:g,group:d},i[t]=E):(E.id=h.id,E.object=h,E.geometry=m,E.material=x,E.materialVariant=a(h),E.groupOrder=T,E.renderOrder=h.renderOrder,E.z=g,E.group=d),t++,E}function c(h,m,x,T,g,d,E){E.reversedDepth===!0&&(g=-g);let R=o(h,m,x,T,g,d);x.transmission>0?n.push(R):x.transparent===!0?s.push(R):e.push(R)}function l(h,m,x,T,g,d){let E=o(h,m,x,T,g,d);x.transmission>0?n.unshift(E):x.transparent===!0?s.unshift(E):e.unshift(E)}function u(h,m){e.length>1&&e.sort(h||Qm),n.length>1&&n.sort(m||mh),s.length>1&&s.sort(m||mh)}function f(){for(let h=t,m=i.length;h<m;h++){let x=i[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function jm(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new gh,i.set(n,[a])):s>=r.length?(a=new gh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function tg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new z,color:new Ht};break;case"SpotLight":e={position:new z,direction:new z,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function eg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var ng=0;function ig(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function sg(i){let t=new tg,e=eg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);let s=new z,r=new we,a=new we;function o(l){let u=0,f=0,h=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let m=0,x=0,T=0,g=0,d=0,E=0,R=0,y=0,b=0,M=0,C=0,_=0,w=0,I=0;l.sort(ig);for(let B=0,V=l.length;B<V;B++){let N=l[B],G=N.color,J=N.intensity,Q=N.distance,at=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===wi?at=N.shadow.map.texture:at=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=G.r*J,f+=G.g*J,h+=G.b*J;else if(N.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(N.sh.coefficients[K],J);I++}else if(N.isSunLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let nt=N.shadow,st=e.get(N);st.shadowIntensity=nt.intensity,st.shadowBias=nt.bias,st.shadowNormalBias=nt.normalBias,st.shadowRadius=nt.radius,st.shadowMapSize.copy(nt.mapSize).multiply(nt.getFrameExtents()),n.sunShadow[x]=st,n.sunShadowMap[x]=at;let Lt=nt.getViewportCount();for(let vt=0;vt<Lt;vt++)n.sunShadowMatrix[T+vt]=nt.getMatrix(vt),n.sunShadowCascade[T+vt]=nt._cascadeData[vt];T+=Lt,x++}n.sun[m]=K,m++}else if(N.isDirectionalLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let nt=N.shadow,st=e.get(N);st.shadowIntensity=nt.intensity,st.shadowBias=nt.bias,st.shadowNormalBias=nt.normalBias,st.shadowRadius=nt.radius,st.shadowMapSize=nt.mapSize,n.directionalShadow[g]=st,n.directionalShadowMap[g]=at,n.directionalShadowMatrix[g]=N.shadow.matrix,b++}n.directional[g]=K,g++}else if(N.isSpotLight){let K=t.get(N);K.position.setFromMatrixPosition(N.matrixWorld),K.color.copy(G).multiplyScalar(J),K.distance=Q,K.coneCos=Math.cos(N.angle),K.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),K.decay=N.decay,n.spot[E]=K;let nt=N.shadow;if(N.map&&(n.spotLightMap[_]=N.map,_++,nt.updateMatrices(N),N.castShadow&&w++),n.spotLightMatrix[E]=nt.matrix,N.castShadow){let st=e.get(N);st.shadowIntensity=nt.intensity,st.shadowBias=nt.bias,st.shadowNormalBias=nt.normalBias,st.shadowRadius=nt.radius,st.shadowMapSize=nt.mapSize,n.spotShadow[E]=st,n.spotShadowMap[E]=at,C++}E++}else if(N.isRectAreaLight){let K=t.get(N);K.color.copy(G).multiplyScalar(J),K.halfWidth.set(N.width*.5,0,0),K.halfHeight.set(0,N.height*.5,0),n.rectArea[R]=K,R++}else if(N.isPointLight){let K=t.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),K.distance=N.distance,K.decay=N.decay,N.castShadow){let nt=N.shadow,st=e.get(N);st.shadowIntensity=nt.intensity,st.shadowBias=nt.bias,st.shadowNormalBias=nt.normalBias,st.shadowRadius=nt.radius,st.shadowMapSize=nt.mapSize,st.shadowCameraNear=nt.camera.near,st.shadowCameraFar=nt.camera.far,n.pointShadow[d]=st,n.pointShadowMap[d]=at,n.pointShadowMatrix[d]=N.shadow.matrix,M++}n.point[d]=K,d++}else if(N.isHemisphereLight){let K=t.get(N);K.skyColor.copy(N.color).multiplyScalar(J),K.groundColor.copy(N.groundColor).multiplyScalar(J),n.hemi[y]=K,y++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=gt.LTC_FLOAT_1,n.rectAreaLTC2=gt.LTC_FLOAT_2):(n.rectAreaLTC1=gt.LTC_HALF_1,n.rectAreaLTC2=gt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let F=n.hash;(F.sunLength!==m||F.directionalLength!==g||F.pointLength!==d||F.spotLength!==E||F.rectAreaLength!==R||F.hemiLength!==y||F.numSunShadows!==x||F.numDirectionalShadows!==b||F.numPointShadows!==M||F.numSpotShadows!==C||F.numSpotMaps!==_||F.numLightProbes!==I)&&(n.sun.length=m,n.directional.length=g,n.spot.length=E,n.rectArea.length=R,n.point.length=d,n.hemi.length=y,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=T,n.sunShadowCascade.length=T,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+_-w,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=I,F.sunLength=m,F.directionalLength=g,F.pointLength=d,F.spotLength=E,F.rectAreaLength=R,F.hemiLength=y,F.numSunShadows=x,F.numDirectionalShadows=b,F.numPointShadows=M,F.numSpotShadows=C,F.numSpotMaps=_,F.numLightProbes=I,n.version=ng++)}function c(l,u){let f=0,h=0,m=0,x=0,T=0,g=0,d=u.matrixWorldInverse;for(let E=0,R=l.length;E<R;E++){let y=l[E];if(y.isSunLight){let b=n.sun[f];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(d),f++}else if(y.isDirectionalLight){let b=n.directional[h];b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(d),h++}else if(y.isSpotLight){let b=n.spot[x];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(d),b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(d),x++}else if(y.isRectAreaLight){let b=n.rectArea[T];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(d),a.identity(),r.copy(y.matrixWorld),r.premultiply(d),a.extractRotation(r),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),T++}else if(y.isPointLight){let b=n.point[m];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(d),m++}else if(y.isHemisphereLight){let b=n.hemi[g];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(d),g++}}}return{setup:o,setupView:c,state:n}}function _h(i){let t=new sg(i),e=[],n=[],s=[];function r(h){f.camera=h,e.length=0,n.length=0,s.length=0}function a(h){e.push(h)}function o(h){n.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}let f={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function rg(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new _h(i),t.set(s,[o])):r>=a.length?(o=new _h(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var ag=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,og=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,cg=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],lg=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],vh=new we,dr=new z,Ac=new z;function hg(i,t,e){let n=new fs,s=new Zt,r=new Zt,a=new Me,o=new ia,c=new sa,l={},u=e.maxTextureSize,f={[bi]:sn,[sn]:bi,[Hn]:Hn},h=new nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:ag,fragmentShader:og}),m=h.clone();m.defines.HORIZONTAL_PASS=1;let x=new dn;x.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let T=new be(x,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nr;let d=this.type;this.render=function(M,C,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===dl&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=nr);let w=i.getRenderTarget(),I=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Gn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let V=d!==this.type;V&&C.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(G=>G.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,G=M.length;N<G;N++){let J=M[N],Q=J.shadow;if(Q===void 0){Dt("WebGLShadowMap:",J,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;s.copy(Q.mapSize);let at=Q.getFrameExtents();s.multiply(at),r.copy(Q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/at.x),s.x=r.x*at.x,Q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/at.y),s.y=r.y*at.y,Q.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if(Q.camera._reversedDepth=K,Q.map===null||V===!0){if(Q.map!==null&&(Q.map.depthTexture!==null&&(Q.map.depthTexture.dispose(),Q.map.depthTexture=null),Q.map.dispose()),this.type===gs){if(J.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Q.map=new an(s.x,s.y,{format:wi,type:In,minFilter:He,magFilter:He,generateMipmaps:!1}),Q.map.texture.name=J.name+".shadowMap",Q.map.depthTexture=new mi(s.x,s.y,Pn),Q.map.depthTexture.name=J.name+".shadowMapDepth",Q.map.depthTexture.format=On,Q.map.depthTexture.compareFunction=null,Q.map.depthTexture.minFilter=ke,Q.map.depthTexture.magFilter=ke}else J.isPointLight?(Q.map=new ho(s.x),Q.map.depthTexture=new ea(s.x,Rn)):(Q.map=new an(s.x,s.y),Q.map.depthTexture=new mi(s.x,s.y,Rn)),Q.map.depthTexture.name=J.name+".shadowMap",Q.map.depthTexture.format=On,this.type===nr?(Q.map.depthTexture.compareFunction=K?ao:ro,Q.map.depthTexture.minFilter=He,Q.map.depthTexture.magFilter=He):(Q.map.depthTexture.compareFunction=null,Q.map.depthTexture.minFilter=ke,Q.map.depthTexture.magFilter=ke);Q.camera.updateProjectionMatrix()}Q.map.isWebGLCubeRenderTarget!==!0&&(Q.map.width!==s.x||Q.map.height!==s.y)&&Q.map.setSize(s.x,s.y);let nt=Q.map.isWebGLCubeRenderTarget?6:Q.getViewportCount();J.isPointLight!==!0&&Q.updateMatrices(J,_);for(let st=0;st<nt;st++){let Lt=Q.getCamera(st);if(J.isPointLight){let vt=Q.camera,ue=Q.matrix,Kt=J.distance||vt.far;Kt!==vt.far&&(vt.far=Kt,vt.updateProjectionMatrix()),dr.setFromMatrixPosition(J.matrixWorld),vt.position.copy(dr),Ac.copy(vt.position),Ac.add(cg[st]),vt.up.copy(lg[st]),vt.lookAt(Ac),vt.updateMatrixWorld(),ue.makeTranslation(-dr.x,-dr.y,-dr.z),vh.multiplyMatrices(vt.projectionMatrix,vt.matrixWorldInverse),Q._frustum.setFromProjectionMatrix(vh,vt.coordinateSystem,vt.reversedDepth)}if(Q.map.isWebGLCubeRenderTarget)i.setRenderTarget(Q.map,st),i.clear();else{st===0&&(i.setRenderTarget(Q.map),i.clear());let vt=Q.getViewport(st);a.set(r.x*vt.x,r.y*vt.y,r.x*vt.z,r.y*vt.w),B.viewport(a)}n=Q.getFrustum(st),y(C,_,Lt,J,this.type)}Q.isPointLightShadow!==!0&&this.type===gs&&E(Q,_),Q.needsUpdate=!1}d=this.type,g.needsUpdate=!1,i.setRenderTarget(w,I,F)};function E(M,C){let _=t.update(T);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,m.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),M.mapPass===null?M.mapPass=new an(s.x,s.y,{format:wi,type:In}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),h.uniforms.shadow_pass.value=M.map.depthTexture,h.uniforms.resolution.value.set(M.map.width,M.map.height),h.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(C,null,_,h,T,null),m.uniforms.shadow_pass.value=M.mapPass.texture,m.uniforms.resolution.value.set(M.map.width,M.map.height),m.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(C,null,_,m,T,null)}function R(M,C,_,w){let I=null,F=_.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(F!==void 0)I=F;else if(I=_.isPointLight===!0?c:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let B=I.uuid,V=C.uuid,N=l[B];N===void 0&&(N={},l[B]=N);let G=N[V];G===void 0&&(G=I.clone(),N[V]=G,C.addEventListener("dispose",b)),I=G}if(I.visible=C.visible,I.wireframe=C.wireframe,w===gs?I.side=C.shadowSide!==null?C.shadowSide:C.side:I.side=C.shadowSide!==null?C.shadowSide:f[C.side],I.alphaMap=C.alphaMap,I.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,I.map=C.map,I.clipShadows=C.clipShadows,I.clippingPlanes=C.clippingPlanes,I.clipIntersection=C.clipIntersection,I.displacementMap=C.displacementMap,I.displacementScale=C.displacementScale,I.displacementBias=C.displacementBias,I.wireframeLinewidth=C.wireframeLinewidth,I.linewidth=C.linewidth,_.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let B=i.properties.get(I);B.light=_}return I}function y(M,C,_,w,I){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&I===gs)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,M.matrixWorld);let V=t.update(M),N=M.material;if(Array.isArray(N)){let G=V.groups;for(let J=0,Q=G.length;J<Q;J++){let at=G[J],K=N[at.materialIndex];if(K&&K.visible){let nt=R(M,K,w,I);M.onBeforeShadow(i,M,C,_,V,nt,at),i.renderBufferDirect(_,null,V,nt,M,at),M.onAfterShadow(i,M,C,_,V,nt,at)}}}else if(N.visible){let G=R(M,N,w,I);M.onBeforeShadow(i,M,C,_,V,G,null),i.renderBufferDirect(_,null,V,G,M,null),M.onAfterShadow(i,M,C,_,V,G,null)}}let B=M.children;for(let V=0,N=B.length;V<N;V++)y(B[V],C,_,w,I)}function b(M){M.target.removeEventListener("dispose",b);for(let _ in l){let w=l[_],I=M.target.uuid;I in w&&(w[I].dispose(),delete w[I])}}}function ug(i,t){function e(){let L=!1,ht=new Me,j=null,ut=new Me(0,0,0,0);return{setMask:function(_t){j!==_t&&!L&&(i.colorMask(_t,_t,_t,_t),j=_t)},setLocked:function(_t){L=_t},setClear:function(_t,rt,Pt,Ct,Wt){Wt===!0&&(_t*=Ct,rt*=Ct,Pt*=Ct),ht.set(_t,rt,Pt,Ct),ut.equals(ht)===!1&&(i.clearColor(_t,rt,Pt,Ct),ut.copy(ht))},reset:function(){L=!1,j=null,ut.set(-1,0,0,0)}}}function n(){let L=!1,ht=!1,j=null,ut=null,_t=null;return{setReversed:function(rt){if(ht!==rt){let Pt=t.get("EXT_clip_control");rt?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),ht=rt;let Ct=_t;_t=null,this.setClear(Ct)}},getReversed:function(){return ht},setTest:function(rt){rt?et(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(rt){j!==rt&&!L&&(i.depthMask(rt),j=rt)},setFunc:function(rt){if(ht&&(rt=Yl[rt]),ut!==rt){switch(rt){case zr:i.depthFunc(i.NEVER);break;case Vr:i.depthFunc(i.ALWAYS);break;case Hr:i.depthFunc(i.LESS);break;case rs:i.depthFunc(i.LEQUAL);break;case Gr:i.depthFunc(i.EQUAL);break;case Wr:i.depthFunc(i.GEQUAL);break;case qr:i.depthFunc(i.GREATER);break;case Xr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ut=rt}},setLocked:function(rt){L=rt},setClear:function(rt){_t!==rt&&(_t=rt,ht&&(rt=1-rt),i.clearDepth(rt))},reset:function(){L=!1,j=null,ut=null,_t=null,ht=!1}}}function s(){let L=!1,ht=null,j=null,ut=null,_t=null,rt=null,Pt=null,Ct=null,Wt=null;return{setTest:function(se){L||(se?et(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(se){ht!==se&&!L&&(i.stencilMask(se),ht=se)},setFunc:function(se,ge,ze){(j!==se||ut!==ge||_t!==ze)&&(i.stencilFunc(se,ge,ze),j=se,ut=ge,_t=ze)},setOp:function(se,ge,ze){(rt!==se||Pt!==ge||Ct!==ze)&&(i.stencilOp(se,ge,ze),rt=se,Pt=ge,Ct=ze)},setLocked:function(se){L=se},setClear:function(se){Wt!==se&&(i.clearStencil(se),Wt=se)},reset:function(){L=!1,ht=null,j=null,ut=null,_t=null,rt=null,Pt=null,Ct=null,Wt=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},f={},h={},m=new WeakMap,x=[],T=null,g=!1,d=null,E=null,R=null,y=null,b=null,M=null,C=null,_=new Ht(0,0,0),w=0,I=!1,F=null,B=null,V=null,N=null,G=null,J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Q=!1,at=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(K)[1]),Q=at>=1):K.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Q=at>=2);let nt=null,st={},Lt=i.getParameter(i.SCISSOR_BOX),vt=i.getParameter(i.VIEWPORT),ue=new Me().fromArray(Lt),Kt=new Me().fromArray(vt);function te(L,ht,j,ut){let _t=new Uint8Array(4),rt=i.createTexture();i.bindTexture(L,rt),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<j;Pt++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,ut,0,i.RGBA,i.UNSIGNED_BYTE,_t):i.texImage2D(ht+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_t);return rt}let Z={};Z[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(rs),Yt(!1),me(Yo),et(i.CULL_FACE),ee(Gn);function et(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function St(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function Ot(L,ht){return h[L]!==ht?(i.bindFramebuffer(L,ht),h[L]=ht,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ht),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function xt(L,ht){let j=x,ut=!1;if(L){j=m.get(ht),j===void 0&&(j=[],m.set(ht,j));let _t=L.textures;if(j.length!==_t.length||j[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,Pt=_t.length;rt<Pt;rt++)j[rt]=i.COLOR_ATTACHMENT0+rt;j.length=_t.length,ut=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,ut=!0);ut&&i.drawBuffers(j)}function Gt(L){return T!==L?(i.useProgram(L),T=L,!0):!1}let Ae={[Oi]:i.FUNC_ADD,[pl]:i.FUNC_SUBTRACT,[ml]:i.FUNC_REVERSE_SUBTRACT};Ae[gl]=i.MIN,Ae[_l]=i.MAX;let Ft={[vl]:i.ZERO,[xl]:i.ONE,[yl]:i.SRC_COLOR,[$o]:i.SRC_ALPHA,[El]:i.SRC_ALPHA_SATURATE,[Tl]:i.DST_COLOR,[bl]:i.DST_ALPHA,[Sl]:i.ONE_MINUS_SRC_COLOR,[Qo]:i.ONE_MINUS_SRC_ALPHA,[wl]:i.ONE_MINUS_DST_COLOR,[Ml]:i.ONE_MINUS_DST_ALPHA,[Al]:i.CONSTANT_COLOR,[Cl]:i.ONE_MINUS_CONSTANT_COLOR,[Rl]:i.CONSTANT_ALPHA,[Pl]:i.ONE_MINUS_CONSTANT_ALPHA};function ee(L,ht,j,ut,_t,rt,Pt,Ct,Wt,se){if(L===Gn){g===!0&&(St(i.BLEND),g=!1);return}if(g===!1&&(et(i.BLEND),g=!0),L!==fl){if(L!==d||se!==I){if((E!==Oi||b!==Oi)&&(i.blendEquation(i.FUNC_ADD),E=Oi,b=Oi),se)switch(L){case _s:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ko:i.blendFunc(i.ONE,i.ONE);break;case Zo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Jo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Bt("WebGLState: Invalid blending: ",L);break}else switch(L){case _s:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ko:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Zo:Bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jo:Bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Bt("WebGLState: Invalid blending: ",L);break}R=null,y=null,M=null,C=null,_.set(0,0,0),w=0,d=L,I=se}return}_t=_t||ht,rt=rt||j,Pt=Pt||ut,(ht!==E||_t!==b)&&(i.blendEquationSeparate(Ae[ht],Ae[_t]),E=ht,b=_t),(j!==R||ut!==y||rt!==M||Pt!==C)&&(i.blendFuncSeparate(Ft[j],Ft[ut],Ft[rt],Ft[Pt]),R=j,y=ut,M=rt,C=Pt),(Ct.equals(_)===!1||Wt!==w)&&(i.blendColor(Ct.r,Ct.g,Ct.b,Wt),_.copy(Ct),w=Wt),d=L,I=!1}function ae(L,ht){L.side===Hn?St(i.CULL_FACE):et(i.CULL_FACE);let j=L.side===sn;ht&&(j=!j),Yt(j),L.blending===_s&&L.transparent===!1?ee(Gn):ee(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);let ut=L.stencilWrite;o.setTest(ut),ut&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),We(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function Yt(L){F!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),F=L)}function me(L){L!==hl?(et(i.CULL_FACE),L!==B&&(L===Yo?i.cullFace(i.BACK):L===ul?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),B=L}function Ie(L){L!==V&&(Q&&i.lineWidth(L),V=L)}function We(L,ht,j){L?(et(i.POLYGON_OFFSET_FILL),(N!==ht||G!==j)&&(N=ht,G=j,a.getReversed()&&(ht=-ht),i.polygonOffset(ht,j))):St(i.POLYGON_OFFSET_FILL)}function _e(L){L?et(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function Ce(L){L===void 0&&(L=i.TEXTURE0+J-1),nt!==L&&(i.activeTexture(L),nt=L)}function U(L,ht,j){j===void 0&&(nt===null?j=i.TEXTURE0+J-1:j=nt);let ut=st[j];ut===void 0&&(ut={type:void 0,texture:void 0},st[j]=ut),(ut.type!==L||ut.texture!==ht)&&(nt!==j&&(i.activeTexture(j),nt=j),i.bindTexture(L,ht||Z[L]),ut.type=L,ut.texture=ht)}function ve(){let L=st[nt];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Jt(){try{i.compressedTexImage2D(...arguments)}catch(L){Bt("WebGLState:",L)}}function S(){try{i.compressedTexImage3D(...arguments)}catch(L){Bt("WebGLState:",L)}}function p(){try{i.texSubImage2D(...arguments)}catch(L){Bt("WebGLState:",L)}}function D(){try{i.texSubImage3D(...arguments)}catch(L){Bt("WebGLState:",L)}}function H(){try{i.compressedTexSubImage2D(...arguments)}catch(L){Bt("WebGLState:",L)}}function Y(){try{i.compressedTexSubImage3D(...arguments)}catch(L){Bt("WebGLState:",L)}}function ct(){try{i.texStorage2D(...arguments)}catch(L){Bt("WebGLState:",L)}}function ot(){try{i.texStorage3D(...arguments)}catch(L){Bt("WebGLState:",L)}}function $(){try{i.texImage2D(...arguments)}catch(L){Bt("WebGLState:",L)}}function tt(){try{i.texImage3D(...arguments)}catch(L){Bt("WebGLState:",L)}}function dt(L){return f[L]!==void 0?f[L]:i.getParameter(L)}function Rt(L,ht){f[L]!==ht&&(i.pixelStorei(L,ht),f[L]=ht)}function ft(L){ue.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),ue.copy(L))}function lt(L){Kt.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Kt.copy(L))}function At(L,ht){let j=l.get(ht);j===void 0&&(j=new WeakMap,l.set(ht,j));let ut=j.get(L);ut===void 0&&(ut=i.getUniformBlockIndex(ht,L.name),j.set(L,ut))}function It(L,ht){let ut=l.get(ht).get(L);c.get(ht)!==ut&&(i.uniformBlockBinding(ht,ut,L.__bindingPointIndex),c.set(ht,ut))}function kt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},nt=null,st={},h={},m=new WeakMap,x=[],T=null,g=!1,d=null,E=null,R=null,y=null,b=null,M=null,C=null,_=new Ht(0,0,0),w=0,I=!1,F=null,B=null,V=null,N=null,G=null,ue.set(0,0,i.canvas.width,i.canvas.height),Kt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:St,bindFramebuffer:Ot,drawBuffers:xt,useProgram:Gt,setBlending:ee,setMaterial:ae,setFlipSided:Yt,setCullFace:me,setLineWidth:Ie,setPolygonOffset:We,setScissorTest:_e,activeTexture:Ce,bindTexture:U,unbindTexture:ve,compressedTexImage2D:Jt,compressedTexImage3D:S,texImage2D:$,texImage3D:tt,pixelStorei:Rt,getParameter:dt,updateUBOMapping:At,uniformBlockBinding:It,texStorage2D:ct,texStorage3D:ot,texSubImage2D:p,texSubImage3D:D,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:ft,viewport:lt,reset:kt}}function dg(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Zt,u=new WeakMap,f=new Set,h,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(S,p){return x?new OffscreenCanvas(S,p):os("canvas")}function g(S,p,D){let H=1,Y=Jt(S);if((Y.width>D||Y.height>D)&&(H=D/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let ct=Math.floor(H*Y.width),ot=Math.floor(H*Y.height);h===void 0&&(h=T(ct,ot));let $=p?T(ct,ot):h;return $.width=ct,$.height=ot,$.getContext("2d").drawImage(S,0,0,ct,ot),Dt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+ct+"x"+ot+")."),$}else return"data"in S&&Dt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),S;return S}function d(S){return S.generateMipmaps}function E(S){i.generateMipmap(S)}function R(S){return S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?i.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(S,p,D,H,Y,ct=!1){if(S!==null){if(i[S]!==void 0)return i[S];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ot;H&&(ot=t.get("EXT_texture_norm16"),ot||Dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=p;if(p===i.RED&&(D===i.FLOAT&&($=i.R32F),D===i.HALF_FLOAT&&($=i.R16F),D===i.UNSIGNED_BYTE&&($=i.R8),D===i.UNSIGNED_SHORT&&ot&&($=ot.R16_EXT),D===i.SHORT&&ot&&($=ot.R16_SNORM_EXT)),p===i.RED_INTEGER&&(D===i.UNSIGNED_BYTE&&($=i.R8UI),D===i.UNSIGNED_SHORT&&($=i.R16UI),D===i.UNSIGNED_INT&&($=i.R32UI),D===i.BYTE&&($=i.R8I),D===i.SHORT&&($=i.R16I),D===i.INT&&($=i.R32I)),p===i.RG&&(D===i.FLOAT&&($=i.RG32F),D===i.HALF_FLOAT&&($=i.RG16F),D===i.UNSIGNED_BYTE&&($=i.RG8),D===i.UNSIGNED_SHORT&&ot&&($=ot.RG16_EXT),D===i.SHORT&&ot&&($=ot.RG16_SNORM_EXT)),p===i.RG_INTEGER&&(D===i.UNSIGNED_BYTE&&($=i.RG8UI),D===i.UNSIGNED_SHORT&&($=i.RG16UI),D===i.UNSIGNED_INT&&($=i.RG32UI),D===i.BYTE&&($=i.RG8I),D===i.SHORT&&($=i.RG16I),D===i.INT&&($=i.RG32I)),p===i.RGB_INTEGER&&(D===i.UNSIGNED_BYTE&&($=i.RGB8UI),D===i.UNSIGNED_SHORT&&($=i.RGB16UI),D===i.UNSIGNED_INT&&($=i.RGB32UI),D===i.BYTE&&($=i.RGB8I),D===i.SHORT&&($=i.RGB16I),D===i.INT&&($=i.RGB32I)),p===i.RGBA_INTEGER&&(D===i.UNSIGNED_BYTE&&($=i.RGBA8UI),D===i.UNSIGNED_SHORT&&($=i.RGBA16UI),D===i.UNSIGNED_INT&&($=i.RGBA32UI),D===i.BYTE&&($=i.RGBA8I),D===i.SHORT&&($=i.RGBA16I),D===i.INT&&($=i.RGBA32I)),p===i.RGB&&(D===i.UNSIGNED_SHORT&&ot&&($=ot.RGB16_EXT),D===i.SHORT&&ot&&($=ot.RGB16_SNORM_EXT),D===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),D===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),p===i.RGBA){let tt=ct?ks:Qt.getTransfer(Y);D===i.FLOAT&&($=i.RGBA32F),D===i.HALF_FLOAT&&($=i.RGBA16F),D===i.UNSIGNED_BYTE&&($=tt===he?i.SRGB8_ALPHA8:i.RGBA8),D===i.UNSIGNED_SHORT&&ot&&($=ot.RGBA16_EXT),D===i.SHORT&&ot&&($=ot.RGBA16_SNORM_EXT),D===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),D===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function b(S,p){let D;return S?p===null||p===Rn||p===xs?D=i.DEPTH24_STENCIL8:p===Pn?D=i.DEPTH32F_STENCIL8:p===vs&&(D=i.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):p===null||p===Rn||p===xs?D=i.DEPTH_COMPONENT24:p===Pn?D=i.DEPTH_COMPONENT32F:p===vs&&(D=i.DEPTH_COMPONENT16),D}function M(S,p){return d(S)===!0||S.isFramebufferTexture&&S.minFilter!==ke&&S.minFilter!==He?Math.log2(Math.max(p.width,p.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?p.mipmaps.length:1}function C(S){let p=S.target;p.removeEventListener("dispose",C),w(p),p.isVideoTexture&&u.delete(p),p.isHTMLTexture&&f.delete(p)}function _(S){let p=S.target;p.removeEventListener("dispose",_),F(p)}function w(S){let p=n.get(S);if(p.__webglInit===void 0)return;let D=S.source,H=m.get(D);if(H){let Y=H[p.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&I(S),Object.keys(H).length===0&&m.delete(D)}n.remove(S)}function I(S){let p=n.get(S);i.deleteTexture(p.__webglTexture);let D=S.source,H=m.get(D);delete H[p.__cacheKey],a.memory.textures--}function F(S){let p=n.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),n.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(p.__webglFramebuffer[H]))for(let Y=0;Y<p.__webglFramebuffer[H].length;Y++)i.deleteFramebuffer(p.__webglFramebuffer[H][Y]);else i.deleteFramebuffer(p.__webglFramebuffer[H]);p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer[H])}else{if(Array.isArray(p.__webglFramebuffer))for(let H=0;H<p.__webglFramebuffer.length;H++)i.deleteFramebuffer(p.__webglFramebuffer[H]);else i.deleteFramebuffer(p.__webglFramebuffer);if(p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer),p.__webglMultisampledFramebuffer&&i.deleteFramebuffer(p.__webglMultisampledFramebuffer),p.__webglColorRenderbuffer)for(let H=0;H<p.__webglColorRenderbuffer.length;H++)p.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(p.__webglColorRenderbuffer[H]);p.__webglDepthRenderbuffer&&i.deleteRenderbuffer(p.__webglDepthRenderbuffer)}let D=S.textures;for(let H=0,Y=D.length;H<Y;H++){let ct=n.get(D[H]);ct.__webglTexture&&(i.deleteTexture(ct.__webglTexture),a.memory.textures--),n.remove(D[H])}n.remove(S)}let B=0;function V(){B=0}function N(){return B}function G(S){B=S}function J(){let S=B;return S>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,S}function Q(S){let p=[];return p.push(S.wrapS),p.push(S.wrapT),p.push(S.wrapR||0),p.push(S.magFilter),p.push(S.minFilter),p.push(S.anisotropy),p.push(S.internalFormat),p.push(S.format),p.push(S.type),p.push(S.generateMipmaps),p.push(S.premultiplyAlpha),p.push(S.flipY),p.push(S.unpackAlignment),p.push(S.colorSpace),p.join()}function at(S,p){let D=n.get(S);if(S.isVideoTexture&&U(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&D.__version!==S.version){let H=S.image;if(H===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{St(D,S,p);return}}else S.isExternalTexture&&(D.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,D.__webglTexture,i.TEXTURE0+p)}function K(S,p){let D=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&D.__version!==S.version){St(D,S,p);return}else S.isExternalTexture&&(D.__webglTexture=S.sourceTexture?S.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,D.__webglTexture,i.TEXTURE0+p)}function nt(S,p){let D=n.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&D.__version!==S.version){St(D,S,p);return}e.bindTexture(i.TEXTURE_3D,D.__webglTexture,i.TEXTURE0+p)}function st(S,p){let D=n.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&D.__version!==S.version){Ot(D,S,p);return}e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+p)}let Lt={[Yr]:i.REPEAT,[Bn]:i.CLAMP_TO_EDGE,[Kr]:i.MIRRORED_REPEAT},vt={[ke]:i.NEAREST,[Nl]:i.NEAREST_MIPMAP_NEAREST,[sr]:i.NEAREST_MIPMAP_LINEAR,[He]:i.LINEAR,[Sa]:i.LINEAR_MIPMAP_NEAREST,[Wn]:i.LINEAR_MIPMAP_LINEAR},ue={[Bl]:i.NEVER,[Hl]:i.ALWAYS,[Ol]:i.LESS,[ro]:i.LEQUAL,[kl]:i.EQUAL,[ao]:i.GEQUAL,[zl]:i.GREATER,[Vl]:i.NOTEQUAL};function Kt(S,p){if(p.type===Pn&&t.has("OES_texture_float_linear")===!1&&(p.magFilter===He||p.magFilter===Sa||p.magFilter===sr||p.magFilter===Wn||p.minFilter===He||p.minFilter===Sa||p.minFilter===sr||p.minFilter===Wn)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(S,i.TEXTURE_WRAP_S,Lt[p.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,Lt[p.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,Lt[p.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,vt[p.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,vt[p.minFilter]),p.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,ue[p.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(p.magFilter===ke||p.minFilter!==sr&&p.minFilter!==Wn||p.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(p.anisotropy>1||n.get(p).__currentAnisotropy){let D=t.get("EXT_texture_filter_anisotropic");i.texParameterf(S,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(p.anisotropy,s.getMaxAnisotropy())),n.get(p).__currentAnisotropy=p.anisotropy}}}function te(S,p){let D=!1;S.__webglInit===void 0&&(S.__webglInit=!0,p.addEventListener("dispose",C));let H=p.source,Y=m.get(H);Y===void 0&&(Y={},m.set(H,Y));let ct=Q(p);if(ct!==S.__cacheKey){Y[ct]===void 0&&(Y[ct]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,D=!0),Y[ct].usedTimes++;let ot=Y[S.__cacheKey];ot!==void 0&&(Y[S.__cacheKey].usedTimes--,ot.usedTimes===0&&I(p)),S.__cacheKey=ct,S.__webglTexture=Y[ct].texture}return D}function Z(S,p,D){return Math.floor(Math.floor(S/D)/p)}function et(S,p,D,H){let ct=S.updateRanges;if(ct.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,p.width,p.height,D,H,p.data);else{ct.sort((Rt,ft)=>Rt.start-ft.start);let ot=0;for(let Rt=1;Rt<ct.length;Rt++){let ft=ct[ot],lt=ct[Rt],At=ft.start+ft.count,It=Z(lt.start,p.width,4),kt=Z(ft.start,p.width,4);lt.start<=At+1&&It===kt&&Z(lt.start+lt.count-1,p.width,4)===It?ft.count=Math.max(ft.count,lt.start+lt.count-ft.start):(++ot,ct[ot]=lt)}ct.length=ot+1;let $=e.getParameter(i.UNPACK_ROW_LENGTH),tt=e.getParameter(i.UNPACK_SKIP_PIXELS),dt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,p.width);for(let Rt=0,ft=ct.length;Rt<ft;Rt++){let lt=ct[Rt],At=Math.floor(lt.start/4),It=Math.ceil(lt.count/4),kt=At%p.width,L=Math.floor(At/p.width),ht=It,j=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,kt),e.pixelStorei(i.UNPACK_SKIP_ROWS,L),e.texSubImage2D(i.TEXTURE_2D,0,kt,L,ht,j,D,H,p.data)}S.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,$),e.pixelStorei(i.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(i.UNPACK_SKIP_ROWS,dt)}}function St(S,p,D){let H=i.TEXTURE_2D;(p.isDataArrayTexture||p.isCompressedArrayTexture)&&(H=i.TEXTURE_2D_ARRAY),p.isData3DTexture&&(H=i.TEXTURE_3D);let Y=te(S,p),ct=p.source;e.bindTexture(H,S.__webglTexture,i.TEXTURE0+D);let ot=n.get(ct);if(ct.version!==ot.__version||Y===!0){if(e.activeTexture(i.TEXTURE0+D),(typeof ImageBitmap<"u"&&p.image instanceof ImageBitmap)===!1){let j=Qt.getPrimaries(Qt.workingColorSpace),ut=p.colorSpace===ri?null:Qt.getPrimaries(p.colorSpace),_t=p.colorSpace===ri||j===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t)}e.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment);let tt=g(p.image,!1,s.maxTextureSize);tt=ve(p,tt);let dt=r.convert(p.format,p.colorSpace),Rt=r.convert(p.type),ft=y(p.internalFormat,dt,Rt,p.normalized,p.colorSpace,p.isVideoTexture);Kt(H,p);let lt,At=p.mipmaps,It=p.isVideoTexture!==!0,kt=ot.__version===void 0||Y===!0,L=ct.dataReady,ht=M(p,tt);if(p.isDepthTexture)ft=b(p.format===Ti,p.type),kt&&(It?e.texStorage2D(i.TEXTURE_2D,1,ft,tt.width,tt.height):e.texImage2D(i.TEXTURE_2D,0,ft,tt.width,tt.height,0,dt,Rt,null));else if(p.isDataTexture)if(At.length>0){It&&kt&&e.texStorage2D(i.TEXTURE_2D,ht,ft,At[0].width,At[0].height);for(let j=0,ut=At.length;j<ut;j++)lt=At[j],It?L&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,lt.width,lt.height,dt,Rt,lt.data):e.texImage2D(i.TEXTURE_2D,j,ft,lt.width,lt.height,0,dt,Rt,lt.data);p.generateMipmaps=!1}else It?(kt&&e.texStorage2D(i.TEXTURE_2D,ht,ft,tt.width,tt.height),L&&et(p,tt,dt,Rt)):e.texImage2D(i.TEXTURE_2D,0,ft,tt.width,tt.height,0,dt,Rt,tt.data);else if(p.isCompressedTexture)if(p.isCompressedArrayTexture){It&&kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,ft,At[0].width,At[0].height,tt.depth);for(let j=0,ut=At.length;j<ut;j++)if(lt=At[j],p.format!==xn)if(dt!==null)if(It){if(L)if(p.layerUpdates.size>0){let _t=Sc(lt.width,lt.height,p.format,p.type);for(let rt of p.layerUpdates){let Pt=lt.data.subarray(rt*_t/lt.data.BYTES_PER_ELEMENT,(rt+1)*_t/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,rt,lt.width,lt.height,1,dt,Pt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,lt.width,lt.height,tt.depth,dt,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,ft,lt.width,lt.height,tt.depth,0,lt.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else It?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,lt.width,lt.height,tt.depth,dt,Rt,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,j,ft,lt.width,lt.height,tt.depth,0,dt,Rt,lt.data);p.layerUpdates.size>0&&p.clearLayerUpdates()}else{It&&kt&&e.texStorage2D(i.TEXTURE_2D,ht,ft,At[0].width,At[0].height);for(let j=0,ut=At.length;j<ut;j++)lt=At[j],p.format!==xn?dt!==null?It?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,lt.width,lt.height,dt,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,j,ft,lt.width,lt.height,0,lt.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):It?L&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,lt.width,lt.height,dt,Rt,lt.data):e.texImage2D(i.TEXTURE_2D,j,ft,lt.width,lt.height,0,dt,Rt,lt.data)}else if(p.isDataArrayTexture)if(It){if(kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ht,ft,tt.width,tt.height,tt.depth),L)if(p.layerUpdates.size>0){let j=Sc(tt.width,tt.height,p.format,p.type);for(let ut of p.layerUpdates){let _t=tt.data.subarray(ut*j/tt.data.BYTES_PER_ELEMENT,(ut+1)*j/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,tt.width,tt.height,1,dt,Rt,_t)}p.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,dt,Rt,tt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ft,tt.width,tt.height,tt.depth,0,dt,Rt,tt.data);else if(p.isData3DTexture)It?(kt&&e.texStorage3D(i.TEXTURE_3D,ht,ft,tt.width,tt.height,tt.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,dt,Rt,tt.data)):e.texImage3D(i.TEXTURE_3D,0,ft,tt.width,tt.height,tt.depth,0,dt,Rt,tt.data);else if(p.isFramebufferTexture){if(kt)if(It)e.texStorage2D(i.TEXTURE_2D,ht,ft,tt.width,tt.height);else{let j=tt.width,ut=tt.height;for(let _t=0;_t<ht;_t++)e.texImage2D(i.TEXTURE_2D,_t,ft,j,ut,0,dt,Rt,null),j>>=1,ut>>=1}}else if(p.isHTMLTexture){if("texElementImage2D"in i){let j=i.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),tt.parentNode!==j){j.appendChild(tt),f.add(p),j.onpaint=ut=>{let _t=ut.changedElements;for(let rt of f)_t.includes(rt.image)&&(rt.needsUpdate=!0)},j.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,tt);else{let _t=i.RGBA,rt=i.RGBA,Pt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,_t,rt,Pt,tt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(At.length>0){if(It&&kt){let j=Jt(At[0]);e.texStorage2D(i.TEXTURE_2D,ht,ft,j.width,j.height)}for(let j=0,ut=At.length;j<ut;j++)lt=At[j],It?L&&e.texSubImage2D(i.TEXTURE_2D,j,0,0,dt,Rt,lt):e.texImage2D(i.TEXTURE_2D,j,ft,dt,Rt,lt);p.generateMipmaps=!1}else if(It){if(kt){let j=Jt(tt);e.texStorage2D(i.TEXTURE_2D,ht,ft,j.width,j.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,dt,Rt,tt)}else e.texImage2D(i.TEXTURE_2D,0,ft,dt,Rt,tt);d(p)&&E(H),ot.__version=ct.version,p.onUpdate&&p.onUpdate(p)}S.__version=p.version}function Ot(S,p,D){if(p.image.length!==6)return;let H=te(S,p),Y=p.source;e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+D);let ct=n.get(Y);if(Y.version!==ct.__version||H===!0){e.activeTexture(i.TEXTURE0+D);let ot=Qt.getPrimaries(Qt.workingColorSpace),$=p.colorSpace===ri?null:Qt.getPrimaries(p.colorSpace),tt=p.colorSpace===ri||ot===$?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let dt=p.isCompressedTexture||p.image[0].isCompressedTexture,Rt=p.image[0]&&p.image[0].isDataTexture,ft=[];for(let rt=0;rt<6;rt++)!dt&&!Rt?ft[rt]=g(p.image[rt],!0,s.maxCubemapSize):ft[rt]=Rt?p.image[rt].image:p.image[rt],ft[rt]=ve(p,ft[rt]);let lt=ft[0],At=r.convert(p.format,p.colorSpace),It=r.convert(p.type),kt=y(p.internalFormat,At,It,p.normalized,p.colorSpace),L=p.isVideoTexture!==!0,ht=ct.__version===void 0||H===!0,j=Y.dataReady,ut=M(p,lt);Kt(i.TEXTURE_CUBE_MAP,p);let _t;if(dt){L&&ht&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,kt,lt.width,lt.height);for(let rt=0;rt<6;rt++){_t=ft[rt].mipmaps;for(let Pt=0;Pt<_t.length;Pt++){let Ct=_t[Pt];p.format!==xn?At!==null?L?j&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Pt,0,0,Ct.width,Ct.height,At,Ct.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Pt,kt,Ct.width,Ct.height,0,Ct.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Pt,0,0,Ct.width,Ct.height,At,It,Ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Pt,kt,Ct.width,Ct.height,0,At,It,Ct.data)}}}else{if(_t=p.mipmaps,L&&ht){_t.length>0&&ut++;let rt=Jt(ft[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ut,kt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Rt){L?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,ft[rt].width,ft[rt].height,At,It,ft[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,kt,ft[rt].width,ft[rt].height,0,At,It,ft[rt].data);for(let Pt=0;Pt<_t.length;Pt++){let Wt=_t[Pt].image[rt].image;L?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Pt+1,0,0,Wt.width,Wt.height,At,It,Wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Pt+1,kt,Wt.width,Wt.height,0,At,It,Wt.data)}}else{L?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,At,It,ft[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,kt,At,It,ft[rt]);for(let Pt=0;Pt<_t.length;Pt++){let Ct=_t[Pt];L?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Pt+1,0,0,At,It,Ct.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Pt+1,kt,At,It,Ct.image[rt])}}}d(p)&&E(i.TEXTURE_CUBE_MAP),ct.__version=Y.version,p.onUpdate&&p.onUpdate(p)}S.__version=p.version}function xt(S,p,D,H,Y,ct){let ot=r.convert(D.format,D.colorSpace),$=r.convert(D.type),tt=y(D.internalFormat,ot,$,D.normalized,D.colorSpace),dt=n.get(p),Rt=n.get(D);if(Rt.__renderTarget=p,!dt.__hasExternalTextures){let ft=Math.max(1,p.width>>ct),lt=Math.max(1,p.height>>ct);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,ct,tt,ft,lt,p.depth,0,ot,$,null):e.texImage2D(Y,ct,tt,ft,lt,0,ot,$,null)}e.bindFramebuffer(i.FRAMEBUFFER,S),Ce(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,H,Y,Rt.__webglTexture,0,_e(p)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,H,Y,Rt.__webglTexture,ct),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Gt(S,p,D){if(i.bindRenderbuffer(i.RENDERBUFFER,S),p.depthBuffer){let H=p.depthTexture,Y=H&&H.isDepthTexture?H.type:null,ct=b(p.stencilBuffer,Y),ot=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ce(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e(p),ct,p.width,p.height):D?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e(p),ct,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,ct,p.width,p.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,S)}else{let H=p.textures;for(let Y=0;Y<H.length;Y++){let ct=H[Y],ot=r.convert(ct.format,ct.colorSpace),$=r.convert(ct.type),tt=y(ct.internalFormat,ot,$,ct.normalized,ct.colorSpace);Ce(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e(p),tt,p.width,p.height):D?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e(p),tt,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,tt,p.width,p.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ae(S,p,D){let H=p.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,S),!(p.depthTexture&&p.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=n.get(p.depthTexture);if(Y.__renderTarget=p,(!Y.__webglTexture||p.depthTexture.image.width!==p.width||p.depthTexture.image.height!==p.height)&&(p.depthTexture.image.width=p.width,p.depthTexture.image.height=p.height,p.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,p.depthTexture.addEventListener("dispose",C)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Kt(i.TEXTURE_CUBE_MAP,p.depthTexture);let dt=r.convert(p.depthTexture.format),Rt=r.convert(p.depthTexture.type),ft;p.depthTexture.format===On?ft=i.DEPTH_COMPONENT24:p.depthTexture.format===Ti&&(ft=i.DEPTH24_STENCIL8);for(let lt=0;lt<6;lt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,ft,p.width,p.height,0,dt,Rt,null)}}else at(p.depthTexture,0);let ct=Y.__webglTexture,ot=_e(p),$=H?i.TEXTURE_CUBE_MAP_POSITIVE_X+D:i.TEXTURE_2D,tt=p.depthTexture.format===Ti?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(p.depthTexture.format===On)Ce(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,$,ct,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,tt,$,ct,0);else if(p.depthTexture.format===Ti)Ce(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,$,ct,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,tt,$,ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ft(S){let p=n.get(S),D=S.isWebGLCubeRenderTarget===!0;if(p.__boundDepthTexture!==S.depthTexture){let H=S.depthTexture;if(p.__depthDisposeCallback&&p.__depthDisposeCallback(),H){let Y=()=>{delete p.__boundDepthTexture,delete p.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),p.__depthDisposeCallback=Y}p.__boundDepthTexture=H}if(S.depthTexture&&!p.__autoAllocateDepthBuffer)if(D)for(let H=0;H<6;H++)Ae(p.__webglFramebuffer[H],S,H);else{let H=S.texture.mipmaps;H&&H.length>0?Ae(p.__webglFramebuffer[0],S,0):Ae(p.__webglFramebuffer,S,0)}else if(D){p.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[H]),p.__webglDepthbuffer[H]===void 0)p.__webglDepthbuffer[H]=i.createRenderbuffer(),Gt(p.__webglDepthbuffer[H],S,!1);else{let Y=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=p.__webglDepthbuffer[H];i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ct)}}else{let H=S.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer),p.__webglDepthbuffer===void 0)p.__webglDepthbuffer=i.createRenderbuffer(),Gt(p.__webglDepthbuffer,S,!1);else{let Y=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=p.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,ct)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(S,p,D){let H=n.get(S);p!==void 0&&xt(H.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),D!==void 0&&Ft(S)}function ae(S){let p=S.texture,D=n.get(S),H=n.get(p);S.addEventListener("dispose",_);let Y=S.textures,ct=S.isWebGLCubeRenderTarget===!0,ot=Y.length>1;if(ot||(H.__webglTexture===void 0&&(H.__webglTexture=i.createTexture()),H.__version=p.version,a.memory.textures++),ct){D.__webglFramebuffer=[];for(let $=0;$<6;$++)if(p.mipmaps&&p.mipmaps.length>0){D.__webglFramebuffer[$]=[];for(let tt=0;tt<p.mipmaps.length;tt++)D.__webglFramebuffer[$][tt]=i.createFramebuffer()}else D.__webglFramebuffer[$]=i.createFramebuffer()}else{if(p.mipmaps&&p.mipmaps.length>0){D.__webglFramebuffer=[];for(let $=0;$<p.mipmaps.length;$++)D.__webglFramebuffer[$]=i.createFramebuffer()}else D.__webglFramebuffer=i.createFramebuffer();if(ot)for(let $=0,tt=Y.length;$<tt;$++){let dt=n.get(Y[$]);dt.__webglTexture===void 0&&(dt.__webglTexture=i.createTexture(),a.memory.textures++)}if(S.samples>0&&Ce(S)===!1){D.__webglMultisampledFramebuffer=i.createFramebuffer(),D.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let $=0;$<Y.length;$++){let tt=Y[$];D.__webglColorRenderbuffer[$]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,D.__webglColorRenderbuffer[$]);let dt=r.convert(tt.format,tt.colorSpace),Rt=r.convert(tt.type),ft=y(tt.internalFormat,dt,Rt,tt.normalized,tt.colorSpace,S.isXRRenderTarget===!0),lt=_e(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,ft,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+$,i.RENDERBUFFER,D.__webglColorRenderbuffer[$])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(D.__webglDepthRenderbuffer=i.createRenderbuffer(),Gt(D.__webglDepthRenderbuffer,S,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ct){e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),Kt(i.TEXTURE_CUBE_MAP,p);for(let $=0;$<6;$++)if(p.mipmaps&&p.mipmaps.length>0)for(let tt=0;tt<p.mipmaps.length;tt++)xt(D.__webglFramebuffer[$][tt],S,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,tt);else xt(D.__webglFramebuffer[$],S,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);d(p)&&E(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ot){for(let $=0,tt=Y.length;$<tt;$++){let dt=Y[$],Rt=n.get(dt),ft=i.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ft=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,Rt.__webglTexture),Kt(ft,dt),xt(D.__webglFramebuffer,S,dt,i.COLOR_ATTACHMENT0+$,ft,0),d(dt)&&E(ft)}e.unbindTexture()}else{let $=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&($=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,H.__webglTexture),Kt($,p),p.mipmaps&&p.mipmaps.length>0)for(let tt=0;tt<p.mipmaps.length;tt++)xt(D.__webglFramebuffer[tt],S,p,i.COLOR_ATTACHMENT0,$,tt);else xt(D.__webglFramebuffer,S,p,i.COLOR_ATTACHMENT0,$,0);d(p)&&E($),e.unbindTexture()}S.depthBuffer&&Ft(S)}function Yt(S){let p=S.textures;for(let D=0,H=p.length;D<H;D++){let Y=p[D];if(d(Y)){let ct=R(S),ot=n.get(Y).__webglTexture;e.bindTexture(ct,ot),E(ct),e.unbindTexture()}}}let me=[],Ie=[];function We(S){if(S.samples>0){if(Ce(S)===!1){let p=S.textures,D=S.width,H=S.height,Y=i.COLOR_BUFFER_BIT,ct=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=n.get(S),$=p.length>1;if($)for(let dt=0;dt<p.length;dt++)e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ot.__webglMultisampledFramebuffer);let tt=S.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let dt=0;dt<p.length;dt++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),$){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ot.__webglColorRenderbuffer[dt]);let Rt=n.get(p[dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Rt,0)}i.blitFramebuffer(0,0,D,H,0,0,D,H,Y,i.NEAREST),c===!0&&(me.length=0,Ie.length=0,me.push(i.COLOR_ATTACHMENT0+dt),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(me.push(ct),Ie.push(ct),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ie)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,me))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),$)for(let dt=0;dt<p.length;dt++){e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,ot.__webglColorRenderbuffer[dt]);let Rt=n.get(p[dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ot.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,Rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ot.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&c){let p=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[p])}}}function _e(S){return Math.min(s.maxSamples,S.samples)}function Ce(S){let p=n.get(S);return S.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&p.__useRenderToTexture!==!1}function U(S){let p=a.render.frame;u.get(S)!==p&&(u.set(S,p),S.update())}function ve(S,p){let D=S.colorSpace,H=S.format,Y=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||D!==Os&&D!==ri&&(Qt.getTransfer(D)===he?(H!==xn||Y!==on)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Bt("WebGLTextures: Unsupported texture color space:",D)),p}function Jt(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(l.width=S.naturalWidth||S.width,l.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(l.width=S.displayWidth,l.height=S.displayHeight):(l.width=S.width,l.height=S.height),l}this.allocateTextureUnit=J,this.resetTextureUnits=V,this.getTextureUnits=N,this.setTextureUnits=G,this.setTexture2D=at,this.setTexture2DArray=K,this.setTexture3D=nt,this.setTextureCube=st,this.rebindTextures=ee,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=We,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=Ce,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function fg(i,t){function e(n,s=ri){let r,a=Qt.getTransfer(s);if(n===on)return i.UNSIGNED_BYTE;if(n===Ma)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ta)return i.UNSIGNED_SHORT_5_5_5_1;if(n===hc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===uc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===cc)return i.BYTE;if(n===lc)return i.SHORT;if(n===vs)return i.UNSIGNED_SHORT;if(n===ba)return i.INT;if(n===Rn)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===In)return i.HALF_FLOAT;if(n===dc)return i.ALPHA;if(n===fc)return i.RGB;if(n===xn)return i.RGBA;if(n===On)return i.DEPTH_COMPONENT;if(n===Ti)return i.DEPTH_STENCIL;if(n===pc)return i.RED;if(n===wa)return i.RED_INTEGER;if(n===wi)return i.RG;if(n===Ea)return i.RG_INTEGER;if(n===Aa)return i.RGBA_INTEGER;if(n===rr||n===ar||n===or||n===cr)if(a===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===cr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ca||n===Ra||n===Pa||n===Ia)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ca)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ra)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Pa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===La||n===Na||n===Ua||n===Da||n===Fa||n===lr||n===Ba)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===La||n===Na)return a===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ua)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Da)return r.COMPRESSED_R11_EAC;if(n===Fa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===lr)return r.COMPRESSED_RG11_EAC;if(n===Ba)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oa||n===ka||n===za||n===Va||n===Ha||n===Ga||n===Wa||n===qa||n===Xa||n===Ya||n===Ka||n===Za||n===Ja||n===$a)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oa)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ka)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===za)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Va)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ha)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ga)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wa)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qa)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xa)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ya)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ka)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Za)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ja)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$a)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qa||n===ja||n===to)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Qa)return a===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ja)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===to)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===eo||n===no||n===hr||n===io)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===eo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===no)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===hr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===io)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var pg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Dc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ys(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new nn({vertexShader:pg,fragmentShader:mg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new be(new _i(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fc=class extends kn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,m=null,x=null,T=typeof XRWebGLBinding<"u",g=new Dc,d={},E=e.getContextAttributes(),R=null,y=null,b=[],M=[],C=new Zt,_=null,w=null,I=new rn;I.viewport=new Me;let F=new rn;F.viewport=new Me;let B=[I,F],V=new _a,N=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let et=b[Z];return et===void 0&&(et=new us,b[Z]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Z){let et=b[Z];return et===void 0&&(et=new us,b[Z]=et),et.getGripSpace()},this.getHand=function(Z){let et=b[Z];return et===void 0&&(et=new us,b[Z]=et),et.getHandSpace()};function J(Z){let et=M.indexOf(Z.inputSource);if(et===-1)return;let St=b[et];St!==void 0&&(St.update(Z.inputSource,Z.frame,l||a),St.dispatchEvent({type:Z.type,data:Z.inputSource}))}function Q(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",at);for(let Z=0;Z<b.length;Z++){let et=M[Z];et!==null&&(M[Z]=null,b[Z].disconnect(et))}N=null,G=null,g.reset();for(let Z in d)delete d[Z];if(t.setRenderTarget(R),m=null,h=null,f=null,s=null,y=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(C.width,C.height,!1),w!==null){let Z=w.camera;Z.fov=w.fov,Z.zoom=w.zoom,Z.updateProjectionMatrix(),w=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f===null&&T&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(R=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",at),E.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(C),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let St=null,Ot=null,xt=null;E.depth&&(xt=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,St=E.stencil?Ti:On,Ot=E.stencil?xs:Rn);let Gt={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Gt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new an(h.textureWidth,h.textureHeight,{format:xn,type:on,depthTexture:new mi(h.textureWidth,h.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,St),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let St={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,St),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new an(m.framebufferWidth,m.framebufferHeight,{format:xn,type:on,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),te.setContext(s),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function at(Z){for(let et=0;et<Z.removed.length;et++){let St=Z.removed[et],Ot=M.indexOf(St);Ot>=0&&(M[Ot]=null,b[Ot].disconnect(St))}for(let et=0;et<Z.added.length;et++){let St=Z.added[et],Ot=M.indexOf(St);if(Ot===-1){for(let Gt=0;Gt<b.length;Gt++)if(Gt>=M.length){M.push(St),Ot=Gt;break}else if(M[Gt]===null){M[Gt]=St,Ot=Gt;break}if(Ot===-1)break}let xt=b[Ot];xt&&xt.connect(St)}}let K=new z,nt=new z;function st(Z,et,St){K.setFromMatrixPosition(et.matrixWorld),nt.setFromMatrixPosition(St.matrixWorld);let Ot=K.distanceTo(nt),xt=et.projectionMatrix.elements,Gt=St.projectionMatrix.elements,Ae=xt[14]/(xt[10]-1),Ft=xt[14]/(xt[10]+1),ee=(xt[9]+1)/xt[5],ae=(xt[9]-1)/xt[5],Yt=(xt[8]-1)/xt[0],me=(Gt[8]+1)/Gt[0],Ie=Ae*Yt,We=Ae*me,_e=Ot/(-Yt+me),Ce=_e*-Yt;if(et.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ce),Z.translateZ(_e),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),xt[10]===-1)Z.projectionMatrix.copy(et.projectionMatrix),Z.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let U=Ae+_e,ve=Ft+_e,Jt=Ie-Ce,S=We+(Ot-Ce),p=ee*Ft/ve*U,D=ae*Ft/ve*U;Z.projectionMatrix.makePerspective(Jt,S,p,D,U,ve),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Lt(Z,et){et===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(et.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let et=Z.near,St=Z.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(St=g.depthFar)),V.near=F.near=I.near=et,V.far=F.far=I.far=St,(N!==V.near||G!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),N=V.near,G=V.far),V.layers.mask=Z.layers.mask|6,I.layers.mask=V.layers.mask&-5,F.layers.mask=V.layers.mask&-3;let Ot=Z.parent,xt=V.cameras;Lt(V,Ot);for(let Gt=0;Gt<xt.length;Gt++)Lt(xt[Gt],Ot);xt.length===2?st(V,I,F):V.projectionMatrix.copy(I.projectionMatrix),w===null&&Z.isPerspectiveCamera&&(w={camera:Z,fov:Z.fov,zoom:Z.zoom}),vt(Z,V,Ot)};function vt(Z,et,St){St===null?Z.matrix.copy(et.matrixWorld):(Z.matrix.copy(St.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(et.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(et.projectionMatrix),Z.projectionMatrixInverse.copy(et.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=ls*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(Z){c=Z,h!==null&&(h.fixedFoveation=Z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(V)},this.getCameraTexture=function(Z){return d[Z]};let ue=null;function Kt(Z,et){if(u=et.getViewerPose(l||a),x=et,u!==null){let St=u.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let Ot=!1;St.length!==V.cameras.length&&(V.cameras.length=0,Ot=!0);for(let Ft=0;Ft<St.length;Ft++){let ee=St[Ft],ae=null;if(m!==null)ae=m.getViewport(ee);else{let me=f.getViewSubImage(h,ee);ae=me.viewport,Ft===0&&(t.setRenderTargetTextures(y,me.colorTexture,me.depthStencilTexture),t.setRenderTarget(y))}let Yt=B[Ft];Yt===void 0&&(Yt=new rn,Yt.layers.enable(Ft),Yt.viewport=new Me,B[Ft]=Yt),Yt.matrix.fromArray(ee.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(ee.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(ae.x,ae.y,ae.width,ae.height),Ft===0&&(V.matrix.copy(Yt.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Ot===!0&&V.cameras.push(Yt)}let xt=s.enabledFeatures;if(xt&&xt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&T){f=n.getBinding();let Ft=f.getDepthInformation(St[0]);Ft&&Ft.isValid&&Ft.texture&&g.init(Ft,s.renderState)}if(xt&&xt.includes("camera-access")&&T){t.state.unbindTexture(),f=n.getBinding();for(let Ft=0;Ft<St.length;Ft++){let ee=St[Ft].camera;if(ee){let ae=d[ee];ae||(ae=new Ys,d[ee]=ae);let Yt=f.getCameraImage(ee);ae.sourceTexture=Yt}}}}for(let St=0;St<b.length;St++){let Ot=M[St],xt=b[St];Ot!==null&&xt!==void 0&&xt.update(Ot,et,l||a)}ue&&ue(Z,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),x=null}let te=new xh;te.setAnimationLoop(Kt),this.setAnimationLoop=function(Z){ue=Z},this.dispose=function(){}}},gg=new we,wh=new zt;wh.set(-1,0,0,0,1,0,0,0,1);function _g(i,t){function e(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function n(g,d){d.color.getRGB(g.fogColor.value,vc(i)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function s(g,d,E,R,y){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(g,d):d.isMeshLambertMaterial?(r(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(g,d),f(g,d)):d.isMeshPhongMaterial?(r(g,d),u(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(g,d),h(g,d),d.isMeshPhysicalMaterial&&m(g,d,y)):d.isMeshMatcapMaterial?(r(g,d),x(g,d)):d.isMeshDepthMaterial?r(g,d):d.isMeshDistanceMaterial?(r(g,d),T(g,d)):d.isMeshNormalMaterial?r(g,d):d.isLineBasicMaterial?(a(g,d),d.isLineDashedMaterial&&o(g,d)):d.isPointsMaterial?c(g,d,E,R):d.isSpriteMaterial?l(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,e(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===sn&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,e(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===sn&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,e(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,e(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);let E=t.get(d),R=E.envMap,y=E.envMapRotation;R&&(g.envMap.value=R,g.envMapRotation.value.setFromMatrix4(gg.makeRotationFromEuler(y)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(wh),g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,g.aoMapTransform))}function a(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform))}function o(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function c(g,d,E,R){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*E,g.scale.value=R*.5,d.map&&(g.map.value=d.map,e(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function l(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function f(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function m(g,d,E){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===sn&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.retroreflectivity>0&&(g.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,d){d.matcap&&(g.matcap.value=d.matcap)}function T(g,d){let E=t.get(d).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function vg(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,b){let M=b.program;n.uniformBlockBinding(y,M)}function l(y,b){let M=s[y.id];M===void 0&&(g(y),M=u(y),s[y.id]=M,y.addEventListener("dispose",E));let C=b.program;n.updateUBOMapping(y,C);let _=t.render.frame;r[y.id]!==_&&(h(y),r[y.id]=_)}function u(y){let b=f();y.__bindingPointIndex=b;let M=i.createBuffer(),C=y.__size,_=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Bt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){let b=s[y.id],M=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let _=0,w=M.length;_<w;_++){let I=M[_];if(Array.isArray(I))for(let F=0,B=I.length;F<B;F++)m(I[F],_,F,C);else m(I,_,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(y,b,M,C){if(T(y,b,M,C)===!0){let _=y.__offset,w=y.value;if(Array.isArray(w)){let I=0;for(let F=0;F<w.length;F++){let B=w[F],V=d(B);x(B,y.__data,I),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(I+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(w,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,y.__data)}}function x(y,b,M){typeof y=="number"||typeof y=="boolean"?b[0]=y:y.isMatrix3?(b[0]=y.elements[0],b[1]=y.elements[1],b[2]=y.elements[2],b[3]=0,b[4]=y.elements[3],b[5]=y.elements[4],b[6]=y.elements[5],b[7]=0,b[8]=y.elements[6],b[9]=y.elements[7],b[10]=y.elements[8],b[11]=0):ArrayBuffer.isView(y)?b.set(new y.constructor(y.buffer,y.byteOffset,b.length)):y.toArray(b,M)}function T(y,b,M,C){let _=y.value,w=b+"_"+M;if(C[w]===void 0)return typeof _=="number"||typeof _=="boolean"?C[w]=_:ArrayBuffer.isView(_)?C[w]=_.slice():C[w]=_.clone(),!0;{let I=C[w];if(typeof _=="number"||typeof _=="boolean"){if(I!==_)return C[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(I.equals(_)===!1)return I.copy(_),!0}}return!1}function g(y){let b=y.uniforms,M=0,C=16;for(let w=0,I=b.length;w<I;w++){let F=Array.isArray(b[w])?b[w]:[b[w]];for(let B=0,V=F.length;B<V;B++){let N=F[B],G=Array.isArray(N.value)?N.value:[N.value];for(let J=0,Q=G.length;J<Q;J++){let at=G[J],K=d(at),nt=M%C,st=nt%K.boundary,Lt=nt+st;M+=st,Lt!==0&&C-Lt<K.storage&&(M+=C-Lt),N.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=M,M+=K.storage}}}let _=M%C;return _>0&&(M+=C-_),y.__size=M,y.__cache={},this}function d(y){let b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(b.boundary=16,b.storage=y.byteLength):Dt("WebGLRenderer: Unsupported uniform value type.",y),b}function E(y){let b=y.target;b.removeEventListener("dispose",E);let M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function R(){for(let y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:R}}var xg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),qn=null;function yg(){return qn===null&&(qn=new ta(xg,16,16,wi,In),qn.name="DFG_LUT",qn.minFilter=He,qn.magFilter=He,qn.wrapS=Bn,qn.wrapT=Bn,qn.generateMipmaps=!1,qn.needsUpdate=!0),qn}var uo=class{constructor(t={}){let{canvas:e=Wl(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:m=on}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;let T=m,g=new Set([Aa,Ea,wa]),d=new Set([on,Rn,vs,xs,Ma,Ta]),E=new Uint32Array(4),R=new Int32Array(4),y=new z,b=null,M=null,C=[],_=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,F=!1,B=null,V=null,N=null,G=null;this._outputColorSpace=Ke;let J=0,Q=0,at=null,K=-1,nt=null,st=new Me,Lt=new Me,vt=null,ue=new Ht(0),Kt=0,te=e.width,Z=e.height,et=1,St=null,Ot=null,xt=new Me(0,0,te,Z),Gt=new Me(0,0,te,Z),Ae=!1,Ft=new fs,ee=!1,ae=!1,Yt=new we,me=new z,Ie=new Me,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_e=!1;function Ce(){return at===null?et:1}let U=n;function ve(v,P){return e.getContext(v,P)}let Jt,S,p,D,H,Y,ct,ot,$,tt,dt,Rt,ft,lt,At,It,kt,L,ht,j,ut,_t,rt;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${va}`),e.addEventListener("webglcontextlost",Wt,!1),e.addEventListener("webglcontextrestored",se,!1),e.addEventListener("webglcontextcreationerror",ge,!1),U===null){let P="webgl2";if(U=ve(P,v),U===null)throw ve(P)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Pt()}catch(v){throw e.removeEventListener("webglcontextlost",Wt,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",ge,!1),Bt("WebGLRenderer: "+v.message),v}function Pt(){Jt=new Ap(U),Jt.init(),ut=new fg(U,Jt),S=new _p(U,Jt,t,ut),p=new ug(U,Jt),S.reversedDepthBuffer&&h&&p.buffers.depth.setReversed(!0),V=U.createFramebuffer(),N=U.createFramebuffer(),G=U.createFramebuffer(),D=new Pp(U),H=new $m,Y=new dg(U,Jt,p,H,S,ut,D),ct=new Ep(I),ot=new Iu(U),_t=new mp(U,ot),$=new Cp(U,ot,D,_t),tt=new Lp(U,$,ot,_t,D),L=new Ip(U,S,Y),At=new vp(H),dt=new Jm(I,ct,Jt,S,_t,At),Rt=new _g(I,H),ft=new jm,lt=new rg(Jt),kt=new pp(I,ct,p,tt,x,c),It=new hg(I,tt,S),rt=new vg(U,D,S,p),ht=new gp(U,Jt,D),j=new Rp(U,Jt,D),D.programs=dt.programs,I.capabilities=S,I.extensions=Jt,I.properties=H,I.renderLists=ft,I.shadowMap=It,I.state=p,I.info=D}T!==on&&(w=new Up(T,e.width,e.height,o,s,r));let Ct=new Fc(I,U);this.xr=Ct,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let v=Jt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Jt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(v){v!==void 0&&(et=v,this.setSize(te,Z,!1))},this.getSize=function(v){return v.set(te,Z)},this.setSize=function(v,P,W=!0){if(Ct.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}te=v,Z=P,e.width=Math.floor(v*et),e.height=Math.floor(P*et),W===!0&&(e.style.width=v+"px",e.style.height=P+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,v,P)},this.getDrawingBufferSize=function(v){return v.set(te*et,Z*et).floor()},this.setDrawingBufferSize=function(v,P,W){te=v,Z=P,et=W,e.width=Math.floor(v*W),e.height=Math.floor(P*W),this.setViewport(0,0,v,P)},this.setEffects=function(v){if(T===on){Bt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let P=0;P<v.length;P++)if(v[P].isOutputPass===!0){Dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(st)},this.getViewport=function(v){return v.copy(xt)},this.setViewport=function(v,P,W,O){v.isVector4?xt.set(v.x,v.y,v.z,v.w):xt.set(v,P,W,O),p.viewport(st.copy(xt).multiplyScalar(et).round())},this.getScissor=function(v){return v.copy(Gt)},this.setScissor=function(v,P,W,O){v.isVector4?Gt.set(v.x,v.y,v.z,v.w):Gt.set(v,P,W,O),p.scissor(Lt.copy(Gt).multiplyScalar(et).round())},this.getScissorTest=function(){return Ae},this.setScissorTest=function(v){p.setScissorTest(Ae=v)},this.setOpaqueSort=function(v){St=v},this.setTransparentSort=function(v){Ot=v},this.getClearColor=function(v){return v.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor(...arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha(...arguments)},this.clear=function(v=!0,P=!0,W=!0){let O=0;if(v){let k=!1;if(at!==null){let mt=at.texture.format;k=g.has(mt)}if(k){let mt=at.texture.type,bt=d.has(mt),pt=kt.getClearColor(),Mt=kt.getClearAlpha(),Tt=pt.r,Ut=pt.g,Xt=pt.b;bt?(E[0]=Tt,E[1]=Ut,E[2]=Xt,E[3]=Mt,U.clearBufferuiv(U.COLOR,0,E)):(R[0]=Tt,R[1]=Ut,R[2]=Xt,R[3]=Mt,U.clearBufferiv(U.COLOR,0,R))}else O|=U.COLOR_BUFFER_BIT}P&&(O|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(O|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&U.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),B=v},this.dispose=function(){e.removeEventListener("webglcontextlost",Wt,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",ge,!1),kt.dispose(),ft.dispose(),lt.dispose(),H.dispose(),ct.dispose(),tt.dispose(),_t.dispose(),rt.dispose(),dt.dispose(),Ct.dispose(),Ct.removeEventListener("sessionstart",pn),Ct.removeEventListener("sessionend",Ln),Ve.stop()};function Wt(v){v.preventDefault(),gc("WebGLRenderer: Context Lost."),F=!0}function se(){gc("WebGLRenderer: Context Restored."),F=!1;let v=D.autoReset,P=It.enabled,W=It.autoUpdate,O=It.needsUpdate,k=It.type;Pt(),D.autoReset=v,It.enabled=P,It.autoUpdate=W,It.needsUpdate=O,It.type=k}function ge(v){Bt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function ze(v){let P=v.target;P.removeEventListener("dispose",ze),gr(P)}function gr(v){oe(v),H.remove(v)}function oe(v){let P=H.get(v).programs;P!==void 0&&(P.forEach(function(W){dt.releaseProgram(W)}),v.isShaderMaterial&&dt.releaseShaderCache(v))}this.renderBufferDirect=function(v,P,W,O,k,mt){P===null&&(P=We);let bt=k.isMesh&&k.matrixWorld.determinantAffine()<0,pt=Cs(v,P,W,O,k);p.setMaterial(O,bt);let Mt=W.index,Tt=1;if(O.wireframe===!0){if(Mt=$.getWireframeAttribute(W),Mt===void 0)return;Tt=2}let Ut=W.drawRange,Xt=W.attributes.position,wt=Ut.start*Tt,ne=(Ut.start+Ut.count)*Tt;mt!==null&&(wt=Math.max(wt,mt.start*Tt),ne=Math.min(ne,(mt.start+mt.count)*Tt)),Mt!==null?(wt=Math.max(wt,0),ne=Math.min(ne,Mt.count)):Xt!=null&&(wt=Math.max(wt,0),ne=Math.min(ne,Xt.count));let de=ne-wt;if(de<0||de===1/0)return;_t.setup(k,O,pt,W,Mt);let fe,ce=ht;if(Mt!==null&&(fe=ot.get(Mt),ce=j,ce.setIndex(fe)),k.isMesh)O.wireframe===!0?(p.setLineWidth(O.wireframeLinewidth*Ce()),ce.setMode(U.LINES)):ce.setMode(U.TRIANGLES);else if(k.isLine){let Be=O.linewidth;Be===void 0&&(Be=1),p.setLineWidth(Be*Ce()),k.isLineSegments?ce.setMode(U.LINES):k.isLineLoop?ce.setMode(U.LINE_LOOP):ce.setMode(U.LINE_STRIP)}else k.isPoints?ce.setMode(U.POINTS):k.isSprite&&ce.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(Jt.get("WEBGL_multi_draw"))ce.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Be=k._multiDrawStarts,yt=k._multiDrawCounts,xe=k._multiDrawCount,ie=Mt?ot.get(Mt).bytesPerElement:1,qe=H.get(O).currentProgram.getUniforms();for(let Qe=0;Qe<xe;Qe++)qe.setValue(U,"_gl_DrawID",Qe),ce.render(Be[Qe]/ie,yt[Qe])}else if(k.isInstancedMesh)ce.renderInstances(wt,de,k.count);else if(W.isInstancedBufferGeometry){let Be=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,yt=Math.min(W.instanceCount,Be);ce.renderInstances(wt,de,yt)}else ce.render(wt,de)};function cn(v,P,W,O){B!==null&&v.isNodeMaterial&&B.setObject(O,v),ee===!0&&At.setState(v,W,!1),v.transparent===!0&&v.side===Hn&&v.forceSinglePass===!1?(v.side=sn,v.needsUpdate=!0,Zn(v,P,O),v.side=bi,v.needsUpdate=!0,Zn(v,P,O),v.side=Hn):Zn(v,P,O)}this.compile=function(v,P,W=null){W===null&&(W=v),B!==null&&B.renderStart(v,P,W),M=lt.get(W),M.init(P),_.push(M),W.traverseVisible(function(k){k.isLight&&k.layers.test(P.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),v!==W&&v.traverseVisible(function(k){k.isLight&&k.layers.test(P.layers)&&(M.pushLight(k),k.castShadow&&M.pushShadow(k))}),M.setupLights(),B!==null&&B.updateLights(M.state.lightsArray),ae=this.localClippingEnabled,ee=At.init(this.clippingPlanes,ae),ee===!0&&At.setGlobalState(this.clippingPlanes,P),B!==null&&It.render(M.state.shadowsArray,W,P);let O=new Set;return v.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let mt=k.material;if(mt)if(Array.isArray(mt))for(let bt=0;bt<mt.length;bt++){let pt=mt[bt];cn(pt,W,P,k),O.add(pt)}else cn(mt,W,P,k),O.add(mt)}),M=_.pop(),B!==null&&B.renderEnd(),O},this.compileAsync=function(v,P,W=null){let O=this.compile(v,P,W);return new Promise(k=>{function mt(){if(O.forEach(function(bt){let Mt=H.get(bt).currentProgram;(Mt===void 0||Mt.isReady())&&O.delete(bt)}),O.size===0){k(v);return}setTimeout(mt,10)}Jt.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let Kn=null;function Fe(v){Kn&&Kn(v)}function pn(){Ve.stop()}function Ln(){Ve.start()}let Ve=new xh;Ve.setAnimationLoop(Fe),typeof self<"u"&&Ve.setContext(self),this.setAnimationLoop=function(v){Kn=v,Ct.setAnimationLoop(v),v===null?Ve.stop():Ve.start()},Ct.addEventListener("sessionstart",pn),Ct.addEventListener("sessionend",Ln),this.render=function(v,P){if(P!==void 0&&P.isCamera!==!0){Bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;B!==null&&B.renderStart(v,P);let W=Ct.enabled===!0&&Ct.isPresenting===!0,O=w!==null&&(at===null||W)&&w.begin(I,at);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Ct.enabled===!0&&Ct.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ct.cameraAutoUpdate===!0&&Ct.updateCamera(P),P=Ct.getCamera()),v.isScene===!0&&v.onBeforeRender(I,v,P,at),M=lt.get(v,_.length),M.init(P),M.state.textureUnits=Y.getTextureUnits(),_.push(M),Yt.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),Ft.setFromProjectionMatrix(Yt,An,P.reversedDepth),ae=this.localClippingEnabled,ee=At.init(this.clippingPlanes,ae),b=ft.get(v,C.length),b.init(),C.push(b),Ct.enabled===!0&&Ct.isPresenting===!0){let bt=I.xr.getDepthSensingMesh();bt!==null&&yn(bt,P,-1/0,I.sortObjects)}yn(v,P,0,I.sortObjects),b.finish(),B!==null&&B.updateLights(M.state.lightsArray),I.sortObjects===!0&&b.sort(St,Ot),_e=Ct.enabled===!1||Ct.isPresenting===!1||Ct.hasDepthSensing()===!1,_e&&kt.addToRenderList(b,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ee===!0&&At.beginShadows();let k=M.state.shadowsArray;if(It.render(k,v,P),ee===!0&&At.endShadows(),(O&&w.hasRenderPass())===!1){let bt=b.opaque,pt=b.transmissive;if(M.setupLights(),P.isArrayCamera){let Mt=P.cameras;if(pt.length>0)for(let Tt=0,Ut=Mt.length;Tt<Ut;Tt++){let Xt=Mt[Tt];Ai(bt,pt,v,Xt)}_e&&kt.render(v);for(let Tt=0,Ut=Mt.length;Tt<Ut;Tt++){let Xt=Mt[Tt];Ei(b,v,Xt,Xt.viewport)}}else pt.length>0&&Ai(bt,pt,v,P),_e&&kt.render(v),Ei(b,v,P)}at!==null&&Q===0&&(Y.updateMultisampleRenderTarget(at),Y.updateRenderTargetMipmap(at)),O&&w.end(I),v.isScene===!0&&v.onAfterRender(I,v,P),_t.resetDefaultState(),K=-1,nt=null,_.pop(),_.length>0?(M=_[_.length-1],Y.setTextureUnits(M.state.textureUnits),ee===!0&&At.setGlobalState(I.clippingPlanes,M.state.camera)):M=null,C.pop(),C.length>0?b=C[C.length-1]:b=null,B!==null&&B.renderEnd()};function yn(v,P,W,O){if(v.visible===!1)return;if(v.layers.test(P.layers)){if(v.isGroup)W=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(P);else if(v.isLightProbeGrid)M.pushLightProbeGrid(v);else if(v.isLight)M.pushLight(v),v.castShadow&&M.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Ft)){O&&Ie.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Yt);let bt=tt.update(v),pt=v.material;pt.visible&&b.push(v,bt,pt,W,Ie.z,null,P)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Ft))){let bt=tt.update(v),pt=v.material;if(O&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Ie.copy(v.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Ie.copy(bt.boundingSphere.center)),Ie.applyMatrix4(v.matrixWorld).applyMatrix4(Yt)),Array.isArray(pt)){let Mt=bt.groups;for(let Tt=0,Ut=Mt.length;Tt<Ut;Tt++){let Xt=Mt[Tt],wt=pt[Xt.materialIndex];wt&&wt.visible&&b.push(v,bt,wt,W,Ie.z,Xt,P)}}else pt.visible&&b.push(v,bt,pt,W,Ie.z,null,P)}}let mt=v.children;for(let bt=0,pt=mt.length;bt<pt;bt++)yn(mt[bt],P,W,O)}function Ei(v,P,W,O){let{opaque:k,transmissive:mt,transparent:bt}=v;M.setupLightsView(W),ee===!0&&At.setGlobalState(I.clippingPlanes,W),O&&p.viewport(st.copy(O)),k.length>0&&Nn(k,P,W),mt.length>0&&Nn(mt,P,W),bt.length>0&&Nn(bt,P,W),p.buffers.depth.setTest(!0),p.buffers.depth.setMask(!0),p.buffers.color.setMask(!0),p.setPolygonOffset(!1)}function Ai(v,P,W,O){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[O.id]===void 0){let wt=Jt.has("EXT_color_buffer_half_float")||Jt.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[O.id]=new an(1,1,{generateMipmaps:!0,type:wt?In:on,minFilter:Wn,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qt.workingColorSpace})}let mt=M.state.transmissionRenderTarget[O.id],bt=O.viewport||st;mt.setSize(bt.z*I.transmissionResolutionScale,bt.w*I.transmissionResolutionScale);let pt=I.getRenderTarget(),Mt=I.getActiveCubeFace(),Tt=I.getActiveMipmapLevel();I.setRenderTarget(mt),I.getClearColor(ue),Kt=I.getClearAlpha(),Kt<1&&I.setClearColor(16777215,.5),I.clear(),_e&&kt.render(W);let Ut=I.toneMapping;I.toneMapping=Cn;let Xt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),M.setupLightsView(O),ee===!0&&At.setGlobalState(I.clippingPlanes,O),Nn(v,W,O),Y.updateMultisampleRenderTarget(mt),Y.updateRenderTargetMipmap(mt),Jt.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let ne=0,de=P.length;ne<de;ne++){let fe=P[ne],{object:ce,geometry:Be,material:yt,group:xe}=fe;if(yt.side===Hn&&ce.layers.test(O.layers)){let ie=yt.side;yt.side=sn,yt.needsUpdate=!0,Ci(ce,W,O,Be,yt,xe),yt.side=ie,yt.needsUpdate=!0,wt=!0}}wt===!0&&(Y.updateMultisampleRenderTarget(mt),Y.updateRenderTargetMipmap(mt))}I.setRenderTarget(pt,Mt,Tt),I.setClearColor(ue,Kt),Xt!==void 0&&(O.viewport=Xt),I.toneMapping=Ut}function Nn(v,P,W){let O=P.isScene===!0?P.overrideMaterial:null;for(let k=0,mt=v.length;k<mt;k++){let bt=v[k],{object:pt,geometry:Mt,group:Tt}=bt,Ut=bt.material;Ut.allowOverride===!0&&O!==null&&(Ut=O),pt.layers.test(W.layers)&&Ci(pt,P,W,Mt,Ut,Tt)}}function Ci(v,P,W,O,k,mt){B!==null&&k.isNodeMaterial&&B.setObject(v,k),v.onBeforeRender(I,P,W,O,k,mt),v.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),k.onBeforeRender(I,P,W,O,v,mt),k.transparent===!0&&k.side===Hn&&k.forceSinglePass===!1?(k.side=sn,k.needsUpdate=!0,I.renderBufferDirect(W,P,O,k,v,mt),k.side=bi,k.needsUpdate=!0,I.renderBufferDirect(W,P,O,k,v,mt),k.side=Hn):I.renderBufferDirect(W,P,O,k,v,mt),v.onAfterRender(I,P,W,O,k,mt)}function Zn(v,P,W){P.isScene!==!0&&(P=We);let O=H.get(v),k=M.state.lights,mt=M.state.shadowsArray,bt=k.state.version,pt=dt.getParameters(v,k.state,mt,P,W,M.state.lightProbeGridArray),Mt=dt.getProgramCacheKey(pt),Tt=O.programs;O.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,O.fog=P.fog;let Ut=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;O.envMap=ct.get(v.envMap||O.environment,Ut),O.envMapRotation=O.environment!==null&&v.envMap===null?P.environmentRotation:v.envMapRotation,Tt===void 0&&(v.addEventListener("dispose",ze),Tt=new Map,O.programs=Tt);let Xt=Tt.get(Mt);if(Xt!==void 0){if(O.currentProgram===Xt&&O.lightsStateVersion===bt)return ai(v,pt),Xt}else pt.uniforms=dt.getUniforms(v),B!==null&&v.isNodeMaterial&&B.build(v,W,pt),v.onBeforeCompile(pt,I),Xt=dt.acquireProgram(pt,Mt),Tt.set(Mt,Xt),O.uniforms=pt.uniforms;let wt=O.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(wt.clippingPlanes=At.uniform),ai(v,pt),O.needsLights=mn(v),O.lightsStateVersion=bt,O.needsLights&&(wt.ambientLightColor.value=k.state.ambient,wt.lightProbe.value=k.state.probe,wt.sunLights.value=k.state.sun,wt.sunLightShadows.value=k.state.sunShadow,wt.directionalLights.value=k.state.directional,wt.directionalLightShadows.value=k.state.directionalShadow,wt.spotLights.value=k.state.spot,wt.spotLightShadows.value=k.state.spotShadow,wt.rectAreaLights.value=k.state.rectArea,wt.ltc_1.value=k.state.rectAreaLTC1,wt.ltc_2.value=k.state.rectAreaLTC2,wt.pointLights.value=k.state.point,wt.pointLightShadows.value=k.state.pointShadow,wt.hemisphereLights.value=k.state.hemi,wt.sunShadowMatrix.value=k.state.sunShadowMatrix,wt.sunShadowCascade.value=k.state.sunShadowCascade,wt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,wt.spotLightMatrix.value=k.state.spotLightMatrix,wt.spotLightMap.value=k.state.spotLightMap,wt.pointShadowMatrix.value=k.state.pointShadowMatrix),O.lightProbeGrid=M.state.lightProbeGridArray.length>0,O.currentProgram=Xt,O.uniformsList=null,Xt}function As(v){if(v.uniformsList===null){let P=v.currentProgram.getUniforms();v.uniformsList=Ts.seqWithValue(P.seq,v.uniforms)}return v.uniformsList}function ai(v,P){let W=H.get(v);W.outputColorSpace=P.outputColorSpace,W.batching=P.batching,W.batchingColor=P.batchingColor,W.instancing=P.instancing,W.instancingColor=P.instancingColor,W.instancingMorph=P.instancingMorph,W.skinning=P.skinning,W.morphTargets=P.morphTargets,W.morphNormals=P.morphNormals,W.morphColors=P.morphColors,W.morphTargetsCount=P.morphTargetsCount,W.numClippingPlanes=P.numClippingPlanes,W.numIntersection=P.numClipIntersection,W.vertexAlphas=P.vertexAlphas,W.vertexTangents=P.vertexTangents,W.toneMapping=P.toneMapping}function Ri(v,P){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;y.setFromMatrixPosition(P.matrixWorld);for(let W=0,O=v.length;W<O;W++){let k=v[W];if(k.texture!==null&&k.boundingBox.containsPoint(y))return k}return null}function Cs(v,P,W,O,k){P.isScene!==!0&&(P=We),Y.resetTextureUnits();let mt=P.fog,bt=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?P.environment:null,pt=at===null?I.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Qt.workingColorSpace,Mt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Tt=ct.get(O.envMap||bt,Mt),Ut=O.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Xt=!!W.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),wt=!!W.morphAttributes.position,ne=!!W.morphAttributes.normal,de=!!W.morphAttributes.color,fe=Cn;O.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(fe=I.toneMapping);let ce=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Be=ce!==void 0?ce.length:0,yt=H.get(O),xe=M.state.lights;if(ee===!0&&(ae===!0||v!==nt)){let le=v===nt&&O.id===K;At.setState(O,v,le)}let ie=!1;O.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==xe.state.version||yt.outputColorSpace!==pt||k.isBatchedMesh&&yt.batching===!1||!k.isBatchedMesh&&yt.batching===!0||k.isBatchedMesh&&yt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&yt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&yt.instancing===!1||!k.isInstancedMesh&&yt.instancing===!0||k.isSkinnedMesh&&yt.skinning===!1||!k.isSkinnedMesh&&yt.skinning===!0||k.isInstancedMesh&&yt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&yt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&yt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&yt.instancingMorph===!1&&k.morphTexture!==null||yt.envMap!==Tt||O.fog===!0&&yt.fog!==mt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==At.numPlanes||yt.numIntersection!==At.numIntersection)||yt.vertexAlphas!==Ut||yt.vertexTangents!==Xt||yt.morphTargets!==wt||yt.morphNormals!==ne||yt.morphColors!==de||yt.toneMapping!==fe||yt.morphTargetsCount!==Be||!!yt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(ie=!0):(ie=!0,yt.__version=O.version);let qe=yt.currentProgram;ie===!0&&(qe=Zn(O,P,k),B&&O.isNodeMaterial&&B.onUpdateProgram(O,qe,yt));let Qe=!1,Sn=!1,ln=!1,$t=qe.getUniforms(),Te=yt.uniforms;if(p.useProgram(qe.program)&&(Qe=!0,Sn=!0,ln=!0),O.id!==K&&(K=O.id,Sn=!0),yt.needsLights){let le=Ri(M.state.lightProbeGridArray,k);yt.lightProbeGrid!==le&&(yt.lightProbeGrid=le,Sn=!0)}if(Qe||nt!==v){p.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),$t.setValue(U,"projectionMatrix",v.projectionMatrix),$t.setValue(U,"viewMatrix",v.matrixWorldInverse);let Dn=$t.map.cameraPosition;Dn!==void 0&&Dn.setValue(U,me.setFromMatrixPosition(v.matrixWorld)),S.logarithmicDepthBuffer&&$t.setValue(U,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&$t.setValue(U,"isOrthographic",v.isOrthographicCamera===!0),nt!==v&&(nt=v,Sn=!0,ln=!0)}if(yt.needsLights&&(xe.state.sunShadowMap.length>0&&$t.setValue(U,"sunShadowMap",xe.state.sunShadowMap,Y),xe.state.directionalShadowMap.length>0&&$t.setValue(U,"directionalShadowMap",xe.state.directionalShadowMap,Y),xe.state.spotShadowMap.length>0&&$t.setValue(U,"spotShadowMap",xe.state.spotShadowMap,Y),xe.state.pointShadowMap.length>0&&$t.setValue(U,"pointShadowMap",xe.state.pointShadowMap,Y)),k.isSkinnedMesh){$t.setOptional(U,k,"bindMatrix"),$t.setOptional(U,k,"bindMatrixInverse");let le=k.skeleton;le&&(le.boneTexture===null&&le.computeBoneTexture(),$t.setValue(U,"boneTexture",le.boneTexture,Y))}k.isBatchedMesh&&($t.setOptional(U,k,"batchingTexture"),$t.setValue(U,"batchingTexture",k._matricesTexture,Y),$t.setOptional(U,k,"batchingIdTexture"),$t.setValue(U,"batchingIdTexture",k._indirectTexture,Y),$t.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&$t.setValue(U,"batchingColorTexture",k._colorsTexture,Y));let Un=W.morphAttributes;if((Un.position!==void 0||Un.normal!==void 0||Un.color!==void 0)&&L.update(k,W,qe),(Sn||yt.receiveShadow!==k.receiveShadow)&&(yt.receiveShadow=k.receiveShadow,$t.setValue(U,"receiveShadow",k.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&P.environment!==null&&(Te.envMapIntensity.value=P.environmentIntensity),Te.dfgLUT!==void 0&&(Te.dfgLUT.value=yg()),Sn){if($t.setValue(U,"toneMappingExposure",I.toneMappingExposure),yt.needsLights&&Hi(Te,ln),mt&&O.fog===!0&&Rt.refreshFogUniforms(Te,mt),Rt.refreshMaterialUniforms(Te,O,et,Z,M.state.transmissionRenderTarget[v.id]),yt.needsLights&&yt.lightProbeGrid){let le=yt.lightProbeGrid;Te.probesSH.value=le.texture,Te.probesMin.value.copy(le.boundingBox.min),Te.probesMax.value.copy(le.boundingBox.max),Te.probesResolution.value.copy(le.resolution)}Ts.upload(U,As(yt),Te,Y)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Ts.upload(U,As(yt),Te,Y),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&$t.setValue(U,"center",k.center),$t.setValue(U,"modelViewMatrix",k.modelViewMatrix),$t.setValue(U,"normalMatrix",k.normalMatrix),$t.setValue(U,"modelMatrix",k.matrixWorld),O.uniformsGroups!==void 0){let le=O.uniformsGroups;for(let Dn=0,Jn=le.length;Dn<Jn;Dn++){let Ii=le[Dn];rt.update(Ii,qe),rt.bind(Ii,qe)}}return qe}function Hi(v,P){v.ambientLightColor.needsUpdate=P,v.lightProbe.needsUpdate=P,v.sunLights.needsUpdate=P,v.sunLightShadows.needsUpdate=P,v.directionalLights.needsUpdate=P,v.directionalLightShadows.needsUpdate=P,v.pointLights.needsUpdate=P,v.pointLightShadows.needsUpdate=P,v.spotLights.needsUpdate=P,v.spotLightShadows.needsUpdate=P,v.rectAreaLights.needsUpdate=P,v.hemisphereLights.needsUpdate=P}function mn(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return Q},this.getRenderTarget=function(){return at},this.setRenderTargetTextures=function(v,P,W){let O=H.get(v);O.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),H.get(v.texture).__webglTexture=P,H.get(v.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:W,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,P){let W=H.get(v);W.__webglFramebuffer=P,W.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(v,P=0,W=0){at=v,J=P,Q=W;let O=null,k=!1,mt=!1;if(v){let pt=H.get(v);if(pt.__useDefaultFramebuffer!==void 0){p.bindFramebuffer(U.FRAMEBUFFER,pt.__webglFramebuffer),st.copy(v.viewport),Lt.copy(v.scissor),vt=v.scissorTest,p.viewport(st),p.scissor(Lt),p.setScissorTest(vt),K=-1;return}else if(pt.__webglFramebuffer===void 0)Y.setupRenderTarget(v);else if(pt.__hasExternalTextures)Y.rebindTextures(v,H.get(v.texture).__webglTexture,H.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Ut=v.depthTexture;if(pt.__boundDepthTexture!==Ut){if(Ut!==null&&H.has(Ut)&&(v.width!==Ut.image.width||v.height!==Ut.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(v)}}let Mt=v.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(mt=!0);let Tt=H.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Tt[P])?O=Tt[P][W]:O=Tt[P],k=!0):v.samples>0&&Y.useMultisampledRTT(v)===!1?O=H.get(v).__webglMultisampledFramebuffer:Array.isArray(Tt)?O=Tt[W]:O=Tt,st.copy(v.viewport),Lt.copy(v.scissor),vt=v.scissorTest}else st.copy(xt).multiplyScalar(et).floor(),Lt.copy(Gt).multiplyScalar(et).floor(),vt=Ae;if(W!==0&&(O=V),p.bindFramebuffer(U.FRAMEBUFFER,O)&&p.drawBuffers(v,O),p.viewport(st),p.scissor(Lt),p.setScissorTest(vt),k){let pt=H.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+P,pt.__webglTexture,W)}else if(mt){let pt=P;for(let Mt=0;Mt<v.textures.length;Mt++){let Tt=H.get(v.textures[Mt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Mt,Tt.__webglTexture,W,pt)}}else if(v!==null&&W!==0){let pt=H.get(v.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pt.__webglTexture,W)}K=-1};function Pi(v){let P=H.get(v);return(P.__readFormat!==v.format||P.__readType!==v.type)&&(P.__readFormat=v.format,P.__readType=v.type,P.__formatReadable=S.textureFormatReadable(v.format),P.__typeReadable=S.textureTypeReadable(v.type)),P}this.readRenderTargetPixels=function(v,P,W,O,k,mt,bt,pt=0){if(!(v&&v.isWebGLRenderTarget)){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=H.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&bt!==void 0&&(Mt=Mt[bt]),Mt){p.bindFramebuffer(U.FRAMEBUFFER,Mt);try{let Tt=v.textures[pt],Ut=Tt.format,Xt=Tt.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt);let wt=Pi(Tt);if(wt.__formatReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(wt.__typeReadable===!1){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=v.width-O&&W>=0&&W<=v.height-k&&U.readPixels(P,W,O,k,ut.convert(Ut),ut.convert(Xt),mt)}finally{let Tt=at!==null?H.get(at).__webglFramebuffer:null;p.bindFramebuffer(U.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(v,P,W,O,k,mt,bt,pt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=H.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&bt!==void 0&&(Mt=Mt[bt]),Mt)if(P>=0&&P<=v.width-O&&W>=0&&W<=v.height-k){p.bindFramebuffer(U.FRAMEBUFFER,Mt);let Tt=v.textures[pt],Ut=Tt.format,Xt=Tt.type;v.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt);let wt=Pi(Tt);if(wt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(wt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ne=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ne),U.bufferData(U.PIXEL_PACK_BUFFER,mt.byteLength,U.STREAM_READ),U.readPixels(P,W,O,k,ut.convert(Ut),ut.convert(Xt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let de=at!==null?H.get(at).__webglFramebuffer:null;p.bindFramebuffer(U.FRAMEBUFFER,de);let fe=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Xl(U,fe,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ne),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,mt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ne),U.deleteSync(fe),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,P=null,W=0){let O=Math.pow(2,-W),k=Math.floor(v.image.width*O),mt=Math.floor(v.image.height*O),bt=P!==null?P.x:0,pt=P!==null?P.y:0;Y.setTexture2D(v,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,bt,pt,k,mt),p.unbindTexture()},this.copyTextureToTexture=function(v,P,W=null,O=null,k=0,mt=0){let bt,pt,Mt,Tt,Ut,Xt,wt,ne,de,fe=v.isCompressedTexture?v.mipmaps[mt]:v.image;if(W!==null)bt=W.max.x-W.min.x,pt=W.max.y-W.min.y,Mt=W.isBox3?W.max.z-W.min.z:1,Tt=W.min.x,Ut=W.min.y,Xt=W.isBox3?W.min.z:0;else{let Te=Math.pow(2,-k);bt=Math.floor(fe.width*Te),pt=Math.floor(fe.height*Te),v.isDataArrayTexture?Mt=fe.depth:v.isData3DTexture?Mt=Math.floor(fe.depth*Te):Mt=1,Tt=0,Ut=0,Xt=0}O!==null?(wt=O.x,ne=O.y,de=O.z):(wt=0,ne=0,de=0);let ce=ut.convert(P.format),Be=ut.convert(P.type),yt;P.isData3DTexture?(Y.setTexture3D(P,0),yt=U.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Y.setTexture2DArray(P,0),yt=U.TEXTURE_2D_ARRAY):(Y.setTexture2D(P,0),yt=U.TEXTURE_2D),p.activeTexture(U.TEXTURE0),p.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,P.flipY),p.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),p.pixelStorei(U.UNPACK_ALIGNMENT,P.unpackAlignment);let xe=p.getParameter(U.UNPACK_ROW_LENGTH),ie=p.getParameter(U.UNPACK_IMAGE_HEIGHT),qe=p.getParameter(U.UNPACK_SKIP_PIXELS),Qe=p.getParameter(U.UNPACK_SKIP_ROWS),Sn=p.getParameter(U.UNPACK_SKIP_IMAGES);p.pixelStorei(U.UNPACK_ROW_LENGTH,fe.width),p.pixelStorei(U.UNPACK_IMAGE_HEIGHT,fe.height),p.pixelStorei(U.UNPACK_SKIP_PIXELS,Tt),p.pixelStorei(U.UNPACK_SKIP_ROWS,Ut),p.pixelStorei(U.UNPACK_SKIP_IMAGES,Xt);let ln=v.isDataArrayTexture||v.isData3DTexture,$t=P.isDataArrayTexture||P.isData3DTexture;if(v.isDepthTexture){let Te=H.get(v),Un=H.get(P),le=H.get(Te.__renderTarget),Dn=H.get(Un.__renderTarget);p.bindFramebuffer(U.READ_FRAMEBUFFER,le.__webglFramebuffer),p.bindFramebuffer(U.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let Jn=0;Jn<Mt;Jn++)ln&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(v).__webglTexture,k,Xt+Jn),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(P).__webglTexture,mt,de+Jn)),U.blitFramebuffer(Tt,Ut,bt,pt,wt,ne,bt,pt,U.DEPTH_BUFFER_BIT,U.NEAREST);p.bindFramebuffer(U.READ_FRAMEBUFFER,null),p.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(k!==0||v.isRenderTargetTexture||H.has(v)){let Te=H.get(v),Un=H.get(P);p.bindFramebuffer(U.READ_FRAMEBUFFER,N),p.bindFramebuffer(U.DRAW_FRAMEBUFFER,G);for(let le=0;le<Mt;le++)ln?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Te.__webglTexture,k,Xt+le):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Te.__webglTexture,k),$t?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Un.__webglTexture,mt,de+le):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Un.__webglTexture,mt),k!==0?U.blitFramebuffer(Tt,Ut,bt,pt,wt,ne,bt,pt,U.COLOR_BUFFER_BIT,U.NEAREST):$t?U.copyTexSubImage3D(yt,mt,wt,ne,de+le,Tt,Ut,bt,pt):U.copyTexSubImage2D(yt,mt,wt,ne,Tt,Ut,bt,pt);p.bindFramebuffer(U.READ_FRAMEBUFFER,null),p.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else $t?v.isDataTexture||v.isData3DTexture?U.texSubImage3D(yt,mt,wt,ne,de,bt,pt,Mt,ce,Be,fe.data):P.isCompressedArrayTexture?U.compressedTexSubImage3D(yt,mt,wt,ne,de,bt,pt,Mt,ce,fe.data):U.texSubImage3D(yt,mt,wt,ne,de,bt,pt,Mt,ce,Be,fe):v.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,mt,wt,ne,bt,pt,ce,Be,fe.data):v.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,mt,wt,ne,fe.width,fe.height,ce,fe.data):U.texSubImage2D(U.TEXTURE_2D,mt,wt,ne,bt,pt,ce,Be,fe);p.pixelStorei(U.UNPACK_ROW_LENGTH,xe),p.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ie),p.pixelStorei(U.UNPACK_SKIP_PIXELS,qe),p.pixelStorei(U.UNPACK_SKIP_ROWS,Qe),p.pixelStorei(U.UNPACK_SKIP_IMAGES,Sn),mt===0&&P.generateMipmaps&&U.generateMipmap(yt),p.unbindTexture()},this.initRenderTarget=function(v){H.get(v).__webglFramebuffer===void 0&&Y.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Y.setTextureCube(v,0):v.isData3DTexture?Y.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Y.setTexture2DArray(v,0):Y.setTexture2D(v,0),p.unbindTexture()},this.resetState=function(){J=0,Q=0,at=null,p.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}};var Nt={cream:16772546,sky:3235696,red:12790074,deepRed:6493482,gold:16763215,green:2647120,jade:5553312,brown:8012591,darkBrown:3482419,orange:14047800,white:16775657,purple:5718895,dusk:15371365},bg=[{province:"Cao B\u1EB1ng",landmark:"Th\xE1c B\u1EA3n Gi\u1ED1c",region:"north",backgroundUrl:"/assets/images/tet-runner/north-ban-gioc.webp"},{province:"Cao B\u1EB1ng",landmark:"N\xFAi M\u1EAFt Th\u1EA7n",region:"north",backgroundUrl:"/assets/images/tet-runner/north-mat-than.webp"},{province:"Tuy\xEAn Quang",landmark:"H\u1ED3 Na Hang",region:"north",backgroundUrl:"/assets/images/tet-runner/north-na-hang.webp"},{province:"Tuy\xEAn Quang",landmark:"Cao nguy\xEAn \u0111\xE1 \u0110\u1ED3ng V\u0103n",region:"north",backgroundUrl:"/assets/images/tet-runner/north-dong-van.webp"},{province:"Lai Ch\xE2u",landmark:"\u0110\xE8o \xD4 Quy H\u1ED3",region:"north",backgroundUrl:"/assets/images/tet-runner/north-o-quy-ho.webp"},{province:"Lai Ch\xE2u",landmark:"Pu Ta Leng",region:"north",backgroundUrl:"/assets/images/tet-runner/north-pu-ta-leng.webp"},{province:"L\xE0o Cai",landmark:"Fansipan",region:"north",backgroundUrl:"/assets/images/tet-runner/north-sapa.webp"},{province:"L\xE0o Cai",landmark:"M\xF9 Cang Ch\u1EA3i",region:"north",backgroundUrl:"/assets/images/tet-runner/north-mu-cang-chai.webp"},{province:"L\u1EA1ng S\u01A1n",landmark:"N\xFAi M\u1EABu S\u01A1n",region:"north",backgroundUrl:"/assets/images/tet-runner/north-mau-son.webp"},{province:"L\u1EA1ng S\u01A1n",landmark:"\u1EA2i Chi L\u0103ng",region:"north",backgroundUrl:"/assets/images/tet-runner/north-chi-lang.webp"},{province:"Th\xE1i Nguy\xEAn",landmark:"H\u1ED3 N\xFAi C\u1ED1c",region:"north",backgroundUrl:"/assets/images/tet-runner/north-nui-coc.webp"},{province:"Th\xE1i Nguy\xEAn",landmark:"H\u1ED3 Ba B\u1EC3",region:"north",backgroundUrl:"/assets/images/tet-runner/north-ba-be.webp"},{province:"\u0110i\u1EC7n Bi\xEAn",landmark:"\u0110\u1ED3i A1",region:"north",backgroundUrl:"/assets/images/tet-runner/north-doi-a1.webp"},{province:"\u0110i\u1EC7n Bi\xEAn",landmark:"H\u1ED3 P\xE1 Khoang",region:"north",backgroundUrl:"/assets/images/tet-runner/north-pa-khoang.webp"},{province:"Ph\xFA Th\u1ECD",landmark:"\u0110\u1EC1n H\xF9ng",region:"north",backgroundUrl:"/assets/images/tet-runner/north-den-hung.webp"},{province:"Ph\xFA Th\u1ECD",landmark:"Thung l\u0169ng Mai Ch\xE2u",region:"north",backgroundUrl:"/assets/images/tet-runner/north-mai-chau.webp"},{province:"B\u1EAFc Ninh",landmark:"Ch\xF9a D\xE2u",region:"north",backgroundUrl:"/assets/images/tet-runner/north-chua-dau.webp"},{province:"B\u1EAFc Ninh",landmark:"T\xE2y Y\xEAn T\u1EED",region:"north",backgroundUrl:"/assets/images/tet-runner/north-tay-yen-tu.webp"},{province:"H\xE0 N\u1ED9i",landmark:"H\u1ED3 G\u01B0\u01A1m",region:"north",backgroundUrl:"/assets/images/tet-runner/north-ho-guom.webp"},{province:"H\xE0 N\u1ED9i",landmark:"Ho\xE0ng th\xE0nh Th\u0103ng Long",region:"north",backgroundUrl:"/assets/images/tet-runner/north-thang-long.webp"},{province:"Qu\u1EA3ng Ninh",landmark:"V\u1ECBnh H\u1EA1 Long",region:"north",backgroundUrl:"/assets/images/tet-runner/north-ha-long.webp"},{province:"Qu\u1EA3ng Ninh",landmark:"Y\xEAn T\u1EED",region:"north",backgroundUrl:"/assets/images/tet-runner/north-yen-tu.webp"},{province:"S\u01A1n La",landmark:"Cao nguy\xEAn M\u1ED9c Ch\xE2u",region:"north",backgroundUrl:"/assets/images/tet-runner/north-moc-chau.webp"},{province:"S\u01A1n La",landmark:"T\xE0 X\xF9a",region:"north",backgroundUrl:"/assets/images/tet-runner/north-ta-xua.webp"},{province:"H\u1EA3i Ph\xF2ng",landmark:"Qu\u1EA7n \u0111\u1EA3o C\xE1t B\xE0",region:"north",backgroundUrl:"/assets/images/tet-runner/north-cat-ba.webp"},{province:"H\u1EA3i Ph\xF2ng",landmark:"C\xF4n S\u01A1n - Ki\u1EBFp B\u1EA1c",region:"north",backgroundUrl:"/assets/images/tet-runner/north-con-son-kiep-bac.webp"},{province:"H\u01B0ng Y\xEAn",landmark:"Ph\u1ED1 Hi\u1EBFn",region:"north",backgroundUrl:"/assets/images/tet-runner/north-pho-hien.webp"},{province:"H\u01B0ng Y\xEAn",landmark:"Ch\xF9a Keo",region:"north",backgroundUrl:"/assets/images/tet-runner/north-chua-keo.webp"},{province:"Ninh B\xECnh",landmark:"Tr\xE0ng An",region:"north",backgroundUrl:"/assets/images/tet-runner/north-trang-an.webp"},{province:"Ninh B\xECnh",landmark:"Ch\xF9a Tam Ch\xFAc",region:"north",backgroundUrl:"/assets/images/tet-runner/north-tam-chuc.webp"},{province:"Thanh H\xF3a",landmark:"Th\xE0nh Nh\xE0 H\u1ED3",region:"north",backgroundUrl:"/assets/images/tet-runner/north-thanh-nha-ho.webp"},{province:"Thanh H\xF3a",landmark:"P\xF9 Lu\xF4ng",region:"north",backgroundUrl:"/assets/images/tet-runner/north-pu-luong.webp"},{province:"Ngh\u1EC7 An",landmark:"L\xE0ng Sen",region:"central",backgroundUrl:"/assets/images/tet-runner/central-lang-sen.webp"},{province:"Ngh\u1EC7 An",landmark:"Bi\u1EC3n C\u1EEDa L\xF2",region:"central",backgroundUrl:"/assets/images/tet-runner/central-cua-lo.webp"},{province:"H\xE0 T\u0129nh",landmark:"Ng\xE3 ba \u0110\u1ED3ng L\u1ED9c",region:"central",backgroundUrl:"/assets/images/tet-runner/central-dong-loc-v2.webp"},{province:"H\xE0 T\u0129nh",landmark:"Bi\u1EC3n Thi\xEAn C\u1EA7m",region:"central",backgroundUrl:"/assets/images/tet-runner/central-thien-cam.webp"},{province:"Qu\u1EA3ng Tr\u1ECB",landmark:"Phong Nha - K\u1EBB B\xE0ng",region:"central",backgroundUrl:"/assets/images/tet-runner/central-phong-nha.webp"},{province:"Qu\u1EA3ng Tr\u1ECB",landmark:"C\u1EA7u Hi\u1EC1n L\u01B0\u01A1ng",region:"central",backgroundUrl:"/assets/images/tet-runner/central-hien-luong.webp"},{province:"Hu\u1EBF",landmark:"Kinh th\xE0nh Hu\u1EBF",region:"central",backgroundUrl:"/assets/images/tet-runner/central-hue.webp"},{province:"Hu\u1EBF",landmark:"Ph\xE1 Tam Giang",region:"central",backgroundUrl:"/assets/images/tet-runner/central-tam-giang.webp"},{province:"\u0110\xE0 N\u1EB5ng",landmark:"Qu\u1EA7n \u0111\u1EA3o Ho\xE0ng Sa",region:"central",backgroundUrl:"/assets/images/tet-runner/central-hoang-sa.webp"},{province:"\u0110\xE0 N\u1EB5ng",landmark:"C\u1EA7u R\u1ED3ng",region:"central",backgroundUrl:"/assets/images/tet-runner/central-cau-rong.webp"},{province:"\u0110\xE0 N\u1EB5ng",landmark:"Ph\u1ED1 c\u1ED5 H\u1ED9i An",region:"central",backgroundUrl:"/assets/images/tet-runner/central-hoi-an.webp"},{province:"Qu\u1EA3ng Ng\xE3i",landmark:"\u0110\u1EA3o L\xFD S\u01A1n",region:"central",backgroundUrl:"/assets/images/tet-runner/central-ly-son.webp"},{province:"Qu\u1EA3ng Ng\xE3i",landmark:"M\u0103ng \u0110en",region:"central",backgroundUrl:"/assets/images/tet-runner/central-mang-den.webp"},{province:"Gia Lai",landmark:"Bi\u1EC3n H\u1ED3",region:"central",backgroundUrl:"/assets/images/tet-runner/central-bien-ho.webp"},{province:"Gia Lai",landmark:"K\u1EF3 Co",region:"central",backgroundUrl:"/assets/images/tet-runner/central-ky-co.webp"},{province:"\u0110\u1EAFk L\u1EAFk",landmark:"Bu\xF4n \u0110\xF4n",region:"central",backgroundUrl:"/assets/images/tet-runner/central-buon-don.webp"},{province:"\u0110\u1EAFk L\u1EAFk",landmark:"G\xE0nh \u0110\xE1 \u0110\u0129a",region:"central",backgroundUrl:"/assets/images/tet-runner/central-ganh-da-dia.webp"},{province:"Kh\xE1nh H\xF2a",landmark:"V\u1ECBnh Nha Trang",region:"central",backgroundUrl:"/assets/images/tet-runner/central-nha-trang.webp"},{province:"Kh\xE1nh H\xF2a",landmark:"V\u1ECBnh V\u0129nh Hy",region:"central",backgroundUrl:"/assets/images/tet-runner/central-vinh-hy.webp"},{province:"Kh\xE1nh H\xF2a",landmark:"Qu\u1EA7n \u0111\u1EA3o Tr\u01B0\u1EDDng Sa",region:"central",backgroundUrl:"/assets/images/tet-runner/central-truong-sa.webp"},{province:"L\xE2m \u0110\u1ED3ng",landmark:"\u0110\xE0 L\u1EA1t",region:"central",backgroundUrl:"/assets/images/tet-runner/central-da-lat.webp"},{province:"L\xE2m \u0110\u1ED3ng",landmark:"M\u0169i N\xE9",region:"central",backgroundUrl:"/assets/images/tet-runner/central-mui-ne.webp"},{province:"\u0110\u1ED3ng Nai",landmark:"V\u01B0\u1EDDn qu\u1ED1c gia C\xE1t Ti\xEAn",region:"south",backgroundUrl:"/assets/images/tet-runner/south-cat-tien.webp"},{province:"\u0110\u1ED3ng Nai",landmark:"B\xF9 Gia M\u1EADp",region:"south",backgroundUrl:"/assets/images/tet-runner/south-bu-gia-map.webp"},{province:"T\xE2y Ninh",landmark:"N\xFAi B\xE0 \u0110en",region:"south",backgroundUrl:"/assets/images/tet-runner/south-nui-ba-den.webp"},{province:"T\xE2y Ninh",landmark:"L\xE0ng n\u1ED5i T\xE2n L\u1EADp",region:"south",backgroundUrl:"/assets/images/tet-runner/south-tan-lap.webp"},{province:"Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",landmark:"S\xF4ng S\xE0i G\xF2n",region:"south",backgroundUrl:"/assets/images/tet-runner/south-saigon.webp"},{province:"Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh",landmark:"C\xF4n \u0110\u1EA3o",region:"south",backgroundUrl:"/assets/images/tet-runner/south-con-dao.webp"},{province:"An Giang",landmark:"N\xFAi Sam",region:"south",backgroundUrl:"/assets/images/tet-runner/south-nui-sam.webp"},{province:"An Giang",landmark:"Ph\xFA Qu\u1ED1c",region:"south",backgroundUrl:"/assets/images/tet-runner/south-phu-quoc.webp"},{province:"\u0110\u1ED3ng Th\xE1p",landmark:"V\u01B0\u1EDDn qu\u1ED1c gia Tr\xE0m Chim",region:"south",backgroundUrl:"/assets/images/tet-runner/south-tram-chim.webp"},{province:"\u0110\u1ED3ng Th\xE1p",landmark:"Ch\u1EE3 n\u1ED5i C\xE1i B\xE8",region:"south",backgroundUrl:"/assets/images/tet-runner/south-cai-be.webp"},{province:"V\u0129nh Long",landmark:"C\u1ED3n Ph\u1EE5ng",region:"south",backgroundUrl:"/assets/images/tet-runner/south-con-phung.webp"},{province:"V\u0129nh Long",landmark:"Ao B\xE0 Om",region:"south",backgroundUrl:"/assets/images/tet-runner/south-ao-ba-om.webp"},{province:"C\u1EA7n Th\u01A1",landmark:"Ch\u1EE3 n\u1ED5i C\xE1i R\u0103ng",region:"south",backgroundUrl:"/assets/images/tet-runner/south-cai-rang.webp"},{province:"C\u1EA7n Th\u01A1",landmark:"Ch\xF9a D\u01A1i",region:"south",backgroundUrl:"/assets/images/tet-runner/south-chua-doi.webp"},{province:"C\xE0 Mau",landmark:"M\u0169i C\xE0 Mau",region:"south",backgroundUrl:"/assets/images/tet-runner/south-mui-ca-mau.webp"},{province:"C\xE0 Mau",landmark:"\u0110i\u1EC7n gi\xF3 B\u1EA1c Li\xEAu",region:"south",backgroundUrl:"/assets/images/tet-runner/south-dien-gio-bac-lieu.webp"}],Mg={"Th\xE1c B\u1EA3n Gi\u1ED1c":"Th\xE1c n\u01B0\u1EDBc nhi\u1EC1u t\u1EA7ng tr\xEAn s\xF4ng Qu\xE2y S\u01A1n, n\u1ED5i b\u1EADt gi\u1EEFa thung l\u0169ng \u0111\xE1 v\xF4i v\xE0 nh\u1EEFng c\xE1nh \u0111\u1ED3ng xanh c\u1EE7a v\xF9ng bi\xEAn Cao B\u1EB1ng.","N\xFAi M\u1EAFt Th\u1EA7n":"Ng\u1ECDn n\xFAi th\u1EE7ng \u0111\u1ED9c \u0111\xE1o \u1EDF thung l\u0169ng N\u1EB7m Tr\xE1, \u0111\u01B0\u1EE3c nh\u1EADn ra b\u1EDFi v\xF2m \u0111\xE1 tr\xF2n l\u1EDBn nh\xECn xu\u1ED1ng h\u1ED3 v\xE0 \u0111\u1ED3ng c\u1ECF r\u1ED9ng.","H\u1ED3 Na Hang":"H\u1ED3 sinh th\xE1i gi\u1EEFa n\xFAi \u0111\xE1 v\xF4i v\xE0 r\u1EEBng nguy\xEAn sinh, c\xF3 m\u1EB7t n\u01B0\u1EDBc xanh, \u0111\u1EA3o nh\u1ECF v\xE0 nh\u1EEFng b\u1EA3n l\xE0ng y\xEAn b\xECnh c\u1EE7a Tuy\xEAn Quang.","Cao nguy\xEAn \u0111\xE1 \u0110\u1ED3ng V\u0103n":"Mi\u1EC1n cao nguy\xEAn \u0111\xE1 v\xF4i h\xF9ng v\u0129, g\xECn gi\u1EEF d\u1EA5u t\xEDch \u0111\u1ECBa ch\u1EA5t l\xE2u \u0111\u1EDDi c\xF9ng v\u0103n h\xF3a \u0111\u1EB7c s\u1EAFc c\u1EE7a c\xE1c c\u1ED9ng \u0111\u1ED3ng v\xF9ng cao.","\u0110\xE8o \xD4 Quy H\u1ED3":"M\u1ED9t trong nh\u1EEFng cung \u0111\xE8o n\u1ED5i ti\u1EBFng c\u1EE7a d\xE3y Ho\xE0ng Li\xEAn S\u01A1n, u\u1ED1n qua bi\u1EC3n m\xE2y v\xE0 m\u1EDF ra t\u1EA7m nh\xECn n\xFAi cao ngo\u1EA1n m\u1EE5c.","Pu Ta Leng":"\u0110\u1EC9nh n\xFAi cao tr\xEAn 3.000 m c\u1EE7a d\xE3y Ho\xE0ng Li\xEAn S\u01A1n, h\u1EA5p d\u1EABn b\u1EDFi r\u1EEBng nguy\xEAn sinh, su\u1ED1i \u0111\xE1 v\xE0 m\xF9a hoa \u0111\u1ED7 quy\xEAn.",Fansipan:"N\xF3c nh\xE0 \u0110\xF4ng D\u01B0\u01A1ng cao 3.143 m, bi\u1EC3u t\u01B0\u1EE3ng c\u1EE7a d\xE3y Ho\xE0ng Li\xEAn S\u01A1n v\u1EDBi bi\u1EC3n m\xE2y v\xE0 qu\u1EA7n th\u1EC3 t\xE2m linh tr\xEAn \u0111\u1EC9nh.","M\xF9 Cang Ch\u1EA3i":"V\xF9ng ru\u1ED9ng b\u1EADc thang \xF4m theo s\u01B0\u1EDDn n\xFAi, r\u1EF1c r\u1EE1 nh\u1EA5t v\xE0o m\xF9a n\u01B0\u1EDBc \u0111\u1ED5 v\xE0 m\xF9a l\xFAa ch\xEDn c\u1EE7a mi\u1EC1n T\xE2y B\u1EAFc.","N\xFAi M\u1EABu S\u01A1n":"V\xF9ng n\xFAi cao kh\xED h\u1EADu m\xE1t l\u1EA1nh, th\u01B0\u1EDDng ph\u1EE7 s\u01B0\u01A1ng v\xE0 c\xF2n l\u01B0u d\u1EA5u nh\u1EEFng bi\u1EC7t th\u1EF1 \u0111\xE1 c\u1ED5 gi\u1EEFa r\u1EEBng n\xFAi L\u1EA1ng S\u01A1n.","\u1EA2i Chi L\u0103ng":"Thung l\u0169ng hi\u1EC3m y\u1EBFu g\u1EAFn v\u1EDBi nhi\u1EC1u chi\u1EBFn c\xF4ng gi\u1EEF n\u01B0\u1EDBc, \u0111\u01B0\u1EE3c bao b\u1ECDc b\u1EDFi c\xE1c d\xE3y n\xFAi \u0111\xE1 v\xE0 d\xF2ng s\xF4ng Th\u01B0\u01A1ng.","H\u1ED3 N\xFAi C\u1ED1c":"H\u1ED3 n\u01B0\u1EDBc r\u1ED9ng v\u1EDBi nhi\u1EC1u \u0111\u1EA3o xanh, g\u1EAFn v\u1EDBi huy\u1EC1n tho\u1EA1i n\xE0ng C\xF4ng ch\xE0ng C\u1ED1c v\xE0 c\u1EA3nh quan trung du Th\xE1i Nguy\xEAn.","H\u1ED3 Ba B\u1EC3":"H\u1ED3 n\u01B0\u1EDBc ng\u1ECDt t\u1EF1 nhi\xEAn gi\u1EEFa V\u01B0\u1EDDn qu\u1ED1c gia Ba B\u1EC3, \u0111\u01B0\u1EE3c bao quanh b\u1EDFi n\xFAi \u0111\xE1 v\xF4i, hang \u0111\u1ED9ng v\xE0 r\u1EEBng gi\xE0.","\u0110\u1ED3i A1":"Di t\xEDch tr\u1ECDng \u0111i\u1EC3m c\u1EE7a Chi\u1EBFn d\u1ECBch \u0110i\u1EC7n Bi\xEAn Ph\u1EE7, n\u01A1i c\xF2n l\u01B0u gi\u1EEF h\u1EC7 th\u1ED1ng giao th\xF4ng h\xE0o v\xE0 d\u1EA5u t\xEDch tr\u1EADn \u0111\u1ECBa l\u1ECBch s\u1EED.","H\u1ED3 P\xE1 Khoang":"H\u1ED3 n\u01B0\u1EDBc trong v\xF9ng M\u01B0\u1EDDng Ph\u0103ng, n\u1ED5i b\u1EADt v\u1EDBi nh\u1EEFng b\xE1n \u0111\u1EA3o nh\u1ECF, r\u1EEBng xanh v\xE0 m\xE0n s\u01B0\u01A1ng \u0111\u1EB7c tr\u01B0ng c\u1EE7a \u0110i\u1EC7n Bi\xEAn.","\u0110\u1EC1n H\xF9ng":"Qu\u1EA7n th\u1EC3 \u0111\u1EC1n tr\xEAn n\xFAi Ngh\u0129a L\u0129nh, n\u01A1i ng\u01B0\u1EDDi Vi\u1EC7t t\u01B0\u1EDFng nh\u1EDB c\xE1c Vua H\xF9ng v\xE0 c\u1ED9i ngu\u1ED3n d\u1EF1ng n\u01B0\u1EDBc.","Thung l\u0169ng Mai Ch\xE2u":"Thung l\u0169ng ru\u1ED9ng l\xFAa d\u01B0\u1EDBi ch\xE2n n\xFAi, n\u1ED5i ti\u1EBFng v\u1EDBi nh\xE0 s\xE0n, ngh\u1EC1 d\u1EC7t v\xE0 \u0111\u1EDDi s\u1ED1ng v\u0103n h\xF3a c\u1EE7a ng\u01B0\u1EDDi Th\xE1i.","Ch\xF9a D\xE2u":"Trung t\xE2m Ph\u1EADt gi\xE1o c\u1ED5 c\u1EE7a v\xF9ng Luy L\xE2u, n\u1ED5i b\u1EADt v\u1EDBi th\xE1p H\xF2a Phong b\u1EB1ng g\u1EA1ch v\xE0 ki\u1EBFn tr\xFAc ch\xF9a B\u1EAFc B\u1ED9.","T\xE2y Y\xEAn T\u1EED":"S\u01B0\u1EDDn ph\xEDa t\xE2y c\u1EE7a d\xE3y Y\xEAn T\u1EED, n\u01A1i con \u0111\u01B0\u1EDDng h\xE0nh h\u01B0\u01A1ng k\u1EBFt n\u1ED1i nh\u1EEFng ng\xF4i ch\xF9a gi\u1EEFa r\u1EEBng n\xFAi v\xE0 bi\u1EC3n m\xE2y.","H\u1ED3 G\u01B0\u01A1m":"Tr\xE1i tim l\u1ECBch s\u1EED c\u1EE7a H\xE0 N\u1ED9i, g\u1EAFn v\u1EDBi truy\u1EC1n thuy\u1EBFt tr\u1EA3 g\u01B0\u01A1m v\xE0 nh\u1EEFng bi\u1EC3u t\u01B0\u1EE3ng quen thu\u1ED9c nh\u01B0 Th\xE1p R\xF9a, c\u1EA7u Th\xEA H\xFAc.","Ho\xE0ng th\xE0nh Th\u0103ng Long":"Di s\u1EA3n ghi d\u1EA5u h\u01A1n m\u1ED9t thi\xEAn ni\xEAn k\u1EF7 l\u1ECBch s\u1EED kinh \u0111\xF4, v\u1EDBi \u0110oan M\xF4n, n\u1EC1n \u0111i\u1EC7n K\xEDnh Thi\xEAn v\xE0 nhi\u1EC1u t\u1EA7ng kh\u1EA3o c\u1ED5.","V\u1ECBnh H\u1EA1 Long":"Di s\u1EA3n thi\xEAn nhi\xEAn th\u1EBF gi\u1EDBi v\u1EDBi h\xE0ng ngh\xECn \u0111\u1EA3o \u0111\xE1 v\xF4i, hang \u0111\u1ED9ng v\xE0 m\u1EB7t v\u1ECBnh xanh t\u1EA1o n\xEAn c\u1EA3nh quan \u0111\u1EB7c h\u1EEFu.","Y\xEAn T\u1EED":"Trung t\xE2m Ph\u1EADt gi\xE1o Tr\xFAc L\xE2m tr\xEAn d\xE3y n\xFAi linh thi\xEAng, c\xF3 h\u1EC7 th\u1ED1ng ch\xF9a th\xE1p tr\u1EA3i t\u1EEB ch\xE2n n\xFAi t\u1EDBi \u0111\u1EC9nh \u0110\u1ED3ng.","Cao nguy\xEAn M\u1ED9c Ch\xE2u":"Cao nguy\xEAn m\xE1t l\xE0nh n\u1ED5i ti\u1EBFng v\u1EDBi \u0111\u1ED3i ch\xE8, \u0111\u1ED3ng c\u1ECF c\xF9ng m\xF9a hoa m\u1EADn v\xE0 hoa c\u1EA3i ph\u1EE7 kh\u1EAFp thung l\u0169ng.","T\xE0 X\xF9a":"V\xF9ng n\xFAi s\u0103n m\xE2y n\u1ED5i ti\u1EBFng v\u1EDBi s\u1ED1ng l\u01B0ng kh\u1EE7ng long, n\u01A1i nh\u1EEFng d\xE3y n\xFAi h\u1EB9p v\u01B0\u01A1n l\xEAn gi\u1EEFa bi\u1EC3n m\xE2y T\xE2y B\u1EAFc.","Qu\u1EA7n \u0111\u1EA3o C\xE1t B\xE0":"Qu\u1EA7n \u0111\u1EA3o \u0111\xE1 v\xF4i xanh gi\u1EEFa v\u1ECBnh Lan H\u1EA1, h\u1ED9i t\u1EE5 b\xE3i t\u1EAFm, r\u1EEBng qu\u1ED1c gia v\xE0 h\u1EC7 sinh th\xE1i bi\u1EC3n phong ph\xFA.","C\xF4n S\u01A1n - Ki\u1EBFp B\u1EA1c":"Qu\u1EA7n th\u1EC3 di t\xEDch g\u1EAFn v\u1EDBi Nguy\u1EC5n Tr\xE3i v\xE0 Tr\u1EA7n H\u01B0ng \u0110\u1EA1o, n\u1EB1m gi\u1EEFa n\xFAi r\u1EEBng, su\u1ED1i \u0111\xE1 v\xE0 nh\u1EEFng m\xE1i \u0111\u1EC1n c\u1ED5.","Ph\u1ED1 Hi\u1EBFn":"Th\u01B0\u01A1ng c\u1EA3ng c\u1ED5 t\u1EEBng h\u01B0ng th\u1ECBnh b\xEAn s\xF4ng H\u1ED3ng, c\xF2n l\u01B0u l\u1EA1i \u0111\xECnh, \u0111\u1EC1n, ch\xF9a v\xE0 d\u1EA5u \u1EA5n giao th\u01B0\u01A1ng nhi\u1EC1u n\u1EC1n v\u0103n h\xF3a.","Ch\xF9a Keo":"Ng\xF4i ch\xF9a c\u1ED5 n\u1ED5i b\u1EADt b\u1EDFi ngh\u1EC7 thu\u1EADt ch\u1EA1m kh\u1EAFc g\u1ED7 v\xE0 g\xE1c chu\xF4ng nhi\u1EC1u t\u1EA7ng, m\u1ED9t d\u1EA5u \u1EA5n ki\u1EBFn tr\xFAc \u0111\u1ED3ng b\u1EB1ng B\u1EAFc B\u1ED9.","Tr\xE0ng An":"Qu\u1EA7n th\u1EC3 danh th\u1EAFng n\u01A1i thuy\u1EC1n \u0111i qua s\xF4ng, hang xuy\xEAn th\u1EE7y v\xE0 thung l\u0169ng \u0111\xE1 v\xF4i, thu\u1ED9c Di s\u1EA3n th\u1EBF gi\u1EDBi Tr\xE0ng An.","Ch\xF9a Tam Ch\xFAc":"Qu\u1EA7n th\u1EC3 ch\xF9a b\xEAn h\u1ED3 r\u1ED9ng v\xE0 n\xFAi \u0111\xE1 v\xF4i, t\u1EA1o n\xEAn kh\xF4ng gian t\xE2m linh kho\xE1ng \u0111\u1EA1t gi\u1EEFa c\u1EA3nh quan H\xE0 Nam.","Th\xE0nh Nh\xE0 H\u1ED3":"T\xF2a th\xE0nh \u0111\xE1 th\u1EBF k\u1EF7 XIV v\u1EDBi nh\u1EEFng c\u1ED5ng v\xF2m gh\xE9p t\u1EEB kh\u1ED1i \u0111\xE1 l\u1EDBn, \u0111\u01B0\u1EE3c UNESCO c\xF4ng nh\u1EADn l\xE0 Di s\u1EA3n th\u1EBF gi\u1EDBi.","P\xF9 Lu\xF4ng":"Khu b\u1EA3o t\u1ED3n thi\xEAn nhi\xEAn n\u1ED5i ti\u1EBFng v\u1EDBi ru\u1ED9ng b\u1EADc thang, n\xFAi \u0111\xE1 v\xF4i v\xE0 nh\u1EEFng b\u1EA3n nh\xE0 s\xE0n c\u1EE7a ng\u01B0\u1EDDi Th\xE1i, ng\u01B0\u1EDDi M\u01B0\u1EDDng.","L\xE0ng Sen":"Qu\xEA n\u1ED9i Ch\u1EE7 t\u1ECBch H\u1ED3 Ch\xED Minh, l\u01B0u gi\u1EEF m\xE1i nh\xE0 tranh, h\xE0ng tre, ao sen v\xE0 kh\xF4ng gian l\xE0ng qu\xEA x\u1EE9 Ngh\u1EC7.","Bi\u1EC3n C\u1EEDa L\xF2":"B\xE3i bi\u1EC3n d\xE0i, c\xE1t m\u1ECBn v\xE0 tho\u1EA3i, nh\xECn ra \u0111\u1EA3o H\xF2n Ng\u01B0 v\xE0 l\xE0 \u0111i\u1EC3m ngh\u1EC9 bi\u1EC3n quen thu\u1ED9c c\u1EE7a v\xF9ng B\u1EAFc Trung B\u1ED9.","Ng\xE3 ba \u0110\u1ED3ng L\u1ED9c":"Di t\xEDch t\u01B0\u1EDFng ni\u1EC7m m\u01B0\u1EDDi n\u1EEF thanh ni\xEAn xung phong, bi\u1EC3u t\u01B0\u1EE3ng c\u1EE7a l\xF2ng qu\u1EA3 c\u1EA3m tr\xEAn tuy\u1EBFn \u0111\u01B0\u1EDDng Tr\u01B0\u1EDDng S\u01A1n.","Bi\u1EC3n Thi\xEAn C\u1EA7m":"B\xE3i bi\u1EC3n h\xECnh c\xE1nh cung v\u1EDBi n\u01B0\u1EDBc trong, c\xE1t s\xE1ng v\xE0 n\xFAi Thi\xEAn C\u1EA7m t\u1EA1o n\xEAn \u0111\u01B0\u1EDDng b\u1EDD bi\u1EC3n y\xEAn b\xECnh.","Phong Nha - K\u1EBB B\xE0ng":"Di s\u1EA3n thi\xEAn nhi\xEAn th\u1EBF gi\u1EDBi n\u1ED5i ti\u1EBFng v\u1EDBi \u0111\u1ECBa h\xECnh karst c\u1ED5, s\xF4ng ng\u1EA7m v\xE0 h\u1EC7 th\u1ED1ng hang \u0111\u1ED9ng quy m\xF4 l\u1EDBn.","C\u1EA7u Hi\u1EC1n L\u01B0\u01A1ng":"C\xE2y c\u1EA7u l\u1ECBch s\u1EED b\u1EAFc qua s\xF4ng B\u1EBFn H\u1EA3i, g\u1EAFn v\u1EDBi gi\u1EDBi tuy\u1EBFn qu\xE2n s\u1EF1 t\u1EA1m th\u1EDDi v\xE0 kh\xE1t v\u1ECDng th\u1ED1ng nh\u1EA5t \u0111\u1EA5t n\u01B0\u1EDBc.","Kinh th\xE0nh Hu\u1EBF":"Trung t\xE2m c\u1EE7a Qu\u1EA7n th\u1EC3 di t\xEDch C\u1ED1 \u0111\xF4 Hu\u1EBF, quy t\u1EE5 Ho\xE0ng th\xE0nh, cung \u0111i\u1EC7n, c\u1ED5ng th\xE0nh v\xE0 ki\u1EBFn tr\xFAc tri\u1EC1u Nguy\u1EC5n.","Ph\xE1 Tam Giang":"\u0110\u1EA7m ph\xE1 r\u1ED9ng l\u1EDBn v\u1EDBi l\xE0ng ch\xE0i, n\xF2 s\xE1o v\xE0 m\u1EB7t n\u01B0\u1EDBc \u0111\u1ED5i m\xE0u theo \xE1nh s\xE1ng, ti\xEAu bi\u1EC3u cho v\u1EBB \u0111\u1EB9p s\xF4ng n\u01B0\u1EDBc x\u1EE9 Hu\u1EBF.","Qu\u1EA7n \u0111\u1EA3o Ho\xE0ng Sa":"Qu\u1EA7n \u0111\u1EA3o san h\xF4 c\u1EE7a Vi\u1EC7t Nam gi\u1EEFa Bi\u1EC3n \u0110\xF4ng, hi\u1EC7n l\xE0 \u0111\u1EB7c khu h\xE0nh ch\xEDnh thu\u1ED9c th\xE0nh ph\u1ED1 \u0110\xE0 N\u1EB5ng.","C\u1EA7u R\u1ED3ng":"C\xE2y c\u1EA7u mang h\xECnh r\u1ED3ng b\u1EAFc qua s\xF4ng H\xE0n, n\u1ED5i b\u1EADt v\u1EDBi m\xE0n phun l\u1EEDa, phun n\u01B0\u1EDBc v\xE0 \xE1nh s\xE1ng v\u1EC1 \u0111\xEAm.","Ph\u1ED1 c\u1ED5 H\u1ED9i An":"\u0110\xF4 th\u1ECB th\u01B0\u01A1ng c\u1EA3ng c\u1ED5 b\xEAn s\xF4ng Ho\xE0i, n\u1ED5i ti\u1EBFng v\u1EDBi nh\xE0 m\xE1i ng\xF3i, h\u1ED9i qu\xE1n, Ch\xF9a C\u1EA7u v\xE0 \u0111\xE8n l\u1ED3ng.","\u0110\u1EA3o L\xFD S\u01A1n":"\u0110\u1EA3o ti\u1EC1n ti\xEAu h\xECnh th\xE0nh t\u1EEB n\xFAi l\u1EEDa, c\xF3 v\xE1ch \u0111\xE1, mi\u1EC7ng n\xFAi c\u1ED5, ru\u1ED9ng t\u1ECFi v\xE0 l\xE0n n\u01B0\u1EDBc trong xanh.","M\u0103ng \u0110en":"Cao nguy\xEAn m\xE1t m\u1EBB gi\u1EEFa r\u1EEBng th\xF4ng, h\u1ED3 v\xE0 th\xE1c n\u01B0\u1EDBc, mang v\u1EBB y\xEAn t\u0129nh \u0111\u1EB7c tr\u01B0ng c\u1EE7a v\xF9ng n\xFAi Kon Tum.","Bi\u1EC3n H\u1ED3":"H\u1ED3 T\u2019N\u01B0ng n\u1EB1m trong mi\u1EC7ng n\xFAi l\u1EEDa c\u1ED5, c\xF3 m\u1EB7t n\u01B0\u1EDBc xanh s\xE2u v\xE0 r\u1EEBng th\xF4ng bao quanh gi\u1EEFa cao nguy\xEAn Pleiku.","K\u1EF3 Co":"V\u1ECBnh nh\u1ECF t\u1EF1a l\u01B0ng v\xE0o n\xFAi \u0111\xE1, n\u1ED5i b\u1EADt v\u1EDBi b\xE3i c\xE1t cong v\xE0 l\xE0n n\u01B0\u1EDBc chuy\u1EC3n nhi\u1EC1u s\u1EAFc xanh.","Bu\xF4n \u0110\xF4n":"V\xF9ng \u0111\u1EA5t b\xEAn s\xF4ng S\xEAr\xEAp\u1ED1k n\u1ED5i ti\u1EBFng v\u1EDBi c\u1EA7u treo, nh\xE0 s\xE0n v\xE0 v\u0103n h\xF3a l\xE2u \u0111\u1EDDi c\u1EE7a c\xE1c c\u1ED9ng \u0111\u1ED3ng T\xE2y Nguy\xEAn.","G\xE0nh \u0110\xE1 \u0110\u0129a":"B\u1EDD bi\u1EC3n v\u1EDBi h\xE0ng ngh\xECn c\u1ED9t \u0111\xE1 bazan x\u1EBFp kh\xEDt nh\u01B0 ch\u1ED3ng \u0111\u0129a, h\xECnh th\xE0nh t\u1EEB ho\u1EA1t \u0111\u1ED9ng n\xFAi l\u1EEDa c\u1ED5.","V\u1ECBnh Nha Trang":"V\u1ECBnh bi\u1EC3n \xF4m l\u1EA5y th\xE0nh ph\u1ED1 Nha Trang, c\xF3 b\xE3i c\xE1t d\xE0i, nhi\u1EC1u \u0111\u1EA3o v\xE0 h\u1EC7 sinh th\xE1i san h\xF4 phong ph\xFA.","V\u1ECBnh V\u0129nh Hy":"V\u1ECBnh nh\u1ECF \u0111\u01B0\u1EE3c n\xFAi \u0111\xE1 che ch\u1EAFn, n\u1ED5i b\u1EADt v\u1EDBi n\u01B0\u1EDBc xanh trong, r\u1EA1n san h\xF4 v\xE0 cung \u0111\u01B0\u1EDDng ven bi\u1EC3n ngo\u1EA1n m\u1EE5c.","Qu\u1EA7n \u0111\u1EA3o Tr\u01B0\u1EDDng Sa":"Qu\u1EA7n \u0111\u1EA3o c\u1EE7a Vi\u1EC7t Nam gi\u1EEFa Bi\u1EC3n \u0110\xF4ng, l\xE0 \u0111\u1EB7c khu h\xE0nh ch\xEDnh thu\u1ED9c t\u1EC9nh Kh\xE1nh H\xF2a v\u1EDBi nhi\u1EC1u \u0111\u1EA3o v\xE0 r\u1EA1n san h\xF4.","\u0110\xE0 L\u1EA1t":"Th\xE0nh ph\u1ED1 cao nguy\xEAn c\u1EE7a r\u1EEBng th\xF4ng, h\u1ED3 n\u01B0\u1EDBc v\xE0 ki\u1EBFn tr\xFAc ngh\u1EC9 d\u01B0\u1EE1ng, n\u1ED5i ti\u1EBFng v\u1EDBi kh\xED h\u1EADu m\xE1t c\xF9ng nhi\u1EC1u m\xF9a hoa.","M\u0169i N\xE9":"V\xF9ng bi\u1EC3n n\u1ED5i b\u1EADt v\u1EDBi \u0111\u1ED3i c\xE1t \u0111\u1ECF, \u0111\u1ED3i c\xE1t tr\u1EAFng, l\xE0ng ch\xE0i v\xE0 \u0111\u01B0\u1EDDng b\u1EDD \u0111\u1EA7y n\u1EAFng gi\xF3 c\u1EE7a B\xECnh Thu\u1EADn.","V\u01B0\u1EDDn qu\u1ED1c gia C\xE1t Ti\xEAn":"Khu r\u1EEBng nhi\u1EC7t \u0111\u1EDBi v\xE0 v\xF9ng \u0111\u1EA5t ng\u1EADp n\u01B0\u1EDBc gi\xE0u \u0111a d\u1EA1ng sinh h\u1ECDc, n\u01A1i c\u01B0 tr\xFA c\u1EE7a nhi\u1EC1u lo\xE0i \u0111\u1ED9ng th\u1EF1c v\u1EADt qu\xFD.","B\xF9 Gia M\u1EADp":"V\u01B0\u1EDDn qu\u1ED1c gia b\u1EA3o t\u1ED3n r\u1EEBng th\u01B0\u1EDDng xanh, su\u1ED1i th\xE1c v\xE0 h\u1EC7 sinh th\xE1i \u0111\u1EB7c tr\u01B0ng \u1EDF khu v\u1EF1c chuy\u1EC3n ti\u1EBFp T\xE2y Nguy\xEAn\u2013\u0110\xF4ng Nam B\u1ED9.","N\xFAi B\xE0 \u0110en":"Ng\u1ECDn n\xFAi cao n\u1ED5i b\u1EADt gi\u1EEFa \u0111\u1ED3ng b\u1EB1ng T\xE2y Ninh, g\u1EAFn v\u1EDBi h\u1EC7 th\u1ED1ng ch\xF9a, h\xE0nh h\u01B0\u01A1ng v\xE0 t\u1EA7m nh\xECn r\u1ED9ng kh\u1EAFp Nam B\u1ED9.","L\xE0ng n\u1ED5i T\xE2n L\u1EADp":"Kh\xF4ng gian r\u1EEBng tr\xE0m ng\u1EADp n\u01B0\u1EDBc v\u1EDBi con \u0111\u01B0\u1EDDng xuy\xEAn r\u1EEBng v\xE0 k\xEAnh r\u1EA1ch \u0111an xen, ti\xEAu bi\u1EC3u cho v\xF9ng \u0110\u1ED3ng Th\xE1p M\u01B0\u1EDDi.","S\xF4ng S\xE0i G\xF2n":"D\xF2ng s\xF4ng g\u1EAFn v\u1EDBi l\u1ECBch s\u1EED v\xE0 nh\u1ECBp s\u1ED1ng Th\xE0nh ph\u1ED1 H\u1ED3 Ch\xED Minh, ph\u1EA3n chi\u1EBFu b\u1EBFn c\u1EA3ng c\xF9ng \u0111\u01B0\u1EDDng ch\xE2n tr\u1EDDi hi\u1EC7n \u0111\u1EA1i.","C\xF4n \u0110\u1EA3o":"Qu\u1EA7n \u0111\u1EA3o k\u1EBFt h\u1EE3p di t\xEDch l\u1ECBch s\u1EED v\u1EDBi r\u1EEBng, b\xE3i bi\u1EC3n v\xE0 h\u1EC7 sinh th\xE1i bi\u1EC3n, l\xE0 n\u01A1i r\xF9a bi\u1EC3n v\u1EC1 l\xE0m t\u1ED5.","N\xFAi Sam":"Ng\u1ECDn n\xFAi t\xE2m linh c\u1EE7a v\xF9ng Ch\xE2u \u0110\u1ED1c, t\u1EADp trung nhi\u1EC1u \u0111\u1EC1n ch\xF9a v\xE0 nh\xECn ra c\xE1nh \u0111\u1ED3ng r\u1ED9ng s\xE1t bi\xEAn gi\u1EDBi.","Ph\xFA Qu\u1ED1c":"\u0110\u1EA3o l\u1EDBn n\u1ED5i ti\u1EBFng v\u1EDBi b\xE3i bi\u1EC3n, r\u1EEBng qu\u1ED1c gia, l\xE0ng ch\xE0i v\xE0 m\u1EB7t n\u01B0\u1EDBc trong xanh c\u1EE7a v\u1ECBnh Th\xE1i Lan.","V\u01B0\u1EDDn qu\u1ED1c gia Tr\xE0m Chim":"V\xF9ng \u0111\u1EA5t ng\u1EADp n\u01B0\u1EDBc Ramsar b\u1EA3o t\u1ED3n h\u1EC7 sinh th\xE1i \u0110\u1ED3ng Th\xE1p M\u01B0\u1EDDi, \u0111\u1EB7c bi\u1EC7t n\u1ED5i ti\u1EBFng v\u1EDBi lo\xE0i s\u1EBFu \u0111\u1EA7u \u0111\u1ECF.","Ch\u1EE3 n\u1ED5i C\xE1i B\xE8":"Kh\xF4ng gian giao th\u01B0\u01A1ng tr\xEAn s\xF4ng Ti\u1EC1n, n\u01A1i ghe thuy\u1EC1n ch\u1EDF tr\xE1i c\xE2y v\xE0 n\xF4ng s\u1EA3n t\u1EA1o n\xEAn nh\u1ECBp s\u1ED1ng mi\u1EC1n T\xE2y.","C\u1ED3n Ph\u1EE5ng":"C\xF9 lao xanh gi\u1EEFa s\xF4ng Ti\u1EC1n v\u1EDBi v\u01B0\u1EDDn d\u1EEBa, k\xEAnh r\u1EA1ch, ngh\u1EC1 th\u1EE7 c\xF4ng v\xE0 kh\xF4ng gian mi\u1EC7t v\u01B0\u1EDDn B\u1EBFn Tre.","Ao B\xE0 Om":"H\u1ED3 c\u1ED5 c\u1EE7a c\u1ED9ng \u0111\u1ED3ng Khmer, \u0111\u01B0\u1EE3c bao quanh b\u1EDFi nh\u1EEFng c\xE2y d\u1EA7u c\u1ED5 th\u1EE5 c\xF3 b\u1ED9 r\u1EC5 n\u1ED5i v\xE0 qu\u1EA7n th\u1EC3 ch\xF9a \xC2ng.","Ch\u1EE3 n\u1ED5i C\xE1i R\u0103ng":"Ch\u1EE3 \u0111\u1EA7u m\u1ED1i tr\xEAn s\xF4ng C\u1EA7n Th\u01A1, n\u01A1i ghe l\u1EDBn treo n\xF4ng s\u1EA3n tr\xEAn c\xE2y b\u1EB9o v\xE0 h\u1ECDp nh\u1ED9n nh\u1ECBp t\u1EEB s\xE1ng s\u1EDBm.","Ch\xF9a D\u01A1i":"Ng\xF4i ch\xF9a Khmer \u0111\u1EB7c s\u1EAFc \u1EDF S\xF3c Tr\u0103ng, n\u1ED5i b\u1EADt v\u1EDBi m\xE1i ch\u1EA1m tr\u1ED5 r\u1EF1c r\u1EE1 v\xE0 \u0111\xE0n d\u01A1i qu\u1EA1 s\u1ED1ng trong khu\xF4n vi\xEAn.","M\u0169i C\xE0 Mau":"\u0110i\u1EC3m c\u1EF1c Nam tr\xEAn \u0111\u1EA5t li\u1EC1n Vi\u1EC7t Nam, n\u01A1i r\u1EEBng ng\u1EADp m\u1EB7n v\u01B0\u01A1n ra bi\u1EC3n v\xE0 ph\xF9 sa ti\u1EBFp t\u1EE5c b\u1ED3i \u0111\u1EAFp b\u1EDD c\xF5i.","\u0110i\u1EC7n gi\xF3 B\u1EA1c Li\xEAu":"C\xE1nh \u0111\u1ED3ng tua-bin ngo\xE0i b\xE3i b\u1ED3i ven bi\u1EC3n, t\u1EA1o n\xEAn n\xE9t giao thoa gi\u1EEFa n\u0103ng l\u01B0\u1EE3ng s\u1EA1ch v\xE0 c\u1EA3nh quan Nam B\u1ED9."},Tg={"Th\xE1c B\u1EA3n Gi\u1ED1c":{significance:"C\u1EA3nh quan th\xE1c nhi\u1EC1u t\u1EA7ng gi\u1EEFa \u0111\u1ECBa h\xECnh karst v\xE0 \u0111\u1ED3ng ru\u1ED9ng t\u1EA1o n\xEAn m\u1ED9t bi\u1EC3u t\u01B0\u1EE3ng du l\u1ECBch v\xF9ng bi\xEAn \u0110\xF4ng B\u1EAFc.",history:"D\xF2ng Qu\xE2y S\u01A1n v\xE0 kh\xF4ng gian bi\xEAn gi\u1EDBi khi\u1EBFn B\u1EA3n Gi\u1ED1c v\u1EEBa c\xF3 gi\xE1 tr\u1ECB c\u1EA3nh quan, v\u1EEBa g\u1EAFn v\u1EDBi \u0111\u1EDDi s\u1ED1ng l\xE2u \u0111\u1EDDi c\u1EE7a c\u1ED9ng \u0111\u1ED3ng T\xE0y, N\xF9ng.",sourceLabel:"C\u1ED5ng du l\u1ECBch qu\u1ED1c gia Vi\u1EC7t Nam",sourceUrl:"https://vietnamtourism.gov.vn/"},"N\xFAi M\u1EAFt Th\u1EA7n":{significance:"L\u1ED7 th\u1EE7ng t\u1EF1 nhi\xEAn xuy\xEAn qua kh\u1ED1i n\xFAi \u0111\xE1 v\xF4i l\xE0 d\u1EA1ng \u0111\u1ECBa m\u1EA1o hi\u1EBFm, n\u1EB1m trong C\xF4ng vi\xEAn \u0111\u1ECBa ch\u1EA5t to\xE0n c\u1EA7u UNESCO Non n\u01B0\u1EDBc Cao B\u1EB1ng.",history:"\u0110\u1ECBa danh c\xF2n \u0111\u01B0\u1EE3c g\u1ECDi l\xE0 n\xFAi Th\u1EE7ng; c\u1EA3nh quan N\u1EB7m Tr\xE1 xung quanh g\u1EAFn v\u1EDBi sinh ho\u1EA1t n\xF4ng nghi\u1EC7p v\xE0 v\u0103n h\xF3a b\u1EA3n \u0111\u1ECBa.",sourceLabel:"C\u1EE5c Du l\u1ECBch Qu\u1ED1c gia Vi\u1EC7t Nam",sourceUrl:"https://dantoc.vietnamtourism.gov.vn/nui-mat-than-cao-bang-ve-dep-dieu-ky-cua-tao-hoa/"},"H\u1ED3 Na Hang":{significance:"M\u1EB7t h\u1ED3, n\xFAi \u0111\xE1 v\xF4i v\xE0 r\u1EEBng nguy\xEAn sinh t\u1EA1o th\xE0nh kh\xF4ng gian sinh th\xE1i ti\xEAu bi\u1EC3u c\u1EE7a v\xF9ng th\u01B0\u1EE3ng ngu\u1ED3n s\xF4ng G\xE2m.",history:"Khu v\u1EF1c Na Hang \u2013 L\xE2m B\xECnh l\u01B0u gi\u1EEF nhi\u1EC1u truy\u1EC1n thuy\u1EBFt, l\u1EC5 h\u1ED9i v\xE0 b\u1EA3n s\u1EAFc c\u1EE7a c\xE1c d\xE2n t\u1ED9c T\xE0y, Dao, M\xF4ng.",sourceLabel:"C\u1ED5ng th\xF4ng tin \u0111\u1ED1i ngo\u1EA1i Tuy\xEAn Quang",sourceUrl:"https://doingoai.tuyenquang.gov.vn/vi/post/suc-song-tu-du-lich-xanh?id=209752&type=NEWS"},"Cao nguy\xEAn \u0111\xE1 \u0110\u1ED3ng V\u0103n":{significance:"C\xF4ng vi\xEAn \u0111\u1ECBa ch\u1EA5t to\xE0n c\u1EA7u UNESCO ghi l\u1EA1i l\u1ECBch s\u1EED ti\u1EBFn h\xF3a \u0111\u1ECBa ch\u1EA5t h\xE0ng tr\u0103m tri\u1EC7u n\u0103m v\xE0 c\xF3 \u0111a d\u1EA1ng sinh h\u1ECDc, v\u0103n h\xF3a n\u1ED5i b\u1EADt.",history:"Nh\u1EEFng th\u1ECB tr\u1EA5n, dinh th\u1EF1, ch\u1EE3 phi\xEAn v\xE0 n\u1EBFp s\u1ED1ng tr\xEAn \u0111\xE1 ph\u1EA3n \xE1nh qu\xE1 tr\xECnh c\u01B0 tr\xFA b\u1EC1n b\u1EC9 c\u1EE7a nhi\u1EC1u c\u1ED9ng \u0111\u1ED3ng v\xF9ng cao.",sourceLabel:"C\u1ED5ng th\xF4ng tin \u0111\u1ED1i ngo\u1EA1i Tuy\xEAn Quang",sourceUrl:"https://doingoai.tuyenquang.gov.vn/vi/post/suc-song-tu-du-lich-xanh?id=209752&type=NEWS"},"\u0110\xE8o \xD4 Quy H\u1ED3":{significance:"Cung \u0111\xE8o v\u01B0\u1EE3t d\xE3y Ho\xE0ng Li\xEAn S\u01A1n m\u1EDF ra c\u1EA3nh quan n\xFAi cao, thung l\u0169ng v\xE0 bi\u1EC3n m\xE2y \u0111\u1EB7c tr\u01B0ng c\u1EE7a T\xE2y B\u1EAFc.",history:"T\xEAn \xD4 Quy H\u1ED3 g\u1EAFn v\u1EDBi truy\u1EC1n thuy\u1EBFt d\xE2n gian \u0111\u1ECBa ph\u01B0\u01A1ng; con \u0111\xE8o l\xE2u nay l\xE0 tuy\u1EBFn k\u1EBFt n\u1ED1i quan tr\u1ECDng gi\u1EEFa Lai Ch\xE2u v\xE0 L\xE0o Cai.",sourceLabel:"S\u1EDF V\u0103n h\xF3a, Th\u1EC3 thao v\xE0 Du l\u1ECBch Lai Ch\xE2u",sourceUrl:"https://svhttdl.laichau.gov.vn/du-lich/lay-y-kien-cong-dong-dan-cu-xa-ta-leng-hoan-thien-do-an-quy-hoach-chung-khu-du-lich-quoc-gia-o-quy-ho2.html"},"Pu Ta Leng":{significance:"\u0110\u1EC9nh n\xFAi cao 3.049 m c\xF9ng r\u1EEBng nguy\xEAn sinh v\xE0 qu\u1EA7n th\u1EC3 \u0111\u1ED7 quy\xEAn l\xE0 t\xE0i nguy\xEAn n\u1ED5i b\u1EADt c\u1EE7a d\xE3y Ho\xE0ng Li\xEAn S\u01A1n.",history:"",sourceLabel:"C\u1ED5ng th\xF4ng tin du l\u1ECBch Lai Ch\xE2u",sourceUrl:"https://dulich.laichau.gov.vn/vi/blog/details/ve-lai-chau-du-le-hoi-then-kin-pang-2026-trai-nghiem-van-hoa-kham-pha-ve-dep-nui-rung-tay-bac-1303"},Fansipan:{significance:"\u0110\u1EC9nh cao 3.143 m \u0111\u01B0\u1EE3c g\u1ECDi l\xE0 \u201Cn\xF3c nh\xE0 \u0110\xF4ng D\u01B0\u01A1ng\u201D, c\xF3 gi\xE1 tr\u1ECB \u0111\u1EB7c bi\u1EC7t v\u1EC1 c\u1EA3nh quan n\xFAi cao v\xE0 h\u1EC7 sinh th\xE1i Ho\xE0ng Li\xEAn.",history:"C\xE1c c\u1ED9ng \u0111\u1ED3ng quanh Ho\xE0ng Li\xEAn S\u01A1n coi n\xFAi r\u1EEBng l\xE0 m\u1ED9t ph\u1EA7n kh\xF4ng gian v\u0103n h\xF3a; h\xE0nh tr\xECnh chinh ph\u1EE5c Fansipan \u0111\xE3 tr\u1EDF th\xE0nh bi\u1EC3u t\u01B0\u1EE3ng kh\xE1m ph\xE1 Vi\u1EC7t Nam.",sourceLabel:"C\u1EE5c Du l\u1ECBch Qu\u1ED1c gia Vi\u1EC7t Nam",sourceUrl:"https://vietnamtourism.gov.vn/"},"M\xF9 Cang Ch\u1EA3i":{significance:"Ru\u1ED9ng b\u1EADc thang l\xE0 k\u1EBFt qu\u1EA3 c\u1EE7a lao \u0111\u1ED9ng th\xEDch nghi v\u1EDBi \u0111\u1ECBa h\xECnh d\u1ED1c, \u0111\u1ED3ng th\u1EDDi l\xE0 s\u1EA3n ph\u1EA9m du l\u1ECBch sinh th\xE1i \u2013 v\u0103n h\xF3a \u0111\u1EB7c tr\u01B0ng c\u1EE7a ng\u01B0\u1EDDi M\xF4ng.",history:"C\xE1c khu ru\u1ED9ng La P\xE1n T\u1EA9n, Ch\u1EBF Cu Nha v\xE0 D\u1EBF Xu Ph\xECnh \u0111\xE3 \u0111\u01B0\u1EE3c x\u1EBFp h\u1EA1ng danh th\u1EAFng qu\u1ED1c gia.",sourceLabel:"C\u1EE5c Du l\u1ECBch Qu\u1ED1c gia Vi\u1EC7t Nam",sourceUrl:"https://vietnamtourism.gov.vn/post/33699"},"N\xFAi M\u1EABu S\u01A1n":{significance:"\u0110\u1ED9 cao, kh\xED h\u1EADu m\xE1t l\u1EA1nh v\xE0 h\u1EC7 sinh th\xE1i n\xFAi t\u1EA1o cho M\u1EABu S\u01A1n c\u1EA3nh s\u1EAFc kh\xE1c bi\u1EC7t c\u1EE7a v\xF9ng \u0110\xF4ng B\u1EAFc.",history:"D\u1EA5u t\xEDch bi\u1EC7t th\u1EF1 ngh\u1EC9 d\u01B0\u1EE1ng x\xE2y t\u1EEB \u0111\u1EA7u th\u1EBF k\u1EF7 XX c\xF9ng v\u0103n h\xF3a Dao b\u1EA3n \u0111\u1ECBa t\u1EA1o n\xEAn l\u1EDBp k\xFD \u1EE9c ri\xEAng cho v\xF9ng n\xFAi.",sourceLabel:"B\u1ED9 V\u0103n h\xF3a, Th\u1EC3 thao v\xE0 Du l\u1ECBch",sourceUrl:"https://bvhttdl.gov.vn/Pages/chi-tiet.aspx?url=%2Flang-son-danh-thuc-tiem-nang-khu-du-lich-mau-son-20241003083820222.htm"},"\u1EA2i Chi L\u0103ng":{significance:"\u0110\u1ECBa th\u1EBF thung l\u0169ng h\u1EB9p gi\u1EEFa n\xFAi \u0111\xE1 t\u1EEBng t\u1EA1o n\xEAn m\u1ED9t c\u1EEDa \u1EA3i chi\u1EBFn l\u01B0\u1EE3c tr\xEAn con \u0111\u01B0\u1EDDng t\u1EEB bi\xEAn gi\u1EDBi v\xE0o \u0111\u1ED3ng b\u1EB1ng B\u1EAFc B\u1ED9.",history:"Chi L\u0103ng g\u1EAFn v\u1EDBi nhi\u1EC1u chi\u1EBFn th\u1EAFng ch\u1ED1ng ngo\u1EA1i x\xE2m, n\u1ED5i b\u1EADt l\xE0 tr\u1EADn n\u0103m 1427 g\xF3p ph\u1EA7n k\u1EBFt th\xFAc cu\u1ED9c kh\xE1ng chi\u1EBFn ch\u1ED1ng qu\xE2n Minh.",sourceLabel:"C\u1ED5ng du l\u1ECBch L\u1EA1ng S\u01A1n",sourceUrl:"https://lspa.langson.gov.vn/diem-den-du-lich/ai-chi-lang-341489"},"H\u1ED3 N\xFAi C\u1ED1c":{significance:"H\u1ED3 v\xE0 h\u1EC7 th\u1ED1ng \u0111\u1EA3o t\u1EA1o n\xEAn c\u1EA3nh quan trung du, \u0111\u1ED3ng th\u1EDDi cung c\u1EA5p ngu\u1ED3n n\u01B0\u1EDBc v\xE0 kh\xF4ng gian ph\xE1t tri\u1EC3n du l\u1ECBch cho Th\xE1i Nguy\xEAn.",history:"T\xEAn h\u1ED3 \u0111\u01B0\u1EE3c k\u1EC3 c\xF9ng truy\u1EC1n thuy\u1EBFt n\xE0ng C\xF4ng \u2013 ch\xE0ng C\u1ED1c, m\u1ED9t c\xE2u chuy\u1EC7n d\xE2n gian v\u1EC1 t\xECnh y\xEAu \u0111\xE3 tr\u1EDF th\xE0nh d\u1EA5u \u1EA5n v\u0103n h\xF3a \u0111\u1ECBa ph\u01B0\u01A1ng.",sourceLabel:"C\u1EE5c Du l\u1ECBch Qu\u1ED1c gia Vi\u1EC7t Nam",sourceUrl:"https://vietnamtourism.gov.vn/printer/67595?type=1"},"H\u1ED3 Ba B\u1EC3":{significance:"H\u1ED3 n\u01B0\u1EDBc ng\u1ECDt t\u1EF1 nhi\xEAn n\u1EB1m trong V\u01B0\u1EDDn qu\u1ED1c gia Ba B\u1EC3, k\u1EBFt n\u1ED1i v\u1EDBi s\xF4ng, hang \u0111\u1ED9ng v\xE0 r\u1EEBng tr\xEAn n\xFAi \u0111\xE1 v\xF4i.",history:"Kh\xF4ng gian quanh h\u1ED3 l\xE0 n\u01A1i sinh s\u1ED1ng l\xE2u \u0111\u1EDDi c\u1EE7a ng\u01B0\u1EDDi T\xE0y; truy\u1EC1n thuy\u1EBFt h\u1ED3 Ba B\u1EC3 \u0111\u01B0\u1EE3c l\u01B0u truy\u1EC1n nh\u01B0 c\xE1ch c\u1ED9ng \u0111\u1ED3ng l\xFD gi\u1EA3i ngu\u1ED3n g\u1ED1c c\u1EA3nh quan.",sourceLabel:"C\u01A1 s\u1EDF d\u1EEF li\u1EC7u du l\u1ECBch Vi\u1EC7t Nam",sourceUrl:"https://csdl.vietnamtourism.gov.vn/dest/?item=176"},"\u0110\u1ED3i A1":{significance:"\u0110\u1ED3i gi\u1EEF v\u1ECB tr\xED then ch\u1ED1t \u1EDF ph\xEDa \u0111\xF4ng t\u1EADp \u0111o\xE0n c\u1EE9 \u0111i\u1EC3m \u0110i\u1EC7n Bi\xEAn Ph\u1EE7 v\xE0 nay l\xE0 \u0111i\u1EC3m gi\xE1o d\u1EE5c l\u1ECBch s\u1EED quan tr\u1ECDng.",history:"Tr\u1EADn \u0111\xE1nh k\xE9o d\xE0i t\u1EA1i A1 k\u1EBFt th\xFAc r\u1EA1ng s\xE1ng 7/5/1954, t\u1EA1o \u0111i\u1EC1u ki\u1EC7n cho qu\xE2n ta ti\u1EBFn v\xE0o s\u1EDF ch\u1EC9 huy \u0111\u1ED1i ph\u01B0\u01A1ng trong ng\xE0y chi\u1EBFn th\u1EAFng.",sourceLabel:"C\u1ED5ng du l\u1ECBch \u0110i\u1EC7n Bi\xEAn",sourceUrl:"https://dulichdienbien.vn/"},"H\u1ED3 P\xE1 Khoang":{significance:"H\u1ED3 n\u1EB1m gi\u1EEFa \u0111\u1ECBa h\xECnh n\xFAi r\u1EEBng M\u01B0\u1EDDng Ph\u0103ng, c\xF3 nhi\u1EC1u nh\xE1nh n\u01B0\u1EDBc, b\xE1n \u0111\u1EA3o v\xE0 th\u1EA3m th\u1EF1c v\u1EADt phong ph\xFA.",history:"P\xE1 Khoang n\u1EB1m g\u1EA7n kh\xF4ng gian di t\xEDch S\u1EDF Ch\u1EC9 huy Chi\u1EBFn d\u1ECBch \u0110i\u1EC7n Bi\xEAn Ph\u1EE7 t\u1EA1i M\u01B0\u1EDDng Ph\u0103ng, thu\u1EADn l\u1EE3i cho h\xE0nh tr\xECnh k\u1EBFt h\u1EE3p sinh th\xE1i v\xE0 l\u1ECBch s\u1EED.",sourceLabel:"C\u1ED5ng du l\u1ECBch \u0110i\u1EC7n Bi\xEAn",sourceUrl:"https://dulichdienbien.vn/"},"\u0110\u1EC1n H\xF9ng":{significance:"Qu\u1EA7n th\u1EC3 tr\xEAn n\xFAi Ngh\u0129a L\u0129nh l\xE0 trung t\xE2m th\u1EF1c h\xE0nh t\xEDn ng\u01B0\u1EE1ng th\u1EDD c\xFAng H\xF9ng V\u01B0\u01A1ng, bi\u1EC3u \u0111\u1EA1t \xFD th\u1EE9c v\u1EC1 c\u1ED9i ngu\u1ED3n chung c\u1EE7a ng\u01B0\u1EDDi Vi\u1EC7t.",history:"T\xEDn ng\u01B0\u1EE1ng th\u1EDD c\xFAng H\xF9ng V\u01B0\u01A1ng \u0111\u01B0\u1EE3c UNESCO ghi danh l\xE0 di s\u1EA3n v\u0103n h\xF3a phi v\u1EADt th\u1EC3 \u0111\u1EA1i di\u1EC7n c\u1EE7a nh\xE2n lo\u1EA1i n\u0103m 2012.",sourceLabel:"C\u1ED5ng du l\u1ECBch Ph\xFA Th\u1ECD",sourceUrl:"https://dulichphutho.gov.vn/tour-du-lich/den-hung-long-coc-thanh-thuy-ho-hoa-binh-mai-chau"},"Thung l\u0169ng Mai Ch\xE2u":{significance:"Thung l\u0169ng l\xFAa v\xE0 c\xE1c b\u1EA3n nh\xE0 s\xE0n l\xE0 kh\xF4ng gian ti\xEAu bi\u1EC3u \u0111\u1EC3 t\xECm hi\u1EC3u ngh\u1EC1 d\u1EC7t, \u1EA9m th\u1EF1c v\xE0 v\u0103n h\xF3a Th\xE1i.",history:"Du l\u1ECBch c\u1ED9ng \u0111\u1ED3ng t\u1EA1i c\xE1c b\u1EA3n nh\u01B0 L\xE1c, Pom Co\u1ECDng ph\xE1t tri\u1EC3n tr\xEAn n\u1EC1n n\u1EBFp s\u1ED1ng v\xE0 ki\u1EBFn tr\xFAc truy\u1EC1n th\u1ED1ng c\u1EE7a c\u01B0 d\xE2n \u0111\u1ECBa ph\u01B0\u01A1ng.",sourceLabel:"C\u1ED5ng du l\u1ECBch Ph\xFA Th\u1ECD",sourceUrl:"https://dulichphutho.gov.vn/diemden/thung-lung-mai-chau"},"Ch\xF9a D\xE2u":{significance:"Ch\xF9a l\xE0 m\u1ED9t trong nh\u1EEFng trung t\xE2m Ph\u1EADt gi\xE1o s\u1EDBm nh\u1EA5t \u1EDF Vi\u1EC7t Nam, n\u01A1i Ph\u1EADt gi\xE1o giao thoa v\u1EDBi t\xEDn ng\u01B0\u1EE1ng T\u1EE9 Ph\xE1p b\u1EA3n \u0111\u1ECBa.",history:"Ch\xF9a g\u1EAFn v\u1EDBi trung t\xE2m Luy L\xE2u t\u1EEB nh\u1EEFng th\u1EBF k\u1EF7 \u0111\u1EA7u C\xF4ng nguy\xEAn; b\u1ED9 m\u1ED9c b\u1EA3n ch\xF9a D\xE2u \u0111\u01B0\u1EE3c c\xF4ng nh\u1EADn l\xE0 b\u1EA3o v\u1EADt qu\u1ED1c gia.",sourceLabel:"S\u1EDF D\xE2n t\u1ED9c v\xE0 T\xF4n gi\xE1o B\u1EAFc Ninh",sourceUrl:"https://sdttg.bacninh.gov.vn/news/-/details/194272/le-hoi-truyen-thong-vung-dau-trung-tam-phat-giao-co-xua-nhat-viet-nam-116341415"},"T\xE2y Y\xEAn T\u1EED":{significance:"S\u01B0\u1EDDn t\xE2y d\xE3y Y\xEAn T\u1EED k\u1EBFt n\u1ED1i c\u1EA3nh quan r\u1EEBng n\xFAi v\u1EDBi h\u1EC7 th\u1ED1ng ch\xF9a, am, th\xE1p c\u1EE7a kh\xF4ng gian Ph\u1EADt gi\xE1o Tr\xFAc L\xE2m.",history:"Con \u0111\u01B0\u1EDDng h\xE0nh h\u01B0\u01A1ng g\u1EAFn v\u1EDBi d\u1EA5u ch\xE2n Ph\u1EADt ho\xE0ng Tr\u1EA7n Nh\xE2n T\xF4ng v\xE0 qu\xE1 tr\xECnh h\xECnh th\xE0nh Thi\u1EC1n ph\xE1i Tr\xFAc L\xE2m Y\xEAn T\u1EED.",sourceLabel:"Khu du l\u1ECBch T\xE2y Y\xEAn T\u1EED",sourceUrl:"https://tayyentu.bacninh.gov.vn/gioi-thieu-chung"},"H\u1ED3 G\u01B0\u01A1m":{significance:"H\u1ED3 l\xE0 kh\xF4ng gian c\xF4ng c\u1ED9ng, c\u1EA3nh quan v\xE0 bi\u1EC3u t\u01B0\u1EE3ng v\u0103n h\xF3a \u1EDF trung t\xE2m Th\u1EE7 \u0111\xF4.",history:"T\xEAn H\u1ED3 Ho\xE0n Ki\u1EBFm g\u1EAFn v\u1EDBi truy\u1EC1n thuy\u1EBFt vua L\xEA L\u1EE3i tr\u1EA3 g\u01B0\u01A1m b\xE1u sau cu\u1ED9c kh\u1EDFi ngh\u0129a Lam S\u01A1n; quanh h\u1ED3 t\u1EADp trung nhi\u1EC1u di t\xEDch c\u1EE7a Th\u0103ng Long \u2013 H\xE0 N\u1ED9i.",sourceLabel:"C\u1ED5ng th\xF4ng tin H\xE0 N\u1ED9i",sourceUrl:"https://hanoi.gov.vn/van-hien-thang-long/thang-long-ha-noi-hanh-trinh-nghin-nam-doi-thay-phat-trien-42813733.htm"},"Ho\xE0ng th\xE0nh Th\u0103ng Long":{significance:"C\xE1c t\u1EA7ng ki\u1EBFn tr\xFAc v\xE0 kh\u1EA3o c\u1ED5 ph\u1EA3n \xE1nh trung t\xE2m quy\u1EC1n l\u1EF1c li\xEAn t\u1EE5c c\u1EE7a qu\u1ED1c gia qua nhi\u1EC1u tri\u1EC1u \u0111\u1EA1i.",history:"Khu trung t\xE2m Ho\xE0ng th\xE0nh \u0111\u01B0\u1EE3c UNESCO ghi danh Di s\u1EA3n v\u0103n h\xF3a th\u1EBF gi\u1EDBi n\u0103m 2010, v\u1EDBi chi\u1EC1u d\xE0i l\u1ECBch s\u1EED t\u1EEB th\u1EDDi ti\u1EC1n Th\u0103ng Long \u0111\u1EBFn hi\u1EC7n \u0111\u1EA1i.",sourceLabel:"C\u1ED5ng th\xF4ng tin H\xE0 N\u1ED9i",sourceUrl:"https://hanoi.gov.vn/dia-ly-dia-hinh/vi-tri-hoang-thanh-thang-long-4241009115110957.htm"},"V\u1ECBnh H\u1EA1 Long":{significance:"Qu\u1EA7n th\u1EC3 \u0111\u1EA3o th\xE1p \u0111\xE1 v\xF4i tr\xEAn bi\u1EC3n c\xF3 gi\xE1 tr\u1ECB th\u1EA9m m\u1EF9, \u0111\u1ECBa ch\u1EA5t \u2013 \u0111\u1ECBa m\u1EA1o n\u1ED5i b\u1EADt to\xE0n c\u1EA7u v\xE0 h\u1EC7 sinh th\xE1i \u0111a d\u1EA1ng.",history:"V\u1ECBnh H\u1EA1 Long nhi\u1EC1u l\u1EA7n \u0111\u01B0\u1EE3c UNESCO ghi danh, hi\u1EC7n c\xF9ng qu\u1EA7n \u0111\u1EA3o C\xE1t B\xE0 t\u1EA1o th\xE0nh di s\u1EA3n thi\xEAn nhi\xEAn th\u1EBF gi\u1EDBi li\xEAn t\u1EC9nh.",sourceLabel:"C\u1ED5ng du l\u1ECBch Qu\u1EA3ng Ninh",sourceUrl:"https://dulich.quangninh.gov.vn/"},"Y\xEAn T\u1EED":{significance:"H\u1EC7 th\u1ED1ng ch\xF9a, am v\xE0 th\xE1p gi\u1EEFa r\u1EEBng n\xFAi t\u1EA1o n\xEAn trung t\xE2m v\u0103n h\xF3a \u2013 t\xE2m linh \u0111\u1EB7c bi\u1EC7t c\u1EE7a Ph\u1EADt gi\xE1o Tr\xFAc L\xE2m.",history:"Vua Tr\u1EA7n Nh\xE2n T\xF4ng tu h\xE0nh v\xE0 s\xE1ng l\u1EADp Thi\u1EC1n ph\xE1i Tr\xFAc L\xE2m t\u1EA1i Y\xEAn T\u1EED; qu\u1EA7n th\u1EC3 Y\xEAn T\u1EED \u2013 V\u0129nh Nghi\xEAm \u2013 C\xF4n S\u01A1n, Ki\u1EBFp B\u1EA1c \u0111\u01B0\u1EE3c UNESCO ghi danh n\u0103m 2025.",sourceLabel:"C\u1ED5ng du l\u1ECBch Qu\u1EA3ng Ninh",sourceUrl:"https://dulich.quangninh.gov.vn/"},"Cao nguy\xEAn M\u1ED9c Ch\xE2u":{significance:"Kh\xED h\u1EADu cao nguy\xEAn, \u0111\u1ED3ng c\u1ECF, \u0111\u1ED3i ch\xE8 v\xE0 m\xF9a hoa t\u1EA1o n\xEAn v\xF9ng du l\u1ECBch n\xF4ng nghi\u1EC7p \u2013 sinh th\xE1i \u0111\u1EB7c tr\u01B0ng.",history:"M\u1ED9c Ch\xE2u l\xE0 kh\xF4ng gian c\u01B0 tr\xFA, giao thoa v\u0103n h\xF3a c\u1EE7a nhi\u1EC1u d\xE2n t\u1ED9c, trong \u0111\xF3 n\u1ED5i b\u1EADt c\u1ED9ng \u0111\u1ED3ng Th\xE1i v\xE0 M\xF4ng.",sourceLabel:"C\u1ED5ng th\xF4ng tin S\u01A1n La",sourceUrl:"https://sonla.gov.vn/4/469/61708/630360/cac-huyen-thanh-pho/huyen-moc-chau"},"T\xE0 X\xF9a":{significance:"\u0110\u1ECBa h\xECnh n\xFAi cao, s\u1ED1ng n\xFAi h\u1EB9p v\xE0 \u0111i\u1EC1u ki\u1EC7n kh\xED t\u01B0\u1EE3ng t\u1EA1o n\xEAn c\u1EA3nh bi\u1EC3n m\xE2y n\u1ED5i ti\u1EBFng \u1EDF B\u1EAFc Y\xEAn.",history:"B\xEAn c\u1EA1nh c\u1EA3nh quan, T\xE0 X\xF9a c\xF2n g\u1EAFn v\u1EDBi c\xE1c b\u1EA3n ng\u01B0\u1EDDi M\xF4ng v\xE0 v\xF9ng ch\xE8 Shan tuy\u1EBFt c\u1ED5 th\u1EE5.",sourceLabel:"C\u1EE5c Du l\u1ECBch Qu\u1ED1c gia Vi\u1EC7t Nam",sourceUrl:"https://vietnamtourism.gov.vn/post/31427"},"Qu\u1EA7n \u0111\u1EA3o C\xE1t B\xE0":{significance:"R\u1EEBng m\u01B0a nhi\u1EC7t \u0111\u1EDBi tr\xEAn \u0111\u1EA3o \u0111\xE1 v\xF4i, h\u1EC7 sinh th\xE1i bi\u1EC3n v\xE0 \u0111\u1ECBa h\xECnh karst ng\u1EADp n\u01B0\u1EDBc t\u1EA1o n\xEAn gi\xE1 tr\u1ECB \u0111a d\u1EA1ng sinh h\u1ECDc \u0111\u1EB7c bi\u1EC7t.",history:"C\xE1t B\xE0 thu\u1ED9c Di s\u1EA3n thi\xEAn nhi\xEAn th\u1EBF gi\u1EDBi V\u1ECBnh H\u1EA1 Long \u2013 Qu\u1EA7n \u0111\u1EA3o C\xE1t B\xE0 v\xE0 Khu d\u1EF1 tr\u1EEF sinh quy\u1EC3n th\u1EBF gi\u1EDBi.",sourceLabel:"C\u1ED5ng th\xF4ng tin C\xE1t H\u1EA3i \u2013 H\u1EA3i Ph\xF2ng",sourceUrl:"https://cathai.haiphong.gov.vn/dang-uy-dac-khu/dac-khu-cat-hai-ban-hanh-nghi-quyet-chuyen-doi-xanh-tren-dao-cat-ba-giai-doan-2026-2030-tam-nhin-897523"},"C\xF4n S\u01A1n - Ki\u1EBFp B\u1EA1c":{significance:"C\u1EA3nh quan n\xFAi, r\u1EEBng, su\u1ED1i v\xE0 h\u1EC7 th\u1ED1ng \u0111\u1EC1n ch\xF9a h\u1EE3p th\xE0nh kh\xF4ng gian v\u0103n h\xF3a \u2013 t\xE2m linh quan tr\u1ECDng c\u1EE7a x\u1EE9 \u0110\xF4ng.",history:"C\xF4n S\u01A1n g\u1EAFn v\u1EDBi Nguy\u1EC5n Tr\xE3i; Ki\u1EBFp B\u1EA1c g\u1EAFn v\u1EDBi H\u01B0ng \u0110\u1EA1o \u0110\u1EA1i v\u01B0\u01A1ng Tr\u1EA7n Qu\u1ED1c Tu\u1EA5n v\xE0 c\xE1c cu\u1ED9c kh\xE1ng chi\u1EBFn th\u1EDDi Tr\u1EA7n.",sourceLabel:"C\u1ED5ng th\xF4ng tin H\u1EA3i Ph\xF2ng",sourceUrl:"https://www.haiphong.gov.vn/di-tich-danh-thang/thang-canh-con-son-852317"},"Ph\u1ED1 Hi\u1EBFn":{significance:"H\u1EC7 th\u1ED1ng \u0111\u1EC1n, ch\xF9a, \u0111\xECnh, ph\u1ED1 c\u1ED5 ph\u1EA3n \xE1nh m\u1ED9t \u0111\xF4 th\u1ECB giao th\u01B0\u01A1ng t\u1EEBng quy t\u1EE5 nhi\u1EC1u c\u1ED9ng \u0111\u1ED3ng v\xE0 t\xEDn ng\u01B0\u1EE1ng.",history:"Ph\u1ED1 Hi\u1EBFn ph\xE1t tri\u1EC3n th\u1ECBnh \u0111\u1EA1t t\u1EEB th\u1EBF k\u1EF7 XVI\u2013XVII b\xEAn s\xF4ng H\u1ED3ng, t\u1EEBng \u0111\u01B0\u1EE3c nh\u1EAFc trong c\xE2u \u201CTh\u1EE9 nh\u1EA5t Kinh K\u1EF3, th\u1EE9 nh\xEC Ph\u1ED1 Hi\u1EBFn\u201D.",sourceLabel:"C\u1ED5ng th\xF4ng tin H\u01B0ng Y\xEAn",sourceUrl:"https://thuvu.hungyen.gov.vn/phat-huy-gia-tri-van-hoa-cua-manh-dat-hung-yen-c2161.html"},"Ch\xF9a Keo":{significance:"Ki\u1EBFn tr\xFAc g\u1ED7, ch\u1EA1m kh\u1EAFc v\xE0 g\xE1c chu\xF4ng t\u1EA1o n\xEAn m\u1ED9t m\u1EABu m\u1EF1c ngh\u1EC7 thu\u1EADt c\u1EE7a \u0111\u1ED3ng b\u1EB1ng B\u1EAFc B\u1ED9.",history:"Ng\xF4i ch\xF9a hi\u1EC7n c\xF2n mang \u0111\u1EADm phong c\xE1ch ki\u1EBFn tr\xFAc th\u1EDDi L\xEA Trung H\u01B0ng v\xE0 g\u1EAFn v\u1EDBi vi\u1EC7c th\u1EDD Thi\u1EC1n s\u01B0 Kh\xF4ng L\u1ED9.",sourceLabel:"C\u1ED5ng th\xF4ng tin H\u01B0ng Y\xEAn",sourceUrl:"https://thuvu.hungyen.gov.vn/phat-huy-gia-tri-van-hoa-cua-manh-dat-hung-yen-c2161.html"},"Tr\xE0ng An":{significance:"C\u1EA3nh quan karst nhi\u1EC7t \u0111\u1EDBi ng\u1EADp n\u01B0\u1EDBc k\u1EBFt h\u1EE3p di ch\u1EC9 kh\u1EA3o c\u1ED5 cho th\u1EA5y m\u1ED1i quan h\u1EC7 l\xE2u d\xE0i gi\u1EEFa con ng\u01B0\u1EDDi v\xE0 m\xF4i tr\u01B0\u1EDDng.",history:"Qu\u1EA7n th\u1EC3 danh th\u1EAFng Tr\xE0ng An \u0111\u01B0\u1EE3c UNESCO ghi danh l\xE0 Di s\u1EA3n v\u0103n h\xF3a v\xE0 thi\xEAn nhi\xEAn th\u1EBF gi\u1EDBi n\u0103m 2014.",sourceLabel:"C\u01A1 s\u1EDF d\u1EEF li\u1EC7u du l\u1ECBch Vi\u1EC7t Nam",sourceUrl:"https://csdl.vietnamtourism.gov.vn/dest/?item=236"},"Ch\xF9a Tam Ch\xFAc":{significance:"H\u1ED3, n\xFAi \u0111\xE1 v\xF4i, thung l\u0169ng v\xE0 c\xE1c c\xF4ng tr\xECnh t\xF4n gi\xE1o t\u1EA1o th\xE0nh m\u1ED9t kh\xF4ng gian c\u1EA3nh quan \u2013 t\xE2m linh quy m\xF4 l\u1EDBn.",history:"Khu v\u1EF1c Tam Ch\xFAc c\xF2n c\xF3 d\u1EA5u t\xEDch kh\u1EA3o c\u1ED5, danh th\u1EAFng v\xE0 c\xE1c truy\u1EC1n thuy\u1EBFt d\xE2n gian \u0111\u01B0\u1EE3c b\u1EA3o t\u1ED3n c\xF9ng qu\u1EA7n th\u1EC3 ch\xF9a.",sourceLabel:"C\u1EE5c Di s\u1EA3n v\u0103n h\xF3a",sourceUrl:"https://dsvh.gov.vn/danh-lam-thang-canh-va-khao-co-quan-the-tam-chuc-phuong-tam-chuc-tinh-ninh-binh-22335"},"Th\xE0nh Nh\xE0 H\u1ED3":{significance:"K\u1EF9 thu\u1EADt x\xE2y th\xE0nh b\u1EB1ng nh\u1EEFng kh\u1ED1i \u0111\xE1 l\u1EDBn v\xE0 quy ho\u1EA1ch theo nguy\xEAn t\u1EAFc phong th\u1EE7y th\u1EC3 hi\u1EC7n b\u01B0\u1EDBc ph\xE1t tri\u1EC3n n\u1ED5i b\u1EADt c\u1EE7a ki\u1EBFn tr\xFAc cu\u1ED1i th\u1EBF k\u1EF7 XIV.",history:"H\u1ED3 Qu\xFD Ly cho x\xE2y th\xE0nh n\u0103m 1397; di t\xEDch \u0111\u01B0\u1EE3c UNESCO ghi danh Di s\u1EA3n v\u0103n h\xF3a th\u1EBF gi\u1EDBi n\u0103m 2011.",sourceLabel:"C\u1EE5c Di s\u1EA3n v\u0103n h\xF3a",sourceUrl:"https://dsvh.gov.vn/"},"P\xF9 Lu\xF4ng":{significance:"Khu b\u1EA3o t\u1ED3n r\u1ED9ng 17.662 ha b\u1EA3o v\u1EC7 r\u1EEBng, n\xFAi \u0111\xE1 v\xF4i, ngu\u1ED3n n\u01B0\u1EDBc v\xE0 \u0111a d\u1EA1ng sinh h\u1ECDc c\u1EE7a mi\u1EC1n t\xE2y Thanh H\xF3a.",history:"T\xEAn P\xF9 Lu\xF4ng trong ti\u1EBFng Th\xE1i ch\u1EC9 ng\u1ECDn n\xFAi cao nh\u1EA5t; c\u1EA3nh quan g\u1EAFn ch\u1EB7t v\u1EDBi c\xE1c b\u1EA3n v\xE0 canh t\xE1c ru\u1ED9ng b\u1EADc thang c\u1EE7a ng\u01B0\u1EDDi Th\xE1i, M\u01B0\u1EDDng.",sourceLabel:"C\u1EE5c B\u1EA3o t\u1ED3n thi\xEAn nhi\xEAn v\xE0 \u0110a d\u1EA1ng sinh h\u1ECDc",sourceUrl:"https://nbca.gov.vn/khu-du-tru-thien-nhien-pu-luong-thanh-hoa/"},"L\xE0ng Sen":{significance:"Kh\xF4ng gian l\xE0ng qu\xEA v\u1EDBi nh\xE0 tranh, v\u01B0\u1EDDn, ao sen v\xE0 hi\u1EC7n v\u1EADt gi\xFAp ng\u01B0\u1EDDi xem hi\u1EC3u tu\u1ED5i th\u01A1, gia \u0111\xECnh c\u1EE7a Ch\u1EE7 t\u1ECBch H\u1ED3 Ch\xED Minh.",history:"L\xE0ng Sen l\xE0 qu\xEA n\u1ED9i c\u1EE7a Ch\u1EE7 t\u1ECBch H\u1ED3 Ch\xED Minh v\xE0 l\xE0 m\u1ED9t b\u1ED9 ph\u1EADn quan tr\u1ECDng c\u1EE7a Khu di t\xEDch qu\u1ED1c gia \u0111\u1EB7c bi\u1EC7t Kim Li\xEAn.",sourceLabel:"C\u1ED5ng du l\u1ECBch Nam \u0110\xE0n \u2013 Ngh\u1EC7 An",sourceUrl:"https://dulichnamdan.nghean.gov.vn/vi/dinhlangsen"},"Bi\u1EC3n C\u1EEDa L\xF2":{significance:"B\xE3i c\xE1t d\xE0i, \u0111\u1ED9 d\u1ED1c tho\u1EA3i v\xE0 c\u1EE5m \u0111\u1EA3o ven b\u1EDD t\u1EA1o n\xEAn trung t\xE2m ngh\u1EC9 d\u01B0\u1EE1ng bi\u1EC3n l\xE2u \u0111\u1EDDi c\u1EE7a B\u1EAFc Trung B\u1ED9.",history:"C\u1EEDa L\xF2 ph\xE1t tri\u1EC3n t\u1EEB v\xF9ng c\u1EEDa bi\u1EC3n \u2013 l\xE0ng ch\xE0i th\xE0nh \u0111\xF4 th\u1ECB du l\u1ECBch, v\u1EDBi l\u1EC5 h\u1ED9i du l\u1ECBch bi\u1EC3n \u0111\u01B0\u1EE3c t\u1ED5 ch\u1EE9c th\u01B0\u1EDDng ni\xEAn.",sourceLabel:"C\u1ED5ng th\xF4ng tin Ngh\u1EC7 An",sourceUrl:"https://nghean.gov.vn/tin-tuc-su-kien-73053/khai-mac-le-hoi-du-lich-bien-cua-lo-nam-2025-723384"},"Ng\xE3 ba \u0110\u1ED3ng L\u1ED9c":{significance:"V\u1ECB tr\xED tr\xEAn tuy\u1EBFn giao th\xF4ng chi\u1EBFn l\u01B0\u1EE3c t\u1EEBng l\xE0 \u201Cy\u1EBFt h\u1EA7u\u201D v\u1EADn chuy\u1EC3n chi vi\u1EC7n cho chi\u1EBFn tr\u01B0\u1EDDng mi\u1EC1n Nam.",history:"Ng\xE0y 24/7/1968, m\u01B0\u1EDDi n\u1EEF thanh ni\xEAn xung phong hy sinh khi l\xE0m nhi\u1EC7m v\u1EE5 b\u1EA3o \u0111\u1EA3m giao th\xF4ng; n\u01A1i \u0111\xE2y nay l\xE0 di t\xEDch qu\u1ED1c gia \u0111\u1EB7c bi\u1EC7t v\xE0 \u0111\u1ECBa ch\u1EC9 tri \xE2n.",sourceLabel:"C\u1ED5ng th\xF4ng tin H\xE0 T\u0129nh",sourceUrl:"https://hatinh.gov.vn/vi/bai-viet/dong-loc-trong-trai-tim-ca-nuoc"},"Bi\u1EC3n Thi\xEAn C\u1EA7m":{significance:"B\u1EDD bi\u1EC3n h\xECnh c\xE1nh cung, c\xE1t s\xE1ng v\xE0 n\xFAi s\xE1t bi\u1EC3n t\u1EA1o n\xEAn kh\xF4ng gian ngh\u1EC9 d\u01B0\u1EE1ng \u0111\u1EB7c tr\u01B0ng c\u1EE7a H\xE0 T\u0129nh.",history:"T\xEAn Thi\xEAn C\u1EA7m th\u01B0\u1EDDng \u0111\u01B0\u1EE3c gi\u1EA3i ngh\u0129a l\xE0 \u201C\u0111\xE0n tr\u1EDDi\u201D, g\u1EAFn v\u1EDBi \xE2m thanh s\xF3ng v\xE0 gi\xF3 trong truy\u1EC1n thuy\u1EBFt d\xE2n gian \u0111\u1ECBa ph\u01B0\u01A1ng.",sourceLabel:"C\u1ED5ng th\xF4ng tin Thi\xEAn C\u1EA7m \u2013 H\xE0 T\u0129nh",sourceUrl:"https://thiencam.hatinh.gov.vn/vi/chuyen-muc/gioi-thieu-chung"},"Phong Nha - K\u1EBB B\xE0ng":{significance:"Kh\u1ED1i karst c\u1ED5, s\xF4ng ng\u1EA7m, hang \u0111\u1ED9ng v\xE0 r\u1EEBng nhi\u1EC7t \u0111\u1EDBi t\u1EA1o n\xEAn gi\xE1 tr\u1ECB \u0111\u1ECBa ch\u1EA5t, \u0111\u1ECBa m\u1EA1o v\xE0 \u0111a d\u1EA1ng sinh h\u1ECDc n\u1ED5i b\u1EADt to\xE0n c\u1EA7u.",history:"Phong Nha \u2013 K\u1EBB B\xE0ng \u0111\u01B0\u1EE3c UNESCO ghi danh Di s\u1EA3n thi\xEAn nhi\xEAn th\u1EBF gi\u1EDBi n\u0103m 2003 v\xE0 m\u1EDF r\u1ED9ng ti\xEAu ch\xED \u0111a d\u1EA1ng sinh h\u1ECDc n\u0103m 2015.",sourceLabel:"C\u1ED5ng th\xF4ng tin Qu\u1EA3ng Tr\u1ECB",sourceUrl:"https://www.quangtri.gov.vn/tin-tuc/ve-phong-nha-noi-nguoi-dan-lam-du-lich-2"},"C\u1EA7u Hi\u1EC1n L\u01B0\u01A1ng":{significance:"C\u1EA7u b\u1EAFc qua s\xF4ng B\u1EBFn H\u1EA3i l\xE0 ch\u1EE9ng t\xEDch tr\u1EF1c quan v\u1EC1 gi\u1EDBi tuy\u1EBFn qu\xE2n s\u1EF1 t\u1EA1m th\u1EDDi v\xE0 kh\xE1t v\u1ECDng h\xF2a b\xECnh, th\u1ED1ng nh\u1EA5t.",history:"Sau Hi\u1EC7p \u0111\u1ECBnh Gen\xE8ve 1954, khu v\u1EF1c v\u0129 tuy\u1EBFn 17 t\u1EA1m th\u1EDDi chia c\u1EAFt \u0111\u1EA5t n\u01B0\u1EDBc cho \u0111\u1EBFn n\u0103m 1975; \u0111\xF4i b\u1EDD t\u1EEBng di\u1EC5n ra cu\u1ED9c \u0111\u1EA5u tranh bi\u1EC3u t\u01B0\u1EE3ng b\u1EB1ng c\u1EDD, loa v\xE0 m\xE0u s\u01A1n c\u1EA7u.",sourceLabel:"S\u1EDF Khoa h\u1ECDc v\xE0 C\xF4ng ngh\u1EC7 Qu\u1EA3ng Tr\u1ECB",sourceUrl:"https://skhcn.quangtri.gov.vn/documents/45562/0/DS_2024_02.pdf"},"Kinh th\xE0nh Hu\u1EBF":{significance:"Kinh th\xE0nh, Ho\xE0ng th\xE0nh v\xE0 T\u1EED C\u1EA5m Th\xE0nh th\u1EC3 hi\u1EC7n quy ho\u1EA1ch kinh \u0111\xF4, ngh\u1EC7 thu\u1EADt ki\u1EBFn tr\xFAc v\xE0 c\u1EA3nh quan tri\u1EC1u Nguy\u1EC5n.",history:"Hu\u1EBF l\xE0 kinh \u0111\xF4 c\u1EE7a Vi\u1EC7t Nam d\u01B0\u1EDBi tri\u1EC1u Nguy\u1EC5n t\u1EEB 1802 \u0111\u1EBFn 1945; Qu\u1EA7n th\u1EC3 di t\xEDch C\u1ED1 \u0111\xF4 Hu\u1EBF \u0111\u01B0\u1EE3c UNESCO ghi danh n\u0103m 1993.",sourceLabel:"Trung t\xE2m B\u1EA3o t\u1ED3n Di t\xEDch C\u1ED1 \u0111\xF4 Hu\u1EBF",sourceUrl:"https://www.hueworldheritage.org.vn/"},"Ph\xE1 Tam Giang":{significance:"\u0110\u1EA7m ph\xE1 n\u01B0\u1EDBc l\u1EE3 k\xE9o d\xE0i ven bi\u1EC3n t\u1EA1o sinh c\u1EA3nh phong ph\xFA, ngu\u1ED3n sinh k\u1EBF th\u1EE7y s\u1EA3n v\xE0 c\u1EA3nh quan \u0111\u1EB7c tr\u01B0ng c\u1EE7a Hu\u1EBF.",history:"L\xE0ng ch\xE0i, n\xF2 s\xE1o v\xE0 ph\u01B0\u01A1ng th\u1EE9c khai th\xE1c th\u1EE7y s\u1EA3n truy\u1EC1n th\u1ED1ng ph\u1EA3n \xE1nh qu\xE1 tr\xECnh c\u1ED9ng \u0111\u1ED3ng th\xEDch nghi v\u1EDBi m\xF4i tr\u01B0\u1EDDng \u0111\u1EA7m ph\xE1.",sourceLabel:"C\u1ED5ng du l\u1ECBch th\xF4ng minh Hu\u1EBF",sourceUrl:"https://huetripo.hue.gov.vn/diem-tham-quan"},"Qu\u1EA7n \u0111\u1EA3o Ho\xE0ng Sa":{significance:"Qu\u1EA7n \u0111\u1EA3o g\u1ED3m c\xE1c \u0111\u1EA3o, \u0111\xE1, b\xE3i c\u1EA1n v\xE0 b\xE3i ng\u1EA7m gi\u1EEFa Bi\u1EC3n \u0110\xF4ng, c\xF3 v\u1ECB tr\xED \u0111\u1EB7c bi\u1EC7t v\u1EC1 ch\u1EE7 quy\u1EC1n, h\xE0ng h\u1EA3i v\xE0 m\xF4i tr\u01B0\u1EDDng bi\u1EC3n.",history:"T\u01B0 li\u1EC7u Vi\u1EC7t Nam ghi Ho\xE0ng Sa v\u1EDBi t\xEAn B\xE3i C\xE1t V\xE0ng; Nh\xE0 n\u01B0\u1EDBc Vi\u1EC7t Nam \u0111\xE3 x\xE1c l\u1EADp, th\u1EF1c thi ch\u1EE7 quy\u1EC1n li\xEAn t\u1EE5c t\u1EEB l\xE2u \u0111\u1EDDi. Ho\xE0ng Sa hi\u1EC7n thu\u1ED9c \u0111\u1EB7c khu Ho\xE0ng Sa, th\xE0nh ph\u1ED1 \u0110\xE0 N\u1EB5ng.",sourceLabel:"C\u1ED5ng th\xF4ng tin th\xE0nh ph\u1ED1 \u0110\xE0 N\u1EB5ng",sourceUrl:"https://duynghia.danang.gov.vn/vi/web/dng-old/w/ubnd-huy%E1%BB%87n-ho%C3%A0ng-sa"},"C\u1EA7u R\u1ED3ng":{significance:"Thi\u1EBFt k\u1EBF h\xECnh r\u1ED3ng v\u01B0\u01A1n ra bi\u1EC3n v\u1EEBa gi\u1EA3i quy\u1EBFt k\u1EBFt n\u1ED1i \u0111\xF4ng \u2013 t\xE2y, v\u1EEBa tr\u1EDF th\xE0nh bi\u1EC3u t\u01B0\u1EE3ng ki\u1EBFn tr\xFAc c\u1EE7a \u0110\xE0 N\u1EB5ng hi\u1EC7n \u0111\u1EA1i.",history:"C\u1EA7u kh\u1EDFi c\xF4ng n\u0103m 2009 v\xE0 th\xF4ng xe ng\xE0y 29/3/2013, \u0111\xFAng d\u1ECBp k\u1EF7 ni\u1EC7m ng\xE0y gi\u1EA3i ph\xF3ng th\xE0nh ph\u1ED1.",sourceLabel:"C\u1ED5ng th\xF4ng tin th\xE0nh ph\u1ED1 \u0110\xE0 N\u1EB5ng",sourceUrl:"https://50nam.danang.gov.vn/thanh-pho-hom-nay/khi-giac-mo-hoa-thanh-bieu-tuong-40421.html"},"Ph\u1ED1 c\u1ED5 H\u1ED9i An":{significance:"C\u1EA5u tr\xFAc ph\u1ED1, nh\xE0 \u1EDF, h\u1ED9i qu\xE1n v\xE0 t\xEDn ng\u01B0\u1EE1ng c\xF2n \u0111\u01B0\u1EE3c b\u1EA3o t\u1ED3n t\u1ED1t, ph\u1EA3n \xE1nh s\u1EF1 giao l\u01B0u v\u0103n h\xF3a Vi\u1EC7t \u2013 Hoa \u2013 Nh\u1EADt v\xE0 ph\u01B0\u01A1ng T\xE2y.",history:"H\u1ED9i An t\u1EEBng l\xE0 th\u01B0\u01A1ng c\u1EA3ng qu\u1ED1c t\u1EBF th\u1ECBnh \u0111\u1EA1t t\u1EEB th\u1EBF k\u1EF7 XVI\u2013XVII v\xE0 \u0111\u01B0\u1EE3c UNESCO ghi danh Di s\u1EA3n v\u0103n h\xF3a th\u1EBF gi\u1EDBi n\u0103m 1999.",sourceLabel:"Trung t\xE2m Qu\u1EA3n l\xFD B\u1EA3o t\u1ED3n Di s\u1EA3n V\u0103n h\xF3a H\u1ED9i An",sourceUrl:"https://www.hoianworldheritage.org.vn/vi/news/print/Tong-quan-Hoi-An/Gioi-thieu-63.hwh"},"\u0110\u1EA3o L\xFD S\u01A1n":{significance:"D\u1EA5u t\xEDch n\xFAi l\u1EEDa, v\xE1ch bi\u1EC3n, ru\u1ED9ng t\u1ECFi v\xE0 v\u0103n h\xF3a c\u01B0 d\xE2n bi\u1EC3n t\u1EA1o n\xEAn nh\u1EADn di\u1EC7n ri\xEAng c\u1EE7a \u0111\u1EA3o ti\u1EC1n ti\xEAu.",history:"L\xFD S\u01A1n g\u1EAFn v\u1EDBi \u0111\u1ED9i Ho\xE0ng Sa ki\xEAm qu\u1EA3n B\u1EAFc H\u1EA3i; l\u1EC5 khao l\u1EC1 th\u1EBF l\xEDnh Ho\xE0ng Sa t\u01B0\u1EDFng nh\u1EDB nh\u1EEFng ng\u01B0\u1EDDi t\u1EEBng ra bi\u1EC3n th\u1EF1c thi nhi\u1EC7m v\u1EE5 ch\u1EE7 quy\u1EC1n.",sourceLabel:"S\u1EDF V\u0103n h\xF3a, Th\u1EC3 thao v\xE0 Du l\u1ECBch Qu\u1EA3ng Ng\xE3i",sourceUrl:"https://sovhttdl.quangngai.gov.vn/danh-muc-cot-phai/tin-tuc/hoat-dong-du-lich/dinh-hinh-tam-giac-du-lich-ly-son-mang-den-van-hoa-sa-huynh.html"},"M\u0103ng \u0110en":{significance:"Cao nguy\xEAn c\xF3 r\u1EEBng nguy\xEAn sinh, kh\xED h\u1EADu m\xE1t, h\u1EC7 th\u1ED1ng h\u1ED3 \u2013 th\xE1c v\xE0 b\u1EA3n s\u1EAFc c\xE1c d\xE2n t\u1ED9c T\xE2y Nguy\xEAn, ph\xF9 h\u1EE3p du l\u1ECBch sinh th\xE1i.",history:"Kh\xF4ng gian M\u0103ng \u0110en g\u1EAFn v\u1EDBi truy\u1EC1n thuy\u1EBFt \u201Cb\u1EA3y h\u1ED3, ba th\xE1c\u201D v\xE0 \u0111\u1EDDi s\u1ED1ng v\u0103n h\xF3a c\u1EE7a c\xE1c c\u1ED9ng \u0111\u1ED3ng b\u1EA3n \u0111\u1ECBa.",sourceLabel:"C\u1ED5ng th\xF4ng tin x\xE3 M\u0103ng \u0110en",sourceUrl:"https://mangden.quangngai.gov.vn/tin-tuc/thong-tin-chi-dao-dieu-hanh-cua-ubnd-tinh-chu-tich-ubnd-tinh/hoat-dong-cua-lanh-dao/xa-mang-den-va-dac-khu-ly-son-ky-ket-hop-tac-phat-trien-kinh-te-xa-hoi.html"},"Bi\u1EC3n H\u1ED3":{significance:"H\u1ED3 T\u2019N\u01B0ng r\u1ED9ng kho\u1EA3ng 240 ha, l\xE0 ngu\u1ED3n n\u01B0\u1EDBc sinh ho\u1EA1t quan tr\u1ECDng v\xE0 m\u1ED9t c\u1EA3nh quan ti\xEAu bi\u1EC3u c\u1EE7a cao nguy\xEAn Pleiku.",history:"T\xEAn g\u1ECDi Ia Nueng c\u1EE7a ng\u01B0\u1EDDi Jrai v\xE0 Tum T\u01A1nueng c\u1EE7a ng\u01B0\u1EDDi Bahnar cho th\u1EA5y \u0111\u1ECBa danh hi\u1EC7n di\u1EC7n l\xE2u d\xE0i trong kh\xF4ng gian v\u0103n h\xF3a b\u1EA3n \u0111\u1ECBa.",sourceLabel:"C\u1ED5ng th\xF4ng tin x\xE3 Bi\u1EC3n H\u1ED3 \u2013 Gia Lai",sourceUrl:"https://bienho.gialai.gov.vn/thong-bao-van-ban-moi/gioi-thieu-diem-van-hoa-du-lich-tren-dia-ban-xa-bien-ho.html"},"K\u1EF3 Co":{significance:"V\u1ECBnh nh\u1ECF c\xF3 b\xE3i c\xE1t h\xECnh l\u01B0\u1EE1i li\u1EC1m, n\u01B0\u1EDBc \u0111\u1ED5i s\u1EAFc theo \u0111\u1ED9 s\xE2u v\xE0 c\xE1c v\xE1ch \u0111\xE1 bao b\u1ECDc, ti\xEAu bi\u1EC3u cho c\u1EA3nh quan bi\u1EC3n Quy Nh\u01A1n.",history:"K\u1EF3 Co n\u1EB1m trong kh\xF4ng gian v\u0103n h\xF3a \u2013 bi\u1EC3n \u0111\u1EA3o c\u1EE7a b\xE1n \u0111\u1EA3o Ph\u01B0\u01A1ng Mai, g\u1EAFn v\u1EDBi sinh k\u1EBF ng\u01B0 nghi\u1EC7p c\u1EE7a c\u1ED9ng \u0111\u1ED3ng ven bi\u1EC3n.",sourceLabel:"C\u1ED5ng th\xF4ng tin ph\u01B0\u1EDDng Quy Nh\u01A1n \u0110\xF4ng",sourceUrl:"https://quynhondong.gialai.gov.vn/du-lich/du-lich-ky-co.html"},"Bu\xF4n \u0110\xF4n":{significance:"S\xF4ng S\xEAr\xEAp\u1ED1k, r\u1EEBng kh\u1ED9p, bu\xF4n l\xE0ng v\xE0 k\u1EF9 ngh\u1EC7 s\u0103n b\u1EAFt \u2013 thu\u1EA7n d\u01B0\u1EE1ng voi t\u1EA1o n\xEAn m\u1ED9t kh\xF4ng gian v\u0103n h\xF3a T\xE2y Nguy\xEAn \u0111\u1EB7c s\u1EAFc.",history:"T\xEAn B\u1EA3n \u0110\xF4n c\xF3 ngh\u0129a l\xE0 \u201Cl\xE0ng \u0111\u1EA3o\u201D; v\xF9ng \u0111\u1EA5t n\u1ED5i ti\u1EBFng qua c\xE2u chuy\u1EC7n c\xE1c vua s\u0103n voi, nh\xE0 s\xE0n c\u1ED5 v\xE0 giao l\u01B0u c\u1EE7a nhi\u1EC1u d\xE2n t\u1ED9c.",sourceLabel:"C\u1ED5ng th\xF4ng tin Bu\xF4n \u0110\xF4n \u2013 \u0110\u1EAFk L\u1EAFk",sourceUrl:"https://buondon.daklak.gov.vn/tong-quan-du-lich"},"G\xE0nh \u0110\xE1 \u0110\u0129a":{significance:"C\xE1c c\u1ED9t bazan c\xF3 ti\u1EBFt di\u1EC7n \u0111a gi\xE1c h\xECnh th\xE0nh khi dung nham ngu\u1ED9i v\xE0 co r\xFAt, t\u1EA1o m\u1ED9t c\u1EA5u tr\xFAc \u0111\u1ECBa ch\u1EA5t hi\u1EBFm b\xEAn b\u1EDD bi\u1EC3n.",history:"Danh th\u1EAFng \u0111\u01B0\u1EE3c x\u1EBFp h\u1EA1ng qu\u1ED1c gia n\u0103m 1998 v\xE0 l\xE0 m\u1ED9t \u0111i\u1EC3m c\u1ED1t l\xF5i trong \u0111\u1ECBnh h\u01B0\u1EDBng b\u1EA3o t\u1ED3n di s\u1EA3n \u0111\u1ECBa ch\u1EA5t khu v\u1EF1c.",sourceLabel:"C\u1ED5ng th\xF4ng tin t\u1EC9nh \u0110\u1EAFk L\u1EAFk",sourceUrl:"https://songhinh.daklak.gov.vn/upload/103900/20221005/Bao_cao_TH_cuoi_ky_QHT_Phu_Yen_68733.pdf"},"V\u1ECBnh Nha Trang":{significance:"V\u1ECBnh k\xEDn gi\xF3 v\u1EDBi h\u1EC7 th\u1ED1ng \u0111\u1EA3o, b\xE3i bi\u1EC3n v\xE0 r\u1EA1n san h\xF4 t\u1EA1o n\xEAn trung t\xE2m du l\u1ECBch bi\u1EC3n v\xE0 nghi\xEAn c\u1EE9u h\u1EA3i d\u01B0\u01A1ng quan tr\u1ECDng.",history:"Kh\xF4ng gian v\u1ECBnh g\u1EAFn v\u1EDBi qu\xE1 tr\xECnh h\xECnh th\xE0nh \u0111\xF4 th\u1ECB Nha Trang v\xE0 c\xE1c c\u1ED9ng \u0111\u1ED3ng l\xE0ng bi\u1EC3n, c\u1EA3ng bi\u1EC3n l\xE2u \u0111\u1EDDi.",sourceLabel:"C\u1ED5ng du l\u1ECBch s\u1ED1 Kh\xE1nh H\xF2a",sourceUrl:"https://dulichso.khanhhoa.gov.vn/"},"V\u1ECBnh V\u0129nh Hy":{significance:"V\u1ECBnh \u0111\u01B0\u1EE3c n\xFAi thu\u1ED9c V\u01B0\u1EDDn qu\u1ED1c gia N\xFAi Ch\xFAa che ch\u1EAFn, c\xF3 n\u01B0\u1EDBc trong v\xE0 h\u1EC7 sinh th\xE1i san h\xF4 gi\xE0u gi\xE1 tr\u1ECB.",history:"L\xE0ng bi\u1EC3n V\u0129nh Hy l\u01B0u gi\u1EEF sinh k\u1EBF \u0111\xE1nh b\u1EAFt v\xE0 v\u0103n h\xF3a c\u01B0 d\xE2n duy\xEAn h\u1EA3i Nam Trung B\u1ED9.",sourceLabel:"C\u1ED5ng du l\u1ECBch s\u1ED1 Kh\xE1nh H\xF2a",sourceUrl:"https://dulichso.khanhhoa.gov.vn/article/vinh-vinh-hy-8ea"},"Qu\u1EA7n \u0111\u1EA3o Tr\u01B0\u1EDDng Sa":{significance:"H\u01A1n 100 \u0111\u1EA3o, \u0111\xE1, b\xE3i c\u1EA1n v\xE0 r\u1EA1n san h\xF4 tr\u1EA3i tr\xEAn v\xF9ng bi\u1EC3n r\u1ED9ng \u1EDF ph\xEDa nam Bi\u1EC3n \u0110\xF4ng, c\xF3 v\u1ECB tr\xED chi\u1EBFn l\u01B0\u1EE3c v\u1EC1 qu\u1ED1c ph\xF2ng, h\xE0ng h\u1EA3i v\xE0 kinh t\u1EBF bi\u1EC3n.",history:"T\u01B0 li\u1EC7u v\xE0 b\u1EA3n \u0111\u1ED3 qua nhi\u1EC1u th\u1EBF k\u1EF7 ghi nh\u1EADn qu\xE1 tr\xECnh x\xE1c l\u1EADp ch\u1EE7 quy\u1EC1n c\u1EE7a Vi\u1EC7t Nam; bia ch\u1EE7 quy\u1EC1n t\u1EA1i Song T\u1EED T\xE2y v\xE0 Nam Y\u1EBFt \u0111\u01B0\u1EE3c x\u1EBFp h\u1EA1ng di t\xEDch l\u1ECBch s\u1EED qu\u1ED1c gia n\u0103m 2014.",sourceLabel:"S\u1EDF V\u0103n h\xF3a, Th\u1EC3 thao v\xE0 Du l\u1ECBch Kh\xE1nh H\xF2a",sourceUrl:"https://svhttdl.khanhhoa.gov.vn/vi/di-tichdi-san-cap-quoc-gia/bia-chu-quyen-quan-dao-truong-sa-tai-dao-song-tu-tay-va-dao-nam-yet"},"\u0110\xE0 L\u1EA1t":{significance:"\u0110\u1ED9 cao kho\u1EA3ng 1.500 m, kh\xED h\u1EADu \xF4n h\xF2a, r\u1EEBng th\xF4ng, h\u1ED3 v\xE0 qu\u1EF9 ki\u1EBFn tr\xFAc ngh\u1EC9 d\u01B0\u1EE1ng t\u1EA1o n\xEAn b\u1EA3n s\u1EAFc \u0111\xF4 th\u1ECB cao nguy\xEAn.",history:"\u0110\xE0 L\u1EA1t \u0111\u01B0\u1EE3c h\xECnh th\xE0nh t\u1EEB cu\u1ED1i th\u1EBF k\u1EF7 XIX v\xE0 ph\xE1t tri\u1EC3n th\xE0nh \u0111\xF4 th\u1ECB ngh\u1EC9 d\u01B0\u1EE1ng; v\u0103n h\xF3a K\u2019Ho b\u1EA3n \u0111\u1ECBa c\xF9ng nhi\u1EC1u l\u1EDBp c\u01B0 d\xE2n g\xF3p ph\u1EA7n l\xE0m n\xEAn t\xEDnh c\xE1ch th\xE0nh ph\u1ED1.",sourceLabel:"\u0110\u1ECBa ch\xED \u0110\xE0 L\u1EA1t \u2013 C\u1ED5ng th\xF4ng tin L\xE2m \u0110\u1ED3ng",sourceUrl:"https://lamdong.gov.vn/sites/book/diachidalat/Phan2/chuong1.htm"},"M\u0169i N\xE9":{significance:"B\u1EDD bi\u1EC3n, \u0111\u1ED3i c\xE1t \u0111\u1ECF \u2013 tr\u1EAFng, \u0111\u1ECBa h\xECnh \u201Cc\xE1t\u201D v\xE0 \u0111i\u1EC1u ki\u1EC7n gi\xF3 t\u1EA1o th\u1EBF m\u1EA1nh cho ngh\u1EC9 d\u01B0\u1EE1ng c\xF9ng th\u1EC3 thao bi\u1EC3n.",history:"T\u1EEB m\u1ED9t l\xE0ng ch\xE0i, M\u0169i N\xE9 ph\xE1t tri\u1EC3n th\xE0nh khu du l\u1ECBch qu\u1ED1c gia nh\u01B0ng v\u1EABn l\u01B0u gi\u1EEF sinh ho\u1EA1t ngh\u1EC1 bi\u1EC3n v\xE0 l\u1EC5 h\u1ED9i c\u1ED9ng \u0111\u1ED3ng ven bi\u1EC3n.",sourceLabel:"S\u1EDF V\u0103n h\xF3a, Th\u1EC3 thao v\xE0 Du l\u1ECBch L\xE2m \u0110\u1ED3ng",sourceUrl:"https://lamdong.gov.vn/sites/svhttdl/hoatdongdulich/quyhoachdautu/Shared%20Documents/Quy%E1%BA%BFt%20%C4%91%E1%BB%8Bnh%20ph%C3%AA%20duy%E1%BB%87t%20%28k%C3%BD%20s%E1%BB%91%20ph%C3%A1t%20h%C3%A0nh%29.signed.signed.pdf"},"V\u01B0\u1EDDn qu\u1ED1c gia C\xE1t Ti\xEAn":{significance:"R\u1EEBng nhi\u1EC7t \u0111\u1EDBi, s\xF4ng \u0110\u1ED3ng Nai v\xE0 v\xF9ng \u0111\u1EA5t ng\u1EADp n\u01B0\u1EDBc B\xE0u S\u1EA5u b\u1EA3o t\u1ED3n nhi\u1EC1u lo\xE0i qu\xFD hi\u1EBFm c\xF9ng c\xE1c qu\xE1 tr\xECnh sinh th\xE1i quan tr\u1ECDng.",history:"B\xE0u S\u1EA5u \u0111\u01B0\u1EE3c c\xF4ng nh\u1EADn l\xE0 v\xF9ng \u0111\u1EA5t ng\u1EADp n\u01B0\u1EDBc Ramsar n\u0103m 2005; C\xE1t Ti\xEAn c\xF2n l\u01B0u gi\u1EEF di ch\u1EC9 kh\u1EA3o c\u1ED5 c\u1EE7a c\xE1c c\u1ED9ng \u0111\u1ED3ng c\u1ED5.",sourceLabel:"C\u1ED5ng th\xF4ng tin t\u1EC9nh \u0110\u1ED3ng Nai",sourceUrl:"https://hvhnt.dongnai.gov.vn/Pages/newsdetail.aspx?CatId=100&NewsId=4535"},"B\xF9 Gia M\u1EADp":{significance:"V\u01B0\u1EDDn qu\u1ED1c gia n\u1EB1m \u1EDF v\xF9ng chuy\u1EC3n ti\u1EBFp \u0110\xF4ng Nam B\u1ED9 \u2013 T\xE2y Nguy\xEAn, b\u1EA3o v\u1EC7 r\u1EEBng th\u01B0\u1EDDng xanh, \u0111\u1EA7u ngu\u1ED3n v\xE0 h\xE0nh lang \u0111a d\u1EA1ng sinh h\u1ECDc.",history:"Khu v\u1EF1c t\u1EEBng l\xE0 \u0111\u1ECBa b\xE0n c\u0103n c\u1EE9 trong kh\xE1ng chi\u1EBFn; ng\xE0y nay gi\xE1 tr\u1ECB r\u1EEBng v\xE0 v\u0103n h\xF3a c\u1ED9ng \u0111\u1ED3ng S\u2019ti\xEAng, M\u2019n\xF4ng l\xE0 n\u1EC1n t\u1EA3ng cho gi\xE1o d\u1EE5c, du l\u1ECBch sinh th\xE1i.",sourceLabel:"C\u1ED5ng th\xF4ng tin t\u1EC9nh \u0110\u1ED3ng Nai",sourceUrl:"https://dongnai.gov.vn/"},"N\xFAi B\xE0 \u0110en":{significance:"\u0110\u1EC9nh cao 986 m l\xE0 \u201Cn\xF3c nh\xE0 Nam B\u1ED9\u201D, n\u1ED5i b\u1EADt gi\u1EEFa \u0111\u1ED3ng b\u1EB1ng v\xE0 k\u1EBFt h\u1EE3p gi\xE1 tr\u1ECB c\u1EA3nh quan, t\xE2m linh, sinh th\xE1i.",history:"N\xFAi g\u1EAFn v\u1EDBi truy\u1EC1n thuy\u1EBFt Linh S\u01A1n Th\xE1nh M\u1EABu, h\u1EC7 th\u1ED1ng ch\xF9a hang v\xE0 nhi\u1EC1u c\u0103n c\u1EE9 c\xE1ch m\u1EA1ng; l\u1EC5 v\xEDa B\xE0 \u0111\u01B0\u1EE3c ghi danh di s\u1EA3n v\u0103n h\xF3a phi v\u1EADt th\u1EC3 qu\u1ED1c gia.",sourceLabel:"Ban qu\u1EA3n l\xFD Khu du l\u1ECBch qu\u1ED1c gia N\xFAi B\xE0 \u0110en",sourceUrl:"https://khudulichnuibaden.tayninh.gov.vn/gioi-thieu-nui-ba-den"},"L\xE0ng n\u1ED5i T\xE2n L\u1EADp":{significance:"R\u1EEBng tr\xE0m, k\xEAnh r\u1EA1ch v\xE0 v\xF9ng ng\u1EADp n\u01B0\u1EDBc t\xE1i hi\u1EC7n h\u1EC7 sinh th\xE1i \u0111\u1EB7c tr\u01B0ng c\u1EE7a \u0110\u1ED3ng Th\xE1p M\u01B0\u1EDDi.",history:"Kh\xF4ng gian n\xE0y g\u1EE3i l\u1EA1i qu\xE1 tr\xECnh khai ph\xE1, th\xEDch nghi v\u1EDBi m\xF9a n\u01B0\u1EDBc c\u1EE7a c\u01B0 d\xE2n v\xF9ng tr\u0169ng Nam B\u1ED9.",sourceLabel:"C\u1ED5ng du l\u1ECBch T\xE2y Ninh",sourceUrl:"https://dulich.tayninh.gov.vn/tin-tuc/lang-noi-tan-lap-67"},"S\xF4ng S\xE0i G\xF2n":{significance:"L\xE0 ph\u1EE5 l\u01B0u c\u1EE7a s\xF4ng \u0110\u1ED3ng Nai, d\xF2ng s\xF4ng k\u1EBFt n\u1ED1i n\u1ED9i \u0111\u1ECBa v\u1EDBi c\u1EEDa C\u1EA7n Gi\u1EDD v\xE0 gi\u1EEF vai tr\xF2 l\u1EDBn trong giao th\xF4ng, c\u1EA3nh quan, kinh t\u1EBF \u0111\xF4 th\u1ECB.",history:"D\u1ECDc s\xF4ng h\xECnh th\xE0nh b\u1EBFn c\u1EA3ng v\xE0 m\u1EA1ng l\u01B0\u1EDBi giao th\u01B0\u01A1ng gi\xFAp S\xE0i G\xF2n s\u1EDBm ph\xE1t tri\u1EC3n th\xE0nh \u0111\xF4 th\u1ECB qu\u1ED1c t\u1EBF.",sourceLabel:"S\u1EDF Quy ho\u1EA1ch \u2013 Ki\u1EBFn tr\xFAc TP.HCM",sourceUrl:"https://qhkt.hochiminhcity.gov.vn/Media/Uploads/H%C3%ACnh%20H%E1%BB%99i%20th%E1%BA%A3o%20-%20H%E1%BB%99i%20ngh%E1%BB%8B/2019%20-%20b%E1%BB%9D%20s%C3%B4ng%20SG%20den%202015/kiyeu_hoithao_bsong%20SG-%C4%91%C3%A3%20n%C3%A9n.pdf"},"C\xF4n \u0110\u1EA3o":{significance:"Qu\u1EA7n \u0111\u1EA3o c\xF3 r\u1EEBng, r\u1EA1n san h\xF4, th\u1EA3m c\u1ECF bi\u1EC3n v\xE0 b\xE3i \u0111\u1EBB c\u1EE7a r\xF9a bi\u1EC3n, mang gi\xE1 tr\u1ECB b\u1EA3o t\u1ED3n bi\u1EC3n \u2013 \u0111\u1EA3o \u0111\u1EB7c bi\u1EC7t.",history:"H\u1EC7 th\u1ED1ng nh\xE0 t\xF9 C\xF4n \u0110\u1EA3o l\xE0 di t\xEDch qu\u1ED1c gia \u0111\u1EB7c bi\u1EC7t, ghi d\u1EA5u s\u1EF1 hy sinh v\xE0 \xFD ch\xED c\u1EE7a nhi\u1EC1u th\u1EBF h\u1EC7 chi\u1EBFn s\u0129 c\xE1ch m\u1EA1ng.",sourceLabel:"C\u1ED5ng th\xF4ng tin C\xF4n \u0110\u1EA3o",sourceUrl:"https://condao.com.vn/"},"N\xFAi Sam":{significance:"Ng\u1ECDn n\xFAi \u0111\xE1 cao 284 m n\u1ED5i gi\u1EEFa \u0111\u1ED3ng b\u1EB1ng Ch\xE2u \u0110\u1ED1c, t\u1EADp trung qu\u1EA7n th\u1EC3 di t\xEDch v\xE0 th\u1EF1c h\xE0nh t\xEDn ng\u01B0\u1EE1ng quan tr\u1ECDng c\u1EE7a Nam B\u1ED9.",history:"N\xFAi c\xF2n c\xF3 t\xEAn V\u0129nh T\u1EBF S\u01A1n, \u0111\u01B0\u1EE3c vua Minh M\u1EA1ng \u0111\u1EB7t \u0111\u1EC3 ghi c\xF4ng Tho\u1EA1i Ng\u1ECDc H\u1EA7u; l\u1EC5 v\xEDa B\xE0 Ch\xFAa X\u1EE9 ph\u1EA3n \xE1nh giao thoa v\u0103n h\xF3a Kinh, Hoa, Ch\u0103m, Khmer.",sourceLabel:"C\u1ED5ng th\xF4ng tin An Giang",sourceUrl:"https://angiang.gov.vn/vi/thuong-truc-ubnd-tinh-lam-viec-voi-ban-quan-ly-khu-du-lich-quoc-gia-nui-sam"},"Ph\xFA Qu\u1ED1c":{significance:"\u0110\u1EA3o c\xF3 b\xE3i bi\u1EC3n, r\u1EEBng qu\u1ED1c gia, su\u1ED1i, r\u1EA1n san h\xF4 v\xE0 ngu\u1ED3n t\xE0i nguy\xEAn bi\u1EC3n \u0111a d\u1EA1ng c\u1EE7a v\u1ECBnh Th\xE1i Lan.",history:"L\xE0ng ch\xE0i, ngh\u1EC1 l\xE0m n\u01B0\u1EDBc m\u1EAFm, tr\u1ED3ng h\u1ED3 ti\xEAu v\xE0 c\xE1c di t\xEDch nh\u01B0 Nh\xE0 t\xF9 Ph\xFA Qu\u1ED1c t\u1EA1o n\xEAn nhi\u1EC1u l\u1EDBp v\u0103n h\xF3a \u2013 l\u1ECBch s\u1EED c\u1EE7a \u0111\u1EA3o.",sourceLabel:"C\u1ED5ng th\xF4ng tin \u0111\u1EB7c khu Ph\xFA Qu\u1ED1c",sourceUrl:"https://phuquoc.angiang.gov.vn/dinh-huong-quy-hoach-cac-khu-du-lich"},"V\u01B0\u1EDDn qu\u1ED1c gia Tr\xE0m Chim":{significance:"H\u1EC7 sinh th\xE1i \u0111\u1EA5t ng\u1EADp n\u01B0\u1EDBc ti\xEAu bi\u1EC3u c\u1EE7a \u0110\u1ED3ng Th\xE1p M\u01B0\u1EDDi b\u1EA3o t\u1ED3n kho\u1EA3ng 130 lo\xE0i th\u1EF1c v\u1EADt v\xE0 h\u01A1n 198 lo\xE0i chim n\u01B0\u1EDBc.",history:"Tr\xE0m Chim \u0111\u01B0\u1EE3c c\xF4ng nh\u1EADn l\xE0 khu Ramsar th\u1EE9 t\u01B0 c\u1EE7a Vi\u1EC7t Nam, \u0111\u1ED3ng th\u1EDDi l\u01B0u gi\u1EEF c\u1EA3nh quan t\u1EEBng ph\u1ED5 bi\u1EBFn c\u1EE7a v\xF9ng \u0110\u1ED3ng Th\xE1p M\u01B0\u1EDDi.",sourceLabel:"C\u1ED5ng du l\u1ECBch \u0110\u1ED3ng Th\xE1p",sourceUrl:"https://dulich.dongthap.gov.vn/vi/tramchim"},"Ch\u1EE3 n\u1ED5i C\xE1i B\xE8":{significance:"Ch\u1EE3 tr\xEAn s\xF4ng Ti\u1EC1n th\u1EC3 hi\u1EC7n ph\u01B0\u01A1ng th\u1EE9c ph\xE2n ph\u1ED1i n\xF4ng s\u1EA3n v\xE0 n\u1EBFp s\u1ED1ng th\u01B0\u01A1ng h\u1ED3 c\u1EE7a c\u01B0 d\xE2n \u0111\u1ED3ng b\u1EB1ng s\xF4ng C\u1EEDu Long.",history:"Ch\u1EE3 h\xECnh th\xE0nh t\u1EEB nhu c\u1EA7u trao \u0111\u1ED5i h\xE0ng h\xF3a \u1EDF v\xE0m C\xE1i B\xE8 v\xE0 t\u1EEBng ph\xE1t tri\u1EC3n th\xE0nh m\u1ED9t \u0111\u1EA7u m\u1ED1i l\u1EDBn c\u1EE7a v\xF9ng.",sourceLabel:"C\u1ED5ng du l\u1ECBch \u0110\u1ED3ng Th\xE1p",sourceUrl:"https://dulich.dongthap.gov.vn/iv/chonoicaibe"},"C\u1ED3n Ph\u1EE5ng":{significance:"C\xF9 lao gi\u1EEFa s\xF4ng Ti\u1EC1n ti\xEAu bi\u1EC3u cho c\u1EA3nh quan mi\u1EC7t v\u01B0\u1EDDn, k\xEAnh r\u1EA1ch, c\xE2y tr\xE1i v\xE0 ngh\u1EC1 th\u1EE7 c\xF4ng x\u1EE9 d\u1EEBa.",history:"C\u1ED3n c\xF2n g\u1EAFn v\u1EDBi d\u1EA5u t\xEDch \u0110\u1EA1o D\u1EEBa h\xECnh th\xE0nh trong th\u1EBF k\u1EF7 XX, m\u1ED9t hi\u1EC7n t\u01B0\u1EE3ng t\xEDn ng\u01B0\u1EE1ng \u0111\u1EB7c bi\u1EC7t \u1EDF Nam B\u1ED9.",sourceLabel:"C\u1ED5ng du l\u1ECBch V\u0129nh Long",sourceUrl:"https://vinhlong.gov.vn/du-khach/diadanh_test"},"Ao B\xE0 Om":{significance:"H\u1ED3 c\u1ED5, h\xE0ng c\xE2y d\u1EA7u c\xF3 b\u1ED9 r\u1EC5 n\u1ED5i v\xE0 qu\u1EA7n th\u1EC3 ch\xF9a \xC2ng t\u1EA1o n\xEAn trung t\xE2m c\u1EA3nh quan \u2013 v\u0103n h\xF3a Khmer \u0111\u1EB7c s\u1EAFc.",history:"\u0110\u1ECBa danh g\u1EAFn v\u1EDBi nhi\u1EC1u truy\u1EC1n thuy\u1EBFt Khmer v\u1EC1 vi\u1EC7c \u0111\xE0o ao; kh\xF4ng gian quanh ao l\xE0 n\u01A1i di\u1EC5n ra c\xE1c sinh ho\u1EA1t l\u1EC5 h\u1ED9i, c\u1ED9ng \u0111\u1ED3ng l\xE2u \u0111\u1EDDi.",sourceLabel:"C\u1ED5ng th\xF4ng tin V\u0129nh Long",sourceUrl:"https://vinhlong.gov.vn/du-khach/diadanh_test"},"Ch\u1EE3 n\u1ED5i C\xE1i R\u0103ng":{significance:"Ch\u1EE3 \u0111\u1EA7u m\u1ED1i tr\xEAn s\xF4ng C\u1EA7n Th\u01A1 th\u1EC3 hi\u1EC7n m\u1EA1ng l\u01B0\u1EDBi th\u01B0\u01A1ng m\u1EA1i \u0111\u01B0\u1EDDng th\u1EE7y v\xE0 v\u0103n h\xF3a \u201Cc\xE2y b\u1EB9o\u201D \u0111\u1EB7c tr\u01B0ng mi\u1EC1n T\xE2y.",history:"V\u0103n h\xF3a ch\u1EE3 n\u1ED5i C\xE1i R\u0103ng \u0111\u01B0\u1EE3c \u0111\u01B0a v\xE0o Danh m\u1EE5c di s\u1EA3n v\u0103n h\xF3a phi v\u1EADt th\u1EC3 qu\u1ED1c gia n\u0103m 2016.",sourceLabel:"C\u1ED5ng du l\u1ECBch C\u1EA7n Th\u01A1",sourceUrl:"https://dulich.cantho.gov.vn/"},"Ch\xF9a D\u01A1i":{significance:"Ki\u1EBFn tr\xFAc, m\u1EF9 thu\u1EADt Ph\u1EADt gi\xE1o Nam t\xF4ng Khmer v\xE0 \u0111\xE0n d\u01A1i qu\u1EA1 trong khu\xF4n vi\xEAn t\u1EA1o n\xEAn m\u1ED9t kh\xF4ng gian v\u0103n h\xF3a \u2013 sinh th\xE1i \u0111\u1ED9c \u0111\xE1o.",history:"T\xEAn ch\xEDnh Waths\xEAr\xE2yt\xEAch\xF4 \u2013 Mahatup; di t\xEDch ph\u1EA3n \xE1nh l\u1ECBch s\u1EED, t\xEDn ng\u01B0\u1EE1ng v\xE0 ngh\u1EC7 thu\u1EADt c\u1EE7a c\u1ED9ng \u0111\u1ED3ng Khmer S\xF3c Tr\u0103ng qua nhi\u1EC1u th\u1EBF k\u1EF7.",sourceLabel:"C\u1ED5ng th\xF4ng tin th\xE0nh ph\u1ED1 S\xF3c Tr\u0103ng",sourceUrl:"https://ubndtp.soctrang.gov.vn/mDefault.aspx?catid=53984&catname=Di+t%C3%ADch%2C+danh+th%E1%BA%AFng&id=366150&pageid=39&sid=1279&sname=tpsoctrang&title=ly-lich-di-tich-kien-truc-nghe-thuat-chua-wathseraytecho-mahatup-chua-ma-toc-chua-doi"},"M\u0169i C\xE0 Mau":{significance:"\u0110\xE2y l\xE0 v\xF9ng c\u1EF1c Nam tr\xEAn \u0111\u1EA5t li\u1EC1n, n\u01A1i r\u1EEBng ng\u1EADp m\u1EB7n, b\xE3i b\u1ED3i v\xE0 h\u1EC7 sinh th\xE1i c\u1EEDa s\xF4ng \u2013 ven bi\u1EC3n li\xEAn t\u1EE5c bi\u1EBFn \u0111\u1ED5i theo ph\xF9 sa.",history:"M\u0169i C\xE0 Mau l\xE0 bi\u1EC3u t\u01B0\u1EE3ng \u0111\u1ECBa l\xFD v\xE0 ch\u1EE7 quy\u1EC1n l\xE3nh th\u1ED5; c\u1ED9t m\u1ED1c t\u1ECDa \u0111\u1ED9, bi\u1EC3u t\u01B0\u1EE3ng con t\xE0u v\xE0 \u0111\u01B0\u1EDDng H\u1ED3 Ch\xED Minh l\xE0 c\xE1c \u0111i\u1EC3m ghi d\u1EA5u h\xE0nh tr\xECnh \u0111\u1EA5t n\u01B0\u1EDBc.",sourceLabel:"C\u1ED5ng x\xFAc ti\u1EBFn \u0111\u1EA7u t\u01B0 C\xE0 Mau",sourceUrl:"https://xuctiendautu.camau.gov.vn/ca-mau-diem-den-hap-dan-tap-trung-phat-trien-du-lich-sinh-thai-du-lich-van-hoa-tam-linh-du-lich-trai-nghiem897-2/"},"\u0110i\u1EC7n gi\xF3 B\u1EA1c Li\xEAu":{significance:"C\xE1c tua-bin \u0111\u1EB7t tr\xEAn v\xF9ng b\xE3i b\u1ED3i ven bi\u1EC3n v\u1EEBa s\u1EA3n xu\u1EA5t n\u0103ng l\u01B0\u1EE3ng t\xE1i t\u1EA1o, v\u1EEBa t\u1EA1o n\xEAn c\u1EA3nh quan c\xF4ng nghi\u1EC7p \u0111\u1EB7c tr\u01B0ng.",history:"C\xF4ng tr\xECnh \u0111\xE1nh d\u1EA5u giai \u0111o\u1EA1n B\u1EA1c Li\xEAu khai th\xE1c ti\u1EC1m n\u0103ng gi\xF3 ven bi\u1EC3n v\xE0 tr\u1EDF th\xE0nh m\u1ED9t \u0111i\u1EC3m du l\u1ECBch \u0111\u01B0\u1EE3c \u0111\u1ECBa ph\u01B0\u01A1ng c\xF4ng nh\u1EADn.",sourceLabel:"S\u1EDF V\u0103n h\xF3a, Th\u1EC3 thao v\xE0 Du l\u1ECBch C\xE0 Mau",sourceUrl:"https://svhttdl.baclieu.gov.vn/documents/404650/0/1.%2BBao%2Bcao%2Bhoat%2Bdong%2BVHTTDL%2Bnam%2B2023%2Bphuc%2Bvu%2BHN%2Btong%2Bket%2Bcua%2BNganh.pdf/8facfeff-ce09-a556-4cf5-c556173c2b49?t=1703563798854"}},Yn=5,Eh="sap_tet_runner_v3_landmarks_unlocked",$e=bg,wg={north:["/assets/images/tet-runner/vietnam-north.webp"],central:["/assets/images/tet-runner/vietnam-central.webp"],south:["/assets/images/tet-runner/vietnam-south.webp"]};$e.forEach(i=>{i.backgroundUrl||=wg[i.region][0],i.sceneKey=i.backgroundUrl});var Eg=[...new Set($e.map(i=>i.backgroundUrl))].map(i=>({key:i,url:i})),Ag={background:"/assets/sounds/tet-runner-background.mp3",gallop:"/assets/sounds/tet-runner-gallop.mp3?v=20260914b",envelope:"/assets/sounds/tet-runner-envelope.mp3",crash:"/assets/sounds/tet-runner-crash.mp3",failed:"/assets/sounds/tet-runner-failed.mp3",action:"/assets/sounds/tet-runner-action.mp3",landmark:"/assets/sounds/tet-runner-landmark.mp3"},Cg=0;function pr(i,t={}){return new Zs({color:i,flatShading:!0,roughness:.86,metalness:.02,...t})}function Es(i,t,e,n,s){let r=new be(i,pr(t,s));return e&&r.position.set(...e),n&&r.scale.set(...n),r}function Pe(i,t,e){return Es(new gi(...i),t,e)}function Ge(i,t,e,n,s){return Es(new Ks(i,8,6),t,e,n,s)}function Ee(i,t,e,n,s,r=7){return Es(new ps(i,t,e,r),n,s)}function mr(i,t,e=.28){let n=new vn({color:2168102,transparent:!0,opacity:e,depthWrite:!1}),s=new be(new si(t,18),n);return s.position.set(0,.045,.08),s.rotation.x=-Math.PI/2,s.scale.y=.34,i.add(s),s}function Rg(){let i=new re;i.name="horse-mascot";let t=Ge(1,Nt.orange,[0,1.45,0],[1.12,.56,.48]);i.add(t);let e=Ge(.55,14970178,[.62,1.48,0],[.78,1,.88]);i.add(e);let n=Ee(.34,.46,1.16,Nt.orange,[.62,1.95,0]);n.rotation.z=-.43,i.add(n);let s=Ge(.52,14970178,[1.04,2.48,0],[1.05,.76,.72]);s.rotation.z=-.12,i.add(s);let r=Ge(.34,16098398,[1.43,2.34,0],[1.12,.72,.8]);i.add(r);let a=new Vn(.15,.48,5),o=Es(a,Nt.orange,[.82,2.96,.2]),c=Es(a,Nt.orange,[.82,2.96,-.2]);o.rotation.z=-.2,c.rotation.z=-.2,i.add(o,c);let l=Ge(.11,Nt.white,[1.27,2.59,.38],[1,1,.55]),u=Ge(.06,Nt.darkBrown,[1.31,2.6,.44],[1,1,.45]);i.add(l,u);let f=new Vn(.18,.46,5);for(let R=0;R<5;R+=1){let y=Es(f,Nt.deepRed,[.23+R*.14,2.18+R*.15,0]);y.rotation.z=1.05,i.add(y)}let h=Ee(.38,.38,.18,Nt.red,[.72,2.16,0],8);h.rotation.z=-.42,i.add(h);let m=Pe([.62,.14,.08],Nt.gold,[.2,2.16,.06]);m.rotation.z=.22,i.add(m);let x=Ge(.58,Nt.red,[-.18,1.77,.03],[1.08,.22,.72]),T=Pe([.82,.08,.55],Nt.gold,[-.2,1.68,.03]);i.add(x,T);let g=new re;g.position.set(-1.02,1.58,0);let d=Ee(.05,.14,1.05,Nt.deepRed,[-.35,-.32,0],6);d.rotation.z=-1.02,g.add(d),i.add(g);let E=[];return[[-.65,.15],[-.6,-.2],[.57,.17],[.62,-.2]].forEach(([R,y],b)=>{let M=new re;M.position.set(R,1.17,y);let C=Ee(.13,.16,.72,b%2?14178865:Nt.orange,[0,-.34,0],6),_=Ee(.1,.12,.66,15764295,[0,-.98,0],6),w=Pe([.3,.18,.28],Nt.darkBrown,[.1,-1.28,0]);M.add(C,_,w),i.add(M),E.push(M)}),i.userData={legPivots:E,tailPivot:g,body:t,head:s,scarfTail:m,chest:e},i.scale.setScalar(.88),i}function Pg(i){let t=new re;t.name="horse-tet-accessories";let e=Ee(.2,.2,.07,Nt.gold,[.63,2.05,.4],10);e.rotation.x=Math.PI/2;let n=new be(new Vn(.13,.58,6),pr(Nt.red));return n.position.set(.7,3.17,0),n.rotation.z=-.18,t.add(e,n),i.add(t),i.userData.themeAccessories=t,t}function Ig(){let i=new re;i.add(Pe([.64,.46,.1],Nt.red,[0,0,0]));let t=Ee(.1,.1,.04,Nt.gold,[0,0,.075],8);t.rotation.x=Math.PI/2,i.add(t);let e=new be(new Vn(.32,.26,3),pr(9244704));return e.position.set(0,.11,.065),e.rotation.z=Math.PI,e.rotation.x=Math.PI/2,i.add(e),i}function Lg(){let i=new re;return i.add(Pe([.58,.58,.22],3111248,[0,0,0])),i.add(Pe([.09,.61,.24],Nt.gold,[0,0,0])),i.add(Pe([.61,.09,.24],16175981,[0,0,0])),i.rotation.z=.08,i}function Ng(){let i=new re,t=Ee(.22,.22,.78,3901269,[0,0,0],9);return t.rotation.z=Math.PI/2,i.add(t),[-.24,0,.24].forEach(e=>{let n=Ee(.235,.235,.055,Nt.gold,[e,0,0],9);n.rotation.z=Math.PI/2,i.add(n)}),i.rotation.z=-.1,i}function Ug(i){return i==="banh_chung"?Lg():i==="banh_tet"?Ng():Ig()}function Dg(){let i=new re;mr(i,.75),i.add(Ee(.46,.34,.62,Nt.purple,[0,.31,0],7)),i.add(Ee(.48,.48,.1,Nt.gold,[0,.59,0],8)),i.add(Ee(.09,.11,.62,Nt.brown,[0,.85,0],6));for(let t=0;t<8;t+=1){let e=t/8*Math.PI*2;i.add(Ge(.26,Nt.green,[Math.cos(e)*.34,1.08+t%2*.22,Math.sin(e)*.28])),i.add(Ge(.085,16754485,[Math.cos(e)*.42,1.1+t%3*.18,Math.sin(e)*.34]))}return i.scale.setScalar(.83),i}function Ah(i){let t=new re;mr(t,.82),t.add(Ee(.43,.32,.48,Nt.purple,[0,.24,0],7)),t.add(Ee(.1,.15,1.22,Nt.brown,[0,.94,0],7));let e=[];[[-.34,1.12,-.72],[.36,1.2,.72],[-.24,1.48,-.6],[.28,1.56,.58]].forEach(([n,s,r])=>{let a=Ee(.045,.075,.72,Nt.brown,[n,s,0],6);a.rotation.z=r,a.userData.baseRotation=r,t.add(a),e.push(a)});for(let n=0;n<14;n+=1){let s=n*2.18,r=.28+n%4*.13,a=Ge(.12,n%4===0?Nt.white:i,[Math.cos(s)*r,1.24+n%5*.16,Math.sin(s)*.22],[1,.72,1]);t.add(a)}return t.userData.swayParts=e,t}function Fg(){let i=new re;mr(i,1.05);for(let n=0;n<5;n+=1){let s=Ee(.08,.1,1.35+n%2*.14,11893567,[-.62+n*.31,.68,0],6);i.add(s)}i.add(Pe([1.65,.13,.18],Nt.brown,[0,.42,0])),i.add(Pe([1.65,.13,.18],Nt.brown,[0,.98,0]));let t=Ge(.16,Nt.red,[0,.74,.13],[1.2,.8,.45]);i.add(t);let e=Pe([.58,.13,.07],Nt.red,[.28,.73,.12]);return e.rotation.z=-.28,i.add(e),i.userData.movingParts=[e],i}function Bg(){let i=new re;mr(i,1.08),i.add(Pe([1.48,.5,.72],Nt.purple,[0,.48,0]));let t=[];return[-.55,.55].forEach(e=>{let n=Ee(.27,.27,.12,Nt.darkBrown,[e,.2,.42],9);n.rotation.x=Math.PI/2,i.add(n),t.push(n)}),[-.42,.05,.48].forEach((e,n)=>{let s=Ge(.27,n===1?Nt.gold:14890051,[e,.95+n%2*.08,0],[.82,1.12,.82],{emissive:n===1?7026944:5375245,emissiveIntensity:.55});i.add(s)}),i.userData.wheels=t,i}function Og(){let i=new re;return mr(i,.9),[[-.32,.32,.58,Nt.red],[.3,.3,.54,Nt.jade],[.02,.82,.62,Nt.purple]].forEach(([t,e,n,s])=>{i.add(Pe([n,n,n],s,[t,e,0])),i.add(Pe([n*.14,n*1.02,n*1.02],Nt.gold,[t,e,0]))}),i}function kg(){let i=new re,t=Ee(.035,.035,1.7,Nt.gold,[0,1.02,0],7);t.rotation.z=Math.PI/2,i.add(t);let e=[];return[-.62,-.4,-.18,.04,.26,.48,.68].forEach((n,s)=>{let r=Ee(.1,.1,.5+s%3*.12,s%2?15152959:Nt.red,[n,.55-s%2*.09,0],8);r.rotation.z=s%2?-.12:.12;let a=Ee(.11,.11,.05,Nt.gold,[n,.27-s%2*.09,0],8);i.add(r,a),e.push(r)}),i.add(Ge(.13,Nt.gold,[0,1.03,.04],[1.35,.8,.6])),i.userData.firecrackers=e,i}function zg(i){let t;return i==="kumquat_planter"?t=Dg():i==="bamboo_fence"?t=Fg():i==="lantern_cart"?t=Bg():i==="apricot_tree"?t=Ah(16765007):i==="peach_tree"?t=Ah(16742557):i==="firecracker_bundle"?t=kg():t=Og(),t.scale.multiplyScalar(1.16),t}function mo(i,t,e){let n=new re;n.position.set(i,0,-6),n.scale.setScalar(t),n.add(Pe([2.2,1.55,.8],e[0],[0,.78,0]));let s=new be(new Vn(1.65,.85,4),pr(e[1]));return s.position.set(0,1.88,0),s.rotation.y=Math.PI/4,s.scale.z=.58,n.add(s),n.add(Pe([.5,.85,.12],Nt.deepRed,[0,.42,.47])),n}function Bc(i,t,e){let n=new re;n.position.set(i,0,t),n.scale.setScalar(e),n.add(Ee(.12,.2,2.2,Nt.brown,[0,1.1,0],7));for(let s=0;s<9;s+=1){let r=s*2.4,a=.42+s%3*.2,o=s%3===0?16743057:16757059;n.add(Ge(.24,o,[Math.cos(r)*a,2.05+s%4*.22,Math.sin(r)*a],[1,.75,1]))}return n}function Vg(){let i=new _i(42,18),t=new be(i,new nn({depthWrite:!1,uniforms:{topColor:{value:new Ht(1519436)},middleColor:{value:new Ht(5850207)},bottomColor:{value:new Ht(12082257)}},vertexShader:"varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying float vY; uniform vec3 topColor; uniform vec3 middleColor; uniform vec3 bottomColor; void main(){ vec3 lower = mix(bottomColor, middleColor, smoothstep(0.0, .55, vY)); vec3 color = mix(lower, topColor, smoothstep(.45, 1.0, vY)); gl_FragColor = vec4(color, 1.0); }"}));return t.position.set(0,4.2,-22),t}function Oc(i,t,e){let n=new re;return n.position.set(i,t,-15),n.scale.setScalar(e),[[-.5,0,.45],[0,.12,.62],[.58,-.02,.4]].forEach(([s,r,a])=>{n.add(Ge(a,16770504,[s,r,0],[1.35,.62,.35],{transparent:!0,opacity:.55}))}),n}function Hg(i,t,e){let n=new be(new Vn(3.2,4.5,5),pr(e));return n.position.set(i,1.35,-12),n.scale.set(t,.7*t,.45),n.rotation.y=Math.PI/5,n}function kc(i){let t=new re;t.position.set(i,0,-4.1),t.add(Ee(.12,.16,3.8,Nt.darkBrown,[-1.6,1.9,0],7)),t.add(Ee(.12,.16,3.8,Nt.darkBrown,[1.6,1.9,0],7)),t.add(Pe([3.7,.18,.2],Nt.gold,[0,3.55,0]));let e=[];return[-1.18,-.58,0,.58,1.18].forEach((n,s)=>{let r=Ge(.22,s%2?Nt.gold:Nt.red,[n,3.17,.08],[.82,1.2,.82],{emissive:s%2?7356416:6293522,emissiveIntensity:.7});t.add(r),e.push(r)}),t.userData.lanterns=e,t}function Gg(i=16751789){let t=new be(new si(.075,5),new vn({color:i,transparent:!0,opacity:.88,depthWrite:!1}));return t.visible=!1,t}function Wg(){let i=new re;return i.name="runner-tet-decor",i.userData.floaters=[],[-7.4,7.5].forEach((t,e)=>{let n=Ge(.26,e?Nt.gold:Nt.red,[t,4.7,-7.4],[.82,1.18,.82],{emissive:e?7356416:6293522,emissiveIntensity:.7});n.userData.baseY=n.position.y,n.userData.phase=e*1.4,i.userData.floaters.push(n),i.add(n)}),i}function qg(i,t){t()}function wx({section:i,engine:t,track:e,showFallback:n}){let s=new URLSearchParams(window.location.search).get("showAllLandmarks")==="1",r=i.querySelector("#tet-runner-stage"),a=i.querySelector("#tet-runner-canvas"),o=i.querySelector("#tet-runner-ready"),c=i.querySelector("#tet-runner-paused"),l=i.querySelector("#tet-runner-result"),u=i.querySelector("#tet-runner-replay"),f=i.querySelector("#tet-runner-view-landmarks"),h=i.querySelector("#tet-runner-share-score"),m=i.querySelector("#tet-runner-share-preview"),x=i.querySelector("#tet-runner-share-preview-image"),T=i.querySelector("#tet-runner-share-preview-close"),g=i.querySelector("#tet-runner-share-preview-back"),d=i.querySelector("#tet-runner-share-preview-confirm"),E=i.querySelector("#tet-runner-share-preview-copy"),R=i.querySelector("#tet-runner-share-preview-download"),y=i.querySelector("#tet-runner-duck"),b=i.querySelector("#tet-runner-sound"),M=i.querySelector("#tet-runner-score"),C=i.querySelector("#tet-runner-high-score"),_=i.querySelector("#tet-runner-points"),w=i.querySelector("#tet-runner-combo"),I=i.querySelector("#tet-runner-points-burst"),F=i.querySelector("#tet-runner-combo-burst"),B=i.querySelector("#tet-runner-landmark"),V=i.querySelector("#tet-runner-location"),N=i.querySelector("#tet-runner-province"),G=i.querySelector("#tet-runner-landmark-name"),J=i.querySelector("#tet-runner-next-location"),Q=i.querySelector("#tet-runner-final-score"),at=i.querySelector("#tet-runner-final-points"),K=i.querySelector("#tet-runner-final-combo"),nt=i.querySelector("#tet-runner-final-items"),st=i.querySelector("#tet-runner-final-time"),Lt=i.querySelector("#tet-runner-result-copy"),vt=i.querySelector("#tet-runner-result-horse"),ue=i.querySelector("#tet-runner-result-milestone"),Kt=i.querySelector("#tet-runner-result-obstacle"),te=i.querySelector("#tet-runner-result-landmark-image"),Z=i.querySelector("#tet-runner-result-landmark"),et=i.querySelector("#tet-runner-result-progress"),St=i.querySelector("#tet-runner-result-record"),Ot=document.querySelector("#tet-landmark-library"),xt=document.querySelector("#tet-landmark-library-grid"),Gt=document.querySelector("#tet-landmark-unlocked-count"),Ae=document.querySelector("#tet-landmark-progress-label"),Ft=document.querySelector("#tet-landmark-viewer"),ee=document.querySelector("#tet-landmark-viewer-close"),ae=document.querySelector("#tet-landmark-viewer-image"),Yt=document.querySelector("#tet-landmark-viewer-province"),me=document.querySelector("#tet-landmark-viewer-title"),Ie=document.querySelector("#tet-landmark-viewer-geography"),We=document.querySelector("#tet-landmark-viewer-significance"),_e=document.querySelector("#tet-landmark-viewer-history-section"),Ce=document.querySelector("#tet-landmark-viewer-history"),U=document.querySelector("#tet-landmark-viewer-source");if(!r||!a||!y)throw new Error("runner_dom_missing");let ve=navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4||navigator.deviceMemory&&navigator.deviceMemory<=4,Jt=window.matchMedia("(prefers-reduced-motion: reduce)").matches,S;try{S=new uo({antialias:!ve,alpha:!1,powerPreference:"high-performance"})}catch{return n("webgl"),Promise.resolve()}if(!S.getContext())return n("webgl"),Promise.resolve();S.setPixelRatio(Math.min(window.devicePixelRatio||1,ve?1:1.5)),S.outputColorSpace=Ke,S.domElement.setAttribute("aria-hidden","true"),a.appendChild(S.domElement);let p=new Gs;p.background=new Ht(1519436),p.fog=new Hs(5326684,17,36);let D=new Si(-9,9,5.8,-1.6,.1,80);D.position.set(.4,3.35,13),D.lookAt(.4,2.35,0),p.add(Vg()),p.add(new js(16769972,2565183,2.65));let H=new er(16768942,2.55);H.position.set(-3,8,8),p.add(H);let Y=new be(new si(1.38,28),new vn({color:16767096,transparent:!0,opacity:.14,depthWrite:!1,fog:!1}));Y.position.set(6.3,4.35,-18.1),p.add(Y);let ct=new be(new si(1.05,28),new vn({color:16764776,transparent:!0,opacity:.94,depthWrite:!1,fog:!1}));ct.position.set(6.3,4.35,-18),p.add(ct);let ot=new re;p.add(ot);let $=Pe([48,.65,7],2169900,[2,-.33,0]);ot.add($);let tt=Pe([48,.08,3.2],7685460,[2,.02,.3]);ot.add(tt);let dt=Pe([48,.42,.14],3874867,[2,.2,-.45]),Rt=Pe([48,.055,.16],Nt.gold,[2,.43,-.42]);ot.add(dt,Rt);let ft=[];for(let A=0;A<16;A+=1){let X=Pe([.72,.035,.42],A%2?15247439:15976847,[-8+A*1.7,.08,.35]);X.rotation.y=-.12,ft.push(X),ot.add(X)}let lt=new re;lt.add(mo(-8,1.05,[7557989,9252931])),lt.add(mo(-2.6,.8,[8413297,5515326])),lt.add(mo(3.2,1.15,[6835814,9843783])),lt.add(mo(9,.88,[7820909,5060699])),lt.add(Bc(-4.1,-4.6,1)),lt.add(Bc(2.2,-5.2,.8)),lt.add(Bc(8.2,-5.5,1.1)),ot.add(lt);let At=new re;[-10,-4,2,8,14].forEach((A,X)=>At.add(Hg(A,X%2?.85:1.08,X%2?5465978:4479343))),p.add(At);let It=new re;It.add(Oc(-7,4.7,1.1),Oc(1,5.35,.72),Oc(8,4.9,.95)),p.add(It);let kt=new re,L=[kc(-8),kc(4),kc(16)];kt.add(...L),ot.add(kt);let ht=new Map,j=$e[0].sceneKey,ut=!1,_t=[lt,At,It,ct,Y],rt=new $s;Eg.forEach(({key:A,url:X},q)=>{let it=new vn({transparent:!0,opacity:0,depthWrite:!1,fog:!1}),Et=new be(new _i(22,12.38),it);Et.position.set(.4,3.55,-8.8-q*.02),Et.renderOrder=-5+q,p.add(Et),ht.set(A,{plane:Et,material:it,loaded:!1}),rt.load(X,Vt=>{Vt.colorSpace=Ke,Vt.minFilter=Wn,it.map=Vt,it.needsUpdate=!0;let pe=ht.get(A);pe.loaded=!0,!ut&&A===$e[0].sceneKey&&(ut=!0,it.opacity=1,_t.forEach(Li=>{Li.visible=!1}))},void 0,()=>{})});let Pt=Wg();p.add(Pt);let Ct=t.createMascotRegistry([{year:2026,zodiacKey:"horse",displayName:"Ng\u1EF1a",theme:"binh-ngo",createModel:Rg}]),Wt=t.getVietnamYear(new Date),se=Ct.resolve(Wt),ge=se.createModel();Pg(ge),ge.position.x=-4.5,ge.scale.setScalar(.8),ot.add(ge);let ze=new be(new si(.85,20),new vn({color:2102309,transparent:!0,opacity:.38,depthWrite:!1}));ze.rotation.x=-Math.PI/2,ze.position.set(-4.45,.055,.18),ze.scale.y=.32,ot.add(ze);let gr=Array.from({length:ve?22:44},(A,X)=>{let q=Gg(X%3?16751279:16766044);return q.userData.life=0,q.userData.velocity=new z,p.add(q),q}),oe=t.createGame({random:Math.random,storage:window.localStorage}),cn=new Set([0]),Kn=new Map,Fe=!1,pn=null,Ln=null,Ve=!1,yn=!document.hidden,Ei=!1,Ai=0,Nn=performance.now(),Ci=0,Zn=!1,As=!1,ai=!0,Ri=1,Cs=0,Hi=-1,mn=0,Pi=0,v=null;try{let A=JSON.parse(window.localStorage.getItem(Eh)||"[]");Array.isArray(A)&&A.forEach(X=>{Number.isInteger(X)&&X>=0&&X<$e.length&&cn.add(X)})}catch{}let P=Math.min($e.length,Math.floor(Math.max(0,oe.getState().highScore)/Yn)+1);for(let A=0;A<P;A+=1)cn.add(A);function W(){try{window.localStorage.setItem(Eh,JSON.stringify([...cn].sort((A,X)=>A-X)))}catch{}}function O(){!Ft||Ft.hidden||(Ft.hidden=!0,document.body.classList.remove("is-landmark-viewer-open"),v?.focus({preventScroll:!0}),v=null)}function k(A,X,q){if(!Ft||!ae||!cn.has(X))return;let it=Tg[A.landmark]||{};v=q,ae.src=A.backgroundUrl,ae.alt=`${A.landmark}, ${A.province}`,Yt.textContent=A.province,me.textContent=A.landmark,Ie.textContent=Mg[A.landmark]||`\u0110\u1ECBa danh ti\xEAu bi\u1EC3u t\u1EA1i ${A.province}.`,We.textContent=it.significance||"M\u1ED9t ph\u1EA7n c\u1EE7a c\u1EA3nh quan v\xE0 b\u1EA3n s\u1EAFc v\u0103n h\xF3a tr\xEAn h\xE0nh tr\xECnh xuy\xEAn Vi\u1EC7t.",Ce.textContent=it.history||"",_e.hidden=!it.history,U.href=it.sourceUrl||"https://vietnamtourism.gov.vn/",U.querySelector("span").textContent=`Ngu\u1ED3n ch\xEDnh th\u1EE9c: ${it.sourceLabel||"C\u1EE5c Du l\u1ECBch Qu\u1ED1c gia Vi\u1EC7t Nam"}`,Ft.hidden=!1,document.body.classList.add("is-landmark-viewer-open"),ee?.focus({preventScroll:!0}),e("landmark_view",{landmark_index:X,province:A.province,landmark:A.landmark})}ee?.addEventListener("click",O),Ft?.addEventListener("click",A=>{A.target===Ft&&O()}),document.addEventListener("keydown",A=>{A.key==="Escape"&&Ft&&!Ft.hidden&&O()});function mt(){!xt||!Gt||(Gt.textContent=String(s?$e.length:cn.size),Ae&&(Ae.innerHTML=s?`/ ${$e.length}<br>\u0111ang xem th\u1EED`:`/ ${$e.length}<br>\u0111\xE3 m\u1EDF kh\xF3a`),xt.replaceChildren(...$e.map((A,X)=>{let q=cn.has(X),it=s||q,Et=document.createElement("article");Et.className=`tet-landmark-card${it?" is-unlocked":" is-locked"}${s&&!q?" is-preview":""}`,Et.dataset.landmarkIndex=String(X),Et.setAttribute("role","listitem");let Vt=document.createElement("div");Vt.className="tet-landmark-card-image";let pe=document.createElement("img");pe.src=A.backgroundUrl,pe.loading="lazy",pe.decoding="async",pe.alt=it?`${A.landmark}, ${A.province}`:"",Vt.appendChild(pe);let Li=document.createElement("span");Li.className="tet-landmark-card-status",Li.innerHTML=s&&!q?'<i data-lucide="eye" aria-hidden="true"></i> Xem th\u1EED':it?'<i data-lucide="badge-check" aria-hidden="true"></i> \u0110\xE3 m\u1EDF kh\xF3a':'<i data-lucide="lock-keyhole" aria-hidden="true"></i> Ch\u01B0a m\u1EDF kh\xF3a',Vt.appendChild(Li);let Ps=document.createElement("div");Ps.className="tet-landmark-card-copy";let ye=document.createElement("small");ye.textContent=A.province;let Ne=document.createElement("h3");Ne.textContent=it?A.landmark:"\u0110\u1ECBa danh b\xED m\u1EADt";let je=document.createElement("span");if(je.textContent=X===0?"\u0110i\u1EC3m kh\u1EDFi h\xE0nh":`M\u1EDF kh\xF3a \u1EDF ${X*Yn} km`,Ps.append(ye,Ne,je),Et.append(Vt,Ps),q){Et.classList.add("is-interactive");let bn=document.createElement("button");bn.type="button",bn.className="tet-landmark-card-open",bn.setAttribute("aria-label",`Xem \u1EA3nh v\xE0 th\xF4ng tin ${A.landmark}, ${A.province}`),bn.addEventListener("click",()=>k(A,X,bn)),Et.appendChild(bn)}return Et})),window.lucide?.createIcons())}function bt(A,X){if(cn.has(A))return;cn.add(A),W(),mt();let q=$e[A];e("landmark_unlock",{landmark_index:A,province:q.province,landmark:q.landmark,distance_km:Number(X.toFixed(2)),mascot_year:Wt})}W(),mt();try{Fe=window.localStorage.getItem("sap_tet_runner_v1_sound")==="true"}catch{}function pt(){b.setAttribute("aria-pressed",String(Fe)),b.setAttribute("aria-label",Fe?"T\u1EAFt \xE2m thanh tr\xF2 ch\u01A1i":"B\u1EADt \xE2m thanh tr\xF2 ch\u01A1i"),b.innerHTML=Fe?'<i data-lucide="volume-2" aria-hidden="true"></i><span>\xC2m thanh</span>':'<i data-lucide="volume-x" aria-hidden="true"></i><span>\xC2m thanh</span>',window.lucide?.createIcons()}function Mt(A,X,q="sine",it=.05){if(Fe)try{pn=pn||new(window.AudioContext||window.webkitAudioContext);let Et=pn.createOscillator(),Vt=pn.createGain();Et.type=q,Et.frequency.setValueAtTime(A,pn.currentTime),Vt.gain.setValueAtTime(it,pn.currentTime),Vt.gain.exponentialRampToValueAtTime(.001,pn.currentTime+X),Et.connect(Vt).connect(pn.destination),Et.start(),Et.stop(pn.currentTime+X)}catch{}}function Tt(){return Ln||(Ln=Object.fromEntries(Object.entries(Ag).map(([A,X])=>{let q=new Audio(X);return q.preload=A==="background"||A==="gallop"?"auto":"none",q.volume=A==="background"?.095:A==="gallop"?.28:A==="failed"?.2:A==="action"?.14:.22,A==="background"&&(q.loop=!0),A==="gallop"&&(q.loop=!0),[A,q]})),Ln)}function Ut(A,X){if(!Fe)return;let q=Tt()[A];q&&(q.currentTime=0,q.play().catch(()=>{}),X&&window.setTimeout(()=>{q.paused||q.pause()},X))}function Xt(A){if(!Fe)return;let q=Tt().background;q.volume=.025,Ut("landmark",1700);let it=[[523,659,784,1047],[440,554,659,880],[392,523,659,784]],Et=it[A%it.length];Et.forEach((Vt,pe)=>{window.setTimeout(()=>Mt(Vt,.18,pe===Et.length-1?"triangle":"sine",.035),pe*115)}),window.setTimeout(()=>{Fe&&(q.volume=.095)},1250)}let wt=0;function ne(A,X=0){if(!Fe)return;let q=Tt().gallop;q.playbackRate=Ss.clamp((A||8)/9,.88,1.45);let it=()=>{try{q.currentTime=Cg}catch{}};q.readyState>=1?it():q.addEventListener("loadedmetadata",it,{once:!0}),wt=performance.now()+X,q.play().catch(()=>{})}function de(A,X,q=!0){if(!Fe&&!Ln)return;let it=Tt(),Et=it.gallop,Vt=it.background;Et.playbackRate=Ss.clamp((X||8)/9,.88,1.45);let pe=Fe&&A&&(q||performance.now()<wt);Fe&&A?Vt.paused&&Vt.play().catch(()=>{}):Vt.paused||Vt.pause(),pe&&Et.paused&&Et.play().catch(()=>{}),!pe&&!Et.paused&&Et.pause()}function fe(){Ln&&Object.values(Ln).forEach(A=>A.pause())}function ce(){let A=Math.max(1,a.clientWidth),X=Math.max(1,a.clientHeight),Et=9*(A/X);D.left=-Et/2+.45,D.right=Et/2+.45,D.top=6.5,D.bottom=-2.5,D.updateProjectionMatrix(),S.setSize(A,X,!1),S.render(p,D)}function Be(){if(!vt||typeof vt.getContext!="function")return;S.render(p,D);let A=S.domElement;if(!A.width||!A.height)return;let X=720,q=Math.max(1,Math.round(X*(A.height/A.width)));vt.width!==X&&(vt.width=X),vt.height!==q&&(vt.height=q),vt.parentElement?.style.setProperty("--shot-ratio",(A.width/A.height).toFixed(3));let it=vt.getContext("2d");it.clearRect(0,0,vt.width,vt.height),it.drawImage(A,0,0,A.width,A.height,0,0,vt.width,vt.height)}function yt(A){let X=new Set;A.entities.forEach(q=>{X.add(q.id);let it=Kn.get(q.id);it||(it=q.kind==="collectible"?Ug(q.type):zg(q.type),it.userData.kind=q.kind,it.userData.type=q.type,it.userData.baseY=q.y,Kn.set(q.id,it),ot.add(it)),it.position.x=q.x,it.position.y=q.y}),Kn.forEach((q,it)=>{X.has(it)||(ot.remove(q),q.traverse(Et=>{Et.geometry?.dispose?.(),Et.material?.dispose?.()}),Kn.delete(it))})}function xe(A){return`${Number(A||0).toFixed(2).replace(".",",")} km`}function ie(A){let X=Math.max(0,Math.round(Number(A)||0));return`${Math.floor(X/60)}:${String(X%60).padStart(2,"0")}`}function qe(A){let X=Math.max(0,Number(A)||0),q=t.journeyIndexAtKilometers(X,$e.length,Yn),it=Math.floor(X/Yn)*Yn;return{...$e[q],milestoneKm:it,milestoneLabel:it===0?"\u0110I\u1EC2M KH\u1EDEI H\xC0NH":`C\u1ED8T M\u1ED0C ${it} KM`}}function Qe(A){let X=qe(A.score),q=document.createElement("canvas");q.width=1200,q.height=630;let it=q.getContext("2d");S.render(p,D),it.drawImage(S.domElement,0,0,q.width,q.height);let Et=it.createLinearGradient(260,0,1200,0);return Et.addColorStop(0,"rgba(42, 10, 28, 0.02)"),Et.addColorStop(.52,"rgba(60, 12, 29, 0.48)"),Et.addColorStop(1,"rgba(55, 8, 20, 0.94)"),it.fillStyle=Et,it.fillRect(0,0,1200,630),it.fillStyle="#ffd45c",it.font="800 24px system-ui, sans-serif",it.fillText("S\u1EAEP T\u1EBET \xB7 MINIGAME",760,105),it.fillStyle="#fff8e8",it.font="900 50px system-ui, sans-serif",it.fillText("Ng\u1EF1a Phi \u0110\xF3n T\u1EBFt",760,170),it.fillStyle="#ffe6a3",it.font="700 25px system-ui, sans-serif",it.fillText("M\xECnh \u0111\xE3 phi \u0111\u01B0\u1EE3c",760,235),it.fillStyle="#ffffff",it.font="1000 80px system-ui, sans-serif",it.fillText(xe(A.score),760,320),it.fillStyle="#fff1c9",it.font="700 25px system-ui, sans-serif",it.fillText(`${A.bonusPoints} \u0111i\u1EC3m \xB7 Combo cao nh\u1EA5t ${A.maxCombo}`,760,375),it.fillStyle="#ffd45c",it.font="900 19px system-ui, sans-serif",it.fillText(X.milestoneLabel,760,420),it.fillStyle="#ffffff",it.font="800 27px system-ui, sans-serif",it.fillText(`${X.province} \xB7 ${X.landmark}`,760,454,390),it.fillStyle="#ffd45c",it.font="800 22px system-ui, sans-serif",it.fillText("B\u1EA1n c\xF3 v\u01B0\u1EE3t \u0111\u01B0\u1EE3c m\xECnh kh\xF4ng?",760,505),it.fillStyle="rgba(255, 248, 232, .82)",it.font="600 20px system-ui, sans-serif",it.fillText("saptet.vn",760,550),q}function Sn(A){let[X,q]=A.toDataURL("image/png").split(","),it=X.match(/:(.*?);/)?.[1]||"image/png",Et=window.atob(q),Vt=new Uint8Array(Et.length);for(let pe=0;pe<Et.length;pe+=1)Vt[pe]=Et.charCodeAt(pe);return new File([Vt],"ngua-phi-don-tet.png",{type:it})}let ln=null;function $t(){m?.setAttribute("hidden",""),x&&x.removeAttribute("src"),ln=null,h?.focus({preventScroll:!0})}function Te(){let A=oe.getState();ln=Qe(A),x.src=ln.toDataURL("image/png"),m.removeAttribute("hidden"),d.focus({preventScroll:!0}),e("share_preview",{score:A.score,bonus_points:A.bonusPoints,mascot_year:Wt})}async function Un(){let A=oe.getState(),X=qe(A.score),q=Sn(ln||Qe(A)),it={title:"Ng\u1EF1a Phi \u0110\xF3n T\u1EBFt",text:`M\xECnh \u0111\xE3 phi \u0111\u01B0\u1EE3c ${xe(A.score)}, \u0111\u1EBFn ${X.landmark} \xB7 ${X.province} trong Ng\u1EF1a Phi \u0110\xF3n T\u1EBFt. B\u1EA1n c\xF3 v\u01B0\u1EE3t \u0111\u01B0\u1EE3c kh\xF4ng? saptet.vn/ngua-phi-don-tet.html`,files:[q]},Et="download";try{navigator.share&&(!navigator.canShare||navigator.canShare({files:[q]}))?(Et="native_image",await navigator.share(it),h.classList.add("is-done"),h.innerHTML='<i data-lucide="check" aria-hidden="true"></i> \u0110\xE3 chia s\u1EBB'):(le(),h.classList.add("is-done"),h.innerHTML='<i data-lucide="download" aria-hidden="true"></i> \u0110\xE3 l\u01B0u \u1EA3nh'),$t(),window.lucide?.createIcons(),e("share_score",{score:A.score,bonus_points:A.bonusPoints,method:Et,mascot_year:Wt})}catch(Vt){Vt?.name!=="AbortError"&&(h.textContent="Th\u1EED chia s\u1EBB l\u1EA1i")}}function le(){let A=oe.getState(),X=Sn(ln||Qe(A)),q=document.createElement("a");q.href=URL.createObjectURL(X),q.download=X.name,q.click(),window.setTimeout(()=>URL.revokeObjectURL(q.href),1e3),e("download_score_image",{score:A.score,bonus_points:A.bonusPoints,mascot_year:Wt})}async function Dn(){let A=oe.getState(),X=ln||Qe(A);try{if(!navigator.clipboard?.write||typeof ClipboardItem>"u")throw new Error("Clipboard API not supported");let q=await new Promise((it,Et)=>{X.toBlob(Vt=>Vt?it(Vt):Et(new Error("toBlob failed")),"image/png")});await navigator.clipboard.write([new ClipboardItem({"image/png":q})]),E&&(E.innerHTML='<i data-lucide="check" aria-hidden="true"></i> \u0110\xE3 sao ch\xE9p',E.classList.add("is-done"),window.lucide?.createIcons(),window.setTimeout(()=>{E.innerHTML='<i data-lucide="copy" aria-hidden="true"></i> Sao ch\xE9p \u1EA3nh',E.classList.remove("is-done"),window.lucide?.createIcons()},2e3)),e("copy_score_image",{score:A.score,bonus_points:A.bonusPoints,mascot_year:Wt})}catch{le(),E&&(E.innerHTML='<i data-lucide="download" aria-hidden="true"></i> \u0110\xE3 l\u01B0u \u1EA3nh',window.lucide?.createIcons())}}function Jn(A){M.textContent=xe(A.score),C.textContent=xe(A.highScore),_.textContent=String(A.bonusPoints),w.textContent=`\xD7${A.multiplier}`}function Ii(A,X,q,it="petal"){let Et=0;gr.forEach((Vt,pe)=>{Et>=q||Vt.userData.life>0||(Et+=1,Vt.visible=!0,Vt.material.color.setHex(it==="dust"?pe%2?15051379:16764806:pe%3?16751279:16766044),Vt.material.opacity=.9,Vt.position.set(A+(Math.random()-.5)*.35,X+Math.random()*.18,.7+Math.random()*.5),Vt.scale.setScalar(it==="dust"?1.6:1),Vt.userData.life=.55+Math.random()*.4,Vt.userData.velocity.set((Math.random()-.55)*2.7,.9+Math.random()*2.5,(Math.random()-.5)*.25),Vt.userData.spin=(Math.random()-.5)*.25)})}function Ch(A){gr.forEach(X=>{if(!(X.userData.life<=0)){if(X.userData.life-=A,X.userData.life<=0){X.visible=!1;return}X.userData.velocity.y-=4.6*A,X.position.addScaledVector(X.userData.velocity,A),X.rotation.z+=X.userData.spin,X.material.opacity=Math.min(.9,X.userData.life*1.5)}})}function go(A,X){A&&(window.clearTimeout(A._flashTimer),A.textContent=X,A.hidden=!1,A.classList.remove("is-visible"),A.offsetWidth,A.classList.add("is-visible"),A._flashTimer=window.setTimeout(()=>{A.hidden=!0},1500))}function Rh(A){let X=t.journeyIndexAtKilometers(A,$e.length,Yn),q=Math.max(0,A)%Yn,it=Yn-q;if(J&&(J.textContent=`C\xF2n ${it.toFixed(2).replace(".",",")} km \u0111\u1EBFn \u0111i\u1EC3m ti\u1EBFp theo`),bt(X,A),X===Hi)return;Hi=X;let Et=$e[X];j=Et.sceneKey,N.textContent=Et.province,G.textContent=Et.landmark,V.classList.remove("is-arriving"),V.offsetWidth,V.classList.add("is-arriving"),A>0&&(go(B,`${Et.province} \xB7 ${Et.landmark}`),Xt(X))}function Ph(A){let q=ht.get(j)?.loaded?j:[...ht.entries()].find(([,it])=>it.loaded)?.[0];ht.forEach((it,Et)=>{let Vt=ut&&Et===q?1:0;it.material.opacity=Ss.damp(it.material.opacity,Vt,3.8,A)})}function Ih(A){r.classList.remove("is-playing"),de(!1,A.speed),Q.textContent=xe(A.score),at.textContent=String(A.bonusPoints),K.textContent=String(A.maxCombo);let X={kumquat_planter:"Ch\u1EADu qu\u1EA5t",bamboo_fence:"H\xE0ng r\xE0o tre",lantern_cart:"Xe \u0111\xE8n l\u1ED3ng",tet_gifts:"N\xFAi qu\xE0 T\u1EBFt",apricot_tree:"C\xE2y hoa mai",peach_tree:"C\xE2y hoa \u0111\xE0o",firecracker_bundle:"Ch\xF9m ph\xE1o T\u1EBFt"},q=Math.max(0,A.highScore-A.score);Lt.textContent=A.isHighScore?"K\u1EF7 l\u1EE5c m\u1EDBi! M\xE3 \u0111\xE1o th\xE0nh c\xF4ng r\u1ED3i!":`C\xF2n ${xe(q)} n\u1EEFa l\xE0 ch\u1EA1m k\u1EF7 l\u1EE5c c\u1EE7a b\u1EA1n.`;let it=qe(A.score),Et=Yn-Math.max(0,A.score)%Yn;if(ue&&(ue.textContent=it.milestoneLabel),Kt){let Vt=X[A.crashObstacleType]||"Ch\u01B0\u1EDBng ng\u1EA1i";Kt.querySelector("b").textContent=`${Vt} ch\u1EB7n \u0111\u01B0\u1EDDng`}nt&&(nt.textContent=String(A.envelopes)),st&&(st.textContent=ie(A.elapsed)),Z&&(Z.textContent=`${it.landmark} \xB7 ${it.province}`),te&&(te.src=it.backgroundUrl||"",te.alt=`${it.landmark}, ${it.province}`),et&&(et.textContent=`\u0110\xE3 m\u1EDF kh\xF3a ${cn.size}/${$e.length} \u0111\u1ECBa danh \xB7 c\xF2n ${xe(Et)} t\u1EDBi m\u1ED1c k\u1EBF ti\u1EBFp`),St&&(St.classList.toggle("is-record",!!A.isHighScore),St.querySelector("span").textContent=A.isHighScore?`K\u1EF7 l\u1EE5c m\u1EDBi ${xe(A.score)}`:`K\u1EF7 l\u1EE5c ${xe(A.highScore)}`),Cs=performance.now()+280,Ii(-4.1,1.1,ve?8:16,"petal"),Ut("crash",900),window.setTimeout(()=>{Be(),l.removeAttribute("hidden"),u.focus({preventScroll:!0}),Ut("failed",2800)},Jt?0:240),e("game_over",{score:A.score,distance:A.score,distance_km:A.score,duration_s:Math.round(A.elapsed),max_speed:Number(A.maxSpeed.toFixed(2)),envelopes:A.envelopes,items_collected:A.envelopes,bonus_points:A.bonusPoints,max_combo:A.maxCombo,obstacle_type:A.crashObstacleType,is_high_score:A.isHighScore,mascot_year:Wt})}function Lh(A,X){A.forEach(q=>{q.type==="collectible_collected"&&(go(I,`+${q.points} \u0111i\u1EC3m`),Mt(720+q.combo*25,.12,"triangle",.045),Ut("envelope",900),Ii(-3.7,X.playerY+1.25,ve?5:9,"petal"),X.multiplier>Ri&&(go(F,{2:"Song m\xE3! \xD72",3:"M\xE3 \u0111\xE1o! \xD73",4:"Phi n\u01B0\u1EDBc \u0111\u1EA1i! \xD74"}[X.multiplier]),Mt(880+X.multiplier*80,.24,"triangle",.065)),Ri=X.multiplier),q.type==="combo_reset"&&(Ri=1),q.type==="score_milestone"&&e("score_milestone",{score:q.score,mascot_year:Wt}),q.type==="game_over"&&Ih(X)})}function Nh(A,X,q){de(q.status==="running",q.speed,q.grounded),Pi+=X*(q.status==="running"?12+q.speed*.7:2.5);let it=Pi,Et=q.grounded?0:Math.min(.14,q.playerY*.045),Vt=Math.sin(it),pe=Math.sign(Vt)*Math.pow(Math.abs(Vt),.62),Li=q.status==="running"&&q.grounded?Math.abs(Math.sin(it*2))*.065:0,Ps=q.status==="ready"?Math.sin(A*.004)*.025:0;mn=Ss.damp(mn,q.ducking?1:0,18,X),ge.position.y=q.playerY-mn*.08,ge.position.y+=Ps+Li*(1-mn),ge.rotation.z=q.status==="crashed"?-.32:q.status==="running"?pe*.018:Math.sin(A*.002)*.01,ge.scale.set(.8-Et*.24+mn*.06,.8+Et-mn*.36,.8),ge.userData.legPivots.forEach((ye,Ne)=>{let je=Ne%2?Math.PI:0,bn=Math.sin(it+je),Uh=Math.sign(bn)*Math.pow(Math.abs(bn),.58);ye.rotation.z=mn>.05?Ne%2?-.88:.88:q.grounded?Uh*.72:Ne%2?-.42:.52}),ge.userData.tailPivot.rotation.z=pe*.22,ge.userData.head.rotation.z=mn*.34+(q.grounded?-pe*.045:-.08),ge.userData.body.rotation.z=mn*.08+(q.grounded?-pe*.018:.035),ge.userData.chest.rotation.z=mn*.12+(q.grounded?pe*.015:-.025),ge.userData.scarfTail.rotation.z=.22+Math.sin(it*1.7)*.16,ze.scale.set(1-Math.min(.42,q.playerY*.12),.32-Math.min(.12,q.playerY*.03),1),ze.material.opacity=.38-Math.min(.22,q.playerY*.06),Kn.forEach(ye=>{if(ye.userData.kind==="collectible"){ye.rotation.y+=Jt?0:.035,ye.position.y=ye.userData.baseY+Math.sin(A*.004+ye.position.x)*.08;return}ye.userData.movingParts?.forEach(Ne=>{Ne.rotation.z=-.28+Math.sin(A*.008+ye.position.x)*.12}),ye.userData.swayParts?.forEach((Ne,je)=>{Ne.rotation.z=Ne.userData.baseRotation+Math.sin(A*.002+je)*.035}),ye.userData.firecrackers?.forEach((Ne,je)=>{Ne.rotation.z=(je%2?-.12:.12)+Math.sin(A*.006+je)*.045}),ye.userData.wheels?.forEach(Ne=>{Ne.rotation.y-=q.speed*X*.8})}),ft.forEach((ye,Ne)=>{let je=ft.length*1.7;ye.position.x=-8+((Ne*1.7-q.distance*.9)%je+je)%je}),lt.position.x=-(q.distance*.075%11.6),kt.position.x=-(q.distance*.18%12),At.position.x=-(q.distance*.022%12),It.position.x=-(q.distance*.012%14),L.forEach((ye,Ne)=>ye.userData.lanterns.forEach((je,bn)=>{je.rotation.z=Math.sin(A*.0028+Ne+bn*.5)*.08})),Pt.userData.floaters.forEach(ye=>{ye.position.y=ye.userData.baseY+Math.sin(A*.0022+ye.userData.phase)*.1,ye.rotation.z=Math.sin(A*.0016+ye.userData.phase)*.09}),!q.grounded&&ai&&Ii(-4.8,.15,ve?5:10,"dust"),q.grounded&&!ai&&(Ii(-4.5,.13,ve?7:14,"dust"),ne(q.speed),Jt||(Cs=A+90)),ai=q.grounded,Ch(X),Rh(q.score),Ph(X),A<Cs&&!Jt?(D.position.x=.4+(Math.random()-.5)*.09,D.position.y=3.35+(Math.random()-.5)*.07):(D.position.x=.4,D.position.y=3.35)}function zc(A){if(Ai=0,!Ve||!yn)return;let X=Math.min(.05,Math.max(0,(A-Nn)/1e3));Nn=A;let q=oe.getState();if(q.status==="running"){let it=oe.update(X);q=it.state,Lh(it.events,q)}yt(q),Jn(q),Nh(A,X,q),S.render(p,D),Ai=window.requestAnimationFrame(zc)}function _o(){Ai||!Ve||!yn||(Nn=performance.now(),Ai=window.requestAnimationFrame(zc))}function _r(A){let X=oe.getState();A&&X.status==="running"?(Ei=oe.pause(),Ei&&(oe.requestDuck(!1),y.classList.remove("is-pressed"),c.removeAttribute("hidden"),de(!1,X.speed))):!A&&Ei&&(Ei=!1,c.setAttribute("hidden",""),oe.resume(),Nn=performance.now())}function vo(A){let X=oe.getState();if(X.status==="ready"){oe.start(!0),Ci=performance.now(),Zn=!0,Ri=1,Hi=-1,ai=!0,Pi=0,o.setAttribute("hidden",""),r.classList.add("is-playing"),e("start",{input_method:A,quality:ve?"low":"standard",mascot_year:Wt,mascot_fallback:se.isFallback}),e("first_jump",{input_method:A,mascot_year:Wt}),Ut("action",500),ne(oe.getState().speed,900),de(!0,oe.getState().speed,oe.getState().grounded);return}X.status!=="running"||!oe.requestJump()||(y.classList.remove("is-pressed"),Zn||(Zn=!0,e("first_jump",{input_method:A,mascot_year:Wt})),Ut("action",500))}r.addEventListener("pointerdown",A=>{A.target.closest("button, a")||(r.focus({preventScroll:!0}),vo(A.pointerType==="touch"?"touch":"pointer"))}),r.addEventListener("contextmenu",A=>A.preventDefault()),i.addEventListener("pointerdown",A=>{r.contains(A.target)||A.target.closest("button, a, input, textarea")||m.hasAttribute("hidden")&&(Ft&&!Ft.hasAttribute("hidden")||(r.focus({preventScroll:!0}),vo(A.pointerType==="touch"?"touch":"pointer")))});function Rs(A){let X=oe.getState().ducking,q=oe.requestDuck(A);return y.classList.toggle("is-pressed",q),q&&!X&&Ut("action",500),q}return y.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),r.focus({preventScroll:!0}),y.setPointerCapture?.(A.pointerId),Rs(!0)}),["pointerup","pointercancel","lostpointercapture"].forEach(A=>{y.addEventListener(A,X=>{X.preventDefault(),X.stopPropagation(),Rs(!1)})}),y.addEventListener("click",A=>A.stopPropagation()),document.addEventListener("keydown",A=>{if(A.key==="ArrowDown"&&Ve&&document.activeElement===r){A.preventDefault(),oe.getState().status==="running"?Rs(!0):(r.blur(),window.scrollBy({top:Math.max(180,window.innerHeight*.72),behavior:Jt?"auto":"smooth"}));return}!Ve||![" ","ArrowUp","w","W"].includes(A.key)||A.target.closest("button, a, input, textarea")||(A.preventDefault(),r.focus({preventScroll:!0}),vo("keyboard"))}),document.addEventListener("keyup",A=>{A.key==="ArrowDown"&&Rs(!1)}),h.addEventListener("click",A=>{A.stopPropagation(),Te()}),d.addEventListener("click",Un),T.addEventListener("click",$t),g.addEventListener("click",$t),E&&E.addEventListener("click",Dn),R&&R.addEventListener("click",le),m.addEventListener("click",A=>{A.target===m&&$t()}),document.addEventListener("keydown",A=>{A.key==="Escape"&&!m.hasAttribute("hidden")&&$t()}),f&&f.addEventListener("click",A=>{if(A.stopPropagation(),!Ot)return;let X=oe.getState();e("view_landmarks",{from:"game_over",score:X.score,unlocked_landmarks:cn.size}),$t(),r.blur(),Ot.scrollIntoView({behavior:Jt?"auto":"smooth",block:"start"})}),u.addEventListener("click",()=>{let A=oe.getState();qg({score:A.score,durationMs:performance.now()-Ci},()=>{e("replay",{previous_score:A.score,mascot_year:Wt}),oe.replay(),Ci=performance.now(),Nn=Ci,Zn=!0,Ri=1,Hi=-1,ai=!0,Pi=0,e("first_jump",{input_method:"replay",mascot_year:Wt}),l.setAttribute("hidden",""),$t(),h.classList.remove("is-done"),h.innerHTML='<i data-lucide="share-2" aria-hidden="true"></i> Chia s\u1EBB \u0111i\u1EC3m',r.classList.add("is-playing"),y.classList.remove("is-pressed"),r.focus({preventScroll:!0}),Ut("action",500),ne(oe.getState().speed,900),de(!0,oe.getState().speed,oe.getState().grounded)})}),b.addEventListener("click",A=>{A.stopPropagation(),Fe=!Fe;try{window.localStorage.setItem("sap_tet_runner_v1_sound",String(Fe))}catch{}if(pt(),Fe){Tt(),Mt(540,.1,"sine"),Ut("envelope",500);let X=oe.getState();X.status==="running"&&X.grounded&&ne(X.speed),de(X.status==="running",X.speed,X.grounded)}else fe()}),new IntersectionObserver(A=>{let X=A[0];Ve=X.isIntersecting,X.intersectionRatio>=.45&&!As&&(As=!0,e("section_view",{mascot_year:Wt,mascot_fallback:se.isFallback})),_r(!Ve||!yn),Ve&&_o()},{threshold:[0,.45]}).observe(i),document.addEventListener("visibilitychange",()=>{yn=!document.hidden,_r(!yn||!Ve),yn&&_o()}),window.addEventListener("blur",()=>{Rs(!1),_r(!0)}),window.addEventListener("focus",()=>{_r(!Ve||!yn),_o()}),new ResizeObserver(ce).observe(a),pt(),Jn(oe.getState()),ce(),Promise.resolve()}export{wx as initTetRunner};
/*! Bundled license information:

three/build/three.core.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
