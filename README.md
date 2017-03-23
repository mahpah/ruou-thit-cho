# Angular2 modal component

For angular 1 one, please check this repo: https://github.com/mahpah/mDialog

## Manual

Import `MDialogModule` to your main module as root. Register your custom modal within your main module or any module.

```
@NgModule({
	imports: [
		// ...
		MDialogModule.forRoot(),
	],
	declarations: [
		MyCustomModal,
	],
	entryComponents: [
		MyCustomModal,
	],
})
export class MainModule {}
```

Call `MDialogService.create()` from your component

```
class AppComponent {

	constructor(
		private mDialog: MDialogService,
	) {}

	openModal() {
		let modalRef = this.mDialog.create(
			MainModule,
			MyCustomModal,
			// ...any data
		)
	}
}
```

`modalRef` contain 2 replay subject: `componentRef` emit event when component created; and `result` subject emit event when dialog close or dismiss

```
interface ModalRef {
	componentRef: ReplaySubject<componentInstance>,
	result: ReplaySubject<DialogResult>
}
```
