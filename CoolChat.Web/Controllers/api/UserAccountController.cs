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
    [RoutePrefix("api/userAccount")]
    public class UserAccountController : ApiController
    {
        private IUserAccountService userAccService;

        private IDialogService dialogService;

        private IHubContext hubContext;

        private AuthServiceClient authService = new AuthServiceClient();

        public UserAccountController(IUserAccountService userAccService, IDialogService dialogService)
        {
            this.userAccService = userAccService;
            this.dialogService = dialogService;
            this.hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
        }

        // GET: api/UserAccount
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/UserAccount/5

        public UserAccountViewModel Get(int userId)
        {
            return this.userAccService.GetMainUserModel(userId);
        }

        // POST: api/UserAccount
        public IHttpActionResult Post()
        {
            int userId = this.authService.GetUserId(this.GetToken());
            if (userId > 0)
            {
                UserAccountViewModel userAccount = this.userAccService.GetMainUserModel(userId);
                string json = JsonConvert.SerializeObject(userAccount, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
                return Ok(json);
            }
            return BadRequest();
        }

        [Route("lastActivity")]
        // POST: api/UserAccount
        public IHttpActionResult PostLastTimeActivity()
        {
            int userId = this.authService.GetUserId(this.GetToken());
            if (userId > 0)
            {
                UserViewModel user = this.userAccService.SetLastTimeActivity(userId);
                string json = JsonConvert.SerializeObject(user, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
                this.hubContext.Clients.Groups(this.dialogService.GetDialogsIdsByUserId(user.Id).Select(n => n.ToString()).ToList()).UserIsOnline(json);
                return Ok(json);
            }
            return BadRequest();
        }

        // PUT: api/UserAccount/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UserAccount/5
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
