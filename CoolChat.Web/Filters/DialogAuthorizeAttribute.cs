using CoolChat.Business.Interfaces;
using CoolChat.Business.Services;
using CoolChat.DataAccess;
using CoolChat.DataAccess.EFContext;
using CoolChat.Web.AuthServiceReference;
using CoolChat.Web.Exceptions;
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
    public class DialogAuthorizeAttribute : AuthorizationFilterAttribute
    {
        private IDialogService dialogService;

        public DialogAuthorizeAttribute(): this(new DialogService(new EFUnitOfWork(new ChatContext())))
        {
        }

        public DialogAuthorizeAttribute(IDialogService dialogService)
        {
            this.dialogService = dialogService;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            AuthServiceClient authService = new AuthServiceClient();
            string token;
            try
            {
                token = actionContext.Request.Headers.GetValues("Authorization").FirstOrDefault();
                if (authService.CheckToken(token))
                {
                    int userId = authService.GetUserId(token);
                    int dialogId = Int32.Parse(actionContext.Request.RequestUri.Segments[3]);
                    if (this.dialogService.CheckUserHasDialog(userId, dialogId))
                    {
                        base.OnAuthorization(actionContext);
                    }
                    else
                    {
                        throw new AuthorizeException("User is unauthorized for this dialog");
                    }
                }
                else
                {
                    throw new AuthorizeException("Token provided is invalid");
                }
            }
            catch
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
        }
    }
}