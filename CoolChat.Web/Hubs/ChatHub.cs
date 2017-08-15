using Microsoft.AspNet.SignalR;

namespace CoolChat.Web.Hubs
{
    public class ChatHub : Hub
    {
        public void NewChatMessage(string message)
        {
            Clients.All.AddNewMessageToPage(message);
        }

        public void IsTyping(int dialogId, int userId)
        {
            Clients.Group(dialogId.ToString()).IsTyping(new { dialogId = dialogId, userId=userId });
        }

        public void JoinGroup(string groupName)
        {
            Groups.Add(Context.ConnectionId, groupName);
        }

        public void LeaveGroup(string groupName)
        {
            Groups.Remove(Context.ConnectionId, groupName);
        }
    }
}