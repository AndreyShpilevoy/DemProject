using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DEM_MVC_BL.Services.ModelsHelpers;

namespace DEM_MVC_BL.Models
{
    public class UserTableViewModelForPosts
    {
        private string _userSignature;
        public int UserId { get; set; }
        public string UserName { get; set; }
        public DateTime UserBirthday { get; set; }
        public string UserAvatar { get; set; }

        public string UserSignature
        {
            get { return _userSignature; }
            set { _userSignature = BbCodeHelper.BbCodeReplacerToHtml(value); }
        }

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
