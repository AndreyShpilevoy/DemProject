using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;


namespace DEM_MVC
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AutofacConfig.Initialize();
            AreaRegistration.RegisterAllAreas();
            
            DemLogger.Current.Info("Application Start");

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            MapperConfig.Initial();
        }

        //public void Init()
        //{
        //    DemLogger.Current.Info("Application Init");
        //}

        //public void Dispose()
        //{
        //    DemLogger.Current.Info("Application Dispose");
        //}

        //protected void Application_Error()
        //{
        //    DemLogger.Current.Info("Application Error");
        //}


        protected void Application_End()
        {
            DemLogger.Current.Info("Application End");
        }
    }
}
