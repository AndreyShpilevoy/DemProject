using System.Web.Mvc;
using System.Web.Routing;

namespace DEM_MVC
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
			routes.IgnoreRoute("{file}.css");
			routes.IgnoreRoute("{file}.js");

			routes.MapRoute(
				name: "API Default",
				url: "api/{controller}/{id}",
				defaults: new { id = UrlParameter.Optional }
			);

			routes.MapRoute(
				name: "Default",
				url: "{*url}",
				defaults: new { controller = "Conference", action = "Index" }
			);
		}
	}
}
