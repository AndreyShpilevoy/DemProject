using DEM_MVC_BL.Models.IdentityGroupModels;
using Microsoft.AspNet.Identity;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IGroupIdentityService<TRole> : IQueryableRoleStore<TRole, int> 
        where TRole : IdentityGroupModel
    {
    }
}