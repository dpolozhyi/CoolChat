using CoolChat.Business.Interfaces;
using CoolChat.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoolChat.Business.ViewModels;
using CoolChat.Entities;
using AutoMapper;

namespace CoolChat.Business.Services
{
    public class UserAccountService : IUserAccountService
    {
        private IUnitOfWork unitOfWork;

        public UserAccountService(IUnitOfWork uow)
        {
            this.unitOfWork = uow;
        }

        public UserAccountViewModel GetMainUserModel(int userId)
        {
            IEnumerable<BriefDialogViewModel> dialogsViewModel = new List<BriefDialogViewModel>();
            User user = this.unitOfWork.Get<User>().Get(n => n.Id == userId).FirstOrDefault();
            if(user != null)
            {
                IEnumerable <Dialog> dialogs = this.unitOfWork.Get<Dialog>().Get(n => n.Members.Select(x => x.Id).Contains(user.Id), includeProperties: "Members");
                foreach(var dialog in dialogs)
                {
                    dialog.Members.Remove(user);
                    dialog.Messages = this.unitOfWork.Get<Message>()
                        .Get(n => n.Dialog.Id == dialog.Id, orderBy: n => n.OrderByDescending(m => m.PostedTime), includeProperties: "Dialog", offset: 0, limit: 10).ToList();
                }
                dialogsViewModel = Mapper.Map<List<Dialog>, List<BriefDialogViewModel>>(dialogs.ToList()).OrderByDescending(n => n.LastMessage?.PostedTime);
                UserAccountViewModel userAcc = Mapper.Map<User, UserAccountViewModel>(user);
                userAcc.Dialogs = dialogsViewModel;
                return userAcc;
            }
            return null;
        }

        public UserViewModel SetLastTimeActivity(int userId)
        {
            User user = this.unitOfWork.Get<User>().Get(n => n.Id == userId).FirstOrDefault();
            if (user != null)
            {
                user.LastTimeActivity = DateTime.UtcNow;
                this.unitOfWork.SaveChanges();
            }
            return Mapper.Map<User, UserViewModel>(user);
        }
    }
}
