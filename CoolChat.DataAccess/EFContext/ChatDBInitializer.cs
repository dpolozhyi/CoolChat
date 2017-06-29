using CoolChat.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.DataAccess.EFContext
{

    public class ChatDBInitializer : CreateDatabaseIfNotExists<ChatContext>
    {
        protected override void Seed(ChatContext context)
        {
            ChatRoom chat1 = new ChatRoom() { CreatedTime = DateTime.Now, IsActive = true, Name = "Funny room" };

            User user1 = new User() { Name = "Mike", Gender = Gender.Male };
            User user2 = new User() { Name = "Sarah", Gender = Gender.Female };
            User user3 = new User() { Name = "John", Gender = Gender.Male };

            Message msg1 = new Message() { PostedTime = DateTime.Now, UserName = "Mike", ChatRoom = chat1, Body = "Hi all" };
            Message msg2 = new Message() { PostedTime = DateTime.Now, UserName = "John", ChatRoom = chat1, Body = "Who r u?" };
            Message msg3 = new Message() { PostedTime = DateTime.Now, UserName = "Julia", ChatRoom = chat1, Body = "qq" };
            Message msg4 = new Message() { PostedTime = DateTime.Now, UserName = "Mike", ChatRoom = chat1, Body = "I am the danger" };
            Message msg5 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Ok then" };

            context.ChatRooms.Add(chat1);

            //context.Users.Add(user1);
            //context.Users.Add(user2);
            //context.Users.Add(user3);

            context.Messages.Add(msg1);
            context.Messages.Add(msg2);
            context.Messages.Add(msg3);
            context.Messages.Add(msg4);
            context.Messages.Add(msg5);

            base.Seed(context);
        }
    }
}
