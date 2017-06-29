using System;

namespace CoolChat.Entities
{
    public class Message
    {
        public int Id { get; set; }

        public string Body { get; set; }

        public User User { get; set; }

        public DateTime PostedTime { get; set; }

        public ChatRoom ChatRoom { get; set; }
    }
}
