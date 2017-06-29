using CoolChat.Business.Interfaces;
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
        public IEnumerable<ChatRoom> Get()
        {
            return this.chatService.GetChatRoomList();
        }

        // GET: api/Chat/myroomm
        public IEnumerable<Message> Get(string name)
        {
            return this.chatService.GetMessagesForChatRoom(name);
        }

        // POST: api/Chat
        public void Post([FromBody]string value)
        {
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
