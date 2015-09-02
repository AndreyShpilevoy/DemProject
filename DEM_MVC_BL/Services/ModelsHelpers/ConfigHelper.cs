using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_BL.Services.ModelsHelpers
{
    public static class ConfigHelper
    {
        private static readonly IDataLoadService DataLoadService;
        private static readonly List<ConfigModel> ConfigModels;

        static ConfigHelper()
        {
            var dataLoadService = ServiceLocator.Current.GetInstance<IDataLoadService>();
            DataLoadService = dataLoadService;
            ConfigModels = DataLoadService.GetAllConfigModels();
        }

        public static int GetPostsOnPageCount()
        {
            var postsOnPage = ConfigModels.FirstOrDefault(x => x.ConfigName == "postsOnPage");
            if (postsOnPage == null) return 20;
            var result = Int32.Parse(postsOnPage.ConfigValue);
            return result == 0 ? 1 : result;
        }

        public static int GetTopicsOnPageCount()
        {
            var postsOnPage = ConfigModels.FirstOrDefault(x => x.ConfigName == "topicsOnPage");
            if (postsOnPage == null) return 50;
            var result = Int32.Parse(postsOnPage.ConfigValue);
            return result == 0 ? 1 : result;
        }
    }
}