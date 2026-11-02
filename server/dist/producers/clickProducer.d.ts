declare function producerConnect(): Promise<void>;
declare function sendMessage(event: {
    shortUrl: string;
}, data: Record<string, unknown>): Promise<void>;
export { producerConnect, sendMessage };
//# sourceMappingURL=clickProducer.d.ts.map