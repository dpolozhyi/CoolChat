using CoolChat.Web.AuthServiceReference;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace CoolChat.Web.Filters
{
    public class CustomAuthorizeAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            AuthServiceClient authService = new AuthServiceClient();
            string token;
            try
            {
                token = actionContext.Request.Headers.GetValues("Authorization").FirstOrDefault();
                if (authService.CheckToken(token))
                {
                    base.OnAuthorization(actionContext);
                }
                else
                {
                    throw new Exception("Unauthorized");
                }
            }
            catch
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
        }
    }
}