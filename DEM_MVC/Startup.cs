using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DEM_MVC.Startup))]
namespace DEM_MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
