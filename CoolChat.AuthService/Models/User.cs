using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.AuthService.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string Salt { get; set; }

        public string Login { get; set; }
    }
}