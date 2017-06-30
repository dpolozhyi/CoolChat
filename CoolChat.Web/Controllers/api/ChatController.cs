using CoolChat.Business.Interfaces;
using CoolChat.Business.ViewModels;
using CoolChat.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoolChat.Web.Controllers.api
{
    public class ChatController : ApiController
    {
        private IChatService chatService;

        public ChatController(IChatService chatService)
        {
            this.chatService = chatService;
        }

        // GET: api/Chat
        public IEnumerable<string> Get()
        {
            return this.chatService.GetChatRoomList();
        }

        // GET: api/Chat/myroom
        public ChatRoomViewModel Get(string name)
        {
            return this.chatService.GetChatRoom(name);
        }

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
