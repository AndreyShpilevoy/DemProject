using System;
using System.Collections.Generic;
using System.Linq;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;
using DEM_MVC_Infrastructure.Models;
using Dapper;
using DEM_MVC_DAL.Entities;

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
                    bbCodeEntities = connection.Query<BbCodeEntity>(@"SELECT bbcode_order AS BbCodeOrder,
                                                                             bbcode_tag AS BbCodeTag,
                                                                             bbcode_helpline AS BbCodeHelpLine,
                                                                             display_on_posting AS BbCodeOnPosting,
                                                                             bbcode_match AS BbCodeMatch,
                                                                             bbcode_template AS BbCodeTemplate,
                                                                             bbcode_reg_options AS BbCodeRegexpOptions
                                                                        FROM dem_bbcodes").ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "BbCodeEntityRepository. Error in function GetAllBbCodes");
            }
            return bbCodeEntities;
        }
    }
}