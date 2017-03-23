import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { SocketIOModule } from 'modules/socket.io'
import { SocketIOSignalingService } from './services'
import { WebRtcModule, SignalingService } from 'modules/web-rtc'

@NgModule({
	imports: [
		BrowserModule,
		SocketIOModule.forRoot({
			url: '//localhost:8080',
			autoConnect: true,
			events: ['message', 'created', 'join']
		}),
		WebRtcModule,
	],

	providers: [
		SocketIOSignalingService,
		{
			provide: SignalingService,
			useExisting: SocketIOSignalingService,
		},
	],

	declarations: [
		AppComponent,
	],

	entryComponents: [
	],

	bootstrap: [
		AppComponent,
	],
})
export class AppModule {}
