using System;

namespace CoolChat.Business.ViewModels
{
    public class MessageViewModel
    {
        public int Id { get; set; }

        public int ChatRoomId { get; set; }

        public string UserName { get; set; }

        public string Body { get; set; }

        public DateTime PostedTime { get; set; }
    }
}
