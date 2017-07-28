using CoolChat.AuthService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.AuthService.Interfaces
{
    public interface IUserService
    {
        User RegisterUser(RegisterModel user);

        User GetUser(LoginModel credentials);

        bool IsValidUser(LoginModel credentials);
    }
}