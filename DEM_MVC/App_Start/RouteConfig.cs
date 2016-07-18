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
				name: "API Default",
				url: "api/{controller}/{id}",
				defaults: new { id = UrlParameter.Optional }
			);
		}
	}
}
