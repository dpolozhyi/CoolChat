using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.Web.Exceptions
{
    public class AuthorizeException : Exception
    {
        public AuthorizeException()
        { }

        public AuthorizeException(string message)
        : base(message)
        { }

        public AuthorizeException(string message, Exception innerException)
        : base(message, innerException)
        { }
    }
}