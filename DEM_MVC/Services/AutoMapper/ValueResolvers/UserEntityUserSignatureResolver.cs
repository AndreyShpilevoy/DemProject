using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_DAL.Entities.UserForPostViewEntities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
	public class UserEntityUserSignatureResolver : IValueResolver<UserForPostViewEntity, String>
	{
		public string Resolve(UserForPostViewEntity source, string destination, ResolutionContext context)
		{
			var bbCodeReadService = ServiceLocator.Current.GetInstance<IBbCodeReadService>();
			return bbCodeReadService.BbCodeReplacerToHtml(source.UserSignature);
		}
	}
}