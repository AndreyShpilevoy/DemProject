using System;
using AutoMapper;
using DEM_MVC.Models;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_BL.Models.IdentityModels;
using DEM_MVC_BL.Models.PermissionModels;
using DEM_MVC_DAL.Entities;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Services
{
    public static class AutoMapperMapperRegistrationService
    {
        public static void Initial()
        {
            Mapper.CreateMap<ForumEntity, ForumTableViewModel>().ReverseMap();
            Mapper.CreateMap<ForumEntity, ForumInfoViewModel>().ReverseMap();
            Mapper.CreateMap<BbCodeEntity, BbCodeModel>().ReverseMap();
            Mapper.CreateMap<ConfigEntity, ConfigModel>().ReverseMap();
            Mapper.CreateMap<TopicEntity, TopicTableViewModel>().ReverseMap();
            Mapper.CreateMap<TopicEntity, TopicInfoViewModel>().ReverseMap();
            Mapper.CreateMap<PollEntity, PollViewModel>().ReverseMap();
            Mapper.CreateMap<PollOptionEntity, PollOptionViewModel>().ReverseMap();
            Mapper.CreateMap<PostEntity, PostTableViewModel>().ReverseMap();
            Mapper.CreateMap<UserEntity, UserTableViewModelForPosts>().ReverseMap();
            Mapper.CreateMap<UserIdentityEntity, IdentityUser>().Include<UserIdentityEntity, AppMember>().ReverseMap();
            Mapper.CreateMap<AppMember, IdentityUser>().ReverseMap();
            Mapper.CreateMap<GroupIdentityEntity, IdentityGroup>().ReverseMap();
            Mapper.CreateMap<UserLoginInfoIdentityEntity, UserLoginInfo>().ReverseMap();
            Mapper.CreateMap<PermissionEntity, PermissionModel>().ReverseMap();
            Mapper.CreateMap<IdentityPermissionModel, IdentityPermissionEntity>().ReverseMap();
            Mapper.CreateMap<NewPostViewModel, NewPostModel>().ReverseMap();
            Mapper.CreateMap<NewPostModel, NewPostEntity>().ReverseMap();
        }
    }
}