using System;
using DEM_MVC_DAL.Services;

namespace DEM_MVC_DAL.Entities
{
    public class UserIdentityEntity
    {
        [Column(Name = "user_id")]
        public int Id { get; set; }

        [Column(Name = "username")]
        public string UserName { get; set; }

        [Column(Name = "user_email")]
        public string Email { get; set; }

        [Column(Name = "")]//todo Create new DB column and change mapping
        public bool EmailConfirmed { get; set; }

        [Column(Name = "user_password")]
        public string PasswordHash { get; set; }

        [Column(Name = "")]//todo Create new DB column and change mapping
        public string SecurityStamp { get; set; }

        [Column(Name = "")]//todo Create new DB column and change mapping
        public string PhoneNumber { get; set; }

        [Column(Name = "")]//todo Create new DB column and change mapping
        public bool PhoneNumberConfirmed { get; set; }

        [Column(Name = "")]//todo Create new DB column and change mapping
        public bool TwoFactorEnabled { get; set; }

        [Column(Name = "")]//todo Create new DB column and change mapping
        public DateTime? LockoutEndDateUtc { get; set; }

        [Column(Name = "")]//todo Create new DB column and change mapping
        public bool LockoutEnabled { get; set; }

        [Column(Name = "")]//todo Create new DB column and change mapping
        public int AccessFailedCount { get; set; }
    }
}