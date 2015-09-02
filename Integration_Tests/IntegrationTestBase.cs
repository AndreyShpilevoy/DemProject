using System.Web.Mvc;
using Autofac;
using Autofac.Extras.CommonServiceLocator;
using Autofac.Integration.Mvc;
using DEM_MVC.Autofac;
using DEM_MVC_BL.Autofac;
using DEM_MVC_DAL.Autofac;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;
using DEM_MVC_Infrastructure.Autofac;
using Microsoft.Practices.ServiceLocation;

namespace Integration_Tests
{
    public class IntegrationTestBase
    {
        protected readonly IUnitOfWorkFactory UnitOfWorkFactory;

        public IntegrationTestBase()
        {
            #region Autofac

            var builder = new ContainerBuilder();
            builder.RegisterModule(new AutofacRegistration());
            builder.RegisterModule(new AutofacBlRegistration());
            builder.RegisterModule(new AutofacDalRegistration());
            builder.RegisterModule(new AutofacInfrastructureRegistration());
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            var csl = new AutofacServiceLocator(container);
            ServiceLocator.SetLocatorProvider(() => csl);

            #endregion

            UnitOfWorkFactory = ServiceLocator.Current.GetInstance<IUnitOfWorkFactory>();
        }
    }
}