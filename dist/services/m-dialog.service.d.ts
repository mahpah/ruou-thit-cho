import { Injector, ViewContainerRef, Compiler } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { DialogResult } from '../lib';
export declare class MDialogService {
    private compiler;
    private document;
    private _activeInstances;
    private viewContainerRef;
    private injector;
    constructor(compiler: Compiler, document: Document);
    registerViewContainerRef(vcr: ViewContainerRef): void;
    registerInjector(injector: Injector): void;
    activeInstances: number;
    create(module: any, component: any, parameters: Object): {
        componentRef: ReplaySubject<{}>;
        result: ReplaySubject<DialogResult>;
    };
    confirm(title: string, body: string, btnOkLabel?: string, btnCancelLabel?: string): {
        componentRef: ReplaySubject<{}>;
        result: ReplaySubject<DialogResult>;
    };
    private setDocumentStyle(name, value);
}
