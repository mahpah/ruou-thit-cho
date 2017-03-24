import { Injectable, EventEmitter } from '@angular/core'
import { SocketIOConnection } from 'modules/socket.io'
import { SignalingService } from 'modules/web-rtc'

@Injectable()
export class SocketIOSignalingService extends SignalingService {
	offer = new EventEmitter()
	answer = new EventEmitter()
	candidate = new EventEmitter()

	constructor(
		private socket: SocketIOConnection,
	) {
		super()
		this.onInit()
	}

	init() {}

	onInit() {
		this.socket.events('message').subscribe(data => {
			switch (data.type) {
				case 'offer':
					this.offer.emit(data)
					return
				case 'answer':
					this.answer.emit(data)
					return
				case 'candidate':
					this.candidate.emit(new RTCIceCandidate(data))
					return
				default:
					return
			}
		})
	}

	sendOffer(description) {
		this.socket.emit('message', description)
	}

	sendAnswer(description) {
		this.socket.emit('message', description)
	}

	sendCandidate(candidate) {
		this.socket.emit('message', Object.assign({}, candidate, {type: 'candidate'}))
	}
}
