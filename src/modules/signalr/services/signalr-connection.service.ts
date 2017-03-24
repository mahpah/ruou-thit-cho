import { Injectable, Inject, Optional, EventEmitter } from '@angular/core'
import { SignalrConfig } from './signalr-config.service'

declare const jQuery: any

@Injectable()
export class SignalrConnection {
	stateChanged = new EventEmitter()
	private eventEmitters = new Map()

	private config
	private hubProxy
	private loadScriptPromise: Promise<any>
	private hubProxyPromise: Promise<any>

	constructor(
		@Optional() @Inject(SignalrConfig) config: SignalrConfig,
	) {
		this.config = config || {}
	}

	setConfig(value: SignalrConfig) {
		this.config = Object.assign({}, this.config, value)
		return this
	}

	/**
	 * call hub proxy server method
	 * @param method method name
	 * @param args Array of arguments
	 */
	call(method: string, args?: Array<any>): Promise<any> {
		console.log('Calling', method, 'with', args)

		return this.server.then(server => {
			if (typeof server[method] !== 'function') {
				let err = new Error(`Unsupported method ${method}`)
				err.name = 'ErrUnsupportedMethod'
				return Promise.reject(err)
			}

			return server[method].apply(server, args)
		})
	}

	startConnection() {
		return this.loadProxyScript()
			.then(() => this.createHubProxy())
			.catch(err => {
				console.warn('Signalr Connection stopped', err)
				return Promise.reject(err)
			})
	}

	stopConnection() {
		return this.loadProxyScript()
			.then(() => this.createHubProxy())
			.catch(err => {
				console.warn('Signalr Connection stopped', err)
				return Promise.reject(err)
			})
	}

	/**
	 * return promise of server object after ensure connection is started
	 */
	get server() {
		return this.loadProxyScript()
			.then(_ => this.createHubProxy())
			.then(_ => this.hubProxy.server)
	}

	events(name) {
		if (this.eventEmitters.has(name)) {
			return this.eventEmitters.get(name)
		}

		console.warn('No body care about this event', name)
		let emitter = new EventEmitter()
		if (this.hubProxy) {
			this.hubProxy.client[name] = (...args) => {
				emitter.emit(args)
			}
			this.eventEmitters.set(name, emitter)
		} else {
			console.log('No proxy')
		}

		return emitter
	}

	private createHubProxy() {
		if (this.hubProxyPromise) {
			return this.hubProxyPromise
		}

		let promise = new Promise((resolve, reject) => {
			let { hubName } = this.config
			const $ = jQuery

			const fields = ['url', 'qs']
			fields.forEach(k => {
				$.connection.hub[k] = this.config[k]
			})
			let hubProxy = $.connection[hubName]
			this.hubProxy = hubProxy

			if (this.config.events) {
				this.config.events.forEach(ev => this.events(ev))
			}

			$.connection.hub.stateChanged(e => {
				this.stateChanged.next(e)
			})

			$.connection.hub.error((e) => {
				// this.error.next(e)
				this.events('hubError').emit(e)
			})

			$.connection.hub.start()
				.done(resolve)
				.fail(reject)
		})
		this.hubProxyPromise = promise
		return promise
	}

	private loadProxyScript(rewriteProtocol = true): Promise<any> {
		if (this.loadScriptPromise) {
			return this.loadScriptPromise
		}
		let { url } = this.config

		this.loadScriptPromise = new Promise((resolve, reject) => {
			let id = `external-script-` + Date.now()
			if (!document) {
				return reject()
			}

			if (rewriteProtocol) {
				url = url.replace(/^https?:\/\//, '//')
			}

			let script = document.createElement('script')
			script.setAttribute('type', 'text/javascript')
			script.setAttribute('src', url)
			script.id = id
			script.onload = () => {
				resolve(id)
			}
			document.body.appendChild(script)
		})

		return this.loadScriptPromise
	}
}
