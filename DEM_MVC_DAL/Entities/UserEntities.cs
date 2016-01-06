using System;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities
{
    public class UserEntity
    {
        [Column(Name = "user_id")]
        public int UserId { get; set; }

        [Column(Name = "username")]
        public string UserName { get; set; }

        [Column(Name = "user_birthday")]
        public DateTime UserBirthday { get; set; }

        [Column(Name = "user_avatar")]
        public string UserAvatar { get; set; }

        [Column(Name = "user_signature")]
        public string UserSignature { get; set; }

        [Column(Name = "user_from")]
        public string UserFrom { get; set; }

        [Column(Name = "user_steam")]
        public string UserSteam { get; set; }

        [Column(Name = "user_skype")]
        public string UserSkype { get; set; }

        [Column(Name = "user_vk")]
        public string UserVk { get; set; }

        [Column(Name = "user_fb")]
        public string UserFb { get; set; }

        [Column(Name = "user_website")]
        public string UserWebSite { get; set; }

        [Column(Name = "unique_rank_title")]
        public string UserUniqueRank { get; set; }

        [Column(Name = "common_rank_title")]
        public string UserCommonRank { get; set; }

        [Column(Name = "user_posts_count")]
        public int UserPostsCount { get; set; }

        [Column(Name = "group_colour")]
        public string GroupColor { get; set; }

        [Column(Name = "group_avatar_url")]
        public string GroupAvatar { get; set; }
    }
}