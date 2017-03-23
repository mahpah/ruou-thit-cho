import { ElementRef, Renderer } from '@angular/core';
import { SocketIOConnection } from 'modules/socket.io';
import { WebRTCService } from 'modules/web-rtc';
export declare class AppComponent {
    private socket;
    private webRtc;
    private renderer;
    screen: ElementRef;
    mirror: ElementRef;
    constructor(socket: SocketIOConnection, webRtc: WebRTCService, renderer: Renderer);
    ngOnInit(): void;
    send(value: any): void;
    call(): void;
    private viewStream(stream, target);
}
