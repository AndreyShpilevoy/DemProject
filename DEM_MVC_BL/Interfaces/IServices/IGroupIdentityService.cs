using DEM_MVC_BL.Models.IdentityModels;
using Microsoft.AspNet.Identity;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IGroupIdentityService<TRole> : IQueryableRoleStore<TRole, int> 
        where TRole : IdentityRole
    {
    }
}