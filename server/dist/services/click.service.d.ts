interface ClickEvent {
    shortCode: string;
    eventId: string;
    clickedAt: string;
    referer: string | null;
    userAgent: string | null;
}
declare function processClickEvent(event: ClickEvent): Promise<void>;
export { processClickEvent };
//# sourceMappingURL=click.service.d.ts.map