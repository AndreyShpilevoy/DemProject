using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
    public class ForumEntityPagesCountResolver : IValueResolver<ForumsViewEntity, int>
    {
		public int Resolve(ForumsViewEntity source, int destination, ResolutionContext context)
		{
			var configReadService = ServiceLocator.Current.GetInstance<IConfigReadService>();
			return (int)Math.Ceiling((double)source.TopicsCount / configReadService.GetTopicsOnPageCount());
		}
    }
}