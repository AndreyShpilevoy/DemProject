using Dapper;
using DEM_MVC_DAL.Entities.BbCodeEntities;
using DEM_MVC_DAL.Entities.ClaimIdentityEntities;
using DEM_MVC_DAL.Entities.ConfigEntities;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using DEM_MVC_DAL.Entities.GroupIdentityEntities;
using DEM_MVC_DAL.Entities.IdentityPermissionEntities;
using DEM_MVC_DAL.Entities.PollEntities;
using DEM_MVC_DAL.Entities.PollOptionEntities;
using DEM_MVC_DAL.Entities.PostEntities;
using DEM_MVC_DAL.Entities.TopicsViewEntities;
using DEM_MVC_DAL.Entities.UserForPostViewEntities;
using DEM_MVC_DAL.Entities.UserIdentityEntities;
using DEM_MVC_DAL.Entities.UserLoginInfoIdentityEntities;

namespace DEM_MVC_DAL.Services
{
    public static class DapperMapperRegistrationService
    {
        public static void Initial()
        {
            SqlMapper.SetTypeMap(typeof(BbCodeEntity), new DapperColumnAttributeTypeMapperService<BbCodeEntity>());
            SqlMapper.SetTypeMap(typeof(ConfigEntity), new DapperColumnAttributeTypeMapperService<ConfigEntity>());
            SqlMapper.SetTypeMap(typeof(ForumsViewEntity), new DapperColumnAttributeTypeMapperService<ForumsViewEntity>());
            SqlMapper.SetTypeMap(typeof(TopicsViewEntity), new DapperColumnAttributeTypeMapperService<TopicsViewEntity>());
            SqlMapper.SetTypeMap(typeof(PollEntity), new DapperColumnAttributeTypeMapperService<PollEntity>());
            SqlMapper.SetTypeMap(typeof(PollOptionEntity), new DapperColumnAttributeTypeMapperService<PollOptionEntity>());
            SqlMapper.SetTypeMap(typeof(ReadPostEntity), new DapperColumnAttributeTypeMapperService<ReadPostEntity>());
            SqlMapper.SetTypeMap(typeof(UserForPostViewEntity), new DapperColumnAttributeTypeMapperService<UserForPostViewEntity>());
            SqlMapper.SetTypeMap(typeof(GroupIdentityEntity), new DapperColumnAttributeTypeMapperService<GroupIdentityEntity>());
            SqlMapper.SetTypeMap(typeof(UserIdentityEntity), new DapperColumnAttributeTypeMapperService<UserIdentityEntity>());
            SqlMapper.SetTypeMap(typeof(ClaimIdentityEntity), new DapperColumnAttributeTypeMapperService<ClaimIdentityEntity>());
            SqlMapper.SetTypeMap(typeof(UserLoginInfoIdentityEntity), new DapperColumnAttributeTypeMapperService<UserLoginInfoIdentityEntity>());
            SqlMapper.SetTypeMap(typeof(UserPermissionEntity), new DapperColumnAttributeTypeMapperService<UserPermissionEntity>());
            SqlMapper.SetTypeMap(typeof(GroupPermissionEntity), new DapperColumnAttributeTypeMapperService<GroupPermissionEntity>());
        }
    }
}