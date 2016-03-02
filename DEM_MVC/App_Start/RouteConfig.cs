using System.Web.Mvc;
using System.Web.Routing;

namespace DEM_MVC
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Conference",
                url: "Conference/{action}/{id}",
                defaults: new { controller = "Conference", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Forum",
                url: "Forum/{action}/{id}",
                defaults: new { controller = "Conference", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Conference", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
