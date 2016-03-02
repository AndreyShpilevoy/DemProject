using System;
using System.Collections.Generic;
using System.Linq;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.Common;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.ConfigModels;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public class ConfigModelHelper : IConfigModelHelper
    {
        private readonly IDataLoadService _dataLoadService;
        private readonly IAppCacheService _appCache;
        private List<ConfigModel> _configModels;

        public List<ConfigModel> ConfigModels
        {
            get
            {
                _configModels = _appCache.Get<ConfigModel>(CommonConstants.ConfigModels);
                if (_configModels != null)
                    return _configModels;
                _configModels = _dataLoadService.GetAllConfigModels();
                if (_configModels == null || _configModels.Count == 0)
                    return null;
                _appCache.Add(_configModels, CommonConstants.ConfigModels);
                return _configModels;
            }
        }

        public ConfigModelHelper(IDataLoadService dataLoadService,
            IAppCacheService appCache)
        {
            _dataLoadService = dataLoadService;
            _appCache = appCache;
        }

        public int GetPostsOnPageCount()
        {
            var postsOnPage = ConfigModels.FirstOrDefault(x => x.ConfigName == "postsOnPage");

            if (postsOnPage == null)
                return 20;

            var result = Int32.Parse(postsOnPage.ConfigValue);
            return result == 0 ? 1 : result;
        }

        public int GetTopicsOnPageCount()
        {
            var topicsOnPage = ConfigModels.FirstOrDefault(x => x.ConfigName == "topicsOnPage");

            if (topicsOnPage == null)
                return 50;

            var result = Int32.Parse(topicsOnPage.ConfigValue);
            return result == 0 ? 1 : result;
        }
    }
}