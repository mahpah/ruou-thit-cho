import { NgModule } from '@angular/core'
import {
	WebRTCService,
} from './services'

@NgModule({
	imports: [],

	providers: [
		WebRTCService,
	],
})
export class WebRtcModule {
	static forRoot() {

	}
}
