using Dapper;
using DEM_MVC_DAL.Entities;

namespace DEM_MVC_DAL.Services
{
    public static class DapperMapperHelperService
    {
        public static void Initial()
        {
            SqlMapper.SetTypeMap(typeof(BbCodeEntity), new DapperColumnAttributeTypeMapperService<BbCodeEntity>());
            SqlMapper.SetTypeMap(typeof(ConfigEntity), new DapperColumnAttributeTypeMapperService<ConfigEntity>());
        }
    }
}