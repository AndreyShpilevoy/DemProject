﻿using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using DEM_MVC_DAL.Entities.UserIdentityEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Services;
using DEM_MVC_Infrastructure.Models;

namespace DEM_MVC_DAL.Repositories
{
    public class UserIdentityRepository : IUserIdentityRepository
    {
        public string GetUserName(int userId, IConnectionFactory connectionFactory)
        {
            string userName = String.Empty;
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    userName = connection.ExecuteScalar<string>(SqlCommandStorageService.UserIdentityRepositoryGetUserName(), new { userId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return userName;
        }

        public int GetUserId(string userName, IConnectionFactory connectionFactory)
        {
            int userId = 0;
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    userId = connection.ExecuteScalar<int>(SqlCommandStorageService.UserIdentityRepositoryGetUserId(), new { userName });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return userId;
        }

        public UserIdentityEntity GetUserById(int userId, IConnectionFactory connectionFactory)
        {
            UserIdentityEntity userIdentityEntity = new UserIdentityEntity();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    userIdentityEntity = connection.Query<UserIdentityEntity>(SqlCommandStorageService.UserIdentityRepositoryGetUserById(), new { userId }).FirstOrDefault();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return userIdentityEntity;
        }

        public List<UserIdentityEntity> GetUserByName(string userName, IConnectionFactory connectionFactory)
        {
            List<UserIdentityEntity> userIdentityEntities = new List<UserIdentityEntity>();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    userIdentityEntities = connection.Query<UserIdentityEntity>(SqlCommandStorageService.UserIdentityRepositoryGetUserByName(), new { userName }).ToList();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return userIdentityEntities;
        }

        public UserIdentityEntity GetUserByEmail(string email, IConnectionFactory connectionFactory)
        {
            UserIdentityEntity userIdentityEntity = new UserIdentityEntity();
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    userIdentityEntity = connection.Query<UserIdentityEntity>(SqlCommandStorageService.UserIdentityRepositoryGetUserByEmail(), new { email }).FirstOrDefault();
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return userIdentityEntity;
        }

        public string GetPasswordHash(int userId, IConnectionFactory connectionFactory)
        {
            string passwordHash = String.Empty;
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    passwordHash = connection.ExecuteScalar<string>(SqlCommandStorageService.UserIdentityRepositoryGetPasswordHash(), new { userId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return passwordHash;
        }

        public void SetPasswordHash(int userId, string passwordHash, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserIdentityRepositorySetPasswordHash(), new { passwordHash, userId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }

        public string GetSecurityStamp(int userId, IConnectionFactory connectionFactory)
        {
            string securityStamp = String.Empty;
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    securityStamp = connection.ExecuteScalar<string>(SqlCommandStorageService.UserIdentityRepositoryGetSecurityStamp(), new { userId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return securityStamp;
        }

        public int Insert(UserIdentityEntity user, IConnectionFactory connectionFactory)
        {
            var id = 0;
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    id = connection.ExecuteScalar<int>(SqlCommandStorageService.UserIdentityRepositoryInsert(),
                        new
                        {
                            userType = user.UserType,
                            userIp = user.UserIp,
                            userBrowser = user.UserBrowser,
                            userRegdate = user.UserRegDate,
                            userEmail = user.Email,
                            userEmailConfirmed = user.EmailConfirmed,
                            passwordHash = user.PasswordHash,
                            securityStamp = user.SecurityStamp,
                            phoneNumber = user.PhoneNumber,
                            phoneNumberConfirmed = user.PhoneNumberConfirmed,
                            twoFactorEnabled = user.TwoFactorEnabled,
                            lockoutEndDateUtc = user.LockoutEndDateUtc,
                            lockoutEnable = user.LockoutEnabled,
                            accessFailedCount = user.AccessFailedCount,
                            userName = user.UserName,
                            userBirthday = user.UserBirthday,
                            userGender = user.UserGender,
                            userLastVisit = user.UserLastVisit,
                            userLastMark = user.UserLastMark,
                            userLastPage = user.UserLastPage,
                            userInactiveReason = user.UserInactiveReason,
                            userInactiveTime = user.UserInactiveTime,
                            userLang = user.UserLang,
                            userTimeZone = user.UserTimeZone,
                            userDateFormat = user.UserDateFormat,
                            userRank = user.UserRank,
                            userNotify = user.UserNotify,
                            userNotify_pm = user.UserNotifyPm,
                            userAvatar = user.UserAvatar,
                            userSignature = user.UserSignature,
                            userFrom = user.UserFrom,
                            userSteam = user.UserSteam,
                            userSkype = user.UserSkype,
                            userIcq = user.UserIcq,
                            userVk = user.UserVk,
                            userFb = user.UserFb,
                            userWebsite = user.UserWebSite,
                            userProfession = user.UserProfession,
                            userInterests = user.UserInterests
                        });

                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
            return id;
        }

        public void Delete(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserIdentityRepositoryDeleteById(), new { userId });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }

        public void Delete(UserIdentityEntity user, IConnectionFactory connectionFactory)
        {
            try
            {
                Delete(user.Id, connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }

        public void Update(UserIdentityEntity user, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    connection.Execute(SqlCommandStorageService.UserIdentityRepositoryUpdate(),
                        new
                        {
                            userId = user.Id,
                            userType = user.UserType,
                            userIp = user.UserIp,
                            userBrowser = user.UserBrowser,
                            userRegdate = user.UserRegDate,
                            userEmail = user.Email,
                            userEmailConfirmed = user.EmailConfirmed,
                            passwordHash = user.PasswordHash,
                            securityStamp = user.SecurityStamp,
                            phoneNumber = user.PhoneNumber,
                            phoneNumberConfirmed = user.PhoneNumberConfirmed,
                            twoFactorEnabled = user.TwoFactorEnabled,
                            lockoutEndDateUtc = user.LockoutEndDateUtc,
                            lockoutEnable = user.LockoutEnabled,
                            accessFailedCount = user.AccessFailedCount,
                            userName = user.UserName,
                            userBirthday = user.UserBirthday,
                            userGender = user.UserGender,
                            userLastVisit = user.UserLastVisit,
                            userLastMark = user.UserLastMark,
                            userLastPage = user.UserLastPage,
                            userInactiveReason = user.UserInactiveReason,
                            userInactiveTime = user.UserInactiveTime,
                            userLang = user.UserLang,
                            userTimeZone = user.UserTimeZone,
                            userDateFormat = user.UserDateFormat,
                            userRank = user.UserRank,
                            userNotify = user.UserNotify,
                            userNotify_pm = user.UserNotifyPm,
                            userAvatar = user.UserAvatar,
                            userSignature = user.UserSignature,
                            userFrom = user.UserFrom,
                            userSteam = user.UserSteam,
                            userSkype = user.UserSkype,
                            userIcq = user.UserIcq,
                            userVk = user.UserVk,
                            userFb = user.UserFb,
                            userWebsite = user.UserWebSite,
                            userProfession = user.UserProfession,
                            userInterests = user.UserInterests
                        });
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
            }
        }

        public bool BanUser(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    var validator = connection.ExecuteScalar<int>(SqlCommandStorageService.CheckIsUserBanned(), new { userId });

                    if (validator != 0)
                        return false;

                    connection.Execute(SqlCommandStorageService.BanUser(), new { userId });
                    validator = connection.ExecuteScalar<int>(SqlCommandStorageService.CheckIsUserBanned(), new { userId });
                    return validator != 0;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }

        public bool UnbanUser(int userId, IConnectionFactory connectionFactory)
        {
            try
            {
                using (var connection = connectionFactory.Create())
                {
                    var validator = connection.ExecuteScalar<int>(SqlCommandStorageService.CheckIsUserBanned(), new { userId });

                    if (validator == 0)
                        return false;

                    connection.Execute(SqlCommandStorageService.UnbanUser(), new { userId });
                    validator = connection.ExecuteScalar<int>(SqlCommandStorageService.CheckIsUserBanned(), new { userId });
                    return validator == 0;
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityRepository)}. Error in function {DemLogger.GetCallerInfo()}");
                return false;
            }
        }
    }
}