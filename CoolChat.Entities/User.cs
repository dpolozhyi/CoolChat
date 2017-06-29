using System.Collections.Generic;

namespace CoolChat.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Gender Gender { get; set; }

        public ICollection<Message> Messages { get; set; }
    }
}
