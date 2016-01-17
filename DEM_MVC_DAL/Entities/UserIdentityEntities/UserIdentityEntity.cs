using System;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities.UserIdentityEntities
{
    public class UserIdentityEntity
    {
        [Column(Name = "user_id")]
        public int Id { get; set; }

        [Column(Name = "username")]
        public string UserName { get; set; }

        [Column(Name = "user_email")]
        public string Email { get; set; }

        [Column(Name = "user_email_confirmed")]
        public bool EmailConfirmed { get; set; }

        [Column(Name = "password_hash")]
        public string PasswordHash { get; set; }

        [Column(Name = "security_stamp")]
        public string SecurityStamp { get; set; }

        [Column(Name = "phone_number")]
        public string PhoneNumber { get; set; }

        [Column(Name = "phone_number_confirmed")]
        public bool PhoneNumberConfirmed { get; set; }

        [Column(Name = "two_factor_enabled")]
        public bool TwoFactorEnabled { get; set; }

        [Column(Name = "lockout_end_date_utc")]
        public DateTime? LockoutEndDateUtc { get; set; }

        [Column(Name = "lockout_enable")]
        public bool LockoutEnabled { get; set; }

        [Column(Name = "access_failed_count")]
        public int AccessFailedCount { get; set; }

        [Column(Name = "user_type")]
        public int UserType { get; set; }

        [Column(Name = "user_ip")]
        public string UserIp { get; set; }

        [Column(Name = "user_browser")]
        public string UserBrowser { get; set; }

        [Column(Name = "user_regdate")]
        public DateTime? UserRegDate { get; set; }

        [Column(Name = "user_birthday")]
        public DateTime? UserBirthday { get; set; }

        [Column(Name = "user_gender")]
        public int UserGender { get; set; }
        //    public UserGender UserGender { get; set; }

        [Column(Name = "user_lastvisit")]
        public DateTime? UserLastVisit { get; set; }

        [Column(Name = "user_lastmark")]
        public DateTime? UserLastMark { get; set; }

        [Column(Name = "user_lastpage")]
        public string UserLastPage { get; set; }

        [Column(Name = "user_inactive_reason")]
        public int UserInactiveReason { get; set; }

        [Column(Name = "user_inactive_time")]
        public DateTime? UserInactiveTime { get; set; }

        [Column(Name = "user_lang")]
        public string UserLang { get; set; }

        [Column(Name = "user_timezone")]
        public decimal UserTimeZone { get; set; }

        [Column(Name = "user_dateformat")]
        public string UserDateFormat { get; set; }

        [Column(Name = "user_rank")]
        public int UserRank { get; set; }

        [Column(Name = "user_notify")]
        public bool UserNotify { get; set; }

        [Column(Name = "user_notify_pm")]
        public bool UserNotifyPm { get; set; }

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

        [Column(Name = "user_icq")]
        public string UserIcq { get; set; }

        [Column(Name = "user_vk")]
        public string UserVk { get; set; }

        [Column(Name = "user_fb")]
        public string UserFb { get; set; }

        [Column(Name = "user_website")]
        public string UserWebSite { get; set; }

        [Column(Name = "user_profession")]
        public string UserProfession { get; set; }

        [Column(Name = "user_interests")]
        public string UserInterests { get; set; }
    }
}