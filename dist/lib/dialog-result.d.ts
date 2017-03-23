export declare abstract class DialogResult {
    abstract type: string;
    abstract data: any;
}
export declare class DialogClosed extends DialogResult {
    data: any;
    type: 'closed';
    constructor(data: any);
}
export declare class DialogDismissed extends DialogResult {
    type: 'dismissed';
    data: any;
}
