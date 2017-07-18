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

        private IChatService chatService;

        public ChatController(IChatService chatService)
        {
            this.chatService = chatService;
            this.hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
        }

        [Route("list")]
        [HttpGet]
        // GET: api/Chat
        public IEnumerable<ChatRoomViewModel> Get()
        {
            var returned =  this.chatService.GetChatRoomList();
            return returned;
        }

        [Route("{name}")]
        [HttpGet]
        // GET: api/Chat/myroom
        public ChatRoomViewModel Get(string name)
        {
            return this.chatService.GetChatRoomByName(name);
        }

        [Route("")]
        [HttpPost]
        // POST: api/Chat
        public MessageViewModel Post(MessageViewModel message)
        {
            var returned = this.chatService.PostMessage(message);
            hubContext.Clients.Group(returned.ChatRoomId.ToString()).AddNewMessageToPage(returned);
            return returned;
        }
    }
}
