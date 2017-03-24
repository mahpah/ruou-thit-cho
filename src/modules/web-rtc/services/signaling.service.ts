import { Injectable, EventEmitter } from '@angular/core'

@Injectable()
export abstract class SignalingConnection {
	candidate: EventEmitter<RTCIceCandidate>
	offer: EventEmitter<RTCSessionDescription>
	answer: EventEmitter<RTCSessionDescription>

	abstract sendOffer(constraints?): void
	abstract sendAnswer(contraints): void
	abstract sendCandidate(candidate: RTCIceCandidate): void
	abstract init(params: any): void
}
