import { Component, ViewChild, ElementRef, Renderer } from '@angular/core'
import { SocketIOConnection } from 'modules/socket.io'
import { WebRTCService } from 'modules/web-rtc'
import { SocketIOSignalingService } from '../../services'
import { SignalingConnection } from 'modules/web-rtc'

/**
 * demo connect using socket.id
 */
@Component({
	selector: 'socket',
	providers: [
		{
			provide: SignalingConnection,
			useExisting: SocketIOSignalingService,
		},
		WebRTCService,
	],
	styleUrls: ['./socket.component.scss'],
	templateUrl: './socket.component.jade',
})
export class SocketComponent {

	@ViewChild('screen') screen: ElementRef
	@ViewChild('mirror') mirror: ElementRef
	private requestPending
	private started
	private isRequesting

	constructor(
		private socket: SocketIOConnection,
		private webRtc: WebRTCService,
		private renderer: Renderer,
	) {}

	ngOnInit() {
		this.webRtc.init()
		this.socket.emit('create or join', 'abc')
		this.webRtc.request.subscribe(() => {
			this.onRequest()
		})

		this.webRtc.streamRemoved.subscribe(() => {
			this.isRequesting = false
			this.started = false
			this.requestPending = false
		})
	}

	send(value) {
		return value && this.socket.emit('message', value)
	}

	call() {
		this.isRequesting = true
		this.webRtc.streamAdded.subscribe(remoteStream => {
			this.viewStream(remoteStream, this.screen.nativeElement)
			this.isRequesting = false
			this.started = true
		})
		this.webRtc.getUserMedia({
			video: true,
			audio: true,
		}).then(stream => {
			this.viewStream(stream, this.mirror.nativeElement)
			this.webRtc.addMediaStream(stream)
			this.webRtc.createOffer({
				offerToReceiveVideo: 1,
				offerToReceiveAudio: 1,
			})
		})
	}

	onRequest() {
		this.requestPending = true
		this.webRtc.streamAdded.subscribe(stream => {
			this.viewStream(stream, this.screen.nativeElement)
		})
	}

	onAccept() {
		// if accept
		this.webRtc
			.getUserMedia({
				video: true,
				audio: true,
			})
			.then(localStream => {
				this.viewStream(localStream, this.mirror.nativeElement)
				this.webRtc.addMediaStream(localStream)
				this.webRtc.createAnswer()
				this.started = true
			})
	}

	hang() {
		this.webRtc.closeConnection()
	}

	private viewStream(stream, target) {
		this.renderer.setElementProperty(target, 'srcObject', stream)
	}
}
