using CoolChat.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace CoolChat.DataAccess.EFContext
{

    public class ChatDBInitializer : CreateDatabaseIfNotExists<ChatContext>
    {
        protected static string[] Names = new string[]
        {
            "Mike", "Dave", "John", "Julia", "Peter", "Monica", "Carl", "Donald"
        };

        protected static string[] Messages = new string[]
        {
            "Hi",
            "How are you?",
            "I'm fine, you?",
            "Thx, me too",
            "Good weather today",
            "Who is on duty today?",
            "I know",
            "I don't know",
            "I don't giva a",
            "Call me today",
            "What's going on?"
        };

        protected override void Seed(ChatContext context)
        {
            DateTime today = new DateTime(2017, 7, 14);

            Random rand = new Random();

            User user1 = new User() { Name = "wowbot" };
            User user2 = new User() { Name = "volman" };

            Dialog dial1 = new Dialog() { TimeCreated = DateTime.Now, Members = new List<User>() { user1, user2 } };

            Message msg1 = new Message() { Body = "qq all", PostedTime = DateTime.Now.AddSeconds(10), User = user1, Dialog = dial1 };
            Message msg2 = new Message() { Body = "yo, wassup?", PostedTime = DateTime.Now.AddSeconds(23), User = user2, Dialog = dial1 };
            Message msg3 = new Message() { Body = "good, chillin", PostedTime = DateTime.Now.AddSeconds(35), User = user1, Dialog = dial1 };

            context.Users.Add(user1);
            context.Users.Add(user2);

            context.Set<Dialog>().Add(dial1);

            context.Messages.Add(msg1);
            context.Messages.Add(msg2);
            context.Messages.Add(msg3);

            /*for (int i = 0; i < 100; i++)
            {
                context.Messages.Add(new Message()
                {
                    PostedTime = today,
                    UserName = Names[rand.Next(Names.Length)],
                    ChatRoom = chat1,
                    Body = Messages[rand.Next(Messages.Length)]
                });
                today += new TimeSpan(0, 0, rand.Next(5, 60));
            }

            for (int i = 0; i < 300; i++)
            {
                context.Messages.Add(new Message()
                {
                    PostedTime = today,
                    UserName = Names[rand.Next(Names.Length)],
                    ChatRoom = chat2,
                    Body = Messages[rand.Next(Messages.Length)]
                });
                today += new TimeSpan(0, 0, rand.Next(5, 60));
            }*/

            base.Seed(context);
        }
    }
}
