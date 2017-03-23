import { NgModule, ModuleWithProviders } from '@angular/core'
import { ConnectionConfig, SocketIOConnection } from './services'

@NgModule({})
export class SocketIOModule {
	static forRoot(config: ConnectionConfig): ModuleWithProviders {
		return {
			ngModule: SocketIOModule,
			providers: [{
				provide: ConnectionConfig,
				useValue: config,
			}, SocketIOConnection]
		}
	}
}
