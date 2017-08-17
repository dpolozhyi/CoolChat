using CoolChat.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.Interfaces
{
    public interface IContactService
    {
        IEnumerable<UserViewModel> GetContactsList(string filter = "", int offset = -1, int limit = 0);
    }
}
