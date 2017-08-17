using CoolChat.Business.Interfaces;
using CoolChat.Business.ViewModels;
using CoolChat.Web.AuthServiceReference;
using CoolChat.Web.Filters;
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

        public ContactController(IContactService contactService, IDialogService dialogService)
        {
            this.contactService = contactService;
            this.dialogService = dialogService;
        }

        [Route("")]
        // GET: api/contacts
        public IHttpActionResult Get()
        {
            IEnumerable<UserViewModel> contacts = this.contactService.GetContactsList();
            string json = JsonConvert.SerializeObject(contacts, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
            return Ok(json);
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
