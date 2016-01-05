using System;
using System.Collections.Generic;
using System.Linq;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.ForumModels;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public class ConfigHelper : IConfigHelper
    {
        public List<ConfigModel> ConfigModels;

        public ConfigHelper(IDataLoadService dataLoadService,
            IAppCache appCache)
        {
            ConfigModels = appCache.Get<ConfigModel>(appCache.ConfigModels);
            if (ConfigModels == null)
            {
                ConfigModels = dataLoadService.GetAllConfigModels();
                appCache.Add(ConfigModels, appCache.ConfigModels);
            }
        }

        public int GetPostsOnPageCount()
        {
            var postsOnPage = ConfigModels.FirstOrDefault(x => x.ConfigName == "postsOnPage");
            if (postsOnPage == null) return 20;
            var result = Int32.Parse(postsOnPage.ConfigValue);
            return result == 0 ? 1 : result;
        }

        public int GetTopicsOnPageCount()
        {
            var topicsOnPage = ConfigModels.FirstOrDefault(x => x.ConfigName == "topicsOnPage");
            if (topicsOnPage == null) return 50;
            var result = Int32.Parse(topicsOnPage.ConfigValue);
            return result == 0 ? 1 : result;
        }
    }
}