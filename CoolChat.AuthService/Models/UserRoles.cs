using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.AuthService.Models
{
    public class UserRoles
    {
        public User User { get; set; }

        public Role Role { get; set; } 
    }
}