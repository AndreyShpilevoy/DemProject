using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DEM_MVC_BL.Models;
using Microsoft.AspNet.Identity;

namespace DEM_MVC_BL.Interfaces.IServices
{
    public interface IUserAccountDataLoadWriteService : IUserStore<User>, IUserLoginStore<User>, IUserPasswordStore<User>, IUserSecurityStampStore<User>
    {
    }
}