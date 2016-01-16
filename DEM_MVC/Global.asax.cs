using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using DEM_MVC_Infrastructure.Models;


namespace DEM_MVC
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        //public void Init()
        //{
        //    DemLogger.Current.Info("Application Init");
        //}

        //public void Dispose()
        //{
        //    DemLogger.Current.Info("Application Dispose");
        //}

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            if (!(exception is HttpException))
            {
                DemLogger.Current.Error(exception, "Application Error. Was caught in Global.asax file.");
            }
        }


        protected void Application_End()
        {
            //DemLogger.Current.Info("Application End");
        }
    }
}
