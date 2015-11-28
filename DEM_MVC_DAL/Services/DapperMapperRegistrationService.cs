using Dapper;
using DEM_MVC_DAL.Entities;

namespace DEM_MVC_DAL.Services
{
    public static class DapperMapperRegistrationService
    {
        public static void Initial()
        {
            SqlMapper.SetTypeMap(typeof(BbCodeEntity), new DapperColumnAttributeTypeMapperService<BbCodeEntity>());
            SqlMapper.SetTypeMap(typeof(ConfigEntity), new DapperColumnAttributeTypeMapperService<ConfigEntity>());
            SqlMapper.SetTypeMap(typeof(ForumEntity), new DapperColumnAttributeTypeMapperService<ForumEntity>());
            SqlMapper.SetTypeMap(typeof(TopicEntity), new DapperColumnAttributeTypeMapperService<TopicEntity>());
            SqlMapper.SetTypeMap(typeof(PollEntity), new DapperColumnAttributeTypeMapperService<PollEntity>());
            SqlMapper.SetTypeMap(typeof(PollOptionEntity), new DapperColumnAttributeTypeMapperService<PollOptionEntity>());
            SqlMapper.SetTypeMap(typeof(PostEntity), new DapperColumnAttributeTypeMapperService<PostEntity>());
            SqlMapper.SetTypeMap(typeof(UserEntity), new DapperColumnAttributeTypeMapperService<UserEntity>());
            SqlMapper.SetTypeMap(typeof(GroupIdentityEntity), new DapperColumnAttributeTypeMapperService<GroupIdentityEntity>());
            SqlMapper.SetTypeMap(typeof(UserIdentityEntity), new DapperColumnAttributeTypeMapperService<UserIdentityEntity>());
            SqlMapper.SetTypeMap(typeof(ClaimIdentityEntity), new DapperColumnAttributeTypeMapperService<ClaimIdentityEntity>());
            SqlMapper.SetTypeMap(typeof(UserLoginInfoIdentityEntity), new DapperColumnAttributeTypeMapperService<UserLoginInfoIdentityEntity>());
        }
    }
}