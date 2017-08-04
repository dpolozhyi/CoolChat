using CoolChat.AuthService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.AuthService.Interfaces
{
    public interface ITokenService
    {
        string GetToken(LoginModel credentials);

        bool IsValidToken(string token);

        int GetUserId(string token);
    }
}