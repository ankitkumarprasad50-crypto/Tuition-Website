using System.ComponentModel.DataAnnotations;

namespace TuitionServer.Models;

// A teacher who can log in. All teachers share the same role (can also add
// other teachers). Passwords are stored only as a salted PBKDF2 hash.
public class Teacher
{
    public int Id { get; set; }
    [MaxLength(120)] public string Name { get; set; } = "";
    [MaxLength(200)] public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public List<Student> Students { get; set; } = new();
    public List<Test> Tests { get; set; } = new();
}

// A parent login. Linked to students by matching email (Student.ParentEmail).
// A parent can therefore see all of their children in one login.
public class Parent
{
    public int Id { get; set; }
    [MaxLength(200)] public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}

// A student, assigned to the teacher who added them.
public class Student
{
    public int Id { get; set; }
    [MaxLength(120)] public string Name { get; set; } = "";
    [MaxLength(40)]  public string ClassName { get; set; } = "";
    [MaxLength(120)] public string ParentName { get; set; } = "";
    [MaxLength(200)] public string ParentEmail { get; set; } = "";
    [MaxLength(40)]  public string ParentPhone { get; set; } = "";
    [MaxLength(500)] public string Notes { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public int TeacherId { get; set; }
    public Teacher? Teacher { get; set; }
    public List<Mark> Marks { get; set; } = new();
}

// A test/assessment created by a teacher.
public class Test
{
    public int Id { get; set; }
    [MaxLength(120)] public string Name { get; set; } = "";
    [MaxLength(60)]  public string Subject { get; set; } = "";
    public DateOnly Date { get; set; }
    public int MaxMarks { get; set; } = 100;

    public int TeacherId { get; set; }
    public Teacher? Teacher { get; set; }
    public List<Mark> Marks { get; set; } = new();
}

// The sending-email configuration set by a teacher through the portal.
// The App Password is stored ENCRYPTED (via ASP.NET Data Protection), never plain.
public class EmailConfig
{
    public int Id { get; set; }
    public string Sender { get; set; } = "";
    public string ProtectedAppPassword { get; set; } = "";
    public string FromName { get; set; } = "Vidya Vriksh Tuition";
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
}

// A student's score on a test.
public class Mark
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public Student? Student { get; set; }
    public int TestId { get; set; }
    public Test? Test { get; set; }
    public double Score { get; set; }
    [MaxLength(300)] public string Remark { get; set; } = "";
}
