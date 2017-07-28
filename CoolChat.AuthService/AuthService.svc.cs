using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using CoolChat.AuthService.Models;
using CoolChat.AuthService.Services;
using CoolChat.AuthService.Interfaces;

namespace CoolChat.AuthService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "AuthService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select AuthService.svc or AuthService.svc.cs at the Solution Explorer and start debugging.
    public class AuthService : IAuthService
    {
        private IUserService userService = new UserService();

        private ITokenService tokenService = new TokenService();

        public bool CheckToken(string token)
        {
            return this.tokenService.IsValidToken(token);
        }

        public string GetToken(LoginModel loginModel)
        {
            return this.tokenService.GetToken(loginModel);
        }

        public User Register(RegisterModel registerModel)
        {
            return this.userService.RegisterUser(registerModel);
        }
    }
}
