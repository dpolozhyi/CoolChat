using System;
using System.Collections.Generic;

namespace CoolChat.Entities
{
    public class ChatRoom
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedTime { get; set; }

        public DateTime? ClosedTime { get; set; }

        public ICollection<Message> Messages { get; set; }

        //public ICollection<User> Users { get; set; }
    }
}
