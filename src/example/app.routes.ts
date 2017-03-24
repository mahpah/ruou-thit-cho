import { Routes, RouterModule } from '@angular/router'
import { SocketComponent, SignalrComponent } from './components'

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'socket',
	},
	{
		path: 'socket',
		component: SocketComponent,
	},
	{
		path: 'signalr',
		component: SignalrComponent,
	},
]

export const AppRoutingModule = RouterModule.forRoot(routes)
