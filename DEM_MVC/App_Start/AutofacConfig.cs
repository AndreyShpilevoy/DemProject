using System.Web.Mvc;
using Autofac;
using Autofac.Extras.CommonServiceLocator;
using Autofac.Integration.Mvc;
using DEM_MVC.Autofac;
using DEM_MVC_BL.Autofac;
using DEM_MVC_DAL.Autofac;
using DEM_MVC_Infrastructure.Autofac;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC
{
    public static class AutofacConfig
    {
        public static void Initialize()
        {
            var builder = new ContainerBuilder();
            builder.RegisterModule(new AutofacRegistration());
            builder.RegisterModule(new AutofacBlRegistration());
            builder.RegisterModule(new AutofacDalRegistration());
            builder.RegisterModule(new AutofacInfrastructureRegistration());
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            // Set the service locator to an AutofacServiceLocator.
            var csl = new AutofacServiceLocator(container);
            ServiceLocator.SetLocatorProvider(() => csl);
        }
    }
}