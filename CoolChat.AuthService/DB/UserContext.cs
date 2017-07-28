using CoolChat.AuthService.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CoolChat.AuthService.DB
{
    public class UserContext : DbContext
    {
        public UserContext() : base("CoolChatAuth")
        {

        }

        public DbSet<User> Users { get; set; }

        //public DbSet<Role> Roles { get; set; }

        //public DbSet<UserRoles> UserRoles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(p => p.Password).HasMaxLength(128);
            modelBuilder.Entity<User>().Property(p => p.Salt).HasMaxLength(128);
            modelBuilder.Entity<User>().Property(p => p.Email).HasMaxLength(128);
            modelBuilder.Entity<User>().Property(p => p.Name).HasMaxLength(128);

            base.OnModelCreating(modelBuilder);
        }
    }
}