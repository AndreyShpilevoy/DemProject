using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
    public class ForumEntityPagesCountResolver : ValueResolver<ForumsViewEntity, int>
    {
        protected override int ResolveCore(ForumsViewEntity source)
        {
            var configHelper = ServiceLocator.Current.GetInstance<IConfigHelper>();
            return (int)Math.Ceiling((double)source.TopicsCount / configHelper.GetTopicsOnPageCount());
        }
    }
}