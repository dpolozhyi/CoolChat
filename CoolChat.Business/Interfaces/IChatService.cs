using CoolChat.Business.ViewModels;
using System.Collections.Generic;

namespace CoolChat.Business.Interfaces
{
    public interface IChatService
    {
        IEnumerable<ChatRoomViewModel> GetChatRoomList();

        ChatRoomViewModel GetChatRoomById(int chatRoomId);

        ChatRoomViewModel GetChatRoomByName(string chatRoomName);

        IEnumerable<MessageViewModel> GetMessages(int chatRoomId);

        IEnumerable<MessageViewModel> GetMessages(int chatRoomId, int offset, int limit);

        MessageViewModel PostMessage(MessageViewModel message);
    }
}
