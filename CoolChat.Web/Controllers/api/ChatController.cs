using CoolChat.Business.Interfaces;
using CoolChat.Business.ViewModels;
using CoolChat.Web.Hubs;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Web.Http;

namespace CoolChat.Web.Controllers.api
{
    [RoutePrefix("chat")]
    public class ChatController : ApiController
    {
        private IHubContext hubContext;

        public ChatController()
        {
            this.hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
        }

        [Route("list")]
        [HttpGet]
        // GET: api/Chat
        public IEnumerable<ChatRoomViewModel> Get()
        {
            /*var returned =  this.chatService.GetChatRoomList();
            return returned;*/
            return new List<ChatRoomViewModel>();
        }

        [Route("{name}")]
        [HttpGet]
        // GET: api/Chat/myroom
        public ChatRoomViewModel Get(string name)
        {
            //return this.chatService.GetChatRoomByName(name);
            return new ChatRoomViewModel();
        }

        [Route("")]
        [HttpPost]
        // POST: api/Chat
        public MessageViewModel Post(MessageViewModel message)
        {
            //var returned = this.chatService.PostMessage(message);
            //hubContext.Clients.Group(returned.ChatRoomId.ToString()).AddNewMessageToPage(returned);
            //return returned;
            return new MessageViewModel();
        }
    }
}
