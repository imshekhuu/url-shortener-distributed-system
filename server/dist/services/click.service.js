import postgresDb from "../shared/Connections/postgresDb.js";
async function processClickEvent(event) {
    const pool = postgresDb.getConnection();
    if (!pool) {
        throw new Error("PostgreSQL connection pool is not available.");
    }
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        // 1. Save individual click event
        const result = await client.query(`
            INSERT INTO click_events (
                event_id,
                short_code,
                clicked_at,
                referer,
                user_agent
            )
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (event_id) DO NOTHING
            RETURNING event_id
            `, [
            event.eventId,
            event.shortCode,
            event.clickedAt,
            event.referer,
            event.userAgent
        ]);
        // 2. Increment only if this is a new event
        if ((result.rowCount ?? 0) > 0) {
            await client.query(`UPDATE short_urls
                 SET clicks = clicks + 1, updated_at = NOW()
                 WHERE short_code = $1`, [event.shortCode]);
            await client.query(`
                INSERT INTO url_stats (
                    short_code,
                    total_clicks,
                    updated_at
                )
                VALUES ($1, 1, NOW())

                ON CONFLICT (short_code)
                DO UPDATE SET
                    total_clicks =
                        url_stats.total_clicks + 1,
                    updated_at = NOW()
                `, [event.shortCode]);
        }
        else {
            console.log("Duplicate event ignored:", event.eventId);
        }
        await client.query("COMMIT");
        console.log("Click processed:", event.shortCode);
    }
    catch (error) {
        await client.query("ROLLBACK");
        console.error("Click processing failed:", error);
        throw error;
    }
    finally {
        client.release();
    }
}
export { processClickEvent };
//# sourceMappingURL=click.service.js.map