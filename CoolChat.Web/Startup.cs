using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoolChat.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        { 
            // Add SignalR to the OWIN pipeline
            //
            app.MapSignalR();
        }
    }
}