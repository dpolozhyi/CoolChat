using CoolChat.Entities;
using System;
using System.Data.Entity;

namespace CoolChat.DataAccess.EFContext
{

    public class ChatDBInitializer : CreateDatabaseIfNotExists<ChatContext>
    {
        protected override void Seed(ChatContext context)
        {
            ChatRoom chat1 = new ChatRoom() { CreatedTime = DateTime.Now, IsActive = true, Name = "Funny room" };

            Message msg1 = new Message() { PostedTime = DateTime.Now, UserName = "Mike", ChatRoom = chat1, Body = "Hi all" };
            Message msg2 = new Message() { PostedTime = DateTime.Now, UserName = "John", ChatRoom = chat1, Body = "Who r u?" };
            Message msg3 = new Message() { PostedTime = DateTime.Now, UserName = "Julia", ChatRoom = chat1, Body = "qq" };
            Message msg4 = new Message() { PostedTime = DateTime.Now, UserName = "Mike", ChatRoom = chat1, Body = "Hi" };
            Message msg5 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "lol" };
            Message msg6 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "" };
            Message msg7 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hello" };
            Message msg8 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hello" };
            Message msg9 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hello" };
            Message msg10 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Yeee" };
            Message msg11 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "H" };
            Message msg12 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "He" };
            Message msg13 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hel" };
            Message msg14 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hell" };
            Message msg15 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hello" };
            Message msg16 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "H" };
            Message msg17 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "He" };
            Message msg18 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hel" };
            Message msg19 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hell" };
            Message msg20 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hello" };
            Message msg21 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "H" };
            Message msg22 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Ho" };
            Message msg23 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "He" };
            Message msg24 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hel" };
            Message msg25 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hell" };
            Message msg26 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hell" };
            Message msg27 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Helo" };
            Message msg28 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Helo" };
            Message msg29 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hllo" };
            Message msg30 = new Message() { PostedTime = DateTime.Now, UserName = "Dave", ChatRoom = chat1, Body = "Hell" };

            context.ChatRooms.Add(chat1);

            context.Messages.Add(msg1);
            context.Messages.Add(msg2);
            context.Messages.Add(msg3);
            context.Messages.Add(msg4);
            context.Messages.Add(msg5);
            context.Messages.Add(msg6);
            context.Messages.Add(msg7);
            context.Messages.Add(msg8);
            context.Messages.Add(msg9);
            context.Messages.Add(msg10);
            context.Messages.Add(msg11);
            context.Messages.Add(msg12);
            context.Messages.Add(msg13);
            context.Messages.Add(msg14);
            context.Messages.Add(msg15);
            context.Messages.Add(msg16);
            context.Messages.Add(msg17);
            context.Messages.Add(msg18);
            context.Messages.Add(msg19);
            context.Messages.Add(msg20);
            context.Messages.Add(msg21);
            context.Messages.Add(msg22);
            context.Messages.Add(msg23);
            context.Messages.Add(msg24);
            context.Messages.Add(msg25);
            context.Messages.Add(msg26);
            context.Messages.Add(msg27);
            context.Messages.Add(msg28);
            context.Messages.Add(msg29);
            context.Messages.Add(msg30);

            base.Seed(context);
        }
    }
}
