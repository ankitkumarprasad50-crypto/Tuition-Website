namespace TuitionServer.Services;

// The tuition runs in one place (Kovvur, India) so all attendance times and the
// notion of "today" are in India Standard Time (UTC+5:30, no DST) regardless of
// the server's own clock (Linux runs in UTC).
public static class Ist
{
    public static readonly TimeZoneInfo Tz = Resolve();

    private static TimeZoneInfo Resolve()
    {
        foreach (var id in new[] { "Asia/Kolkata", "India Standard Time" })
        {
            try { return TimeZoneInfo.FindSystemTimeZoneById(id); }
            catch { /* try the next id */ }
        }
        // Last resort: a fixed +5:30 offset zone.
        return TimeZoneInfo.CreateCustomTimeZone("IST", TimeSpan.FromHours(5.5), "IST", "IST");
    }

    // Current wall-clock time in Kovvur (Kind = Unspecified — it is a local IST time).
    public static DateTime Now => TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, Tz);

    public static DateOnly Today => DateOnly.FromDateTime(Now);

    // "6:04 PM" style; returns em dash for a missing time.
    public static string Time(DateTime? t) => t is null ? "—" : t.Value.ToString("h:mm tt");

    public static string DateLong(DateOnly d) => d.ToString("dddd, dd MMM yyyy");
}
