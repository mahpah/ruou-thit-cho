import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { SocketIOModule } from 'modules/socket.io'
import { SocketIOSignalingService } from './services'
import { WebRtcModule } from 'modules/web-rtc'
import { AppRoutingModule } from './app.routes'
import { SocketComponent, SignalrComponent } from './components'
import { SignalrModule } from 'modules/signalr'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		SocketIOModule.forRoot({
			url: '//localhost:8080',
			autoConnect: true,
			events: ['message', 'created', 'join']
		}),
		WebRtcModule,
		AppRoutingModule,
		SignalrModule.forRoot({
			hubName: 'everlearnHub',
			url: 'http://192.168.10.16:54300/signalr/hubs',
			events: [
				'onOnlineUsersUpdated',
				'onSignalReceived',
				'onIncomingCall',
				'onCallAccepted',
				'onOtherAccepted',
				'onCallDeclined',
				'onCallEnded',
				'onError',
			],
		}),
	],

	providers: [
		SocketIOSignalingService,
	],

	declarations: [
		AppComponent,
		SocketComponent,
		SignalrComponent,
	],

	entryComponents: [
		SocketComponent,
		SignalrComponent,
	],

	bootstrap: [
		AppComponent,
	],
})
export class AppModule {}
