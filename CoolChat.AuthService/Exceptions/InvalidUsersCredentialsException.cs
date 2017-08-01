using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.AuthService.Exceptions
{
    public class InvalidUsersCredentialsException : Exception
    {
        public InvalidUsersCredentialsException()
        { }

        public InvalidUsersCredentialsException(string message)
        : base(message)
        { }

        public InvalidUsersCredentialsException(string message, Exception innerException)
        : base(message, innerException)
        { }
    }
}