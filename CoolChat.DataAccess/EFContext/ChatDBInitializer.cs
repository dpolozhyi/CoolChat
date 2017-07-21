using CoolChat.Entities;
using System;
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

            ChatRoom chat1 = new ChatRoom() { CreatedTime = DateTime.Now, IsActive = true, Name = "Funny room" };
            ChatRoom chat2 = new ChatRoom() { CreatedTime = DateTime.Now, IsActive = true, Name = "Spam room" };

            context.ChatRooms.Add(chat1);
            context.ChatRooms.Add(chat2);

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
