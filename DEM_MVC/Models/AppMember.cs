using System.Security.Claims;
using System.Threading.Tasks;
using DEM_MVC_BL.Models.IdentityUserModels;
using Microsoft.AspNet.Identity;

namespace DEM_MVC.Models
{
    public class AppMember : IdentityUserModel
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<AppMember,int> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom AppMember claims here
            return userIdentity;
        }
    }
}