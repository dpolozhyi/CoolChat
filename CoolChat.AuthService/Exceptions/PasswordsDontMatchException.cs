using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.AuthService.Exceptions
{
    public class PasswordsDontMatchException : Exception
    {
        public PasswordsDontMatchException()
        { }

        public PasswordsDontMatchException(string message)
        : base(message)
        { }

        public PasswordsDontMatchException(string message, Exception innerException)
        : base(message, innerException)
        { }
    }
}