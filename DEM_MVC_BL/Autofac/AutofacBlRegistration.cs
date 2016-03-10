using Autofac;
using Module = Autofac.Module;

namespace DEM_MVC_BL.Autofac
{
    public class AutofacBlRegistration : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(this.GetType().Assembly)
                //.Where(x => x != typeof (BbCodeModelHelper) && x != typeof (ConfigModelHelper))
                .AsImplementedInterfaces();

            //builder.RegisterType<BbCodeModelHelper>().As<IBbCodeModelHelper>().SingleInstance();
            //builder.RegisterType<ConfigModelHelper>().As<IConfigModelHelper>().SingleInstance();
        }
    }
}
