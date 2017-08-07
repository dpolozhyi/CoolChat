using CoolChat.Business.Interfaces;
using CoolChat.Business.Services;
using CoolChat.Business.ViewModels;
using CoolChat.DataAccess;
using CoolChat.DataAccess.EFContext;
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
    public class UserAccountController : ApiController
    {
        private IUserAccountService userAccService;

        private AuthServiceClient authService = new AuthServiceClient();

        public UserAccountController() : this(new UserAccountService(new EFUnitOfWork(new ChatContext())))
        {
        }

        public UserAccountController(IUserAccountService userAccService)
        {
            this.userAccService = userAccService;
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
                UserAccountViewModel userAccount = this.userAccService.GetMainUserModel(this.authService.GetUserId(this.GetToken()));
                string json = JsonConvert.SerializeObject(userAccount, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
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
