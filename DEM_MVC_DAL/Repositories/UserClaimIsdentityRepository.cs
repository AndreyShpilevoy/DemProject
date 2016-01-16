using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Dapper;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class UserClaimIsdentityRepository : IUserClaimsIdentityRepository
    {
        public ClaimsIdentity FindByUserId(int userId, IConnectionFactory connectionFactory)
        {
            ClaimsIdentity claims = new ClaimsIdentity();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    List<ClaimIdentityEntity> claimIdentityEntities = connection.Query<ClaimIdentityEntity>(SqlCommandStorageService.UserClaimIsdentityRepositoryFindByUserId(), new { userId }).ToList();
                    foreach (var claimIdentityEntity in claimIdentityEntities)
                    {
                        claims.AddClaim(new Claim(claimIdentityEntity.ClaimType, claimIdentityEntity.ClaimValue));
                    }
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserClaimIsdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return claims;
        }

        public void Delete(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserClaimIsdentityRepositoryDeleteById(), new { userId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserClaimIsdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }

        public void Delete(UserIdentityEntity user, Claim claim, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserClaimIsdentityRepositoryDelete(), new { userId = user.Id, claimValue = claim.Value, claimType = claim.Type });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserClaimIsdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }

        public void Insert(Claim userClaim, int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserClaimIsdentityRepositoryInsert(), new { claimValue = userClaim.Value, claimType = userClaim.Type, userId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserClaimIsdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }
    }
}