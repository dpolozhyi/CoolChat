using System;

namespace CoolChat.Business.ViewModels
{
    public class MessageViewModel
    {
        public int Id { get; set; }

        public UserViewModel User { get; set; }

        public string Body { get; set; }

        public DateTime PostedTime { get; set; }

        public int DialogId { get; set; }

        public bool IsReaded { get; set; }
    }
}
