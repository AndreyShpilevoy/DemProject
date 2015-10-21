using System;
using Microsoft.AspNet.Identity;
using System.ComponentModel.DataAnnotations;

namespace DEM_MVC_BL.Models
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

    public class User : IUser
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }

        public int UserId
        {
            get { return Int32.Parse(Id); }
            set { Id = value.ToString(); }
        }

    }

    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }
    }

    public class ManageUserViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}