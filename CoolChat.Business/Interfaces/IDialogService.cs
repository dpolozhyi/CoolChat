using CoolChat.Business.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoolChat.Business.Interfaces
{
    public interface IDialogService
    {
        bool CheckUserHasDialog(int userId, int dialogId);

        IEnumerable<MessageViewModel> GetMessages(int dialogId);

        MessageViewModel PostMessage(MessageViewModel message);

        void SetDialogMessagesReaded(int userId, int dialogId);
    }
}
