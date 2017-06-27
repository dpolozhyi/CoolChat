using CoolChat.Entities;
using System.Data.Entity;

namespace CoolChat.DataAccess
{
    public class ChatContext : DbContext
    {
        public ChatContext(): base()
        {

        }

        public DbSet<Message> Messages { get; set; }

        public DbSet<ChatRoom> ChatRooms { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
