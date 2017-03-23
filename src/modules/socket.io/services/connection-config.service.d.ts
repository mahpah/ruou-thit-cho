export declare abstract class ConnectionConfig {
    url: string;
    autoConnect?: boolean;
    room?: string;
    /**
     * event to listen. Can manually add later
     */
    events?: Array<string>;
}
