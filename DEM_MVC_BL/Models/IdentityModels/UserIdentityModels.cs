using System;
using DEM_MVC_BL.Services.ModelsHelpers;
using Microsoft.AspNet.Identity;

namespace DEM_MVC_BL.Models.IdentityModels
{
    //public class UserAccountModel
    //{
    //    public int UserId { get; set; }
    //    public int UserType { get; set; }
    //    public int GroupId { get; set; }
    //    public string UserIp { get; set; }
    //    public string UserBrowser { get; set; }
    //    public DateTime UserRegDate { get; set; }
    //    public string UserName { get; set; }
    //    public string UserNameClean { get; set; }
    //    public string UserPassword { get; set; }
    //    public DateTime UserPasswordChangeDate { get; set; }
    //    public string UserEmail { get; set; }
    //    public string UserEmailHash { get; set; }
    //    public DateTime UserBirthday { get; set; }
    //    public UserGender UserGender { get; set; }
    //    public DateTime UserLastVisit { get; set; }
    //    public DateTime UserLastMark { get; set; }
    //    public string UserLastPage { get; set; }
    //    public int UserInactiveReason { get; set; }
    //    public int UserLoginAttempts { get; set; }
    //    public DateTime UserInactiveTime { get; set; }
    //    public string UserLang { get; set; }
    //    public decimal UserTimeZone { get; set; }
    //    public string UserDateFormat { get; set; }
    //    public int UserRank { get; set; }
    //    public bool UserNotify { get; set; }
    //    public bool UserNotifyPm { get; set; }
    //    public string UserAvatar { get; set; }
    //    public string UserSignature { get; set; }
    //    public string UserFrom { get; set; }
    //    public string UserSteam { get; set; }
    //    public string UserSkype { get; set; }
    //    public string UserIcq { get; set; }
    //    public string UserVk { get; set; }
    //    public string UserFb { get; set; }
    //    public string UserWebSite { get; set; }
    //    public string UserProfession { get; set; }
    //    public string UserInterests { get; set; }
    //    public string UserActKey { get; set; }
    //    public string UserNewPassword { get; set; }
    //    public string UserFormSalt { get; set; }

    //}


    public class IdentityUser : IUser<int>
    {
        private string _userSignature;
        public IdentityUser()
        {
            //  Id = Guid.NewGuid().ToString();
        }

        public IdentityUser(string userName)
            : this()
        {
            UserName = userName;
        }

        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public bool EmailConfirmed { get; set; }

        public string PasswordHash { get; set; }

        public string SecurityStamp { get; set; }

        public string PhoneNumber { get; set; }

        public bool PhoneNumberConfirmed { get; set; }

        public bool TwoFactorEnabled { get; set; }

        public DateTime? LockoutEndDateUtc { get; set; }

        public bool LockoutEnabled { get; set; }

        public int AccessFailedCount { get; set; }

        public int UserType { get; set; }

        public string UserIp { get; set; }

        public string UserBrowser { get; set; }

        public DateTime? UserRegDate { get; set; }

        public DateTime? UserBirthday { get; set; }

        public int UserGender { get; set; }
        //    public UserGender UserGender { get; set; }

        public DateTime? UserLastVisit { get; set; }

        public DateTime? UserLastMark { get; set; }

        public string UserLastPage { get; set; }

        public int UserInactiveReason { get; set; }

        public DateTime? UserInactiveTime { get; set; }

        public string UserLang { get; set; }

        public decimal UserTimeZone { get; set; }

        public string UserDateFormat { get; set; }

        public int UserRank { get; set; }

        public bool UserNotify { get; set; }

        public bool UserNotifyPm { get; set; }

        public string UserAvatar { get; set; }

        public string UserSignature
        {
            get { return _userSignature; }
            set { _userSignature = BbCodeHelper.BbCodeReplacerToHtml(value); }
        }

        public string UserFrom { get; set; }

        public string UserSteam { get; set; }

        public string UserSkype { get; set; }

        public string UserIcq { get; set; }

        public string UserVk { get; set; }

        public string UserFb { get; set; }

        public string UserWebSite { get; set; }

        public string UserProfession { get; set; }

        public string UserInterests { get; set; }
    }
}