using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.IdentityModels;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using NLog.Internal;

namespace DEM_MVC_BL.Services
{
    public class GroupIdentityService<TRole> : IGroupIdentityService<TRole>
        where TRole : IdentityRole
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IGroupIdentityRepository _groupIdentityRepository;

        public GroupIdentityService(IConnectionFactory connectionFactory,
            IGroupIdentityRepository groupIdentityRepository)
        {
            _connectionFactory = connectionFactory;
            _groupIdentityRepository = groupIdentityRepository;
        }

        public IQueryable<TRole> Roles
        {
            get
            {
                try
                {
                    throw new NotImplementedException();
                }
                catch (Exception exception)
                {
                    DemLogger.Current.Error(exception, "GroupIdentityService. Error in property Roles");
                    throw;
                }
            }
        }

        public Task CreateAsync(TRole role)
        {
            try
            {
                if (role == null)
                {
                    throw new ArgumentNullException(nameof(role));
                }

                var roleEntity = Mapper.Map<IdentityRole, GroupIdentityEntity>(role);
                _groupIdentityRepository.Insert(roleEntity, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityService. Error in function CreateAsync");
            }

            return Task.FromResult<object>(null);

        }

        public Task UpdateAsync(TRole role)
        {
            try
            {
                if (role == null)
                {
                    throw new ArgumentNullException(nameof(role));
                }

                var roleEntity = Mapper.Map<IdentityRole, GroupIdentityEntity>(role);
                _groupIdentityRepository.Update(roleEntity, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityService. Error in function UpdateAsync");
            }

            return Task.FromResult<Object>(null);
        }

        public Task DeleteAsync(TRole role)
        {
            try
            {
                if (role == null)
                {
                    throw new ArgumentNullException(nameof(role));
                }

                _groupIdentityRepository.Delete(role.Id, _connectionFactory);

            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityService. Error in function DeleteAsync");
            }
            return Task.FromResult<Object>(null);
        }

        public Task<TRole> FindByIdAsync(int roleId)
        {
            try
            {
                var roleEntity = _groupIdentityRepository.GetRoleById(roleId, _connectionFactory);
                TRole result = Mapper.Map<GroupIdentityEntity, IdentityRole>(roleEntity) as TRole;

                return Task.FromResult<TRole>(result);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityService. Error in function FindByIdAsync");
                return null;
            }
        }

        public Task<TRole> FindByNameAsync(string roleName)
        {
            try
            {
                var roleEntity = _groupIdentityRepository.GetRoleByName(roleName, _connectionFactory);
                TRole result = Mapper.Map<GroupIdentityEntity, IdentityRole>(roleEntity) as TRole;

                return Task.FromResult<TRole>(result);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "GroupIdentityService. Error in function FindByNameAsync");
                return null;
            }
        }

        public void Dispose()
        {
        }
    }
}