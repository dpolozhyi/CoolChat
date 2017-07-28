using CoolChat.AuthService.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;
using CoolChat.AuthService.Models;
using CoolChat.AuthService.DB;

namespace CoolChat.AuthService.Services
{
    public class UserService : IUserService
    {
        private UserContext context = new UserContext();

        public User RegisterUser(RegisterModel user)
        {
            if(user.Password != user.RepeatPassword)
            {
                throw new Exception("Passwords dont match");
            }
            string salt = this.GetRandomSalt();
            User newUser = new User() { Name = user.Login, Password = this.GetPasswordHash(user.Password, salt), Salt = salt };
            var addedUser = context.Users.Add(newUser);
            context.SaveChanges();
            return addedUser;
        }

        public User GetUser(LoginModel credentials)
        {
            User user = this.context.Users.Where(n => n.Name == credentials.Name).FirstOrDefault();
            if (user != null)
            {
                if (user.Password == this.GetPasswordHash(credentials.Password, user.Salt))
                {
                    return user;
                }
            }
            return null;
        }

        public bool IsValidUser(LoginModel credentials)
        {
            User user = this.context.Users.Where(n => n.Name == credentials.Name).FirstOrDefault();
            if(user != null)
            {
                if(user.Password == this.GetPasswordHash(credentials.Password, user.Salt))
                {
                    return true;
                }
            }
            return false;
        }

        private string GetPasswordHash(string password, string salt)
        {
            SHA256Managed crypt = new SHA256Managed();
            byte[] hash = crypt.ComputeHash(Encoding.UTF8.GetBytes(String.Concat(salt, password)));
            return Convert.ToBase64String(hash);
        }

        private string GetRandomSalt()
        {
            RNGCryptoServiceProvider cryptoService = new RNGCryptoServiceProvider();
            var salt = new byte[32];
            cryptoService.GetBytes(salt); // this will fill the buffer with random values
            return Convert.ToBase64String(salt);
        }
    }
}