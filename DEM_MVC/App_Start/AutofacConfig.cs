using System.Web;
using System.Web.Mvc;
using Autofac;
using Autofac.Extras.CommonServiceLocator;
using Autofac.Integration.Mvc;
using DEM_MVC.Autofac;
using DEM_MVC.Models;
using DEM_MVC_BL.Autofac;
using DEM_MVC_BL.Services;
using DEM_MVC_BL.Services.Identity;
using DEM_MVC_DAL.Autofac;
using DEM_MVC_Infrastructure.Autofac;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataProtection;
using Microsoft.Practices.ServiceLocation;
using Owin;

namespace DEM_MVC
{
    public static class AutofacConfig
    {
        public static void Initialize(IAppBuilder app)
        {
            var builder = new ContainerBuilder();

            // REGISTER DEPENDENCIES
            builder.RegisterModule(new AutofacRegistration());
            builder.RegisterModule(new AutofacBlRegistration());
            builder.RegisterModule(new AutofacDalRegistration());
            builder.RegisterModule(new AutofacInfrastructureRegistration());
            
            builder.RegisterType<ApplicationUserManager>().AsSelf().InstancePerRequest();
            builder.RegisterType<UserIdentityService<AppMember>>().As<IUserStore<AppMember, int>>().InstancePerRequest();
            builder.RegisterType<ApplicationSignInManager>().AsSelf().InstancePerRequest();
            builder.Register<IAuthenticationManager>(c => HttpContext.Current.GetOwinContext().Authentication).InstancePerRequest();
            builder.Register<IDataProtectionProvider>(c => app.GetDataProtectionProvider()).InstancePerRequest();

            // REGISTER CONTROLLERS SO DEPENDENCIES ARE CONSTRUCTOR INJECTED
            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            // BUILD THE CONTAINER
            var container = builder.Build();

            // REPLACE THE MVC DEPENDENCY RESOLVER WITH AUTOFAC
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            var csl = new AutofacServiceLocator(container);
            ServiceLocator.SetLocatorProvider(() => csl);

            // REGISTER WITH OWIN
            app.UseAutofacMiddleware(container);
            app.UseAutofacMvc();
        }
    }
}