using CoolChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.Interfaces
{
    public interface IChatService
    {
        IEnumerable<ChatRoom> GetChatRoomList();

        IEnumerable<Message> GetMessagesForChatRoom(string charRoomName);

        void PostMessage(Message message, string chatRoomName);
    }
}
