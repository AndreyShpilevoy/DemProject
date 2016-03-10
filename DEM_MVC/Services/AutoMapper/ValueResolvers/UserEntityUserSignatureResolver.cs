using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_DAL.Entities.UserForPostViewEntities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
    public class UserEntityUserSignatureResolver : ValueResolver<UserForPostViewEntity, String>
    {
        protected override string ResolveCore(UserForPostViewEntity source)
        {
            var bbCodeReadService = ServiceLocator.Current.GetInstance<IBbCodeReadService>();

            return bbCodeReadService.BbCodeReplacerToHtml(source.UserSignature);
        }
    }
}