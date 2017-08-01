using CoolChat.Web.AuthServiceReference;
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

        // GET: api/User
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
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
                return Ok();
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
    }
}
