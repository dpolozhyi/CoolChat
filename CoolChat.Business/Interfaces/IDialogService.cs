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
        int CreateNewDialog(IEnumerable<int> userIds);

        bool CheckUserHasDialog(int userId, int dialogId);

        IEnumerable<MessageViewModel> GetMessages(int dialogId);

        IEnumerable<MessageViewModel> GetMessages(int dialogId, int offset, int limit);

        IEnumerable<int> GetDialogsIdsByUserId(int userId);

        MessageViewModel PostMessage(MessageViewModel message);

        void SetDialogMessagesReaded(int userId, int dialogId);
    }
}
