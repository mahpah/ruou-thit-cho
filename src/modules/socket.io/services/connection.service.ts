import { Injectable, EventEmitter, Inject } from '@angular/core'
import { ConnectionConfig } from './connection-config.service'
import * as io from 'socket.io-client'

@Injectable()
export class SocketIOConnection {
	private eventEmitters = new Map<string, EventEmitter<any>>()
	private socket: SocketIOClient.Socket

	constructor(
		@Inject(ConnectionConfig) private config: ConnectionConfig,
	) {
		if (this.config.autoConnect) {
			this.connect()
		}
	}

	connect() {
		const { url } = this.config
		this.socket = io.connect(url)
		if (this.config.room) {
			this.join()
		}

		if (this.config.events instanceof Array) {
			this.config.events.forEach(ev => this.subscribe(ev))
		}
	}

	join(room?) {
		room = room || this.config.room || 'defaultRoom'
		this.socket.emit('join', room)
	}

	emit(event, data?) {
		this.socket.emit(event, data)
	}

	subscribe(event) {
		if (this.eventEmitters.has(event)) {
			return this.eventEmitters.get(event)
		}

		let emitter = new EventEmitter()
		this.socket.on(event, (data) => {
			emitter.emit(data)
		})

		this.eventEmitters.set(event, emitter)
		return emitter
	}

	events(name): EventEmitter<any> {
		if (this.eventEmitters.has(name)) {
			return this.eventEmitters.get(name)
		}

		// no break, but useless
		console.warn(`No one take care of this event: ${name}`)
		return this.subscribe(name)
	}
}
