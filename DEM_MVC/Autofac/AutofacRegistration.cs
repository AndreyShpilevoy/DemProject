using Autofac;
using Module = Autofac.Module;

namespace DEM_MVC.Autofac
{
    public class AutofacRegistration : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(typeof(MvcApplication).Assembly);
        }
    }
}
