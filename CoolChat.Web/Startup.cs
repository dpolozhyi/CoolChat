using Owin;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(CoolChat.Web.Startup))]
namespace CoolChat.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            // Add SignalR to the OWIN pipeline
            //
            app.MapSignalR();
        }
    }
}