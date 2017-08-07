using CoolChat.AuthService.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CoolChat.AuthService.Models;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;
using CoolChat.AuthService.Extensions;
using CoolChat.AuthService.Exceptions;

namespace CoolChat.AuthService.Services
{
    public class TokenService : ITokenService
    {
        private IUserService userService = new UserService();

        private string secret = "randombytes";

        public string GetToken(LoginModel credentials)
        {
            if (this.userService.IsValidUser(credentials))
            {
                User user = this.userService.GetUser(credentials);
                Header header = new Header() { Algorithm = "HS256", Type = "JWT" };
                Payload payload = new Payload() { Id = user.Id.ToString(), Name = user.Login, Expires = DateTime.UtcNow.AddSeconds(1800).Ticks };
                HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
                string encodedHeader = Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(header)));
                string encodedPayload = Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(payload)));
                byte[] sign = hmac.ComputeHash(Encoding.UTF8.GetBytes(String.Concat(encodedHeader, ".", encodedPayload)));
                string token = String.Concat(encodedHeader, ".", encodedPayload, ".", Convert.ToBase64String(sign));
                return token;
            }
            throw new InvalidUsersCredentialsException("Invalid credentials");
        }

        public bool IsValidToken(string token)
        {
            if (!String.IsNullOrEmpty(token))
            {
                string[] tokenParts = token.Split('.');
                if (tokenParts.Length < 3)
                {
                    return false;
                }

                Payload payload = JsonConvert.DeserializeObject<Payload>(tokenParts[1].FromBase64Url());
                DateTime tokenExpires = new DateTime(payload.Expires);
                string sign = this.Sign(String.Concat(tokenParts[0], ".", tokenParts[1]));
                if (sign == tokenParts[2] && DateTime.Compare(tokenExpires, DateTime.UtcNow) > 0)
                {
                    return true;
                }
            }
            return false;
        }

        private string Sign(string strToSign)
        {
            HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
            return Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(strToSign)));
        }

        public int GetUserId(string token)
        {
            if (this.IsValidToken(token))
            {
                string[] tokenParts = token.Split('.');
                if (tokenParts.Length < 3)
                {
                    return -1;
                }

                Payload payload = JsonConvert.DeserializeObject<Payload>(tokenParts[1].FromBase64Url());
                return Int32.Parse(payload.Id);
            }
            return -1;
        }
    }
}