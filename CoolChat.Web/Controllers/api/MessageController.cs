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
            this.hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            this.dialogService = dialogService;
        }

        // GET: api/Message/5
        [DialogAuthorize]
        [Route("{dialogId}")]
        public IHttpActionResult Get(int dialogId, int offset = -1, int limit = 0)
        {
            IEnumerable<MessageViewModel> messages = this.dialogService.GetMessages(dialogId);
            string json = JsonConvert.SerializeObject(messages, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
            return Ok(json);

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
        [Route("send")]
        // POST: api/messages/send
        public IHttpActionResult Post(MessageViewModel message)
        {
            string token;
            try
            {
                token = Request.Headers.GetValues("Authorization").FirstOrDefault();
                int userId = authService.GetUserId(token);
                if (this.dialogService.CheckUserHasDialog(userId, message.DialogId))
                {
                    var returnedMessage = this.dialogService.PostMessage(message);
                    string json = JsonConvert.SerializeObject(returnedMessage, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
                    hubContext.Clients.Group(returnedMessage.DialogId.ToString()).AddNewMessage(json);
                    return Ok(json);
                }
                return Unauthorized();

            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        [Route("read")]
        [HttpPost]
        // POST: api/messages/read
        public IHttpActionResult PostReadMessages([FromBody]int dialogId)
        {
            string token;
            try
            {
                token = Request.Headers.GetValues("Authorization").FirstOrDefault();
                int userId = authService.GetUserId(token);
                if (this.dialogService.CheckUserHasDialog(userId, dialogId))
                {
                    this.dialogService.SetDialogMessagesReaded(userId, dialogId);
                    hubContext.Clients.Group(dialogId.ToString()).ReadedMessages(dialogId);
                    return Ok();
                }
                return Unauthorized();

            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
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
