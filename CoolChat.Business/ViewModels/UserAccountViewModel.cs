using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.ViewModels
{
    public class UserAccountViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string AvatarUrl { get; set; }

        public DateTime LastTimeActivity { get; set; }

        public IEnumerable<BriefDialogViewModel> Dialogs { get; set; }
    }
}
