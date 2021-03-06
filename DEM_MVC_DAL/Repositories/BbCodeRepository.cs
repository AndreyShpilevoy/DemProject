﻿using System;
using System.Collections.Generic;
using System.Linq;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using Dapper;
using DEM_MVC_DAL.Entities.BbCodeEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Repositories
{
    public class BbCodeRepository : IBbCodeRepository
    {

        public List<BbCodeEntity> GetAllBbCodes(IConnectionFactory connectionFactory)
        {
            List<BbCodeEntity> bbCodeEntities = new List<BbCodeEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    bbCodeEntities = connection.Query<BbCodeEntity>(SqlCommandStorageService.GetAllBbCode()).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(BbCodeRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return bbCodeEntities;
        }
    }
}