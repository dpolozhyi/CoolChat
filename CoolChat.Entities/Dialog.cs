using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Entities
{
    public class Dialog
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<User> Members { get; set; }

        public ICollection<Message> Messages { get; set; }

        public DateTime TimeCreated { get; set; }
    }
}
