import { Injectable, EventEmitter } from '@angular/core'
import 'webrtc-adapter'
import { SignalingConnection } from './signaling.service'

@Injectable()
export class WebRTCService {
	remoteStream: MediaStream
	localStream: MediaStream
	streamRemoved = new EventEmitter()
	streamAdded = new EventEmitter()
	request = new EventEmitter()
	candidate = []
	private peerConnection: RTCPeerConnection
	private serverConfig: RTCConfiguration
	private signaling: SignalingConnection

	constructor() {}

	setConfig(params: {
		signaling: SignalingConnection,
	}) {
		this.signaling = params.signaling
		this.signaling.candidate.subscribe((candidate) => {
			this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
		})

		this.signaling.offer.subscribe(description => {
			this.peerConnection.setRemoteDescription(description)
			this.request.emit()
		})

		this.signaling.answer.subscribe(description => {
			this.peerConnection.setRemoteDescription(description)
		})

		return this
	}

	createConnection(config?: RTCConfiguration) {
		config = config || this.serverConfig
		this.peerConnection = new RTCPeerConnection(config)

		this.peerConnection.onicecandidate = event => {
			if (event.candidate) {
				let candidate = {
					candidate: event.candidate.candidate,
					sdpMLineIndex: event.candidate.sdpMLineIndex,
					sdpMid: event.candidate.sdpMid,
				} as RTCIceCandidate
				this.signaling.sendCandidate(candidate)
			}
		}

		this.peerConnection.onaddstream = (event) => {
			this.remoteStream = event.stream
			this.streamAdded.emit(this.remoteStream)
		}

		this.peerConnection.onremovestream = _event => {
			this.remoteStream = undefined
			this.streamRemoved.emit()
		}
	}

	createOffer(constraints) {
		if (!this.peerConnection) {
			throw 'No connection'
		}

		this.peerConnection.createOffer(constraints)
			.then(description => {
				this.peerConnection.setLocalDescription(description)
				this.signaling.sendOffer(description)
			})
	}

	createAnswer(constraints) {
		this.peerConnection.createAnswer(constraints)
			.then(description => {
				this.peerConnection.setLocalDescription(description)
				this.signaling.sendAnswer(description)
			})
	}

	addMediaStream(stream: MediaStream) {
		this.localStream = stream
		this.peerConnection.addStream(stream)
	}

	getUserMedia(constraints) {
		return window.navigator.mediaDevices.getUserMedia(constraints)
	}

	closeConnection() {
		if (this.localStream) {
			this.peerConnection.removeStream(this.localStream)
			this.localStream.getTracks().forEach(t => t.stop())
		}
		this.peerConnection.close()
	}
}
