using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_DAL.Entities.UserIdentityEntities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
    public class UserIdentityEntityUserSignatureResolver : ValueResolver<UserIdentityEntity, String>
    {
        protected override string ResolveCore(UserIdentityEntity source)
        {
            var bbCodeReadService = ServiceLocator.Current.GetInstance<IBbCodeReadService>();
            return bbCodeReadService.BbCodeReplacerToHtml(source.UserSignature);
        }
    }
}