using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CoolChat.Web.AuthServiceReference;
using Newtonsoft.Json;

namespace CoolChat.Web.Controllers.api
{
    [RoutePrefix("api/token")]
    public class TokenController : ApiController
    {
        private AuthServiceClient authService = new AuthServiceClient();

        // GET: api/Token
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Token/5
        public string Get(string token)
        {
            if (this.authService.CheckToken(token))
            {
                return JsonConvert.SerializeObject(new { isValid = true });
            }
            else
            {
                return JsonConvert.SerializeObject(new { isValid = false });
            }
        }

        [Route("check")]
        [HttpPost]
        public string CheckToken([FromBody]string token)
        {
            if (this.authService.CheckToken(token))
            {
                return JsonConvert.SerializeObject(new { isValid = true });
            }
            else
            {
                return JsonConvert.SerializeObject(new { isValid = false });
            }
        }

        // POST: api/Token
        public IHttpActionResult Post([FromBody]LoginModel creds)
        {
            try
            {
                return Ok(this.authService.GetToken(new LoginModel() { Login = creds.Login, Password = creds.Password }));
            }
            catch(Exception)
            {
                return Unauthorized();
            }
        }

        // PUT: api/Token/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Token/5
        public void Delete(int id)
        {
        }
    }
}
