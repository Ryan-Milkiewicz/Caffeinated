using System;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class CafeMenuItem
{
    public Guid Id { get; set; }

    public Guid CafeId { get; set; }

    public Guid CoffeeId { get; set; }

    public bool IsAvailable { get; set; } = true;

    [Precision(8, 2)]
    public decimal? Price { get; set; }

    public string? Description { get; set; }

    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
}
