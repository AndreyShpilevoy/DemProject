using System.Configuration;
using Autofac;
using DEM_MVC_DAL.Factory;
using DEM_MVC_DAL.Interfaces.IFactory;
using Module = Autofac.Module;

namespace DEM_MVC_DAL.Autofac
{
    public class AutofacDalRegistration : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(this.GetType().Assembly)
                .Where(x => x != typeof(ConnectionFactory))
                .AsImplementedInterfaces().SingleInstance();

            builder.RegisterType<ConnectionFactory>()
                .As<IConnectionFactory>()
                .WithParameter(new TypedParameter(typeof(string), ConfigurationManager.ConnectionStrings["DemConnectionString"].ConnectionString));

            //builder.RegisterType<LoggerFactory>().As<ILoggerFactory>().InstancePerLifetimeScope();
        }
    }
}
