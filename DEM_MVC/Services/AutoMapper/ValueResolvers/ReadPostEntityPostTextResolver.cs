using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_DAL.Entities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
    public class ReadPostEntityPostTextResolver : ValueResolver<ReadPostEntity, String>
    {
        protected override string ResolveCore(ReadPostEntity source)
        {
            var bbCodeHelper = ServiceLocator.Current.GetInstance<IBbCodeHelper>();

            return bbCodeHelper.BbCodeReplacerToHtml(source.PostText);
        }
    }
}