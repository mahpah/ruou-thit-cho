import { NgModule, ModuleWithProviders } from '@angular/core'
import { SignalrConnection, SignalrConfig } from './services'

@NgModule({
	providers: [
		SignalrConnection,
	],
})
export class SignalrModule {
	/**
	 * init some default settings
	 * @param defaultConfig default config when create new connection
	 */
	static forRoot(defaultConfig: SignalrConfig): ModuleWithProviders {
		return {
			ngModule: SignalrModule,
			providers: [{
				provide: SignalrConfig,
				useValue: defaultConfig,
			}],
		}
	}
}
