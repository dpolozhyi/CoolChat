using CoolChat.Business.Interfaces;
using CoolChat.Business.ViewModels;
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
    [RoutePrefix("messages")]
    public class MessageController : ApiController
    {
        private IHubContext hubContext;

        private IChatService chatService;

        public MessageController(IChatService chatService)
        {
            this.chatService = chatService;
            this.hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
        }

        // GET: api/Message/5
        [Route("{chatRoomId}")]
        public IEnumerable<MessageViewModel> Get(int chatRoomId, int offset = -1, int limit = 0)
        {
            if(offset != -1)
            {
                return this.chatService.GetMessages(chatRoomId, offset, limit);
            }
            else
            {
                return this.chatService.GetMessages(chatRoomId);
            }
        }

        [Route("")]
        [HttpPost]
        // POST: api/Message
        public MessageViewModel Post(MessageViewModel message)
        {
            var returned = this.chatService.PostMessage(message);
            hubContext.Clients.Group(returned.ChatRoomId.ToString()).AddNewMessageToPage(returned);
            return returned;
        }

        // PUT: api/Message/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Message/5
        public void Delete(int id)
        {
        }
    }
}
