using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.ViewModels
{
    public class ChatRoomViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedTime { get; set; }

        public DateTime? ClosedTime { get; set; }

        public IEnumerable<MessageViewModel> Messages { get; set; }
    }
}
