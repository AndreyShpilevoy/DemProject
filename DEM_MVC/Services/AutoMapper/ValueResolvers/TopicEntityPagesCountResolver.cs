using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_DAL.Entities.TopicsViewEntities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
	public class TopicEntityPagesCountResolver : IValueResolver<TopicsViewEntity, int>
	{
		public int Resolve(TopicsViewEntity source, int destination, ResolutionContext context)
		{
			var configReadService = ServiceLocator.Current.GetInstance<IConfigReadService>();
			return (int)Math.Ceiling((double)source.PostsCount / configReadService.GetPostsOnPageCount());
		}
	}
}