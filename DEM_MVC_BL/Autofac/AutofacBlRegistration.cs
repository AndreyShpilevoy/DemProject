using Autofac;
using Module = Autofac.Module;

namespace DEM_MVC_BL.Autofac
{
    public class AutofacBlRegistration : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(this.GetType().Assembly).AsImplementedInterfaces().SingleInstance();
            //builder.RegisterType<DataLoadService>().As<IDataLoadService>().InstancePerLifetimeScope();
        }
    }
}
