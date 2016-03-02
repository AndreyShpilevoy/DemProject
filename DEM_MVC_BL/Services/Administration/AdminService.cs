using System;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.Administration;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services.Administration
{
    public class AdminService : IAdminService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IPostRepository _postRepository;
        private readonly IUserIdentityRepository _userIdentityRepository;

        public AdminService(IPostRepository postRepository,
            IConnectionFactory connectionFactory,
            IUserIdentityRepository userIdentityRepository)
        {
            _postRepository = postRepository;
            _connectionFactory = connectionFactory;
            _userIdentityRepository = userIdentityRepository;
        }

        public bool DeletePost(int postId)
        {
            try
            {
                return _postRepository.DeletePost(postId, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(AdminService)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }

        public bool BanUser(int userId)
        {
            try
            {
                return _userIdentityRepository.BanUser(userId, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(AdminService)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }

        public bool UnbanUser(int userId)
        {
            try
            {
                return _userIdentityRepository.UnbanUser(userId, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(AdminService)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }
    }
}