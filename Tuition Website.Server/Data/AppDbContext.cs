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
        if (!db.Teachers.Any())
        {
            db.Teachers.AddRange(
                new Teacher { Name = "Jyoti Prasad", Email = "jyoti@vidyavriksh.local", PasswordHash = PasswordHasher.Hash("changeme123") },
                new Teacher { Name = "Priya",        Email = "priya@vidyavriksh.local", PasswordHash = PasswordHasher.Hash("changeme123") }
            );
            db.SaveChanges();
            logger.LogInformation("Seeded starter teachers Jyoti and Priya (temporary password: changeme123).");
        }
    }
}
