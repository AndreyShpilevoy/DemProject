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
		private static bool _initialized;
		public static void Initial()
		{
			if (_initialized) return;
			_initialized = true;
			ConfigureMapping();
		}

		private static void ConfigureMapping()
		{
			Mapper.Initialize(cfg =>
			{
				cfg.CreateMap<BbCodeEntity, BbCodeModel>()
					.ReverseMap();

				cfg.CreateMap<ConfigEntity, ConfigModel>()
					.ReverseMap();

				cfg.CreateMap<ForumsViewEntity, ForumTableViewModel>()
					.ForMember(dest => dest.SubForums, opts => opts.Ignore())
					.ReverseMap();

				cfg.CreateMap<PollEntity, PollViewModel>()
					.ForMember(dest => dest.PollOptionList, opts => opts.Ignore())
					.ReverseMap();

				cfg.CreateMap<PollOptionEntity, PollOptionViewModel>()
					.ForMember(dest => dest.PollOptionTotalPercent, opts => opts.Ignore())
					.ReverseMap();

				cfg.CreateMap<GroupIdentityEntity, IdentityGroupModel>()
					.ReverseMap();

				cfg.CreateMap<UserLoginInfoIdentityEntity, UserLoginInfo>()
					.ReverseMap();

				cfg.CreateMap<PermissionEntity, PermissionModel>()
					.ReverseMap();

				cfg.CreateMap<IdentityPermissionModel, IdentityPermissionEntity>()
					.ReverseMap();

				cfg.CreateMap<NewPostViewModel, NewPostModel>()
					.ReverseMap();

				cfg.CreateMap<NewPostModel, NewPostEntity>()
					.ForMember(dest => dest.PostId, opts => opts.Ignore())
					.ForMember(dest => dest.PosterIp, opts => opts.Ignore())
					.ForMember(dest => dest.PostMerged, opts => opts.Ignore())
					.ForMember(dest => dest.PostReported, opts => opts.Ignore())
					.ForMember(dest => dest.EnableBbcode, opts => opts.Ignore())
					.ForMember(dest => dest.EnableSmilies, opts => opts.Ignore())
					.ForMember(dest => dest.EnableMagicUrl, opts => opts.Ignore())
					.ForMember(dest => dest.EnableSignature, opts => opts.Ignore())
					.ForMember(dest => dest.PostAttachment, opts => opts.Ignore())
					.ForMember(dest => dest.PostEditTime, opts => opts.Ignore())
					.ForMember(dest => dest.PostEditReason, opts => opts.Ignore())
					.ForMember(dest => dest.PostEditUser, opts => opts.Ignore())
					.ForMember(dest => dest.PostEditCount, opts => opts.Ignore())
					.ForMember(dest => dest.PostEditLocked, opts => opts.Ignore())
					.ReverseMap();

				cfg.CreateMap<ReadPostEntity, PostTableViewModel>()
					.ForMember(dest => dest.PostText, opts => opts.ResolveUsing<ReadPostEntityPostTextResolver>())
					.ForMember(dest => dest.PostWarning, opts => opts.Ignore())
					.ForMember(dest => dest.User, opts => opts.Ignore())
					.ForMember(dest => dest.EditUser, opts => opts.Ignore())
					.ReverseMap();

				cfg.CreateMap<UserForPostViewEntity, UserTableViewModelForPosts>()
					.ForMember(dest => dest.UserSignature, opts => opts.ResolveUsing<UserEntityUserSignatureResolver>())
					.ForMember(dest => dest.UserMedals, opts => opts.Ignore())
					.ReverseMap();

				cfg.CreateMap<UserIdentityEntity, IdentityUserModel>()
					.Include<UserIdentityEntity, AppMember>()
					.ForMember(dest => dest.UserSignature, opts => opts.ResolveUsing<UserIdentityEntityUserSignatureResolver>())
					.ReverseMap();

				cfg.CreateMap<UserIdentityEntity, AppMember>()
					.ReverseMap();

				cfg.CreateMap<IdentityUserModel, UserIdentityEntity>()
					.Include<AppMember, UserIdentityEntity>()
					.ReverseMap();

				cfg.CreateMap<AppMember, UserIdentityEntity>()
					.ReverseMap();

				cfg.CreateMap<AppMember, IdentityUserModel>()
					.ReverseMap();

				cfg.CreateMap<TopicTableViewModel, TopicsViewEntity>()
					.ForMember(dest => dest.ForumId, opts => opts.Ignore())
					.ForMember(dest => dest.TopicFirstPostShow, opts => opts.Ignore())
					.ForMember(dest => dest.PollsEnabled, opts => opts.Ignore())
					.ForMember(dest => dest.PollsOnly, opts => opts.Ignore())
					.ReverseMap()
					.ForMember(dest => dest.PagesCount, opts => opts.ResolveUsing<TopicEntityPagesCountResolver>());

				cfg.CreateMap<TopicInfoViewModel, TopicsViewEntity>()
					.ForMember(dest => dest.TopicStarterUsername, opts => opts.Ignore())
					.ForMember(dest => dest.TopicStarterUserId, opts => opts.Ignore())
					.ForMember(dest => dest.TopicStarterGroupColor, opts => opts.Ignore())
					.ForMember(dest => dest.TopicStartTime, opts => opts.Ignore())
					.ForMember(dest => dest.TopicViews, opts => opts.Ignore())
					.ForMember(dest => dest.LastPostTime, opts => opts.Ignore())
					.ForMember(dest => dest.LastPostUserId, opts => opts.Ignore())
					.ForMember(dest => dest.LastPostUsername, opts => opts.Ignore())
					.ForMember(dest => dest.LastPostGroupColor, opts => opts.Ignore())
					.ForMember(dest => dest.LastPostId, opts => opts.Ignore())
					.ReverseMap()
					.ForMember(dest => dest.PagesCount, opts => opts.ResolveUsing<TopicEntityPagesCountResolver>());

				cfg.CreateMap<ForumInfoViewModel, ForumsViewEntity>()
					.ForMember(dest => dest.ParentId, opts => opts.Ignore())
					.ForMember(dest => dest.Title, opts => opts.Ignore())
					.ForMember(dest => dest.Description, opts => opts.Ignore())
					.ForMember(dest => dest.DisplaySubForums, opts => opts.Ignore())
					.ForMember(dest => dest.DisplayOnIndex, opts => opts.Ignore())
					.ForMember(dest => dest.PostsCount, opts => opts.Ignore())
					.ForMember(dest => dest.LastPostTime, opts => opts.Ignore())
					.ForMember(dest => dest.UserId, opts => opts.Ignore())
					.ForMember(dest => dest.Username, opts => opts.Ignore())
					.ForMember(dest => dest.GroupColor, opts => opts.Ignore())
					.ForMember(dest => dest.LastTopicTitle, opts => opts.Ignore())
					.ForMember(dest => dest.LastTopicId, opts => opts.Ignore())
					.ForMember(dest => dest.ForumOrder, opts => opts.Ignore())
					.ReverseMap()
					.ForMember(dest => dest.PagesCount, opts => opts.ResolveUsing<ForumEntityPagesCountResolver>());
			});

			Mapper.Configuration.AssertConfigurationIsValid();
		}
	}
}