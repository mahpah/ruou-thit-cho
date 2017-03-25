# WebRTC service for angular 2+

## Example

```
import { WebRtcConnection } from '@mahpah/ruou-thit-cho'
import { SignalingConnectionFactory } from './you-write-your-own

@Component({
	// ...
	providers: [ WebRtcService ],
})
class VideoCallComponent {
	private connection

	constructor(
		private webRTC: WebRtcService,
		private signalingConnectionFactory: SignalingConnectionFactory,
	) {}

	ngOnInit() {
		const signalingConnection = this.signalingConnectionFactory.create(
			// ... options, all yours
		)
		this.webRtcService
			.setConfig({
				signalingConnection,
			})
			.init()
		this.connection = this.webRtcService
			.createConnection()
		connection.stream.subscribe((stream) => {
			// ...render stream
		})

		this.connection.offer.subscribe(() => {
			// ... prepare your stream
			this.connection.createAnswer()
		})
	}

	triggerCall() {
		connection.createOffer(/* constraints */)
			.subscribe(() => {
				// ...on offer created successfully, prepare your stream
			}, () => {
				// ...on reject
			})
	}
}
```
