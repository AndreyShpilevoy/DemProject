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

namespace DEM_MVC_BL.Services
{
    public class GroupIdentityService<TGroup> : IGroupIdentityService<TGroup>
        where TGroup : IdentityGroup
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IGroupIdentityRepository _groupIdentityRepository;

        public GroupIdentityService(IConnectionFactory connectionFactory,
            IGroupIdentityRepository groupIdentityRepository)
        {
            _connectionFactory = connectionFactory;
            _groupIdentityRepository = groupIdentityRepository;
        }

        public IQueryable<TGroup> Roles
        {
            get
            {
                try
                {
                    throw new NotImplementedException();
                }
                catch (Exception exception)
                {
                    DemLogger.Current.Error(exception, $"{nameof(GroupIdentityService<TGroup>)}. Error in property {DemLogger.GetCallerInfo()}");
                    throw;
                }
            }
        }

        public Task CreateAsync(TGroup group)
        {
            try
            {
                if (group == null)
                {
                    throw new ArgumentNullException(nameof(group));
                }

                var groupEntity = Mapper.Map<IdentityGroup, GroupIdentityEntity>(group);
                _groupIdentityRepository.Insert(groupEntity, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(GroupIdentityService<TGroup>)}. Error in function {DemLogger.GetCallerInfo()}");
            }

            return Task.FromResult<object>(null);

        }

        public Task UpdateAsync(TGroup group)
        {
            try
            {
                if (group == null)
                {
                    throw new ArgumentNullException(nameof(group));
                }

                var groupEntity = Mapper.Map<IdentityGroup, GroupIdentityEntity>(group);
                _groupIdentityRepository.Update(groupEntity, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(GroupIdentityService<TGroup>)}. Error in function {DemLogger.GetCallerInfo()}");
            }

            return Task.FromResult<Object>(null);
        }

        public Task DeleteAsync(TGroup group)
        {
            try
            {
                if (group == null)
                {
                    throw new ArgumentNullException(nameof(group));
                }

                _groupIdentityRepository.Delete(group.Id, _connectionFactory);

            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(GroupIdentityService<TGroup>)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return Task.FromResult<Object>(null);
        }

        public Task<TGroup> FindByIdAsync(int groupId)
        {
            try
            {
                var groupEntity = _groupIdentityRepository.GetGroupById(groupId, _connectionFactory);
                TGroup result = Mapper.Map<GroupIdentityEntity, IdentityGroup>(groupEntity) as TGroup;

                return Task.FromResult<TGroup>(result);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(GroupIdentityService<TGroup>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<TGroup>(null);
            }
        }

        public Task<TGroup> FindByNameAsync(string groupName)
        {
            try
            {
                var groupEntity = _groupIdentityRepository.GetGroupByName(groupName, _connectionFactory);
                TGroup result = Mapper.Map<GroupIdentityEntity, IdentityGroup>(groupEntity) as TGroup;

                return Task.FromResult<TGroup>(result);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(GroupIdentityService<TGroup>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<TGroup>(null);
            }
        }

        public void Dispose()
        {
        }
    }
}