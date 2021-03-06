﻿using DEM_MVC.Services.AutoMapper;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DEM_MVC.Startup))]
namespace DEM_MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            AutofacConfig.Initialize(app);
            DemLogger.Current.Info("Application Start");
            ConfigureAuth(app);
            DapperMapperRegistrationService.Initial();
            AutoMapperRegistrationService.Initial();
        }
    }
}
