using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.AuthService.Models
{
    public class RegisterModel
    {
        public string Login { get; set; }

        public string Password { get; set; }

        public string RepeatPassword { get; set; }
    }
}