using System;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
    public DbSet<Business> Businesses => Set<Business>();
    public DbSet<BusinessMembership> BusinessMemberships => Set<BusinessMembership>();
    public DbSet<Cafe> Cafes => Set<Cafe>();
    public DbSet<CafeMenuItem> CafeMenuItems => Set<CafeMenuItem>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserProfile>()
            .HasOne(p => p.User)
            .WithOne(u => u.Profile)
            .HasForeignKey<UserProfile>(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserProfile>()
            .HasIndex(p => p.UserId)
            .IsUnique();
        
         builder.Entity<Business>()
            .Property(b => b.Type)
            .HasConversion<string>()
            .HasMaxLength(20)
            .IsRequired();
        
        builder.Entity<CafeMenuItem>()
            .HasIndex(m => new { m.CafeId, m.CoffeeId })
            .IsUnique();

        builder.Entity<BusinessMembership>(entity =>
        {
            entity.HasKey(bm => bm.Id);

            entity.HasOne(bm => bm.Business)
                .WithMany(b => b.Memberships)
                .HasForeignKey(bm => bm.BusinessId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(bm => bm.User)
                .WithMany(u => u.BusinessMemberships)
                .HasForeignKey(bm => bm.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(bm => new { bm.BusinessId, bm.UserId })
                .IsUnique();
        });
    }
}
