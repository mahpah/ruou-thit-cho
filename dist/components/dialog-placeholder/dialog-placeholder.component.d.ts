import { ViewContainerRef, Injector } from '@angular/core';
import { MDialogService } from '../../services';
export declare class DialogPlaceholderComponent {
    private injector;
    private mDialog;
    private viewRef;
    viewContainer: ViewContainerRef;
    constructor(injector: Injector, mDialog: MDialogService, viewRef: ViewContainerRef);
    readonly instanceCount: number;
}
