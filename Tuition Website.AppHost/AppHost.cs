var builder = DistributedApplication.CreateBuilder(args);

// The server hosts the API *and* serves the static HTML site from its wwwroot folder.
builder.AddProject<Projects.Tuition_Website_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

builder.Build().Run();
