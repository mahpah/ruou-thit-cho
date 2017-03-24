(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("socket.io-client"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "socket.io-client"], factory);
	else if(typeof exports === 'object')
		exports["@digimed/angular-webrtc"] = factory(require("@angular/core"), require("socket.io-client"));
	else
		root["@digimed/angular-webrtc"] = factory(root["@angular/core"], root["socket.io-client"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ConnectionConfig = (function () {
    function ConnectionConfig() {
    }
    return ConnectionConfig;
}());
ConnectionConfig = __decorate([
    core_1.Injectable()
], ConnectionConfig);
exports.ConnectionConfig = ConnectionConfig;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
__export(__webpack_require__(5));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(6));
__export(__webpack_require__(2));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var connection_config_service_1 = __webpack_require__(1);
var io = __webpack_require__(7);
var SocketIOConnection = (function () {
    function SocketIOConnection(config) {
        this.config = config;
        this.eventEmitters = new Map();
        if (this.config.autoConnect) {
            this.connect();
        }
    }
    SocketIOConnection.prototype.connect = function () {
        var _this = this;
        var url = this.config.url;
        this.socket = io.connect(url);
        if (this.config.room) {
            this.join();
        }
        if (this.config.events instanceof Array) {
            this.config.events.forEach(function (ev) { return _this.subscribe(ev); });
        }
    };
    SocketIOConnection.prototype.join = function (room) {
        room = room || this.config.room || 'defaultRoom';
        this.socket.emit('join', room);
    };
    SocketIOConnection.prototype.emit = function (event, data) {
        this.socket.emit(event, data);
    };
    SocketIOConnection.prototype.subscribe = function (event) {
        if (this.eventEmitters.has(event)) {
            return this.eventEmitters.get(event);
        }
        var emitter = new core_1.EventEmitter();
        this.socket.on(event, function (data) {
            emitter.emit(data);
        });
        this.eventEmitters.set(event, emitter);
        return emitter;
    };
    SocketIOConnection.prototype.events = function (name) {
        if (this.eventEmitters.has(name)) {
            return this.eventEmitters.get(name);
        }
        // no break, but useless
        console.warn("No one take care of this event: " + name);
        return this.subscribe(name);
    };
    return SocketIOConnection;
}());
SocketIOConnection = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(connection_config_service_1.ConnectionConfig)),
    __metadata("design:paramtypes", [connection_config_service_1.ConnectionConfig])
], SocketIOConnection);
exports.SocketIOConnection = SocketIOConnection;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var services_1 = __webpack_require__(2);
var SocketIOModule = SocketIOModule_1 = (function () {
    function SocketIOModule() {
    }
    SocketIOModule.forRoot = function (config) {
        return {
            ngModule: SocketIOModule_1,
            providers: [{
                    provide: services_1.ConnectionConfig,
                    useValue: config,
                }, services_1.SocketIOConnection]
        };
    };
    return SocketIOModule;
}());
SocketIOModule = SocketIOModule_1 = __decorate([
    core_1.NgModule({})
], SocketIOModule);
exports.SocketIOModule = SocketIOModule;
var SocketIOModule_1;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));


/***/ })
/******/ ]);
});