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
            DateTime today = new DateTime(2017, 7, 4);

            Random rand = new Random();

            User user1 = new User() { Id=2, Name = "wowbot", AvatarUrl = "http://orig06.deviantart.net/7881/f/2008/154/d/d/lineage2_elf_avatar_by_lurker5.jpg", LastTimeActivity = DateTime.UtcNow };
            User user2 = new User() { Id=1, Name = "volman", AvatarUrl = "http://www.mediafire.com/imgbnc.php/2d81775e41a15740881a682e9c54dd696g.jpg", LastTimeActivity = DateTime.UtcNow };
            User user3 = new User() { Id=3, Name = "volrajas", AvatarUrl = "http://la2-rus.ru/files/ck/image/quick-folder/glad.jpg", LastTimeActivity = DateTime.UtcNow };

            Dialog dial1 = new Dialog() { TimeCreated = DateTime.UtcNow, Members = new List<User>() { user1, user2 } };
            Dialog dial2 = new Dialog() { TimeCreated = DateTime.UtcNow.AddMinutes(64), Members = new List<User>() { user2, user3 } };

            Message msg1 = new Message() { Body = "qq all", PostedTime = DateTime.UtcNow.AddSeconds(10), User = user1, Dialog = dial1 };
            Message msg2 = new Message() { Body = "yo, wassup?", PostedTime = DateTime.UtcNow.AddSeconds(23), User = user2, Dialog = dial1 };
            Message msg3 = new Message() { Body = "good, chillin", PostedTime = DateTime.UtcNow.AddSeconds(35), User = user1, Dialog = dial1 };

            Message msg4 = new Message() { Body = "hey dude, wassup", PostedTime = DateTime.UtcNow.AddSeconds(13), User = user2, Dialog = dial2 };
            Message msg5 = new Message() { Body = "cool", PostedTime = DateTime.UtcNow.AddSeconds(25), User = user3, Dialog = dial2 };
            Message msg6 = new Message() { Body = "go rb party?", PostedTime = DateTime.UtcNow.AddSeconds(47), User = user2, Dialog = dial2 };
            Message msg7 = new Message() { Body = "ok, but i'm gonna play for dd", PostedTime = DateTime.UtcNow.AddSeconds(85), User = user3, Dialog = dial2 };
            Message msg8 = new Message() { Body = "ok, deal", PostedTime = DateTime.UtcNow.AddSeconds(152), User = user2, Dialog = dial2 };

            context.Users.Add(user1);
            context.Users.Add(user2);
            context.Users.Add(user3);

            context.Set<Dialog>().Add(dial1);
            context.Set<Dialog>().Add(dial2);

            context.Messages.Add(msg1);
            context.Messages.Add(msg2);
            context.Messages.Add(msg3);
            context.Messages.Add(msg4);
            context.Messages.Add(msg5);
            context.Messages.Add(msg6);
            context.Messages.Add(msg7);
            context.Messages.Add(msg8);

            context.SaveChanges();

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
