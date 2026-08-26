using Microsoft.EntityFrameworkCore;
using TuitionServer.Auth;
using TuitionServer.Models;

namespace TuitionServer.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Teacher> Teachers => Set<Teacher>();
    public DbSet<Student> Students => Set<Student>();
    public DbSet<Test> Tests => Set<Test>();
    public DbSet<Mark> Marks => Set<Mark>();
    public DbSet<EmailConfig> EmailConfigs => Set<EmailConfig>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Teacher>().HasIndex(t => t.Email).IsUnique();
        b.Entity<Mark>().HasIndex(m => new { m.StudentId, m.TestId }).IsUnique();

        // Keep data tidy when a teacher/test/student is removed.
        b.Entity<Student>().HasOne(s => s.Teacher).WithMany(t => t.Students)
            .HasForeignKey(s => s.TeacherId).OnDelete(DeleteBehavior.Cascade);
        b.Entity<Test>().HasOne(t => t.Teacher).WithMany(te => te.Tests)
            .HasForeignKey(t => t.TeacherId).OnDelete(DeleteBehavior.Cascade);
        b.Entity<Mark>().HasOne(m => m.Student).WithMany(s => s.Marks)
            .HasForeignKey(m => m.StudentId).OnDelete(DeleteBehavior.Cascade);
        b.Entity<Mark>().HasOne(m => m.Test).WithMany(t => t.Marks)
            .HasForeignKey(m => m.TestId).OnDelete(DeleteBehavior.Cascade);
    }

    // Creates the database (if needed) and seeds the two starter teachers.
    public static void EnsureSeeded(AppDbContext db, ILogger logger)
    {
        db.Database.EnsureCreated();

        // EnsureCreated() doesn't add new tables to an already-created database,
        // so create the EmailConfigs table if it's missing (idempotent).
        db.Database.ExecuteSqlRaw(
            @"CREATE TABLE IF NOT EXISTS ""EmailConfigs"" (
                ""Id"" INTEGER NOT NULL CONSTRAINT ""PK_EmailConfigs"" PRIMARY KEY AUTOINCREMENT,
                ""Sender"" TEXT NOT NULL,
                ""ProtectedAppPassword"" TEXT NOT NULL,
                ""FromName"" TEXT NOT NULL,
                ""UpdatedAt"" TEXT NOT NULL);");
        if (!db.Teachers.Any())
        {
            db.Teachers.Add(
                new Teacher { Name = "Jyoti Prasad", Email = "jyoti@vidyavriksh.local", PasswordHash = PasswordHasher.Hash("changeme123") }
            );
            db.SaveChanges();
            logger.LogInformation("Seeded starter teacher Jyoti (temporary password: changeme123).");
        }
    }
}
