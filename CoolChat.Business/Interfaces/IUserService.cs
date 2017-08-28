using CoolChat.Business.ViewModels;
using CoolChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.Interfaces
{
    public interface IUserService
    {
        User AddNewUser(User user);

        UserViewModel GetUser(int userId);

        bool UserExist(string userName);
    }
}
