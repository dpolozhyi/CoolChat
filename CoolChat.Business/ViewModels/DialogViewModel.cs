using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.ViewModels
{
    public class DialogViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<UserViewModel> Members { get; set; }

        public ICollection<MessageViewModel> Messages { get; set; }

        public DateTime TimeCreated { get; set; }
    }
}
