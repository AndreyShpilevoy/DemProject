using System.Configuration;
using Autofac;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;
using DEM_MVC_DAL.UnitOfWork;
using Module = Autofac.Module;

namespace DEM_MVC_DAL.Autofac
{
    public class AutofacDalRegistration : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(this.GetType().Assembly)
                .Where(x => x != typeof (UnitOfWorkFactory))
                .AsImplementedInterfaces().SingleInstance();

            builder.RegisterType<UnitOfWorkFactory>()
                .As<IUnitOfWorkFactory>()
                .WithParameter(new TypedParameter(typeof(string), ConfigurationManager.ConnectionStrings["DemConnectionString"].ConnectionString));

            //builder.RegisterType<LoggerFactory>().As<ILoggerFactory>().InstancePerLifetimeScope();
        }
    }
}
