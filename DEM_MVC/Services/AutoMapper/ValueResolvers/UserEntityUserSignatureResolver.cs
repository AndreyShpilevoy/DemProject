using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_DAL.Entities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
    public class UserEntityUserSignatureResolver : ValueResolver<UserEntity, String>
    {
        protected override string ResolveCore(UserEntity source)
        {
            var bbCodeHelper = ServiceLocator.Current.GetInstance<IBbCodeHelper>();

            return bbCodeHelper.BbCodeReplacerToHtml(source.UserSignature);
        }
    }
}