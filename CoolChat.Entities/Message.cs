using System;

namespace CoolChat.Entities
{
    public class Message
    {
        public int Id { get; set; }

        public User User { get; set; }

        public string Body { get; set; }

        public DateTime PostedTime { get; set; }

        public Dialog Dialog { get; set; }

        public bool IsReaded { get; set; }
    }
}
