using System;
using System.Collections.Generic;
using AutoMapper;
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
        private readonly IConfigRepository _configEntityRepository;

        public ConfigReadService(IConnectionFactory connectionFactory,
            IConfigRepository configEntityRepository)
        {
            _connectionFactory = connectionFactory;
            _configEntityRepository = configEntityRepository;
        }

        public List<ConfigModel> GetAllConfigModels()
        {
            var configModels = new List<ConfigModel>();

            try
            {
                List<ConfigEntity> configEntities = _configEntityRepository.GetAllConfigs(_connectionFactory);
                configModels = Mapper.Map<List<ConfigEntity>, List<ConfigModel>>(configEntities);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ConfigReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return configModels;
        }
    }
}