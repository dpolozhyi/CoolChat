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
            if(user != null)
            {
                if(user.Dialogs.Count(n => n.Id == dialogId) > 0)
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
    }
}
