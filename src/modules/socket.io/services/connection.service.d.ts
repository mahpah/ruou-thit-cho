import { EventEmitter } from '@angular/core';
import { ConnectionConfig } from './connection-config.service';
export declare class SocketIOConnection {
    private config;
    private eventEmitters;
    private socket;
    constructor(config: ConnectionConfig);
    connect(): void;
    join(room?: any): void;
    emit(event: any, data?: any): void;
    subscribe(event: any): EventEmitter<any>;
    events(name: any): EventEmitter<any>;
}
