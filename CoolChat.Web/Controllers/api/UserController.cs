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
    public class UserController : ApiController
    {
        private AuthServiceClient authService = new AuthServiceClient();

        private IUserService userService;

        public UserController() : this(new UserService(new EFUnitOfWork(new ChatContext())))
        {

        }

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [CustomAuthorize]
        // GET: api/User
        public IHttpActionResult Get()
        {
            int userId = this.authService.GetUserId(this.GetToken());
            if(userId > 0)
            {
                UserViewModel user = this.userService.GetUser(userId);
                string json = JsonConvert.SerializeObject(user, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });
                return Ok(json);
            }
            return BadRequest();
        }

        // GET: api/User/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        public IHttpActionResult Post([FromBody]RegisterModel regModel)
        {
            User user = this.authService.Register(new RegisterModel(){
                Login = regModel.Login,
                Password = regModel.Password,
                RepeatPassword = regModel.RepeatPassword
            });
            if(user != null)
            {
                Entities.User addedUser = this.userService.AddNewUser(new Entities.User() { Id = user.Id, Name = user.Login, LastTimeActivity=DateTime.UtcNow });
                return Ok(addedUser);
            }
            else
            {
                return Unauthorized();
            }
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
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
