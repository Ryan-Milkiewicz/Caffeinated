using System;
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class ApplicationUser : IdentityUser<Guid>
{
    public UserProfile? Profile { get; set; }
}
