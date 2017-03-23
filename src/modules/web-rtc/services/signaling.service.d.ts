import { EventEmitter } from '@angular/core';
export declare abstract class SignalingService {
    candidate: EventEmitter<RTCIceCandidate>;
    offer: EventEmitter<RTCSessionDescription>;
    answer: EventEmitter<RTCSessionDescription>;
    abstract sendOffer(constraints?: RTCOfferOptions): void;
    abstract sendAnswer(constraints?: RTCOfferOptions): void;
    abstract sendCandidate(candidate: RTCIceCandidate): void;
}
