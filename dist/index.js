(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("rxjs/ReplaySubject"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/common", "@angular/core", "@angular/platform-browser", "rxjs/ReplaySubject"], factory);
	else if(typeof exports === 'object')
		exports["m-dialog-2"] = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("rxjs/ReplaySubject"));
	else
		root["m-dialog-2"] = factory(root["@angular/common"], root["@angular/core"], root["@angular/platform-browser"], root["rxjs/ReplaySubject"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_27__, __WEBPACK_EXTERNAL_MODULE_28__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(11));
var m_dialog_service_1 = __webpack_require__(11);
exports.Services = [
    m_dialog_service_1.MDialogService,
];


/***/ },
/* 2 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var ConfirmDialogComponent = (function () {
    function ConfirmDialogComponent() {
    }
    ConfirmDialogComponent.prototype.ngOnInit = function () {
    };
    ConfirmDialogComponent.prototype.ngOnDestroy = function () {
    };
    return ConfirmDialogComponent;
}());
ConfirmDialogComponent = __decorate([
    core_1.Component({
        selector: 'confirm-dialog',
        providers: [],
        // styles: [require('./confirm-dialog.component.scss')],
        template: __webpack_require__(18),
    }),
    __metadata("design:paramtypes", [])
], ConfirmDialogComponent);
exports.ConfirmDialogComponent = ConfirmDialogComponent;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var confirm_dialog_component_1 = __webpack_require__(3);
var dialog_backdrop_component_1 = __webpack_require__(7);
var dialog_container_component_1 = __webpack_require__(8);
var dialog_placeholder_1 = __webpack_require__(9);
var confirm_dialog_component_2 = __webpack_require__(3);
exports.ConfirmDialogComponent = confirm_dialog_component_2.ConfirmDialogComponent;
var dialog_backdrop_component_2 = __webpack_require__(7);
exports.DialogBackdropComponent = dialog_backdrop_component_2.DialogBackdropComponent;
var dialog_container_component_2 = __webpack_require__(8);
exports.DialogContainerComponent = dialog_container_component_2.DialogContainerComponent;
var dialog_placeholder_2 = __webpack_require__(9);
exports.DialogPlaceholderComponent = dialog_placeholder_2.DialogPlaceholderComponent;
exports.Components = [
    confirm_dialog_component_1.ConfirmDialogComponent,
    dialog_backdrop_component_1.DialogBackdropComponent,
    dialog_container_component_1.DialogContainerComponent,
    dialog_placeholder_1.DialogPlaceholderComponent,
];


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(10));
__export(__webpack_require__(25));
__export(__webpack_require__(24));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(26);
var components_1 = __webpack_require__(4);
var services_1 = __webpack_require__(1);
var MDialogModule = (function () {
    function MDialogModule() {
    }
    MDialogModule.forRoot = function () {
        return {
            ngModule: MDialogModule,
            providers: [
                services_1.MDialogService,
            ],
        };
    };
    return MDialogModule;
}());
MDialogModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
        ],
        providers: [],
        declarations: [
            components_1.Components,
        ],
        exports: [
            components_1.Components,
        ],
    }),
    __metadata("design:paramtypes", [])
], MDialogModule);
exports.MDialogModule = MDialogModule;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var DialogBackdropComponent = (function () {
    function DialogBackdropComponent() {
    }
    return DialogBackdropComponent;
}());
DialogBackdropComponent = __decorate([
    core_1.Component({
        selector: 'dialog-backdrop',
        providers: [],
        styles: [__webpack_require__(15)],
        template: __webpack_require__(19),
    }),
    __metadata("design:paramtypes", [])
], DialogBackdropComponent);
exports.DialogBackdropComponent = DialogBackdropComponent;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var DialogContainerComponent = (function () {
    function DialogContainerComponent() {
    }
    return DialogContainerComponent;
}());
DialogContainerComponent = __decorate([
    core_1.Component({
        selector: 'dialog-container',
        providers: [],
        styles: [__webpack_require__(16)],
        template: __webpack_require__(20),
        animations: [
            core_1.trigger('fade', [
                core_1.state('void', core_1.style({ opacity: 0 })),
                core_1.state('*', core_1.style({ opacity: 1 })),
                core_1.transition(':enter', core_1.animate(200)),
                core_1.transition(':leave', core_1.animate(200)),
            ]),
            core_1.trigger('slideDown', [
                core_1.state('void', core_1.style({
                    transform: 'translateY(-100%)',
                    opcity: 0,
                })),
                core_1.state('*', core_1.style({
                    transform: 'translateY(0)',
                    opacity: 1,
                })),
                core_1.transition(':enter', core_1.animate(200)),
                core_1.transition(':leave', core_1.animate(200)),
            ]),
        ],
    }),
    __metadata("design:paramtypes", [])
], DialogContainerComponent);
exports.DialogContainerComponent = DialogContainerComponent;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(23));


/***/ },
/* 10 */
/***/ function(module, exports) {

"use strict";
"use strict";
var ModalContainer = (function () {
    function ModalContainer() {
    }
    return ModalContainer;
}());
exports.ModalContainer = ModalContainer;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var ReplaySubject_1 = __webpack_require__(28);
var lib_1 = __webpack_require__(5);
var m_dialog_module_1 = __webpack_require__(6);
var confirm_dialog_1 = __webpack_require__(22);
var platform_browser_1 = __webpack_require__(27);
var MDialogService = (function () {
    function MDialogService(compiler, document) {
        this.compiler = compiler;
        this.document = document;
        this._activeInstances = 0;
    }
    MDialogService.prototype.registerViewContainerRef = function (vcr) {
        this.viewContainerRef = vcr;
    };
    MDialogService.prototype.registerInjector = function (injector) {
        this.injector = injector;
    };
    Object.defineProperty(MDialogService.prototype, "activeInstances", {
        get: function () {
            return this._activeInstances;
        },
        set: function (value) {
            this._activeInstances = value;
            if (this._activeInstances > 0) {
                this.setDocumentStyle('overflow', 'hidden');
            }
            else {
                this.setDocumentStyle('overflow', '');
            }
        },
        enumerable: true,
        configurable: true
    });
    MDialogService.prototype.create = function (module, component, parameters) {
        var _this = this;
        var componentRef$ = new ReplaySubject_1.ReplaySubject();
        var result$ = new ReplaySubject_1.ReplaySubject();
        this.compiler.compileModuleAndAllComponentsAsync(module)
            .then(function (factory) {
            var componentFactory = factory.componentFactories
                .filter(function (it) { return it.componentType === component; })[0];
            if (!componentFactory) {
                throw 'Cannot find dialog component. Make sure you\'ve declared one.';
            }
            var childInjector = core_1.ReflectiveInjector.resolveAndCreate([], _this.injector);
            var componentRef = _this.viewContainerRef
                .createComponent(componentFactory, 0, childInjector);
            _this.activeInstances++;
            var dismiss = function () {
                _this.activeInstances--;
                componentRef.destroy();
                result$.next(new lib_1.DialogDismissed());
                result$.complete();
            };
            var close = function (data) {
                _this.activeInstances--;
                componentRef.destroy();
                var result = new lib_1.DialogClosed(data);
                result$.next(result);
                result$.complete();
            };
            Object.assign(componentRef.instance, parameters, { dismiss: dismiss, close: close });
            componentRef$.next({
                componentRef: componentRef,
            });
            componentRef$.complete();
        });
        return {
            componentRef: componentRef$,
            result: result$,
        };
    };
    MDialogService.prototype.confirm = function (title, body, btnOkLabel, btnCancelLabel) {
        if (btnOkLabel === void 0) { btnOkLabel = 'Ok'; }
        if (btnCancelLabel === void 0) { btnCancelLabel = 'Cancel'; }
        var context = {
            title: title,
            body: body,
            btnOkLabel: btnOkLabel,
            btnCancelLabel: btnCancelLabel,
        };
        return this.create(m_dialog_module_1.MDialogModule, confirm_dialog_1.ConfirmDialogComponent, context);
    };
    MDialogService.prototype.setDocumentStyle = function (name, value) {
        try {
            this.document.body.style[name] = value;
        }
        catch (e) {
            console.warn(e);
        }
    };
    return MDialogService;
}());
MDialogService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [core_1.Compiler,
        Document])
], MDialogService);
exports.MDialogService = MDialogService;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ":host {\n  display: block;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.5);\n  overflow-y: auto;\n}", ""]);

// exports


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, ":host {\n  display: block;\n  position: relative;\n}\n\n.backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: transparent;\n  visibility: hidden;\n  transition: visibility 0ms 300ms, background 300ms 0ms;\n}\n\n.backdrop.show {\n  visibility: visible;\n  background: rgba(0, 0, 0, 0.5);\n  transition: visibility 0ms 0ms, background 300ms 0ms;\n}", ""]);

// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(12);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(13);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(14);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = "<dialog-container><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button class=\"close\" type=\"button\" (click)=\"dismiss()\">&times;</button><h4 class=\"modal-title\">{{ title }}</h4></div><div class=\"modal-body\">{{ body }}</div><div class=\"modal-footer\"><button class=\"btn btn-default\" (click)=\"close()\">{{ btnCancelLabel }}</button><button class=\"btn btn-success\" (click)=\"close(true)\">{{ btnOkLabel }}</button></div></div></div></dialog-container>";

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = "<ng-content></ng-content>";

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = "<dialog-backdrop @fade><div @slideDown><ng-content></ng-content></div></dialog-backdrop>";

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = "";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(3));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__(0);
var services_1 = __webpack_require__(1);
var DialogPlaceholderComponent = (function () {
    function DialogPlaceholderComponent(injector, mDialog, viewRef) {
        this.injector = injector;
        this.mDialog = mDialog;
        this.viewRef = viewRef;
        this.mDialog.registerViewContainerRef(this.viewRef);
        this.mDialog.registerInjector(this.injector);
    }
    Object.defineProperty(DialogPlaceholderComponent.prototype, "instanceCount", {
        get: function () {
            return this.mDialog.activeInstances;
        },
        enumerable: true,
        configurable: true
    });
    return DialogPlaceholderComponent;
}());
__decorate([
    core_1.ViewChild('container', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], DialogPlaceholderComponent.prototype, "viewContainer", void 0);
DialogPlaceholderComponent = __decorate([
    core_1.Component({
        selector: 'dialog-placeholder',
        template: __webpack_require__(21),
        styles: [__webpack_require__(17)],
    }),
    __metadata("design:paramtypes", [core_1.Injector,
        services_1.MDialogService,
        core_1.ViewContainerRef])
], DialogPlaceholderComponent);
exports.DialogPlaceholderComponent = DialogPlaceholderComponent;


/***/ },
/* 24 */
/***/ function(module, exports) {

"use strict";
"use strict";
var DialogResult = (function () {
    function DialogResult() {
    }
    return DialogResult;
}());
exports.DialogResult = DialogResult;
var DialogClosed = (function (_super) {
    __extends(DialogClosed, _super);
    function DialogClosed(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        return _this;
    }
    return DialogClosed;
}(DialogResult));
exports.DialogClosed = DialogClosed;
var DialogDismissed = (function (_super) {
    __extends(DialogDismissed, _super);
    function DialogDismissed() {
        return _super.apply(this, arguments) || this;
    }
    return DialogDismissed;
}(DialogResult));
exports.DialogDismissed = DialogDismissed;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var dialog_container_1 = __webpack_require__(10);
function Dialog() {
    return function (target) {
        Object.assign(target.prototype, dialog_container_1.ModalContainer.prototype);
    };
}
exports.Dialog = Dialog;


/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_27__;

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_28__;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(6));
__export(__webpack_require__(1));
__export(__webpack_require__(4));
__export(__webpack_require__(5));


/***/ }
/******/ ]);
});