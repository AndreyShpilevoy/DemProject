﻿using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_DAL.Entities.PostEntities;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services.AutoMapper.ValueResolvers
{
    public class ReadPostEntityPostTextResolver : ValueResolver<ReadPostEntity, String>
    {
        protected override string ResolveCore(ReadPostEntity source)
        {
            var bbCodeReadService = ServiceLocator.Current.GetInstance<IBbCodeReadService>();

            return bbCodeReadService.BbCodeReplacerToHtml(source.PostText);
        }
    }
}