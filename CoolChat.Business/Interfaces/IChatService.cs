using CoolChat.Business.ViewModels;
using System.Collections.Generic;

namespace CoolChat.Business.Interfaces
{
    public interface IChatService
    {
        IEnumerable<ChatRoomViewModel> GetChatRoomList();

        ChatRoomViewModel GetChatRoom(string chatRoomName);

        MessageViewModel PostMessage(MessageViewModel message);
    }
}
