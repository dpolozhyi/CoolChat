using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.ViewModels
{
    public class BriefDialogViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int NewMessagesNumber { get; set; }

        public IEnumerable<UserViewModel> Members { get; set; }

        public MessageViewModel LastMessage { get; set; }

        public DateTime TimeCreated { get; set; }
    }
}
