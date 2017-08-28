using CoolChat.AuthService.Extensions;
using CoolChat.AuthService.Models;
using CoolChat.ConsoleTest.AuthServiceReference;
using CoolChat.DataAccess;
using CoolChat.DataAccess.EFContext;
using CoolChat.DataAccess.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CoolChat.ConsoleTest
{
    class Program
    {
        static void Main(string[] args)
        {
            /*AuthServiceClient authClient = new AuthServiceClient();
            User user = authClient.Register(new RegisterModel() { Login = "volrajas", Password = "adgjmp99", RepeatPassword = "adgjmp99" });
            Console.WriteLine(user.Id);*/
            /*string token = authClient.GetToken(new LoginModel() { Login = "wowbot", Password = "adgjmp" });
            Console.WriteLine(token);

            string[] tokenParts = token.Split('.');

            Payload payload = JsonConvert.DeserializeObject<Payload>(tokenParts[1].FromBase64Url());
            //payload.Name = "adversary";
            token = String.Concat(tokenParts[0], ".", JsonConvert.SerializeObject(payload).ToBase64Url(), ".", tokenParts[2]);
            int i = 0;
            while (i++ < 1000)
            {
                bool isValid = authClient.CheckToken(token);
                Console.WriteLine("{0}\tToken is {1}", DateTime.Now.ToShortTimeString(), isValid ? "VALID" : "INvalid");
                Thread.Sleep(3000);
            }*/

        }
    }
}
