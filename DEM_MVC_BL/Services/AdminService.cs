using System;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.ForumModels;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_BL.Services
{
    public class AdminService : IAdminService
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IAdminRepository _adminRepository;

        public AdminService(IAdminRepository adminRepository,
            IConnectionFactory connectionFactory)
        {
            _adminRepository = adminRepository;
            _connectionFactory = connectionFactory;
        }

        public bool DeletePost(int postId)
        {
            try
            {
                return _adminRepository.DeletePost(postId, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "AdminService. Error in function DeletePost");
                return false;
            }
        }

        public bool BanUser(int userId)
        {
            try
            {
                return _adminRepository.BanUser(userId, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "AdminService. Error in function BanUser");
                return false;
            }
        }

        public bool UnbanUser(int userId)
        {
            try
            {
                return _adminRepository.UnbanUser(userId, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, "AdminService. Error in function UnbanUser");
                return false;
            }
        }
    }
}