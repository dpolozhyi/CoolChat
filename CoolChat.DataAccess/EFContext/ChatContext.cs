﻿using CoolChat.Entities;
using System.Data.Entity;

namespace CoolChat.DataAccess.EFContext
{
    public class ChatContext : DbContext
    {
        public ChatContext(): base("CoolChat")
        {
            Database.SetInitializer(new ChatDBInitializer());
        }

        public DbSet<Message> Messages { get; set; }

        public DbSet<ChatRoom> ChatRooms { get; set; }

        //public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<User>().Property(p => p.Name).HasMaxLength(30);

            modelBuilder.Entity<Message>().Property(p => p.Body).HasMaxLength(1000);
            modelBuilder.Entity<Message>().Property(p => p.UserName).HasMaxLength(30);

            modelBuilder.Entity<ChatRoom>().Property(p => p.Name).HasMaxLength(20);

            base.OnModelCreating(modelBuilder);
        }
    }
}
