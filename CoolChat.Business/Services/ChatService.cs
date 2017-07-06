using CoolChat.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoolChat.Entities;
using CoolChat.DataAccess.Interfaces;
using CoolChat.DataAccess.Extensions;
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

        public IEnumerable<ChatRoomViewModel> GetChatRoomList()
        {
            return Mapper.Map<IEnumerable<ChatRoom>, IEnumerable<ChatRoomViewModel>>(this.unitOfWork.Get<ChatRoom>().Get());
        }

        public ChatRoomViewModel GetChatRoom(string chatRoomName)
        {
            ChatRoom chatRoom = this.GetChatRoomByName(chatRoomName);
            return Mapper.Map<ChatRoom, ChatRoomViewModel>(chatRoom);
        }

        public MessageViewModel PostMessage(MessageViewModel message)
        {
            ChatRoom chatRoom = this.GetChatRoomById(message.ChatRoomId);
            Message newMessage = Mapper.Map<MessageViewModel, Message>(message);
            Message insertedMessage = null;
            if (chatRoom != null)
            {
                newMessage.ChatRoom = chatRoom;
                insertedMessage = this.unitOfWork.Get<Message>().Insert(newMessage);
                this.unitOfWork.SaveChanges();
            }
            return Mapper.Map<Message, MessageViewModel>(insertedMessage);
        }

        private ChatRoom GetChatRoomById(int id)
        {
            var include = typeof(ChatRoom).GetReferencePropertiesString();
            return this.unitOfWork.Get<ChatRoom>().Get(filter: n => n.Id == id, includeProperties: include).FirstOrDefault();
        }

        private ChatRoom GetChatRoomByName(string name)
        {
            var include = typeof(ChatRoom).GetReferencePropertiesString();
            return this.unitOfWork.Get<ChatRoom>().Get(filter: n => n.Name == name, includeProperties: include).FirstOrDefault();
        }
    }
}
