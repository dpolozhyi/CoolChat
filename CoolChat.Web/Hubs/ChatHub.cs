using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CoolChat.Web.Hubs
{
    public class ChatHub : Hub
    {
        public void NewChatMessage(string message)
        {
            Clients.All.AddNewMessageToPage(message);
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