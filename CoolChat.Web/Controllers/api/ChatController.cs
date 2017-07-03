using CoolChat.Business.Interfaces;
using CoolChat.Business.ViewModels;
using CoolChat.Entities;
using CoolChat.Web.Hubs;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
            return this.chatService.GetChatRoomList();
        }

        [Route("{name}")]
        [HttpGet]
        // GET: api/Chat/myroom
        public ChatRoomViewModel Get(string name)
        {
            return this.chatService.GetChatRoom(name);
        }

        [HttpPost]
        // POST: api/Chat
        public void Post(MessageViewModel message)
        {
            this.chatService.PostMessage(message);
        }

        // PUT: api/Chat/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Chat/5
        public void Delete(int id)
        {
        }
    }
}
