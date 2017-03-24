import { EventEmitter } from '@angular/core';
import 'webrtc-adapter';
import { SignalingService } from './signaling.service';
export declare class WebRTCService {
    private signaling;
    remoteStream: MediaStream;
    localStream: MediaStream;
    streamRemoved: EventEmitter<{}>;
    streamAdded: EventEmitter<{}>;
    request: EventEmitter<{}>;
    private connection;
    private serverConfig;
    constructor(signaling: SignalingService);
    init(): void;
    createConnection(config?: RTCConfiguration): void;
    createOffer(constraints: any): void;
    createAnswer(): void;
    addMediaStream(stream: MediaStream): void;
    getUserMedia(constraints: any): Promise<MediaStream>;
    closeConnection(): void;
}
