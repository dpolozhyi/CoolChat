using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace CoolChat.AuthService.Extensions
{
    public static class StringExtensions
    {
        public static string ToBase64Url(this string str)
        {
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(str));
        }

        public static string FromBase64Url(this string str)
        {
            return Encoding.UTF8.GetString(Convert.FromBase64String(str));
        }
    }
}