using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.IdentityModels;
using DEM_MVC_DAL.Entities.UserIdentityEntities;
using DEM_MVC_DAL.Entities.UserLoginInfoIdentityEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using Microsoft.AspNet.Identity;

namespace DEM_MVC_BL.Services
{
    public class UserIdentityService<TUser> : IUserIdentityService<TUser>
        where TUser : IdentityUser
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IUserIdentityRepository _userIdentityRepository;
        private readonly IUserGroupsIdentityRepository _userGroupsIdentityRepository;
        private readonly IUserClaimsIdentityRepository _userClaimsIdentityRepository;
        private readonly IUserExternalLoginsIdentityRepository _userLoginsIdentityRepository;
        private readonly IGroupIdentityRepository _groupIdentityRepository;

        public UserIdentityService(IConnectionFactory connectionFactory,
            IUserIdentityRepository userIdentityRepository,
            IUserGroupsIdentityRepository userGroupsIdentityRepository,
            IUserClaimsIdentityRepository userClaimsIdentityRepository,
            IUserExternalLoginsIdentityRepository userLoginsIdentityRepository,
            IGroupIdentityRepository groupIdentityRepository)
        {
            _connectionFactory = connectionFactory;
            _userIdentityRepository = userIdentityRepository;
            _userGroupsIdentityRepository = userGroupsIdentityRepository;
            _userClaimsIdentityRepository = userClaimsIdentityRepository;
            _userLoginsIdentityRepository = userLoginsIdentityRepository;
            _groupIdentityRepository = groupIdentityRepository;
        }

        public IQueryable<TUser> Users
        {
            get
            {
                try
                {
                    throw new NotImplementedException();
                }
                catch (Exception exception)
                {
                    DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in property {DemLogger.GetCallerInfo()}");
                    throw;
                }
            }
        }


        public Task CreateAsync(TUser user)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                user.UserRegDate = DateTime.Now;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                var id = _userIdentityRepository.Insert(userEntity, _connectionFactory);
                user.Id = id;
                if (id != 0)
                {
                    AddToRoleAsync(user, "REGISTERED");
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<object>(null);
            }
            return Task.FromResult<object>(null);
        }

        public Task<TUser> FindByIdAsync(int userId)
        {
            try
            {
                //if (string.IsNullOrEmpty(userId))
                //{
                //    throw new ArgumentException("Null or empty argument: userId");
                //}

                var userEntity = _userIdentityRepository.GetUserById(userId, _connectionFactory);
                var identityUser = Mapper.Map<UserIdentityEntity, IdentityUser>(userEntity);

                if (identityUser != null)
                {
                    TUser result = Mapper.Map<IdentityUser, TUser>(identityUser);
                    return Task.FromResult<TUser>(result);
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<TUser>(null);
            }
            return Task.FromResult<TUser>(null);
        }

        public Task<TUser> FindByNameAsync(string userName)
        {
            try
            {
                if (string.IsNullOrEmpty(userName))
                {
                    throw new ArgumentException("Null or empty argument: userName");
                }

                var userEntities = _userIdentityRepository.GetUserByName(userName, _connectionFactory);
                var identityUsers = Mapper.Map<List<UserIdentityEntity>, List<IdentityUser>>(userEntities);

                // Should I throw if > 1 user?
                if (identityUsers != null && identityUsers.Count == 1)
                {
                    TUser result = Mapper.Map<IdentityUser, TUser>(identityUsers[0]);
                    return Task.FromResult<TUser>(result);
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<TUser>(null);
            }

            return Task.FromResult<TUser>(null);
        }

        public Task UpdateAsync(TUser user)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<object>(null);
            }

            return Task.FromResult<object>(null);
        }

        public Task AddClaimAsync(TUser user, Claim claim)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                if (claim == null)
                {
                    throw new ArgumentNullException(nameof(claim));
                }

                _userClaimsIdentityRepository.Insert(claim, user.Id, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<object>(null);
            }

            return Task.FromResult<object>(null);
        }


        public Task<IList<Claim>> GetClaimsAsync(TUser user)
        {
            try
            {
                ClaimsIdentity identity = _userClaimsIdentityRepository.FindByUserId(user.Id, _connectionFactory);

                return Task.FromResult<IList<Claim>>(identity.Claims.ToList());
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<IList<Claim>>(null);
            }
        }


        public Task RemoveClaimAsync(TUser user, Claim claim)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                if (claim == null)
                {
                    throw new ArgumentNullException(nameof(claim));
                }

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userClaimsIdentityRepository.Delete(userEntity, claim, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<object>(null);
            }

            return Task.FromResult<object>(null);
        }


        public Task AddLoginAsync(TUser user, UserLoginInfo login)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                if (login == null)
                {
                    throw new ArgumentNullException(nameof(login));
                }

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userLoginsIdentityRepository.Insert(userEntity, login, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<object>(null);
            }

            return Task.FromResult<object>(null);
        }

        public Task<TUser> FindAsync(UserLoginInfo login)
        {
            try
            {
                if (login == null)
                {
                    throw new ArgumentNullException(nameof(login));
                }

                var userId = _userLoginsIdentityRepository.FindUserIdByLogin(login, _connectionFactory);
                if (userId > 0)
                {
                    var userEntity = _userIdentityRepository.GetUserById(userId, _connectionFactory);
                    var identityUser = Mapper.Map<UserIdentityEntity, IdentityUser>(userEntity);

                    if (identityUser != null)
                    {
                        TUser result = Mapper.Map<IdentityUser, TUser>(identityUser);
                        return Task.FromResult<TUser>(result);
                    }
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<TUser>(null);
            }
            return Task.FromResult<TUser>(null);
        }

        public Task<IList<UserLoginInfo>> GetLoginsAsync(TUser user)
        {
            try
            {
                //List<UserLoginInfo> userLogins = new List<UserLoginInfo>();
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                var loginEntities = _userLoginsIdentityRepository.FindByUserId(user.Id, _connectionFactory);
                List<UserLoginInfo> logins = Mapper.Map<List<UserLoginInfoIdentityEntity>, List<UserLoginInfo>>(loginEntities);

                if (logins != null)
                {
                    return Task.FromResult<IList<UserLoginInfo>>(logins);
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<IList<UserLoginInfo>>(null);
            }
            return Task.FromResult<IList<UserLoginInfo>>(null);
        }

        public Task RemoveLoginAsync(TUser user, UserLoginInfo login)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                if (login == null)
                {
                    throw new ArgumentNullException(nameof(login));
                }

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userLoginsIdentityRepository.Delete(userEntity, login, _connectionFactory);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<object>(null);
            }

            return Task.FromResult<object>(null);
        }

        public Task AddToRoleAsync(TUser user, string groupName)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                if (string.IsNullOrEmpty(groupName))
                {
                    throw new ArgumentException("Argument cannot be null or empty: group.");
                }

                int groupId = _groupIdentityRepository.GetGroupId(groupName, _connectionFactory);
                if (groupId > 0)
                {

                    var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                    _userGroupsIdentityRepository.Insert(userEntity, groupId, _connectionFactory);
                }
                //if (!string.IsNullOrEmpty(groupId))
                //{
                //    _userGroupsIdentityRepository.Insert(user, groupId);
                //}
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<object>(null);
            }

            return Task.FromResult<object>(null);
        }

        public Task<IList<string>> GetRolesAsync(TUser user)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                List<string> groups = _userGroupsIdentityRepository.FindByUserId(user.Id, _connectionFactory);
                {
                    if (groups != null)
                    {
                        return Task.FromResult<IList<string>>(groups);
                    }
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<IList<string>>(null);
            }

            return Task.FromResult<IList<string>>(null);
        }

        public Task<bool> IsInRoleAsync(TUser user, string group)
        {
            try
            {
                if (user == null)
                {
                    throw new ArgumentNullException(nameof(user));
                }

                if (string.IsNullOrEmpty(group))
                {
                    throw new ArgumentNullException(nameof(group));
                }

                List<string> groups = _userGroupsIdentityRepository.FindByUserId(user.Id, _connectionFactory);
                {
                    if (groups != null && groups.Contains(group))
                    {
                        return Task.FromResult<bool>(true);
                    }
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<bool>(false);
            }

            return Task.FromResult<bool>(false);
        }

        public Task RemoveFromRoleAsync(TUser user, string group)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                throw;
            }
        }

        public Task DeleteAsync(TUser user)
        {
            try
            {
                if (user != null)
                {
                    var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                    _userIdentityRepository.Delete(userEntity, _connectionFactory);
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<object>(null);
            }

            return Task.FromResult<object>(null);
        }

        public Task<string> GetPasswordHashAsync(TUser user)
        {
            try
            {
                string passwordHash = _userIdentityRepository.GetPasswordHash(user.Id, _connectionFactory);
                return Task.FromResult<string>(passwordHash);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<string>(null);
            }

        }

        public Task<bool> HasPasswordAsync(TUser user)
        {
            try
            {
                var hasPassword = !string.IsNullOrEmpty(_userIdentityRepository.GetPasswordHash(user.Id, _connectionFactory));

                return Task.FromResult<bool>(Boolean.Parse(hasPassword.ToString()));//todo review
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<bool>(false);
            }
        }

        public Task SetPasswordHashAsync(TUser user, string passwordHash)
        {
            try
            {
                user.PasswordHash = passwordHash;

                return Task.FromResult<Object>(null);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<Object>(null);
            }
        }

        public Task SetSecurityStampAsync(TUser user, string stamp)
        {
            try
            {
                user.SecurityStamp = stamp;

                return Task.FromResult(0);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }

        }

        public Task<string> GetSecurityStampAsync(TUser user)
        {
            try
            {
                return Task.FromResult(user.SecurityStamp);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<string>(null);
            }
        }

        public Task SetEmailAsync(TUser user, string email)
        {
            try
            {
                user.Email = email;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);

                return Task.FromResult(0);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }

        }

        public Task<string> GetEmailAsync(TUser user)
        {
            try
            {
                return Task.FromResult(user.Email);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<string>(null);
            }
        }

        public Task<bool> GetEmailConfirmedAsync(TUser user)
        {
            try
            {
                return Task.FromResult(user.EmailConfirmed);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<bool>(false);
            }
        }

        public Task SetEmailConfirmedAsync(TUser user, bool confirmed)
        {
            try
            {
                user.EmailConfirmed = confirmed;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);

                return Task.FromResult(0);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }
        }

        public Task<TUser> FindByEmailAsync(string email)
        {
            try
            {
                if (String.IsNullOrEmpty(email))
                {
                    throw new ArgumentNullException(nameof(email));
                }

                var userEntity = _userIdentityRepository.GetUserByEmail(email, _connectionFactory);
                var identityUser = Mapper.Map<UserIdentityEntity, IdentityUser>(userEntity);

                if (identityUser != null)
                {
                    TUser result = Mapper.Map<IdentityUser, TUser>(identityUser);
                    return Task.FromResult<TUser>(result);
                }
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<TUser>(null);
            }
            return Task.FromResult<TUser>(null);
        }

        public Task SetPhoneNumberAsync(TUser user, string phoneNumber)
        {
            try
            {
                user.PhoneNumber = phoneNumber;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);

                return Task.FromResult(0);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }
        }

        public Task<string> GetPhoneNumberAsync(TUser user)
        {
            try
            {
                return Task.FromResult(user.PhoneNumber);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<string>(null);
            }
        }

        public Task<bool> GetPhoneNumberConfirmedAsync(TUser user)
        {
            try
            {
                return Task.FromResult(user.PhoneNumberConfirmed);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<bool>(false);
            }
        }

        public Task SetPhoneNumberConfirmedAsync(TUser user, bool confirmed)
        {
            try
            {
                user.PhoneNumberConfirmed = confirmed;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);

                return Task.FromResult(0);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }
        }

        public Task SetTwoFactorEnabledAsync(TUser user, bool enabled)
        {
            try
            {
                user.TwoFactorEnabled = enabled;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);

                return Task.FromResult(0);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }
        }

        public Task<bool> GetTwoFactorEnabledAsync(TUser user)
        {
            try
            {
                return Task.FromResult(user.TwoFactorEnabled);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<bool>(false);
            }
        }

        public Task<DateTimeOffset> GetLockoutEndDateAsync(TUser user)
        {
            try
            {
                return
                Task.FromResult(user.LockoutEndDateUtc.HasValue
                    ? new DateTimeOffset(DateTime.SpecifyKind(user.LockoutEndDateUtc.Value, DateTimeKind.Utc))
                    : new DateTimeOffset());
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<DateTimeOffset>(new DateTimeOffset());
            }
        }


        public Task SetLockoutEndDateAsync(TUser user, DateTimeOffset lockoutEnd)
        {
            try
            {
                user.LockoutEndDateUtc = lockoutEnd.UtcDateTime;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);

                return Task.FromResult(0);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }
        }

        public Task<int> IncrementAccessFailedCountAsync(TUser user)
        {
            try
            {
                user.AccessFailedCount++;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);

                return Task.FromResult(user.AccessFailedCount);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }
        }

        public Task ResetAccessFailedCountAsync(TUser user)
        {
            try
            {
                user.AccessFailedCount = 0;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);

                return Task.FromResult(0);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }
        }

        public Task<int> GetAccessFailedCountAsync(TUser user)
        {
            try
            {
                return Task.FromResult(user.AccessFailedCount);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }
        }

        public Task<bool> GetLockoutEnabledAsync(TUser user)
        {
            try
            {
                return Task.FromResult(user.LockoutEnabled);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult<bool>(false);
            }
        }

        public Task SetLockoutEnabledAsync(TUser user, bool enabled)
        {
            try
            {
                user.LockoutEnabled = enabled;

                var userEntity = Mapper.Map<IdentityUser, UserIdentityEntity>(user);
                _userIdentityRepository.Update(userEntity, _connectionFactory);

                return Task.FromResult(0);
            }
            catch (Exception exception)
            {
                DemLogger.Current.Error(exception, $"{nameof(UserIdentityService<TUser>)}. Error in function {DemLogger.GetCallerInfo()}");
                return Task.FromResult(0);
            }
        }

        public void Dispose()
        {
        }
    }
}