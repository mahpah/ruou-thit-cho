import { Injectable, Inject, EventEmitter } from '@angular/core'
import 'webrtc-adapter'
import { SignalingService } from './signaling.service'

@Injectable()
export class WebRTCService {
	remoteStream: MediaStream
	localStream: MediaStream
	streamRemoved = new EventEmitter()
	streamAdded = new EventEmitter()
	request = new EventEmitter()
	private connection: RTCPeerConnection
	private serverConfig: RTCConfiguration

	constructor(
		@Inject(SignalingService) private signaling: SignalingService
	) {
		this.init()
	}

	init() {
		this.createConnection()
		this.signaling.candidate.subscribe(candidate => {
			this.connection.addIceCandidate(new RTCIceCandidate(candidate))
		})

		this.signaling.offer.subscribe(description => {
			this.connection.setRemoteDescription(description)
			this.request.emit()
		})

		this.signaling.answer.subscribe(description => {
			this.connection.setRemoteDescription(description)
		})

	}

	createConnection(config?: RTCConfiguration) {
		config = config || this.serverConfig
		this.connection = new RTCPeerConnection(config)

		this.connection.onicecandidate = event => {
			if (event.candidate) {
				this.signaling.sendCandidate({
					candidate: event.candidate.candidate,
					sdpMLineIndex: event.candidate.sdpMLineIndex,
					sdpMid: event.candidate.sdpMid,
				} as RTCIceCandidate)
			}
		}

		this.connection.onaddstream = (event) => {
			this.remoteStream = event.stream
			this.streamAdded.emit(this.remoteStream)
		}

		this.connection.onremovestream = _event => {
			this.remoteStream = undefined
			this.streamRemoved.emit()
		}
	}

	createOffer(constraints) {
		if (!this.connection) {
			throw 'No connection'
		}

		this.connection.createOffer(constraints)
			.then(description => {
				this.connection.setLocalDescription(description)
				this.signaling.sendOffer(description)
			})
	}

	createAnswer() {
		this.connection.createAnswer()
			.then(description => {
				this.connection.setLocalDescription(description)
				this.signaling.sendAnswer(description)
			})
	}

	addMediaStream(stream: MediaStream) {
		this.localStream = stream
		this.connection.addStream(stream)
	}

	getUserMedia(constraints) {
		return window.navigator.mediaDevices.getUserMedia(constraints)
	}

	closeConnection() {
		if (this.localStream) {
			this.connection.removeStream(this.localStream)
			this.localStream.getTracks().forEach(t => t.stop())
		}
		this.connection.close()
	}
}
