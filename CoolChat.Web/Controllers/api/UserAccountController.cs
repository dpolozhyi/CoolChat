using CoolChat.Business.Interfaces;
using CoolChat.Business.Services;
using CoolChat.Business.ViewModels;
using CoolChat.DataAccess;
using CoolChat.DataAccess.EFContext;
using CoolChat.Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CoolChat.Web.Controllers.api
{
    [CustomAuthorize]
    public class UserAccountController : ApiController
    {
        private IUserAccountService userAccService;

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
        public UserAccountViewModel Post([FromBody]string userId)
        {
            return this.userAccService.GetMainUserModel(Int32.Parse(userId));
        }

        // PUT: api/UserAccount/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UserAccount/5
        public void Delete(int id)
        {
        }
    }
}
