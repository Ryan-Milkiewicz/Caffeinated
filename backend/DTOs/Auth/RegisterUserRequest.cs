using System;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Auth;

public class RegisterUserRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(8)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string DisplayName { get; set; } = string.Empty;
    public string? Location{ get; set; }
}
