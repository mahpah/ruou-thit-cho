import { Injectable, EventEmitter } from '@angular/core'
import { SignalingService } from 'modules/web-rtc'
import { SignalrConnection } from 'modules/signalr'

@Injectable()
export class SignalrSignaling implements SignalingService {
	candidate = new EventEmitter()
	offer = new EventEmitter()
	answer = new EventEmitter()

	constructor(
		private connection: SignalrConnection,
	) {}

	init() {
		this.connection.events('onSignalReceived').subscribe(([_user, data]) => {
			console.log(data)
			try {
				data = JSON.parse(data)
				switch (data.type) {
					case 'offer':
						this.offer.emit(data)
						return
					case 'answer':
						this.answer.emit(data)
						return
					default:
						if (data.candidate) {
							this.candidate.emit(new RTCIceCandidate(data))
						}
						return
				}

			} catch(e) {
				console.log(e)
			}
		})
	}

	sendOffer(description, ids) {
		ids.forEach(id => {
			this.sendSignal(description, id)
		})
	}

	sendAnswer(description, ids) {
		ids.forEach(id => {
			this.sendSignal(description, id)
		})
	}

	sendCandidate(candidate, ids) {
		ids.forEach(id => {
			this.sendSignal(candidate, id)
		})
	}

	private sendSignal(data, uid) {
		data = JSON.stringify(data)
		this.connection.call('sendSignal', [data, uid])
	}
}
