using CoolChat.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoolChat.Entities;
using CoolChat.DataAccess.Interfaces;

namespace CoolChat.Business.Services
{
    public class ChatService : IChatService
    {
        private IUnitOfWork unitOfWork;

        public ChatService(IUnitOfWork uow)
        {
            this.unitOfWork = uow;
        }

        public IEnumerable<ChatRoom> GetChatRoomList()
        {
            return this.unitOfWork.Get<ChatRoom>().Get();
        }

        public IEnumerable<Message> GetMessagesForChatRoom(string chatRoomName)
        {
            ChatRoom chatRoom = this.GetChatRoomByName(chatRoomName);
            if(chatRoom != null)
            {
                return chatRoom.Messages;
            }
            return null;
        }

        public void PostMessage(Message message, string chatRoomName)
        {
            ChatRoom chatRoom = this.GetChatRoomByName(chatRoomName);
            if (chatRoomName != null)
            {
                message.ChatRoom = chatRoom;
                this.unitOfWork.Get<Message>().Insert(message);
            }
        }

        private ChatRoom GetChatRoomByName(string name)
        {
            return this.unitOfWork.Get<ChatRoom>().Get(filter: n => n.Name == name, includeProperties: "Messages").FirstOrDefault();
        }
    }
}
