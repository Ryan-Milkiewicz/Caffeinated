using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public enum BusinessType
{
    Cafe,
    Roaster
}

public class Business
{
    public Guid Id { get; set; }

    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    public BusinessType Type { get; set; }

    public string? Description { get; set; }
    
    public string? WebsiteUrl { get; set; }

    public string? LogoUrl { get; set; }

    public bool IsVerified { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
