using CoolChat.Business.ViewModels;
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
        IEnumerable<ChatRoomViewModel> GetChatRoomList();

        ChatRoomViewModel GetChatRoom(string chatRoomName);

        void PostMessage(MessageViewModel message);
    }
}
