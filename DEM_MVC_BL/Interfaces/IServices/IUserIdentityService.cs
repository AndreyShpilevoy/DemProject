using DEM_MVC_BL.Models.IdentityModels;
using Microsoft.AspNet.Identity;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IUserIdentityService<TUser> : IUserLoginStore<TUser, int>,
        IUserClaimStore<TUser, int>,
        IUserRoleStore<TUser, int>,
        IUserPasswordStore<TUser, int>,
        IUserSecurityStampStore<TUser, int>,
        IQueryableUserStore<TUser, int>,
        IUserEmailStore<TUser, int>,
        IUserPhoneNumberStore<TUser, int>,
        IUserTwoFactorStore<TUser, int>,
        IUserLockoutStore<TUser, int>,
        IUserStore<TUser, int>
        where TUser : IdentityUser
    {
    }
}