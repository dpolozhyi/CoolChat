using CoolChat.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoolChat.Entities;
using CoolChat.DataAccess.Interfaces;
using CoolChat.Business.ViewModels;
using AutoMapper;

namespace CoolChat.Business.Services
{
    public class ChatService : IChatService
    {
        private IUnitOfWork unitOfWork;

        public ChatService(IUnitOfWork uow)
        {
            this.unitOfWork = uow;
        }

        public IEnumerable<string> GetChatRoomList()
        {
            return this.unitOfWork.Get<ChatRoom>().Get().Select(n => n.Name);
        }

        public ChatRoomViewModel GetChatRoom(string chatRoomName)
        {
            ChatRoom chatRoom = this.GetChatRoomByName(chatRoomName);
            return Mapper.Map<ChatRoom, ChatRoomViewModel>(chatRoom);
        }

        public void PostMessage(MessageViewModel message)
        {
            ChatRoom chatRoom = this.GetChatRoomById(message.ChatRoomId);
            Message newMessage = Mapper.Map<MessageViewModel, Message>(message);
            if (chatRoom != null)
            {
                newMessage.ChatRoom = chatRoom;
                this.unitOfWork.Get<Message>().Insert(newMessage);
                this.unitOfWork.SaveChanges();
            }
        }

        private ChatRoom GetChatRoomById(int id)
        {
            return this.unitOfWork.Get<ChatRoom>().Get(filter: n => n.Id == id, includeProperties: "Messages").FirstOrDefault();
        }

        private ChatRoom GetChatRoomByName(string name)
        {
            return this.unitOfWork.Get<ChatRoom>().Get(filter: n => n.Name == name, includeProperties: "Messages").FirstOrDefault();
        }
    }
}
