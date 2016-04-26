using AutoMapper;
using DEM_MVC.Models;
using DEM_MVC.Services.AutoMapper.ValueResolvers;
using DEM_MVC_BL.Models.BbCodeModels;
using DEM_MVC_BL.Models.ConfigModels;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Models.IdentityGroupModels;
using DEM_MVC_BL.Models.IdentityPermissionModels;
using DEM_MVC_BL.Models.IdentityUserModels;
using DEM_MVC_BL.Models.PermissionModels;
using DEM_MVC_BL.Models.PollModels;
using DEM_MVC_BL.Models.PollOptionModels;
using DEM_MVC_BL.Models.PostModels;
using DEM_MVC_BL.Models.TopicModels;
using DEM_MVC_DAL.Entities.BbCodeEntities;
using DEM_MVC_DAL.Entities.ConfigEntities;
using DEM_MVC_DAL.Entities.ForumsViewEntities;
using DEM_MVC_DAL.Entities.GroupIdentityEntities;
using DEM_MVC_DAL.Entities.IdentityPermissionEntities;
using DEM_MVC_DAL.Entities.PermissionEntities;
using DEM_MVC_DAL.Entities.PollEntities;
using DEM_MVC_DAL.Entities.PollOptionEntities;
using DEM_MVC_DAL.Entities.PostEntities;
using DEM_MVC_DAL.Entities.TopicsViewEntities;
using DEM_MVC_DAL.Entities.UserForPostViewEntities;
using DEM_MVC_DAL.Entities.UserIdentityEntities;
using DEM_MVC_DAL.Entities.UserLoginInfoIdentityEntities;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Services.AutoMapper
{
    public static class AutoMapperRegistrationService
    {
        public static void Initial()
        {
            Mapper.AssertConfigurationIsValid();
            Mapper.Initialize(cfg => {
                cfg.CreateMap<BbCodeEntity, BbCodeModel>().ReverseMap();
                cfg.CreateMap<ConfigEntity, ConfigModel>().ReverseMap();
                cfg.CreateMap<ForumsViewEntity, ForumTableViewModel>().ReverseMap();
                cfg.CreateMap<PollEntity, PollViewModel>().ReverseMap();
                cfg.CreateMap<PollOptionEntity, PollOptionViewModel>().ReverseMap();
                cfg.CreateMap<GroupIdentityEntity, IdentityGroupModel>().ReverseMap();
                cfg.CreateMap<UserLoginInfoIdentityEntity, UserLoginInfo>().ReverseMap();
                cfg.CreateMap<PermissionEntity, PermissionModel>().ReverseMap();
                cfg.CreateMap<IdentityPermissionModel, IdentityPermissionEntity>().ReverseMap();
                cfg.CreateMap<NewPostViewModel, NewPostModel>().ReverseMap();
                cfg.CreateMap<NewPostModel, NewPostEntity>().ReverseMap();

                cfg.CreateMap<ReadPostEntity, PostTableViewModel>()
                      .ForMember(entity => entity.PostText, opt => opt.ResolveUsing<ReadPostEntityPostTextResolver>());

                cfg.CreateMap<PostTableViewModel, ReadPostEntity>();

                cfg.CreateMap<UserForPostViewEntity, UserTableViewModelForPosts>()
                      .ForMember(entity => entity.UserSignature, opt => opt.ResolveUsing<UserEntityUserSignatureResolver>());
                cfg.CreateMap<UserTableViewModelForPosts, UserForPostViewEntity>();

                cfg.CreateMap<UserIdentityEntity, IdentityUserModel>()
                      .Include<UserIdentityEntity, AppMember>()
                      .ForMember(entity => entity.UserSignature, opt => opt.ResolveUsing<UserIdentityEntityUserSignatureResolver>());
                cfg.CreateMap<UserIdentityEntity, AppMember>();

                cfg.CreateMap<IdentityUserModel, UserIdentityEntity>()
                    .Include<AppMember, UserIdentityEntity>();
                cfg.CreateMap<AppMember, UserIdentityEntity>();

                cfg.CreateMap<AppMember, IdentityUserModel>().ReverseMap();



                cfg.CreateMap<TopicsViewEntity, TopicTableViewModel>()
                      .ForMember(entity => entity.PagesCount, opt => opt.ResolveUsing<TopicEntityPagesCountResolver>());
                cfg.CreateMap<TopicTableViewModel, TopicsViewEntity>();

                cfg.CreateMap<TopicsViewEntity, TopicInfoViewModel>()
                      .ForMember(entity => entity.PagesCount, opt => opt.ResolveUsing<TopicEntityPagesCountResolver>());
                cfg.CreateMap<TopicInfoViewModel, TopicsViewEntity>();

                cfg.CreateMap<ForumsViewEntity, ForumInfoViewModel>()
                      .ForMember(entity => entity.PagesCount, opt => opt.ResolveUsing<ForumEntityPagesCountResolver>());
                cfg.CreateMap<ForumInfoViewModel, ForumsViewEntity>();
            });
        }
    }
}