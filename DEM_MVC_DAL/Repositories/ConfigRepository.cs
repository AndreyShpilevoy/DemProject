using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities.ConfigEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class ConfigRepository: IConfigRepository
    {
        public List<ConfigEntity> GetAllConfigs(IConnectionFactory connectionFactory)
        {
            List<ConfigEntity> configEntities = new List<ConfigEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    configEntities = connection.Query<ConfigEntity>(SqlCommandStorageService.GetAllConfigs()).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(ConfigRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return configEntities;
        }
    }
}