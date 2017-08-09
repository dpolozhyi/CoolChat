using AutoMapper;
using CoolChat.Business.Interfaces;
using CoolChat.Business.ViewModels;
using CoolChat.DataAccess.Interfaces;
using CoolChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.Services
{
    public class DialogService : IDialogService
    {
        private IUnitOfWork unitOfWork;

        public DialogService(IUnitOfWork uow)
        {
            this.unitOfWork = uow;
        }

        public bool CheckUserHasDialog(int userId, int dialogId)
        {
            User user = this.unitOfWork.Get<User>().Get(n => n.Id == userId, includeProperties: "Dialogs").FirstOrDefault();
            if (user != null)
            {
                if (user.Dialogs.Count(n => n.Id == dialogId) > 0)
                {
                    return true;
                }
            }
            return false;
        }

        public IEnumerable<MessageViewModel> GetMessages(int dialogId)
        {
            IEnumerable<Message> messages = this.unitOfWork.Get<Message>().Get(n => n.Dialog.Id == dialogId, includeProperties: "User", orderBy: n => n.OrderBy(p => p.PostedTime));
            return Mapper.Map<IEnumerable<Message>, IEnumerable<MessageViewModel>>(messages);
        }

        public MessageViewModel PostMessage(MessageViewModel message)
        {
            try
            {
                var insertMessage = Mapper.Map<MessageViewModel, Message>(message);
                insertMessage.Dialog = this.unitOfWork.Get<Dialog>().Get(n => n.Id == message.DialogId).FirstOrDefault();
                insertMessage.User = this.unitOfWork.Get<User>().Get(n => n.Id == message.User.Id).FirstOrDefault();
                var addedMessage = this.unitOfWork.Get<Message>().Insert(insertMessage);
                this.unitOfWork.SaveChanges();
                return Mapper.Map<Message, MessageViewModel>(addedMessage);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public void SetDialogMessagesReaded(int userId, int dialogId)
        {
            var messages = this.unitOfWork.Get<Message>().Get(n => n.Dialog.Id == dialogId && !n.IsReaded, includeProperties: "User");
            foreach (var message in messages)
            {
                if (!message.IsReaded)
                {
                    message.IsReaded = true;
                }
            }
            this.unitOfWork.SaveChanges();
        }
    }
}
