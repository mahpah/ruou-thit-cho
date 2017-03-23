import { Component, ElementRef, Renderer, ViewChild } from '@angular/core'
import { SocketIOConnection } from 'modules/socket.io'
import { WebRTCService } from 'modules/web-rtc'

@Component({
	selector: 'app',
	providers: [  ],
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.jade',
})
export class AppComponent {
	@ViewChild('screen') screen: ElementRef
	@ViewChild('mirror') mirror: ElementRef

	constructor(
		private socket: SocketIOConnection,
		private webRtc: WebRTCService,
		private renderer: Renderer,
	) {}

	ngOnInit() {
		this.socket.emit('create or join', 'abc')
		this.webRtc.request.subscribe(() => {
			this.webRtc.createAnswer()
		})
		this.webRtc.streamAdded.subscribe(stream => {
			this.viewStream(stream, this.screen.nativeElement)
		})
	}

	send(value) {
		return value && this.socket.emit('message', value)
	}

	call() {
		this.webRtc.getUserMedia()
			.then(stream => {
				this.viewStream(stream, this.mirror.nativeElement)
				this.webRtc.createOffer({
					offerToReceiveVideo: 1,
					offerToReceiveAudio: 0,
				})
			})
	}

	private viewStream(stream, target) {
		this.renderer.setElementProperty(target, 'srcObject', stream)
	}
}
