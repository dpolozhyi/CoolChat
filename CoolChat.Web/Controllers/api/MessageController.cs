using CoolChat.Business.Interfaces;
using CoolChat.Business.Services;
using CoolChat.Business.ViewModels;
using CoolChat.DataAccess;
using CoolChat.DataAccess.EFContext;
using CoolChat.Web.AuthServiceReference;
using CoolChat.Web.Filters;
using CoolChat.Web.Hubs;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoolChat.Web.Controllers.api
{
    [CustomAuthorize]
    [RoutePrefix("api/messages")]
    public class MessageController : ApiController
    {
        private AuthServiceClient authService = new AuthServiceClient();

        private IHubContext hubContext;

        private IDialogService dialogService;

        public MessageController() : this(new DialogService(new EFUnitOfWork(new ChatContext())))
        {

        }

        public MessageController(IDialogService dialogService)
        {
            this.dialogService = dialogService;
        }

        // GET: api/Message/5
        [Route("{dialogId}")]
        public IHttpActionResult Get(int dialogId, int offset = -1, int limit = 0)
        {
            int userId = this.authService.GetUserId(this.GetToken());
            if (userId > 0)
            {
                if (!this.dialogService.CheckUserHasDialog(userId, dialogId))
                {
                    return Unauthorized();
                }
                IEnumerable<MessageViewModel> messages = this.dialogService.GetMessages(dialogId);
                string json = JsonConvert.SerializeObject(messages, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
                return Ok(json);
            }
            return BadRequest();

            /*if(offset != -1)
            {
                return this.chatService.GetMessages(chatRoomId, offset, limit);
            }
            else
            {
                return this.chatService.GetMessages(chatRoomId);
            }*/
        }

        [HttpPost]
        // POST: api/Message
        public IHttpActionResult Post(MessageViewModel message)
        {
            /*var returned = this.chatService.PostMessage(message);
            //hubContext.Clients.Group(returned.ChatRoomId.ToString()).AddNewMessageToPage(returned);
            return returned;*/
            return null;
        }

        // PUT: api/Message/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Message/5
        public void Delete(int id)
        {
        }

        private string GetToken()
        {
            try
            {
                return Request.Headers.GetValues("Authorization").FirstOrDefault();
            }
            catch
            {
                return String.Empty;
            }
        }
    }
}
