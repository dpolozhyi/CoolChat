using CoolChat.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace CoolChat.DataAccess.EFContext
{
    public class ChatContext : DbContext
    {
        public ChatContext(): base("CoolChat")
        {
            Database.SetInitializer(new ChatDBInitializer());
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Dialog> ChatRooms { get; set; }

        public DbSet<Message> Messages { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(p => p.Id);
            modelBuilder.Entity<User>().Property(p => p.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            modelBuilder.Entity<User>().Property(p => p.Name).HasMaxLength(128);
            modelBuilder.Entity<User>().Property(p => p.AvatarUrl).HasMaxLength(512);

            modelBuilder.Entity<Message>().Property(p => p.Body).HasMaxLength(2048);

            modelBuilder.Entity<Dialog>().Property(p => p.Name).HasMaxLength(128);

            base.OnModelCreating(modelBuilder);
        }
    }
}
