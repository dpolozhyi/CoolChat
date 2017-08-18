using CoolChat.Business.Interfaces;
using CoolChat.Business.ViewModels;
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
    [RoutePrefix("api/contacts")]
    public class ContactController : ApiController
    {
        private IContactService contactService;

        private IDialogService dialogService;

        private AuthServiceClient authService = new AuthServiceClient();

        private IHubContext hubContext;

        private IUserService userService;

        public ContactController(IContactService contactService, IDialogService dialogService, IUserService userService)
        {
            this.contactService = contactService;
            this.dialogService = dialogService;
            this.userService = userService;
            this.hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
        }

        [Route("")]
        // GET: api/contacts
        public IHttpActionResult Get()
        {
            try
            {
                IEnumerable<ContactViewModel> contacts = this.contactService.GetContactsList();
                string token = Request.Headers.GetValues("Authorization").FirstOrDefault();
                int currentUserId = authService.GetUserId(token);
                contacts = contacts.Where(n => n.Id != currentUserId);
                string json = JsonConvert.SerializeObject(contacts, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
                return Ok(json);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        // GET: api/Contact/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Contact
        public void Post([FromBody]string value)
        {
        }

        [Route("add")]
        // PUT: api/Contact/5
        public IHttpActionResult Put([FromBody]int userId)
        {
            string token;
            try
            {
                token = Request.Headers.GetValues("Authorization").FirstOrDefault();
                int currentUserId = authService.GetUserId(token);
                int dialogId = this.dialogService.CreateNewDialog(new List<int>() { currentUserId, userId });
                if(dialogId == -1)
                {
                    return BadRequest();
                }
                UserViewModel currentUser = this.userService.GetUser(currentUserId);
                UserViewModel user = this.userService.GetUser(userId);
                BriefDialogViewModel newDialog = this.dialogService.GetDialogById(dialogId);
                newDialog.Members = newDialog.Members.Where(n => n.Id != currentUserId);
                foreach(var member in newDialog.Members)
                {
                    var dialog = newDialog;
                    dialog.Members = dialog.Members.Where(n => n.Id != member.Id);
                    string json = JsonConvert.SerializeObject(newDialog, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
                    hubContext.Clients.Group(String.Concat(member.Id, member.Name)).NewDialog(json);
                }
                return Ok(dialogId);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        // DELETE: api/Contact/5
        public void Delete(int id)
        {
        }
    }
}
