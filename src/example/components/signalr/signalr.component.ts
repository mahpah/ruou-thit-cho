import { Component, ViewChild, ElementRef, Renderer } from '@angular/core'
import { SignalrConnection } from 'modules/signalr'
import { WebRTCService } from 'modules/web-rtc'
import { SignalrSignalingConnectionFactory } from '../../services'
import { FormBuilder, FormGroup } from '@angular/forms'
declare const jQuery: any

@Component({
	selector: 'signalr',
	providers: [
		SignalrSignalingConnectionFactory,
		WebRTCService,
	],
	styleUrls: ['./signalr.component.scss'],
	templateUrl: './signalr.component.jade',
})
export class SignalrComponent {
	@ViewChild('screen') screen: ElementRef
	@ViewChild('mirror') mirror: ElementRef
	// private requestPending
	// private started
	// private isRequesting
	private form: FormGroup
	private userData

	constructor(
		private signalrConnection: SignalrConnection,
		private signalrSignalingFactory: SignalrSignalingConnectionFactory,
		private webRtc: WebRTCService,
		private renderer: Renderer,
		private formBuilder: FormBuilder,
	) {}

	ngOnInit() {
		this.buildForm()
	}

	viewStream(stream, target) {
		this.renderer.setElementProperty(target, 'srcObject', stream)
	}

	submit() {
		fetch('https://amazon.digimed.vn/api/instructor/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: jQuery.param(this.form.value),
		} as any).then(res => res.json())
		.then((data: any) => {
			this.userData = data
			let token = data.token

			return this.signalrConnection.setConfig({
				qs: {
					Bearer: token,
				},
			})
			.call('subscribe')
		})
		.then(() => {
			this.listen()
		})
	}

	call([userId]) {
		let signaling = this.signalrSignalingFactory.create([userId])
		this.webRtc.init(signaling)
		this.webRtc.createConnection(null)
		this.signalrConnection.call('callUser', [userId])
	}

	onIncomingCall(data) {
		if (true) {
			let ids = data.map(d => d.UserId)
			let signaling = this.signalrSignalingFactory.create(ids)
			this.webRtc.init(signaling)
			this.webRtc.createConnection()
			this.webRtc.request.subscribe(_ => {
				this.webRtc.createAnswer({})
			})
			data.forEach(({UserId}) => {
				this.signalrConnection.call('answerCall', [true, UserId])
			})
		}
	}

	onCallAccepted(data) {
		console.log('tao accept', data)
		this.webRtc.streamAdded.subscribe(stream => {
			this.viewStream(stream, this.screen.nativeElement)
		})
		this.webRtc.getUserMedia({
			video: true,
			audio: false,
		}).then(stream => {
			this.viewStream(stream, this.mirror.nativeElement)
			this.webRtc.addMediaStream(stream)
			this.webRtc.createOffer({
				offerToReceiveVideo: 1,
				offerToReceiveAudio: 0,
			})
		})
	}

	onOtherAccepted(data) {
		console.log('onOtherAccepted', data)
	}

	onCallDeclined(data) {
		console.log(data)
	}

	private buildForm() {
		this.form = this.formBuilder.group({
			email: [],
			password: [],
		})
	}

	private listen() {
		[
			'onIncomingCall',
			'onCallAccepted',
			'onOtherAccepted',
			'onCallDeclined',
		].forEach(ev => {
			this.signalrConnection.events(ev)
				.subscribe(data => {
					this[ev](data)
				})
		})
	}
}
