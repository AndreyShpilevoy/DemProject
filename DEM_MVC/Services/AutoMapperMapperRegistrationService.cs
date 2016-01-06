using System;
using AutoMapper;
using DEM_MVC.Models;
using DEM_MVC_BL.Interfaces.IServices.IModelsHelpers;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Models.IdentityModels;
using DEM_MVC_BL.Models.PermissionModels;
using DEM_MVC_DAL.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.Practices.ServiceLocation;

namespace DEM_MVC.Services
{
    public static class AutoMapperMapperRegistrationService
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

    public class ReadPostEntityPostTextResolver : ValueResolver<ReadPostEntity, String>
    {
        protected override string ResolveCore(ReadPostEntity source)
        {
            var bbCodeHelper = ServiceLocator.Current.GetInstance<IBbCodeHelper>();

            return bbCodeHelper.BbCodeReplacerToHtml(source.PostText);
        }
    }

    public class UserEntityUserSignatureResolver : ValueResolver<UserEntity, String>
    {
        protected override string ResolveCore(UserEntity source)
        {
            var bbCodeHelper = ServiceLocator.Current.GetInstance<IBbCodeHelper>();

            return bbCodeHelper.BbCodeReplacerToHtml(source.UserSignature);
        }
    }

    public class UserIdentityEntityUserSignatureResolver : ValueResolver<UserIdentityEntity, String>
    {
        protected override string ResolveCore(UserIdentityEntity source)
        {
            var bbCodeHelper = ServiceLocator.Current.GetInstance<IBbCodeHelper>();
            return bbCodeHelper.BbCodeReplacerToHtml(source.UserSignature);
        }
    }

    public class ForumEntityPagesCountResolver : ValueResolver<ForumEntity, int>
    {
        protected override int ResolveCore(ForumEntity source)
        {
            var configHelper = ServiceLocator.Current.GetInstance<IConfigHelper>();
            return (int)Math.Ceiling((double)source.TopicsCount / configHelper.GetTopicsOnPageCount());
        }
    }

    public class TopicEntityPagesCountResolver : ValueResolver<TopicEntity, int>
    {
        protected override int ResolveCore(TopicEntity source)
        {
            var configHelper = ServiceLocator.Current.GetInstance<IConfigHelper>();
            return (int)Math.Ceiling((double)source.PostsCount / configHelper.GetPostsOnPageCount());
        }
    }
}