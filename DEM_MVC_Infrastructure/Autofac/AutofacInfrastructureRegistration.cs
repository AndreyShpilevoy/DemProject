using Autofac;
using Module = Autofac.Module;

namespace DEM_MVC_Infrastructure.Autofac
{
    public class AutofacInfrastructureRegistration : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(this.GetType().Assembly).AsImplementedInterfaces().SingleInstance();
            //builder.RegisterType<LoggerFactory>().As<ILoggerFactory>().InstancePerLifetimeScope();
        }
    }
}
