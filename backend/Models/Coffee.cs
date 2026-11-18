using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Coffee
{
    public Guid Id { get; set; }

    public Guid RoasterId { get; set; }

    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(100)]
    public string OriginCountry { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? OriginRegion { get; set; }

    [MaxLength(150)]
    public string? Farm { get; set; }

    [MaxLength(100)]
    public string? Variety { get; set; }

    [MaxLength(50)]
    public string Process { get; set; } = string.Empty;

    [MaxLength(30)]
    public string RoastLevel { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
