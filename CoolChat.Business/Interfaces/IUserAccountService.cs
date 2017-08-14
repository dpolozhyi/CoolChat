using CoolChat.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.Interfaces
{
    public interface IUserAccountService
    {
        UserAccountViewModel GetMainUserModel(int userId);

        UserViewModel SetLastTimeActivity(int userId);
    }
}
