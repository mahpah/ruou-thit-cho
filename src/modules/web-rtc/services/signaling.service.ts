import { Injectable, EventEmitter } from '@angular/core'

@Injectable()
export abstract class SignalingService {
	candidate: EventEmitter<RTCIceCandidate>
	offer: EventEmitter<RTCSessionDescription>
	answer: EventEmitter<RTCSessionDescription>

	abstract sendOffer(p: any, ...extra): void
	abstract sendAnswer(p: any, ...extra): void
	abstract sendCandidate(candidate: RTCIceCandidate, ...extra): void
	abstract init(): void
}
