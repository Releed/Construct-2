// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

var localForageInitFailed = false;

try {

/*!
    localForage -- Offline Storage, Improved
    Version 1.4.0
    https://mozilla.github.io/localForage
    (c) 2013-2015 Mozilla, Apache License 2.0
*/
!function(){var a,b,c,d;!function(){var e={},f={};a=function(a,b,c){e[a]={deps:b,callback:c}},d=c=b=function(a){function c(b){if("."!==b.charAt(0))return b;for(var c=b.split("/"),d=a.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}if(d._eak_seen=e,f[a])return f[a];if(f[a]={},!e[a])throw new Error("Could not find module "+a);for(var g,h=e[a],i=h.deps,j=h.callback,k=[],l=0,m=i.length;m>l;l++)"exports"===i[l]?k.push(g={}):k.push(b(c(i[l])));var n=j.apply(this,k);return f[a]=g||n}}(),a("promise/all",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to all.");return new b(function(b,c){function d(a){return function(b){f(a,b)}}function f(a,c){h[a]=c,0===--i&&b(h)}var g,h=[],i=a.length;0===i&&b([]);for(var j=0;j<a.length;j++)g=a[j],g&&e(g.then)?g.then(d(j),c):f(j,g)})}var d=a.isArray,e=a.isFunction;b.all=c}),a("promise/asap",["exports"],function(a){"use strict";function b(){return function(){process.nextTick(e)}}function c(){var a=0,b=new i(e),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function d(){return function(){j.setTimeout(e,1)}}function e(){for(var a=0;a<k.length;a++){var b=k[a],c=b[0],d=b[1];c(d)}k=[]}function f(a,b){var c=k.push([a,b]);1===c&&g()}var g,h="undefined"!=typeof window?window:{},i=h.MutationObserver||h.WebKitMutationObserver,j="undefined"!=typeof global?global:void 0===this?window:this,k=[];g="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?b():i?c():d(),a.asap=f}),a("promise/config",["exports"],function(a){"use strict";function b(a,b){return 2!==arguments.length?c[a]:void(c[a]=b)}var c={instrument:!1};a.config=c,a.configure=b}),a("promise/polyfill",["./promise","./utils","exports"],function(a,b,c){"use strict";function d(){var a;a="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self;var b="Promise"in a&&"resolve"in a.Promise&&"reject"in a.Promise&&"all"in a.Promise&&"race"in a.Promise&&function(){var b;return new a.Promise(function(a){b=a}),f(b)}();b||(a.Promise=e)}var e=a.Promise,f=b.isFunction;c.polyfill=d}),a("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){if(!v(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof i))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],j(a,this)}function j(a,b){function c(a){o(b,a)}function d(a){q(b,a)}try{a(c,d)}catch(e){d(e)}}function k(a,b,c,d){var e,f,g,h,i=v(c);if(i)try{e=c(d),g=!0}catch(j){h=!0,f=j}else e=d,g=!0;n(b,e)||(i&&g?o(b,e):h?q(b,f):a===D?o(b,e):a===E&&q(b,e))}function l(a,b,c,d){var e=a._subscribers,f=e.length;e[f]=b,e[f+D]=c,e[f+E]=d}function m(a,b){for(var c,d,e=a._subscribers,f=a._detail,g=0;g<e.length;g+=3)c=e[g],d=e[g+b],k(b,c,d,f);a._subscribers=null}function n(a,b){var c,d=null;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(u(b)&&(d=b.then,v(d)))return d.call(b,function(d){return c?!0:(c=!0,void(b!==d?o(a,d):p(a,d)))},function(b){return c?!0:(c=!0,void q(a,b))}),!0}catch(e){return c?!0:(q(a,e),!0)}return!1}function o(a,b){a===b?p(a,b):n(a,b)||p(a,b)}function p(a,b){a._state===B&&(a._state=C,a._detail=b,t.async(r,a))}function q(a,b){a._state===B&&(a._state=C,a._detail=b,t.async(s,a))}function r(a){m(a,a._state=D)}function s(a){m(a,a._state=E)}var t=a.config,u=(a.configure,b.objectOrFunction),v=b.isFunction,w=(b.now,c.all),x=d.race,y=e.resolve,z=f.reject,A=g.asap;t.async=A;var B=void 0,C=0,D=1,E=2;i.prototype={constructor:i,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(a,b){var c=this,d=new this.constructor(function(){});if(this._state){var e=arguments;t.async(function(){k(c._state,d,e[c._state-1],c._detail)})}else l(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}},i.all=w,i.race=x,i.resolve=y,i.reject=z,h.Promise=i}),a("promise/race",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to race.");return new b(function(b,c){for(var d,e=0;e<a.length;e++)d=a[e],d&&"function"==typeof d.then?d.then(b,c):b(d)})}var d=a.isArray;b.race=c}),a("promise/reject",["exports"],function(a){"use strict";function b(a){var b=this;return new b(function(b,c){c(a)})}a.reject=b}),a("promise/resolve",["exports"],function(a){"use strict";function b(a){if(a&&"object"==typeof a&&a.constructor===this)return a;var b=this;return new b(function(b){b(a)})}a.resolve=b}),a("promise/utils",["exports"],function(a){"use strict";function b(a){return c(a)||"object"==typeof a&&null!==a}function c(a){return"function"==typeof a}function d(a){return"[object Array]"===Object.prototype.toString.call(a)}var e=Date.now||function(){return(new Date).getTime()};a.objectOrFunction=b,a.isFunction=c,a.isArray=d,a.now=e}),b("promise/polyfill").polyfill()}(),function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?exports.localforage=b():a.localforage=b()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}b.__esModule=!0;var e=function(a){function b(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function e(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&(m(b[c])?arguments[0][c]=b[c].slice():arguments[0][c]=b[c])}return arguments[0]}function f(a){for(var b in h)if(h.hasOwnProperty(b)&&h[b]===a)return!0;return!1}var g={},h={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},i=[h.INDEXEDDB,h.WEBSQL,h.LOCALSTORAGE],j=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],k={description:"",driver:i.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},l=function(a){var b={};return b[h.INDEXEDDB]=!!function(){try{var b=b||a.indexedDB||a.webkitIndexedDB||a.mozIndexedDB||a.OIndexedDB||a.msIndexedDB;return"undefined"!=typeof a.openDatabase&&a.navigator&&a.navigator.userAgent&&/Safari/.test(a.navigator.userAgent)&&!/Chrome/.test(a.navigator.userAgent)?!1:b&&"function"==typeof b.open&&"undefined"!=typeof a.IDBKeyRange}catch(c){return!1}}(),b[h.WEBSQL]=!!function(){try{return a.openDatabase}catch(b){return!1}}(),b[h.LOCALSTORAGE]=!!function(){try{return a.localStorage&&"setItem"in a.localStorage&&a.localStorage.setItem}catch(b){return!1}}(),b}(a),m=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},n=function(){function a(b){d(this,a),this.INDEXEDDB=h.INDEXEDDB,this.LOCALSTORAGE=h.LOCALSTORAGE,this.WEBSQL=h.WEBSQL,this._defaultConfig=e({},k),this._config=e({},this._defaultConfig,b),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver)}return a.prototype.config=function(a){if("object"==typeof a){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a)"storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),this._config[b]=a[b];return"driver"in a&&a.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof a?this._config[a]:this._config},a.prototype.defineDriver=function(a,b,c){var d=new Promise(function(b,c){try{var d=a._driver,e=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),h=new Error("Custom driver name already in use: "+a._driver);if(!a._driver)return void c(e);if(f(a._driver))return void c(h);for(var i=j.concat("_initStorage"),k=0;k<i.length;k++){var m=i[k];if(!m||!a[m]||"function"!=typeof a[m])return void c(e)}var n=Promise.resolve(!0);"_support"in a&&(n=a._support&&"function"==typeof a._support?a._support():Promise.resolve(!!a._support)),n.then(function(c){l[d]=c,g[d]=a,b()},c)}catch(o){c(o)}});return d.then(b,c),d},a.prototype.driver=function(){return this._driver||null},a.prototype.getDriver=function(a,b,d){var e=this,h=function(){if(f(a))switch(a){case e.INDEXEDDB:return new Promise(function(a,b){a(c(1))});case e.LOCALSTORAGE:return new Promise(function(a,b){a(c(2))});case e.WEBSQL:return new Promise(function(a,b){a(c(4))})}else if(g[a])return Promise.resolve(g[a]);return Promise.reject(new Error("Driver not found."))}();return h.then(b,d),h},a.prototype.getSerializer=function(a){var b=new Promise(function(a,b){a(c(3))});return a&&"function"==typeof a&&b.then(function(b){a(b)}),b},a.prototype.ready=function(a){var b=this,c=b._driverSet.then(function(){return null===b._ready&&(b._ready=b._initDriver()),b._ready});return c.then(a,a),c},a.prototype.setDriver=function(a,b,c){function d(){f._config.driver=f.driver()}function e(a){return function(){function b(){for(;c<a.length;){var e=a[c];return c++,f._dbInfo=null,f._ready=null,f.getDriver(e).then(function(a){return f._extend(a),d(),f._ready=f._initStorage(f._config),f._ready})["catch"](b)}d();var g=new Error("No available storage method found.");return f._driverSet=Promise.reject(g),f._driverSet}var c=0;return b()}}var f=this;m(a)||(a=[a]);var g=this._getSupportedDrivers(a),h=null!==this._driverSet?this._driverSet["catch"](function(){return Promise.resolve()}):Promise.resolve();return this._driverSet=h.then(function(){var a=g[0];return f._dbInfo=null,f._ready=null,f.getDriver(a).then(function(a){f._driver=a._driver,d(),f._wrapLibraryMethodsWithReady(),f._initDriver=e(g)})})["catch"](function(){d();var a=new Error("No available storage method found.");return f._driverSet=Promise.reject(a),f._driverSet}),this._driverSet.then(b,c),this._driverSet},a.prototype.supports=function(a){return!!l[a]},a.prototype._extend=function(a){e(this,a)},a.prototype._getSupportedDrivers=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];this.supports(e)&&b.push(e)}return b},a.prototype._wrapLibraryMethodsWithReady=function(){for(var a=0;a<j.length;a++)b(this,j[a])},a.prototype.createInstance=function(b){return new a(b)},a}();return new n}("undefined"!=typeof window?window:self);b["default"]=e,a.exports=b["default"]},function(a,b){"use strict";b.__esModule=!0;var c=function(a){function b(b,c){b=b||[],c=c||{};try{return new Blob(b,c)}catch(d){if("TypeError"!==d.name)throw d;for(var e=a.BlobBuilder||a.MSBlobBuilder||a.MozBlobBuilder||a.WebKitBlobBuilder,f=new e,g=0;g<b.length;g+=1)f.append(b[g]);return f.getBlob(c.type)}}function c(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;b>e;e++)d[e]=a.charCodeAt(e);return c}function d(a){return new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a),d.withCredentials=!0,d.responseType="arraybuffer",d.onreadystatechange=function(){return 4===d.readyState?200===d.status?b({response:d.response,type:d.getResponseHeader("Content-Type")}):void c({status:d.status,response:d.response}):void 0},d.send()})}function e(a){return new Promise(function(c,e){var f=b([""],{type:"image/png"}),g=a.transaction([D],"readwrite");g.objectStore(D).put(f,"key"),g.oncomplete=function(){var b=a.transaction([D],"readwrite"),f=b.objectStore(D).get("key");f.onerror=e,f.onsuccess=function(a){var b=a.target.result,e=URL.createObjectURL(b);d(e).then(function(a){c(!(!a||"image/png"!==a.type))},function(){c(!1)}).then(function(){URL.revokeObjectURL(e)})}},g.onerror=g.onabort=e})["catch"](function(){return!1})}function f(a){return"boolean"==typeof B?Promise.resolve(B):e(a).then(function(a){return B=a})}function g(a){return new Promise(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function h(a){var d=c(atob(a.data));return b([d],{type:a.type})}function i(a){return a&&a.__local_forage_encoded_blob}function j(a){var b=this,c=b._initReady().then(function(){var a=C[b._dbInfo.name];return a&&a.dbReady?a.dbReady:void 0});return c.then(a,a),c}function k(a){var b=C[a.name],c={};c.promise=new Promise(function(a){c.resolve=a}),b.deferredOperations.push(c),b.dbReady?b.dbReady=b.dbReady.then(function(){return c.promise}):b.dbReady=c.promise}function l(a){var b=C[a.name],c=b.deferredOperations.pop();c&&c.resolve()}function m(a){function b(){return Promise.resolve()}var c=this,d={db:null};if(a)for(var e in a)d[e]=a[e];C||(C={});var f=C[d.name];f||(f={forages:[],db:null,dbReady:null,deferredOperations:[]},C[d.name]=f),f.forages.push(c),c._initReady||(c._initReady=c.ready,c.ready=j);for(var g=[],h=0;h<f.forages.length;h++){var i=f.forages[h];i!==c&&g.push(i._initReady()["catch"](b))}var k=f.forages.slice(0);return Promise.all(g).then(function(){return d.db=f.db,n(d)}).then(function(a){return d.db=a,q(d,c._defaultConfig.version)?o(d):a}).then(function(a){d.db=f.db=a,c._dbInfo=d;for(var b=0;b<k.length;b++){var e=k[b];e!==c&&(e._dbInfo.db=d.db,e._dbInfo.version=d.version)}})}function n(a){return p(a,!1)}function o(a){return p(a,!0)}function p(b,c){return new Promise(function(d,e){if(b.db){if(!c)return d(b.db);k(b),b.db.close()}var f=[b.name];c&&f.push(b.version);var g=A.open.apply(A,f);c&&(g.onupgradeneeded=function(c){var d=g.result;try{d.createObjectStore(b.storeName),c.oldVersion<=1&&d.createObjectStore(D)}catch(e){if("ConstraintError"!==e.name)throw e;a.console.warn('The database "'+b.name+'" has been upgraded from version '+c.oldVersion+" to version "+c.newVersion+', but the storage "'+b.storeName+'" already exists.')}}),g.onerror=function(){e(g.error)},g.onsuccess=function(){d(g.result),l(b)}})}function q(b,c){if(!b.db)return!0;var d=!b.db.objectStoreNames.contains(b.storeName),e=b.version<b.db.version,f=b.version>b.db.version;if(e&&(b.version!==c&&a.console.warn('The database "'+b.name+"\" can't be downgraded from version "+b.db.version+" to version "+b.version+"."),b.version=b.db.version),f||d){if(d){var g=b.db.version+1;g>b.version&&(b.version=g)}return!0}return!1}function r(b,c){var d=this;"string"!=typeof b&&(a.console.warn(b+" used as a key, but it is not a string."),b=String(b));var e=new Promise(function(a,c){d.ready().then(function(){var e=d._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.get(b);g.onsuccess=function(){var b=g.result;void 0===b&&(b=null),i(b)&&(b=h(b)),a(b)},g.onerror=function(){c(g.error)}})["catch"](c)});return z(e,c),e}function s(a,b){var c=this,d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.openCursor(),j=1;g.onsuccess=function(){var c=g.result;if(c){var d=c.value;i(d)&&(d=h(d));var e=a(d,c.key,j++);void 0!==e?b(e):c["continue"]()}else b()},g.onerror=function(){d(g.error)}})["catch"](d)});return z(d,b),d}function t(b,c,d){var e=this;"string"!=typeof b&&(a.console.warn(b+" used as a key, but it is not a string."),b=String(b));var h=new Promise(function(a,d){var h;e.ready().then(function(){return h=e._dbInfo,c instanceof Blob?f(h.db).then(function(a){return a?c:g(c)}):c}).then(function(c){var e=h.db.transaction(h.storeName,"readwrite"),f=e.objectStore(h.storeName);null===c&&(c=void 0),e.oncomplete=function(){void 0===c&&(c=null),a(c)},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;d(a)};var g=f.put(c,b)})["catch"](d)});return z(h,d),h}function u(b,c){var d=this;"string"!=typeof b&&(a.console.warn(b+" used as a key, but it is not a string."),b=String(b));var e=new Promise(function(a,c){d.ready().then(function(){var e=d._dbInfo,f=e.db.transaction(e.storeName,"readwrite"),g=f.objectStore(e.storeName),h=g["delete"](b);f.oncomplete=function(){a()},f.onerror=function(){c(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;c(a)}})["catch"](c)});return z(e,c),e}function v(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readwrite"),f=e.objectStore(d.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}})["catch"](c)});return z(c,a),c}function w(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.count();f.onsuccess=function(){a(f.result)},f.onerror=function(){c(f.error)}})["catch"](c)});return z(c,a),c}function x(a,b){var c=this,d=new Promise(function(b,d){return 0>a?void b(null):void c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=!1,h=f.openCursor();h.onsuccess=function(){var c=h.result;return c?void(0===a?b(c.key):g?b(c.key):(g=!0,c.advance(a))):void b(null)},h.onerror=function(){d(h.error)}})["catch"](d)});return z(d,b),d}function y(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.openCursor(),g=[];f.onsuccess=function(){var b=f.result;return b?(g.push(b.key),void b["continue"]()):void a(g)},f.onerror=function(){c(f.error)}})["catch"](c)});return z(c,a),c}function z(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}var A=A||a.indexedDB||a.webkitIndexedDB||a.mozIndexedDB||a.OIndexedDB||a.msIndexedDB;if(A){var B,C,D="local-forage-detect-blob-support",E={_driver:"asyncStorage",_initStorage:m,iterate:s,getItem:r,setItem:t,removeItem:u,clear:v,length:w,key:x,keys:y};return E}}("undefined"!=typeof window?window:self);b["default"]=c,a.exports=b["default"]},function(a,b,c){"use strict";b.__esModule=!0;var d=function(a){function b(a){var b=this,d={};if(a)for(var e in a)d[e]=a[e];return d.keyPrefix=d.name+"/",d.storeName!==b._defaultConfig.storeName&&(d.keyPrefix+=d.storeName+"/"),b._dbInfo=d,new Promise(function(a,b){a(c(3))}).then(function(a){return d.serializer=a,Promise.resolve()})}function d(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=m.length-1;c>=0;c--){var d=m.key(c);0===d.indexOf(a)&&m.removeItem(d)}});return l(c,a),c}function e(b,c){var d=this;"string"!=typeof b&&(a.console.warn(b+" used as a key, but it is not a string."),b=String(b));var e=d.ready().then(function(){var a=d._dbInfo,c=m.getItem(a.keyPrefix+b);return c&&(c=a.serializer.deserialize(c)),c});return l(e,c),e}function f(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo,d=b.keyPrefix,e=d.length,f=m.length,g=1,h=0;f>h;h++){var i=m.key(h);if(0===i.indexOf(d)){var j=m.getItem(i);if(j&&(j=b.serializer.deserialize(j)),j=a(j,i.substring(e),g++),void 0!==j)return j}}});return l(d,b),d}function g(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=m.key(a)}catch(e){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return l(d,b),d}function h(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=m.length,d=[],e=0;c>e;e++)0===m.key(e).indexOf(a.keyPrefix)&&d.push(m.key(e).substring(a.keyPrefix.length));return d});return l(c,a),c}function i(a){var b=this,c=b.keys().then(function(a){return a.length});return l(c,a),c}function j(b,c){var d=this;"string"!=typeof b&&(a.console.warn(b+" used as a key, but it is not a string."),b=String(b));var e=d.ready().then(function(){var a=d._dbInfo;m.removeItem(a.keyPrefix+b)});return l(e,c),e}function k(b,c,d){var e=this;"string"!=typeof b&&(a.console.warn(b+" used as a key, but it is not a string."),b=String(b));var f=e.ready().then(function(){void 0===c&&(c=null);var a=c;return new Promise(function(d,f){var g=e._dbInfo;g.serializer.serialize(c,function(c,e){if(e)f(e);else try{m.setItem(g.keyPrefix+b,c),d(a)}catch(h){("QuotaExceededError"===h.name||"NS_ERROR_DOM_QUOTA_REACHED"===h.name)&&f(h),f(h)}})})});return l(f,d),f}function l(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}var m=null;try{if(!(a.localStorage&&"setItem"in a.localStorage))return;m=a.localStorage}catch(n){return}var o={_driver:"localStorageWrapper",_initStorage:b,iterate:f,getItem:e,setItem:k,removeItem:j,clear:d,length:i,key:g,keys:h};return o}("undefined"!=typeof window?window:self);b["default"]=d,a.exports=b["default"]},function(a,b){"use strict";b.__esModule=!0;var c=function(a){function b(b,c){b=b||[],c=c||{};try{return new Blob(b,c)}catch(d){if("TypeError"!==d.name)throw d;for(var e=a.BlobBuilder||a.MSBlobBuilder||a.MozBlobBuilder||a.WebKitBlobBuilder,f=new e,g=0;g<b.length;g+=1)f.append(b[g]);return f.getBlob(c.type)}}function c(a,b){var c="";if(a&&(c=a.toString()),a&&("[object ArrayBuffer]"===a.toString()||a.buffer&&"[object ArrayBuffer]"===a.buffer.toString())){var d,e=j;a instanceof ArrayBuffer?(d=a,e+=l):(d=a.buffer,"[object Int8Array]"===c?e+=n:"[object Uint8Array]"===c?e+=o:"[object Uint8ClampedArray]"===c?e+=p:"[object Int16Array]"===c?e+=q:"[object Uint16Array]"===c?e+=s:"[object Int32Array]"===c?e+=r:"[object Uint32Array]"===c?e+=t:"[object Float32Array]"===c?e+=u:"[object Float64Array]"===c?e+=v:b(new Error("Failed to get type for BinaryArray"))),b(e+f(d))}else if("[object Blob]"===c){var g=new FileReader;g.onload=function(){var c=h+a.type+"~"+f(this.result);b(j+m+c)},g.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(i){console.error("Couldn't convert value into a JSON string: ",a),b(null,i)}}function d(a){if(a.substring(0,k)!==j)return JSON.parse(a);var c,d=a.substring(w),f=a.substring(k,w);if(f===m&&i.test(d)){var g=d.match(i);c=g[1],d=d.substring(g[0].length)}var h=e(d);switch(f){case l:return h;case m:return b([h],{type:c});case n:return new Int8Array(h);case o:return new Uint8Array(h);case p:return new Uint8ClampedArray(h);case q:return new Int16Array(h);case s:return new Uint16Array(h);case r:return new Int32Array(h);case t:return new Uint32Array(h);case u:return new Float32Array(h);case v:return new Float64Array(h);default:throw new Error("Unkown type: "+f)}}function e(a){var b,c,d,e,f,h=.75*a.length,i=a.length,j=0;"="===a[a.length-1]&&(h--,"="===a[a.length-2]&&h--);var k=new ArrayBuffer(h),l=new Uint8Array(k);for(b=0;i>b;b+=4)c=g.indexOf(a[b]),d=g.indexOf(a[b+1]),e=g.indexOf(a[b+2]),f=g.indexOf(a[b+3]),l[j++]=c<<2|d>>4,l[j++]=(15&d)<<4|e>>2,l[j++]=(3&e)<<6|63&f;return k}function f(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=g[c[b]>>2],d+=g[(3&c[b])<<4|c[b+1]>>4],d+=g[(15&c[b+1])<<2|c[b+2]>>6],d+=g[63&c[b+2]];return c.length%3===2?d=d.substring(0,d.length-1)+"=":c.length%3===1&&(d=d.substring(0,d.length-2)+"=="),d}var g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",h="~~local_forage_type~",i=/^~~local_forage_type~([^~]+)~/,j="__lfsc__:",k=j.length,l="arbf",m="blob",n="si08",o="ui08",p="uic8",q="si16",r="si32",s="ur16",t="ui32",u="fl32",v="fl64",w=k+l.length,x={serialize:c,deserialize:d,stringToBuffer:e,bufferToString:f};return x}("undefined"!=typeof window?window:self);b["default"]=c,a.exports=b["default"]},function(a,b,c){"use strict";b.__esModule=!0;var d=function(a){function b(a){var b=this,d={db:null};if(a)for(var e in a)d[e]="string"!=typeof a[e]?a[e].toString():a[e];var f=new Promise(function(a,c){try{d.db=m(d.name,String(d.version),d.description,d.size)}catch(e){return c(e)}d.db.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS "+d.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){b._dbInfo=d,a()},function(a,b){c(b)})})});return new Promise(function(a,b){a(c(3))}).then(function(a){return d.serializer=a,f})}function d(b,c){var d=this;"string"!=typeof b&&(a.console.warn(b+" used as a key, but it is not a string."),b=String(b));var e=new Promise(function(a,c){d.ready().then(function(){var e=d._dbInfo;e.db.transaction(function(d){d.executeSql("SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[b],function(b,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=e.serializer.deserialize(d)),a(d)},function(a,b){c(b)})})})["catch"](c)});return l(e,c),e}function e(a,b){var c=this,d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName,[],function(c,d){for(var f=d.rows,g=f.length,h=0;g>h;h++){var i=f.item(h),j=i.value;if(j&&(j=e.serializer.deserialize(j)),j=a(j,i.key,h+1),void 0!==j)return void b(j)}b()},function(a,b){d(b)})})})["catch"](d)});return l(d,b),d}function f(b,c,d){var e=this;"string"!=typeof b&&(a.console.warn(b+" used as a key, but it is not a string."),b=String(b));var f=new Promise(function(a,d){e.ready().then(function(){void 0===c&&(c=null);var f=c,g=e._dbInfo;g.serializer.serialize(c,function(c,e){e?d(e):g.db.transaction(function(e){e.executeSql("INSERT OR REPLACE INTO "+g.storeName+" (key, value) VALUES (?, ?)",[b,c],function(){a(f)},function(a,b){d(b)})},function(a){a.code===a.QUOTA_ERR&&d(a)})})})["catch"](d)});return l(f,d),f}function g(b,c){var d=this;"string"!=typeof b&&(a.console.warn(b+" used as a key, but it is not a string."),b=String(b));var e=new Promise(function(a,c){d.ready().then(function(){var e=d._dbInfo;e.db.transaction(function(d){d.executeSql("DELETE FROM "+e.storeName+" WHERE key = ?",[b],function(){a()},function(a,b){c(b)})})})["catch"](c)});return l(e,c),e}function h(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})})["catch"](c)});return l(c,a),c}function i(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})})["catch"](c)});return l(c,a),c}function j(a,b){var c=this,d=new Promise(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})})["catch"](d)});return l(d,b),d}function k(a){var b=this,c=new Promise(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})})["catch"](c)});return l(c,a),c}function l(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}var m=a.openDatabase;if(m){var n={_driver:"webSQLStorage",_initStorage:b,iterate:e,getItem:d,setItem:f,removeItem:g,clear:h,length:i,key:j,keys:k};return n}}("undefined"!=typeof window?window:self);b["default"]=d,a.exports=b["default"]}])});
// End localforage code

}
catch (e)
{
	// Firefox with cookies disabled throws exception starting up localforage.
	localForageInitFailed = true;
}

/////////////////////////////////////
// Plugin class
cr.plugins_.Rex_TimeAwayL = function (runtime) {
	this.runtime = runtime;
};

(function () {

	var pluginProto = cr.plugins_.Rex_TimeAwayL.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function (plugin) {
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function () {};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function (type) {
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function () {
		this.cache = {}; // timers cache    
		/*
		{
		    "state":1=run, 0=paused
		    "start": timstamp, updated when resumed
		    "acc": delta-time, updated when paused
		}
		*/

		this.pendingSave = {}; // keys
		this.waitingSave = {};
		this.pendingRemove = {};

		this.currentKey = null;
		this.exp_Time = 0;
		this.exp_ErrorMessage = "";
	};

	function getErrorString(err) {
		if (!err)
			return "unknown error";
		else if (typeof err === "string")
			return err;
		else if (typeof err.message === "string")
			return err.message;
		else if (typeof err.name === "string")
			return err.name;
		else if (typeof err.data === "string")
			return err.data;
		else
			return "unknown error";
	};

	instanceProto.GetTimer = function (key, onCompleted) {
		if (this.cache.hasOwnProperty(key)) {
			onCompleted(null, this.cache[key]);
			return;
		} else {
			var self = this;
			var callback = function (err, value) {
				if (err) {
					if (self.cache.hasOwnProperty(key))
						delete self.cache[key];
				} else if (value == null) {
					if (self.cache.hasOwnProperty(key))
						delete self.cache[key];
				} else {
					self.cache[key] = value;
				}

				onCompleted(err, value);
			}
			localforage["getItem"](key, callback);
		}
	};

	var startTimer = function (timer, curTimestamp) {
		if (!timer)
			timer = {};

		if (!curTimestamp)
			curTimestamp = (new Date()).getTime();

		timer["state"] = 1;
		timer["start"] = curTimestamp;
		timer["acc"] = 0;
		return timer;
	};
	var getElapsedTime = function (timer, curTimestamp) {
		if (!timer)
			return 0;

		if (!curTimestamp)
			curTimestamp = (new Date()).getTime();

		var deltaTime = timer["acc"];
		if (timer["state"] === 1)
			deltaTime += (curTimestamp - timer["start"]);

		return deltaTime;
	};
	var pauseTimer = function (timer) {
		if ((!timer) || (timer["state"] === 0))
			return;

		timer["state"] = 0;

		var curTime = (new Date()).getTime();
		timer["acc"] += (curTime - timer["start"]);
	};
	var resumeTimer = function (timer) {
		if ((!timer) || (timer["state"] === 1))
			return;

		timer["state"] = 1;
		timer["start"] = (new Date()).getTime();
	};
	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	pluginProto.cnds = new Cnds();

	Cnds.prototype.OnError = function (key) {
		return true;
	};

	Cnds.prototype.OnGetTimer = function (key) {
		return (this.currentKey === key);
	};

	Cnds.prototype.OnStartTimer = function (key) {
		return (this.currentKey === key);
	};

	Cnds.prototype.OnRemoveTimer = function (key) {
		return (this.currentKey === key);
	};

	Cnds.prototype.OnPauseTimer = function (key) {
		return (this.currentKey === key);
	};

	Cnds.prototype.OnResumeTimer = function (key) {
		return (this.currentKey === key);
	};

	Cnds.prototype.IsValid = function (key) {
		return this.cache.hasOwnProperty(key);
	};

	//////////////////////////////////////
	// Actions
	function Acts() {};
	pluginProto.acts = new Acts();

	Acts.prototype.StartTimer = function (key) {
		this.cache[key] = startTimer(this.cache[key]);

		var self = this;
		var onWriteTimer = function (err, valueSet) {
			self.currentKey = key;
			if (err) {
				self.exp_ErrorMessage = getErrorString(err);
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnError, self);
			} else {
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnStartTimer, self);
			}
		};
		localforage["setItem"](key, this.cache[key], onWriteTimer);
	};

	Acts.prototype.RemoveTimer = function (key) {
		if (this.cache.hasOwnProperty(key))
			delete this.cache[key];

		var self = this;
		var callback = function (err) {
			self.currentKey = key;
			if (err) {
				self.exp_ErrorMessage = getErrorString(err);
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnError, self);
			} else {
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnRemoveTimer, self);
			}
		};
		localforage["removeItem"](key, callback);
	};


	Acts.prototype.PauseTimer = function (key) {
		var self = this;
		var onGetTimer = function (err, timer) {
			if (err) {
				self.currentKey = key;
				self.exp_ErrorMessage = getErrorString(err);
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnError, self);
			} else {
				if (timer == null)
					return;

				pauseTimer(self.cache[key]);

				var onWriteTimer = function (err, valueSet) {
					self.currentKey = key;
					if (err) {
						self.exp_ErrorMessage = getErrorString(err);
						self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnError, self);
					} else {
						self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnPauseTimer, self);
					}
				};
				localforage["setItem"](key, self.cache[key], onWriteTimer);
			}
		}
		this.GetTimer(key, onGetTimer);
	};

	Acts.prototype.ResumeTimer = function (key) {
		var self = this;
		var onGetTimer = function (err, timer) {
			if (err) {
				self.currentKey = key;
				self.exp_ErrorMessage = getErrorString(err);
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnError, self);
			} else {
				if (timer == null)
					return;

				resumeTimer(self.cache[key]);

				var onWriteTimer = function (err, valueSet) {
					self.currentKey = key;
					if (err) {
						self.exp_ErrorMessage = getErrorString(err);
						self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnError, self);
					} else {
						self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnResumeTimer, self);
					}
				};
				localforage["setItem"](key, self.cache[key], onWriteTimer);
			}
		}
		this.GetTimer(key, onGetTimer);
	};

	Acts.prototype.GetORStartTimer = function (key) {
		var self = this;
		var onGetTimer = function (err, timer) {
			if (err) {
				self.currentKey = key;
				self.exp_ErrorMessage = getErrorString(err);
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnError, self);
			}

			// start timer
			else if (timer == null) {
				self.cache[key] = startTimer(self.cache[key]);
				var onWriteTimer = function (err, valueSet) {
					self.currentKey = key;
					if (err) {
						self.exp_ErrorMessage = getErrorString(err);
						self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnError, self);
					} else {
						self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnGetTimer, self);
					}
				};
				localforage["setItem"](key, self.cache[key], onWriteTimer);
			}

			// get timer
			else {
				self.currentKey = key;
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnGetTimer, self);
			}
		}
		this.GetTimer(key, onGetTimer);
	};

	Acts.prototype.GetTimer = function (key) {
		var self = this;
		var onGetTimer = function (err, timer) {
			self.currentKey = key;
			if (err) {
				self.exp_ErrorMessage = getErrorString(err);
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnError, self);
			} else {
				self.runtime.trigger(cr.plugins_.Rex_TimeAwayL.prototype.cnds.OnGetTimer, self);
			}
		}
		this.GetTimer(key, onGetTimer);
	};

	//////////////////////////////////////
	// Expressions
	function Exps() {};
	pluginProto.exps = new Exps();

	Exps.prototype.ErrorMessage = function (ret) {
		ret.set_string(this.exp_ErrorMessage);
	};

	Exps.prototype.ElapsedTime = function (ret, timer_name) {
		if (!timer_name)
			timer_name = this.currentKey;

		ret.set_float(getElapsedTime(this.cache[timer_name]) / 1000);
	};

}());