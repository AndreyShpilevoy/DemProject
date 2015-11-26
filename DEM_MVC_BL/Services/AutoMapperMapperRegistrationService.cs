using AutoMapper;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Models.IdentityModels;
using DEM_MVC_DAL.Entities;

namespace DEM_MVC_BL.Services
{
    public static class AutoMapperMapperRegistrationService
    {
        public static void Initial()
        {
            Mapper.CreateMap<ForumEntity, ForumTableViewModel>();
            Mapper.CreateMap<ForumEntity, ForumInfoViewModel>();
            Mapper.CreateMap<BbCodeEntity, BbCodeModel>();
            Mapper.CreateMap<ConfigEntity, ConfigModel>();
            Mapper.CreateMap<TopicEntity, TopicTableViewModel>();
            Mapper.CreateMap<TopicEntity, TopicInfoViewModel>();
            Mapper.CreateMap<PollEntity, PollViewModel>();
            Mapper.CreateMap<PollOptionEntity, PollOptionViewModel>();
            Mapper.CreateMap<PostEntity, PostTableViewModel>();
            Mapper.CreateMap<UserEntity, UserTableViewModelForPosts>();
            Mapper.CreateMap<UserIdentityEntity, IdentityMember>();
            Mapper.CreateMap<GroupIdentityEntity, IdentityRole>();
        }
    }
}