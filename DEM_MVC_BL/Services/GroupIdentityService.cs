using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Models.IdentityModels;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;
using NLog.Internal;

namespace DEM_MVC_BL.Services
{
    public class GroupIdentityService<TRole> : IGroupIdentityService<TRole> where TRole : IdentityRole
    {
        public IQueryable<TRole> Roles { get; }

        public Task CreateAsync(TRole role)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(TRole role)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(TRole role)
        {
            throw new NotImplementedException();
        }

        public Task<TRole> FindByIdAsync(int roleId)
        {
            throw new NotImplementedException();
        }

        public Task<TRole> FindByNameAsync(string roleName)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}