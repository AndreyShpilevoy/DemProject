using System;
using System.Collections.Generic;
using System.Linq;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.ConfigModels;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public class ConfigModelHelper : IConfigModelHelper
    {
        public List<ConfigModel> ConfigModels;

        public ConfigModelHelper(IDataLoadService dataLoadService,
            IAppCache appCache)
        {
            ConfigModels = appCache.Get<ConfigModel>(CommonConstants.ConfigModels);
            if (ConfigModels == null)
            {
                ConfigModels = dataLoadService.GetAllConfigModels();
                appCache.Add(ConfigModels, CommonConstants.ConfigModels);
            }
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