import { Injectable, EventEmitter } from '@angular/core'
import { SignalrConnection } from 'modules/signalr'
import { SignalingConnection } from 'modules/web-rtc'

@Injectable()
export class SignalrSignalingConnectionFactory {
	constructor(
		private connection: SignalrConnection,
	) {}

	create(receivers) {
		return new SignalrSignalingConnection(this.connection, receivers)
	}
}


export class SignalrSignalingConnection implements SignalingConnection {
	candidate = new EventEmitter()
	offer = new EventEmitter()
	answer = new EventEmitter()

	constructor(
		private connection: SignalrConnection,
		private recivers: Array<string>
	) {
		this.init()
	}

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

	sendOffer(description) {
		this.recivers.forEach(id => {
			this.sendSignal(description, id)
		})
	}

	sendAnswer(description) {
		this.recivers.forEach(id => {
			this.sendSignal(description, id)
		})
	}

	sendCandidate(candidate) {
		this.recivers.forEach(id => {
			this.sendSignal(candidate, id)
		})
	}

	private sendSignal(data, uid) {
		data = JSON.stringify(data)
		this.connection.call('sendSignal', [data, uid])
	}
}
