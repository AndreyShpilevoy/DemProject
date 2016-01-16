using Autofac;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Services.ModelsHelpers;
using Module = Autofac.Module;

namespace DEM_MVC_BL.Autofac
{
    public class AutofacBlRegistration : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(this.GetType().Assembly)
                .Where(x => x != typeof (BbCodeHelper) && x != typeof (ConfigHelper))
                .AsImplementedInterfaces();

            builder.RegisterType<BbCodeHelper>().As<IBbCodeHelper>().SingleInstance();
            builder.RegisterType<ConfigHelper>().As<IConfigHelper>().SingleInstance();
        }
    }
}
