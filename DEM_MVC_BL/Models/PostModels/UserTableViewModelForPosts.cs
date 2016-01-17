using System;
using System.Collections.Generic;
using DEM_MVC_BL.Models.MedalModels;

namespace DEM_MVC_BL.Models.PostModels
{
    public class UserTableViewModelForPosts
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public DateTime UserBirthday { get; set; }
        public string UserAvatar { get; set; }
        public string UserSignature { get; set; }
        public string UserFrom { get; set; }
        public string UserSteam { get; set; }
        public string UserSkype { get; set; }
        public string UserVk { get; set; }
        public string UserFb { get; set; }
        public string UserWebSite { get; set; }

        public string UserUniqueRank { get; set; }
        public string UserCommonRank { get; set; }
        public int UserPostsCount { get; set; }

        public string GroupColor { get; set; }
        public string GroupAvatar { get; set; }

        public List<MedalTableViewModelForPosts> UserMedals { get; set; }

        public UserTableViewModelForPosts()
        {
            UserMedals = new List<MedalTableViewModelForPosts>();
        }
    }

}
