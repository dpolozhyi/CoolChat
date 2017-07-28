using CoolChat.AuthService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace CoolChat.AuthService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IAuthService" in both code and config file together.
    [ServiceContract]
    public interface IAuthService
    {
        [OperationContract]
        User Register(RegisterModel registerModel);

        [OperationContract]
        string GetToken(LoginModel loginModel);

        [OperationContract]
        bool CheckToken(string token);
    }
}
