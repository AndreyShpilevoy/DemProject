using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_DAL.Entities.UserIdentityEntities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
	public class UserIdentityEntityUserSignatureResolver : IValueResolver<UserIdentityEntity, String>
	{
		public string Resolve(UserIdentityEntity source, string destination, ResolutionContext context)
		{
			var bbCodeReadService = ServiceLocator.Current.GetInstance<IBbCodeReadService>();
			return bbCodeReadService.BbCodeReplacerToHtml(source.UserSignature);
		}
	}
}