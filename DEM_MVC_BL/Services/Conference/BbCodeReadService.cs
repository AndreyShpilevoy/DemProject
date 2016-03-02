using System;
using System.Collections.Generic;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Models.BbCodeModels;
using DEM_MVC_DAL.Entities.BbCodeEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.Conference
{
    public class BbCodeReadService : IBbCodeReadService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IBbCodeRepository _bbCodeEntityRepository;

        public BbCodeReadService(IBbCodeRepository bbCodeEntityRepository,
            IConnectionFactory connectionFactory)
        {
            _bbCodeEntityRepository = bbCodeEntityRepository;
            _connectionFactory = connectionFactory;
        }

        public List<BbCodeModel> GetAllBbCodeModels()
        {
            var bbCodeModels = new List<BbCodeModel>();

            try
            {
                List<BbCodeEntity> bbCodeEntities = _bbCodeEntityRepository.GetAllBbCodes(_connectionFactory);
                bbCodeModels = Mapper.Map<List<BbCodeEntity>, List<BbCodeModel>>(bbCodeEntities);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(BbCodeReadService)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return bbCodeModels;
        }
    }
}