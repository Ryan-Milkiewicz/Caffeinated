using System;

namespace backend.Models;

public enum BusinessRole
{
    Owner,
    Manager,
    Staff
}
public class BusinessMembership
{
    public Guid Id { get; set; }

    public Guid BusinessId { get; set; }

    public Guid UserId { get; set; }

    public BusinessRole Role { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


}
