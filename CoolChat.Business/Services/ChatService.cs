using CoolChat.Business.Interfaces;
using System.Collections.Generic;
using System.Linq;
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

        public ChatRoomViewModel GetChatRoomById(int chatRoomId)
        {
            ChatRoom chatRoom = this.unitOfWork.Get<ChatRoom>().Get(filter: n => n.Id == chatRoomId, includeProperties: ChatRoomInclude.Messages).FirstOrDefault();
            return Mapper.Map<ChatRoom, ChatRoomViewModel>(chatRoom);
        }

        public ChatRoomViewModel GetChatRoomByName(string chatRoomName)
        {
            var include = typeof(ChatRoom).GetReferencePropertiesString();
            ChatRoom chatRoom = this.unitOfWork.Get<ChatRoom>().Get(filter: n => n.Name == chatRoomName, includeProperties: ChatRoomInclude.Messages).FirstOrDefault();
            return Mapper.Map<ChatRoom, ChatRoomViewModel>(chatRoom);
        }

        public IEnumerable<MessageViewModel> GetMessages(int chatRoomId)
        {
            var messages = this.unitOfWork.Get<Message>().Get(filter: n => n.ChatRoom.Id == chatRoomId, orderBy: x => x.OrderByDescending(n => n.PostedTime), postOrderBy: x => x.OrderBy(n => n.PostedTime));
            return Mapper.Map<IEnumerable<Message>, IEnumerable<MessageViewModel>>(messages);
        }

        public IEnumerable<MessageViewModel> GetMessages(int chatRoomId, int offset, int limit)
        {
            var messages = this.unitOfWork.Get<Message>()
                .Get(
                    filter: n => n.ChatRoom.Id == chatRoomId, 
                    orderBy: x => x.OrderByDescending(n => n.PostedTime), 
                    offset: offset, limit: limit, 
                    postOrderBy: x => x.OrderBy(n => n.PostedTime)
                    );
            return Mapper.Map<IEnumerable<Message>, IEnumerable<MessageViewModel>>(messages);
        }

        public MessageViewModel PostMessage(MessageViewModel message)
        {
            ChatRoom chatRoom = this.unitOfWork.Get<ChatRoom>().Get(filter: n => n.Id == message.ChatRoomId).FirstOrDefault();
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
    }
}
