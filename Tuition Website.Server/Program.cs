using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var api = app.MapGroup("/api");

// ---------------------------------------------------------------------------
// Enrollment / contact form endpoint.
// Receives an enquiry from the website, logs it, and appends it to
// enrollments.json in the app's content root so submissions are never lost.
// ---------------------------------------------------------------------------
var enrollmentsFile = Path.Combine(app.Environment.ContentRootPath, "enrollments.json");
var fileLock = new object();

api.MapPost("enroll", (EnrollmentRequest request, ILogger<Program> logger) =>
{
    if (string.IsNullOrWhiteSpace(request.ParentName)
        || string.IsNullOrWhiteSpace(request.StudentName)
        || string.IsNullOrWhiteSpace(request.Phone))
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["form"] = ["Parent name, student name and phone number are required."]
        });
    }

    var record = new EnrollmentRecord(
        Guid.NewGuid(),
        DateTimeOffset.UtcNow,
        request.ParentName.Trim(),
        request.StudentName.Trim(),
        request.StudentClass?.Trim() ?? "",
        request.Subjects?.Trim() ?? "",
        request.Phone.Trim(),
        request.Message?.Trim() ?? ""
    );

    logger.LogInformation(
        "New enrollment enquiry from {Parent} for {Student} ({Class}) — {Phone}",
        record.ParentName, record.StudentName, record.StudentClass, record.Phone);

    try
    {
        lock (fileLock)
        {
            List<EnrollmentRecord> all = File.Exists(enrollmentsFile)
                ? JsonSerializer.Deserialize<List<EnrollmentRecord>>(File.ReadAllText(enrollmentsFile)) ?? []
                : [];
            all.Add(record);
            File.WriteAllText(enrollmentsFile,
                JsonSerializer.Serialize(all, new JsonSerializerOptions { WriteIndented = true }));
        }
    }
    catch (Exception ex)
    {
        // Don't fail the parent's submission just because the file write failed —
        // the enquiry is already in the logs.
        logger.LogError(ex, "Could not persist enrollment to {File}", enrollmentsFile);
    }

    return Results.Ok(new { ok = true, id = record.Id });
})
.WithName("SubmitEnrollment");

// Simple listing endpoint so the teacher can review submissions.
api.MapGet("enroll", () =>
{
    lock (fileLock)
    {
        if (!File.Exists(enrollmentsFile)) return Results.Ok(Array.Empty<EnrollmentRecord>());
        var all = JsonSerializer.Deserialize<List<EnrollmentRecord>>(File.ReadAllText(enrollmentsFile)) ?? [];
        return Results.Ok(all);
    }
})
.WithName("ListEnrollments");

app.MapDefaultEndpoints();

app.UseFileServer();

app.Run();

// Incoming payload from the website form.
record EnrollmentRequest(
    string ParentName,
    string StudentName,
    string? StudentClass,
    string? Subjects,
    string Phone,
    string? Message);

// Stored record (adds an id and timestamp).
record EnrollmentRecord(
    Guid Id,
    DateTimeOffset ReceivedAt,
    string ParentName,
    string StudentName,
    string StudentClass,
    string Subjects,
    string Phone,
    string Message);
