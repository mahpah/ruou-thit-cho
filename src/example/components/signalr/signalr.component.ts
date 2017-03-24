import { Component, ViewChild, ElementRef, Renderer } from '@angular/core'
import { SignalrConnection } from 'modules/signalr'
import { WebRTCService, SignalingService } from 'modules/web-rtc'
import { SignalrSignaling } from '../../services'
import { FormBuilder, FormGroup } from '@angular/forms'
declare const jQuery: any

@Component({
	selector: 'signalr',
	providers: [
		SignalrSignaling,
		{
			provide: SignalingService,
			useExisting: SignalrSignaling,
		},
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
		private signalrSignaling: SignalrSignaling,
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
			this.signalrSignaling.init()
			this.webRtc.init()
			this.listen()
		})
	}

	call([userId]) {
		this.webRtc.createConnection(null, [userId])
		this.signalrConnection.call('callUser', [userId])
	}

	onIncomingCall(data) {
		console.log(data)
		if (true) {
			this.webRtc.createConnection(null, data.map(d => d.UserId))
			data.forEach(({UserId}) => {
				this.signalrConnection.call('answerCall', [true, UserId])
			})
		}

		this.webRtc.request.subscribe(_ => {
			this.webRtc.createAnswer({}, data)
		})
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
			}, data)
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
