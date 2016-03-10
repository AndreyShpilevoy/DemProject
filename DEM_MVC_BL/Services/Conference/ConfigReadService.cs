using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Common;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Models.ConfigModels;
using DEM_MVC_DAL.Entities.ConfigEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.Conference
{
    public class ConfigReadService : IConfigReadService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IConfigRepository _configRepository;
        private readonly IAppCacheService _appCache;
        private List<ConfigModel> _configModels;

        public List<ConfigModel> ConfigModels
        {
            get
            {
                _configModels = _appCache.Get<ConfigModel>(CommonConstants.ConfigModels);
                if (_configModels != null)
                    return _configModels;
                _configModels = GetAllConfigModels();
                if (_configModels == null || _configModels.Count == 0)
                    return null;
                _appCache.Add(_configModels, CommonConstants.ConfigModels);
                return _configModels;
            }
        }

        public ConfigReadService(IConnectionFactory connectionFactory,
            IConfigRepository configRepository,
            IAppCacheService appCache)
        {
            _connectionFactory = connectionFactory;
            _configRepository = configRepository;
            _appCache = appCache;
        }

        private List<ConfigModel> GetAllConfigModels()
        {
            var configModels = new List<ConfigModel>();

            try
            {
                List<ConfigEntity> configEntities = _configRepository.GetAllConfigs(_connectionFactory);
                configModels = Mapper.Map<List<ConfigEntity>, List<ConfigModel>>(configEntities);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ConfigReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return configModels;
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