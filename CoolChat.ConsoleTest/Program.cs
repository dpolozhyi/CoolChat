using CoolChat.DataAccess;
using CoolChat.DataAccess.EFContext;
using CoolChat.DataAccess.Interfaces;
using CoolChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.ConsoleTest
{
    class Program
    {
        public static string[] Names = new string[]
        {
            "Mike", "John", "Dave", "Helen", "Monica"
        };

        public static Random rand = new Random();

        static void Main(string[] args)
        {
            IUnitOfWork uow = new EFUnitOfWork(new ChatContext());
            User user = new User() { Name = "John", Gender = Gender.Male };

            Message msg1 = new Message() { PostedTime = DateTime.Now, UserName = user, Body = "WTFF???" };
            var messages = uow.Get<Message>().Get(includeProperties: "User");
            foreach (var msg in messages)
            {
                Console.WriteLine("{0} {1}:\t{2}", msg.PostedTime.ToLongTimeString(), msg.UserName, msg.Body);
            }
        }
    }
}
