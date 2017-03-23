import { EventEmitter } from '@angular/core';
import { SocketIOConnection } from 'modules/socket.io';
import { SignalingService } from 'modules/web-rtc';
export declare class SocketIOSignalingService extends SignalingService {
    private socket;
    offer: EventEmitter<{}>;
    answer: EventEmitter<{}>;
    candidate: EventEmitter<{}>;
    constructor(socket: SocketIOConnection);
    onInit(): void;
    sendOffer(description: any): void;
    sendAnswer(description: any): void;
    sendCandidate(candidate: any): void;
}
