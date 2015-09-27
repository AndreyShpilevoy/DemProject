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

    public class UserAccountModel
    {
        public int UserId { get; set; }
        public int UserType { get; set; }
        public int GroupId { get; set; }
        public string UserIp { get; set; }
        public string UserBrowser { get; set; }
        public DateTime UserRegDate { get; set; }
        public string UserName { get; set; }
        public string UserNameClean { get; set; }
        public string UserPassword { get; set; }
        public DateTime UserPasswordChangeDate { get; set; }
        public string UserEmail { get; set; }
        public string UserEmailHash { get; set; }
        public DateTime UserBirthday { get; set; }
        public UserGender UserGender { get; set; }
        public DateTime UserLastVisit { get; set; }
        public DateTime UserLastMark { get; set; }
        public string UserLastPage { get; set; }
        public int UserInactiveReason { get; set; }
        public int UserLoginAttempts { get; set; }
        public DateTime UserInactiveTime { get; set; }
        public string UserLang { get; set; }
        public decimal UserTimeZone { get; set; }
        public string UserDateFormat { get; set; }
        public int UserRank { get; set; }
        public bool UserNotify { get; set; }
        public bool UserNotifyPm { get; set; }
        public string UserAvatar { get; set; }
        public string UserSignature { get; set; }
        public string UserFrom { get; set; }
        public string UserSteam { get; set; }
        public string UserSkype { get; set; }
        public string UserIcq { get; set; }
        public string UserVk { get; set; }
        public string UserFb { get; set; }
        public string UserWebSite { get; set; }
        public string UserProfession { get; set; }
        public string UserInterests { get; set; }
        public string UserActKey { get; set; }
        public string UserNewPassword { get; set; }
        public string UserFormSalt { get; set; }

    }
}
