using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_DAL.Entities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
    public class TopicEntityPagesCountResolver : ValueResolver<TopicEntity, int>
    {
        protected override int ResolveCore(TopicEntity source)
        {
            var configHelper = ServiceLocator.Current.GetInstance<IConfigHelper>();
            return (int)Math.Ceiling((double)source.PostsCount / configHelper.GetPostsOnPageCount());
        }
    }
}