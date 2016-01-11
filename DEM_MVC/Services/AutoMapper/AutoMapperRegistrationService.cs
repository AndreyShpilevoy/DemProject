using AutoMapper;
using DEM_MVC.Models;
using DEM_MVC.Services.AutoMapper.ValueResolvers;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Models.IdentityModels;
using DEM_MVC_BL.Models.PermissionModels;
using DEM_MVC_DAL.Entities;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Services.AutoMapper
{
    public static class AutoMapperRegistrationService
    {
        public static void Initial()
        {
            Mapper.CreateMap<BbCodeEntity, BbCodeModel>().ReverseMap();
            Mapper.CreateMap<ConfigEntity, ConfigModel>().ReverseMap();
            Mapper.CreateMap<ForumEntity, ForumTableViewModel>().ReverseMap();
            Mapper.CreateMap<PollEntity, PollViewModel>().ReverseMap();
            Mapper.CreateMap<PollOptionEntity, PollOptionViewModel>().ReverseMap();
            Mapper.CreateMap<GroupIdentityEntity, IdentityGroup>().ReverseMap();
            Mapper.CreateMap<UserLoginInfoIdentityEntity, UserLoginInfo>().ReverseMap();
            Mapper.CreateMap<PermissionEntity, PermissionModel>().ReverseMap();
            Mapper.CreateMap<IdentityPermissionModel, IdentityPermissionEntity>().ReverseMap();
            Mapper.CreateMap<NewPostViewModel, NewPostModel>().ReverseMap();
            Mapper.CreateMap<NewPostModel, NewPostEntity>().ReverseMap();

            Mapper.CreateMap<ReadPostEntity, PostTableViewModel>()
                  .ForMember(entity => entity.PostText, opt => opt.ResolveUsing<ReadPostEntityPostTextResolver>());

            Mapper.CreateMap<PostTableViewModel, ReadPostEntity>();

            Mapper.CreateMap<UserEntity, UserTableViewModelForPosts>()
                  .ForMember(entity => entity.UserSignature, opt => opt.ResolveUsing<UserEntityUserSignatureResolver>());
            Mapper.CreateMap<UserTableViewModelForPosts, UserEntity>();

            Mapper.CreateMap<UserIdentityEntity, IdentityUser>()
                  .Include<UserIdentityEntity, AppMember>()
                  .ForMember(entity => entity.UserSignature, opt => opt.ResolveUsing<UserIdentityEntityUserSignatureResolver>());

            Mapper.CreateMap<IdentityUser, UserIdentityEntity>()
                .Include<AppMember, UserIdentityEntity>();

            Mapper.CreateMap<AppMember, IdentityUser>().ReverseMap();



            Mapper.CreateMap<TopicEntity, TopicTableViewModel>()
                  .ForMember(entity => entity.PagesCount, opt => opt.ResolveUsing<TopicEntityPagesCountResolver>());
            Mapper.CreateMap<TopicTableViewModel, TopicEntity>();

            Mapper.CreateMap<TopicEntity, TopicInfoViewModel>()
                  .ForMember(entity => entity.PagesCount, opt => opt.ResolveUsing<TopicEntityPagesCountResolver>());
            Mapper.CreateMap<TopicInfoViewModel, TopicEntity>();

            Mapper.CreateMap<ForumEntity, ForumInfoViewModel>()
                  .ForMember(entity => entity.PagesCount, opt => opt.ResolveUsing<ForumEntityPagesCountResolver>());
            Mapper.CreateMap<ForumInfoViewModel, ForumEntity>();
        }
    }
}