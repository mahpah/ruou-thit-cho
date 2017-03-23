import { ModuleWithProviders } from '@angular/core';
import { ConnectionConfig } from './services';
export declare class SocketIOModule {
    static forRoot(config: ConnectionConfig): ModuleWithProviders;
}
