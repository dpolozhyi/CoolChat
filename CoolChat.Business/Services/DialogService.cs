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

        public int CreateNewDialog(IEnumerable<int> userIds)
        {
            bool dialogNotExist = this.unitOfWork.Get<Dialog>().Get(n => n.Members.Select(u => u.Id).All(m => userIds.Contains(m)) && n.Members.Count == userIds.Count(), includeProperties: "Members").Count() == 0;
            if (dialogNotExist)
            {
                ICollection<User> members = this.unitOfWork.Get<User>().Get(n => userIds.Contains(n.Id)).ToList();
                var addedDialog = this.unitOfWork.Get<Dialog>().Insert(new Dialog() { Members = members, TimeCreated = DateTime.UtcNow });
                this.unitOfWork.SaveChanges();
                return addedDialog.Id;
            }
            return -1;
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

        public IEnumerable<int> GetDialogsIdsByUserId(int userId)
        {
            return this.unitOfWork.Get<Dialog>().Get(n => n.Members.Select(m => m.Id).Contains(userId)).Select(d => d.Id);
        }

        public IEnumerable<MessageViewModel> GetMessages(int dialogId)
        {
            IEnumerable<Message> messages = this.unitOfWork.Get<Message>().Get(n => n.Dialog.Id == dialogId, includeProperties: "User", orderBy: n => n.OrderBy(p => p.PostedTime));
            return Mapper.Map<IEnumerable<Message>, IEnumerable<MessageViewModel>>(messages);
        }

        public IEnumerable<MessageViewModel> GetMessages(int dialogId, int offset, int limit)
        {
            IEnumerable<Message> messages = this.unitOfWork.Get<Message>().Get(n => n.Dialog.Id == dialogId, includeProperties: "User", orderBy: n => n.OrderByDescending(p => p.PostedTime), offset: offset, limit: limit, postOrderBy: n => n.OrderBy(p => p.PostedTime));
            return Mapper.Map<IEnumerable<Message>, IEnumerable<MessageViewModel>>(messages);
        }

        public BriefDialogViewModel GetDialogById(int dialogId)
        {
            Dialog dialog = this.unitOfWork.Get<Dialog>().Get(n => n.Id == dialogId).FirstOrDefault();
            return Mapper.Map<Dialog, BriefDialogViewModel>(dialog);
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
                //Todo: need to implement correct excheption handling
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
