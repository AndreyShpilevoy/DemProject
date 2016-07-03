using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_DAL.Entities.PostEntities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
	public class ReadPostEntityPostTextResolver : IValueResolver<ReadPostEntity, String>
	{
		public string Resolve(ReadPostEntity source, string destination, ResolutionContext context)
		{
			var bbCodeReadService = ServiceLocator.Current.GetInstance<IBbCodeReadService>();
			return bbCodeReadService.BbCodeReplacerToHtml(source.PostText);
		}
	}
}