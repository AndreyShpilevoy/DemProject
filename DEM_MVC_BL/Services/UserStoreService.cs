﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using DEM_MVC_BL.Models;
using Microsoft.AspNet.Identity;
using NLog.Internal;

namespace DEM_MVC_BL.Services
{
    public class UserStore : IUserStore<User>, IUserLoginStore<User>, IUserPasswordStore<User>, IUserSecurityStampStore<User>
    {
        private readonly string connectionString;

        public UserStore(string connectionString)
        {
            if (string.IsNullOrWhiteSpace(connectionString))
                throw new ArgumentNullException("connectionString");

            this.connectionString = connectionString;
        }

        public UserStore()
        {
            this.connectionString = @"Data Source=.\SQLEXPRESS;Initial Catalog=test; User ID=DemUser; Password=4252744;";
        }

        public void Dispose()
        {

        }

        #region IUserStore
        public virtual Task CreateAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");

            Random rnd = new Random();
            return Task.Factory.StartNew(() =>
            {
                user.UserId = rnd.Next(1, 999999999);
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    string sql = "insert into Users(UserId, UserName, PasswordHash, SecurityStamp) values(@userId, @userName, @passwordHash, @securityStamp)";
                    var cmd = new SqlCommand(sql, connection);

                    SqlParameter userId = new SqlParameter
                    {
                        ParameterName = "@userId",
                        SqlDbType = SqlDbType.Int,
                        Value = user.UserId,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(userId);

                    SqlParameter userName = new SqlParameter
                    {
                        ParameterName = "@userName",
                        SqlDbType = SqlDbType.VarChar,
                        Value = user.UserName,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(userName);

                    SqlParameter passwordHash = new SqlParameter
                    {
                        ParameterName = "@passwordHash",
                        SqlDbType = SqlDbType.VarChar,
                        Value = user.PasswordHash,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(passwordHash);

                    SqlParameter securityStamp = new SqlParameter
                    {
                        ParameterName = "@securityStamp",
                        SqlDbType = SqlDbType.VarChar,
                        Value = user.SecurityStamp,
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(securityStamp);

                    cmd.ExecuteNonQuery();
                    cmd.Dispose();
                }
            });
        }

        public virtual Task DeleteAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");

            return Task.Factory.StartNew(() =>
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    string sql = "delete from Users where UserId = @userId";
                    var cmd = new SqlCommand(sql, connection);

                    SqlParameter userId = new SqlParameter
                    {
                        ParameterName = "@userId",
                        SqlDbType = SqlDbType.Int,
                        Value = new { user.UserId },
                        Direction = ParameterDirection.Input
                    };
                    cmd.Parameters.Add(userId);

                    cmd.ExecuteNonQuery();
                    cmd.Dispose();
                }
                //connection.Execute("delete from Users where UserId = @userId", new { user.UserId });
            });
        }

        public virtual Task<User> FindByIdAsync(string userId)
        {
            //if (string.IsNullOrWhiteSpace(userId))
            //    throw new ArgumentNullException("userId");

            //Int32 parsedUserId;
            //if (!Int32.TryParse(userId, out parsedUserId))
            //    throw new ArgumentOutOfRangeException("userId", string.Format("'{0}' is not a valid Int32.", new { userId }));

            //return Task.Factory.StartNew(() =>
            //{
            //    using (SqlConnection connection = new SqlConnection(connectionString))
            //        return connection.Query<User>("select * from Users where UserId = @userId", new { userId = parsedUserId }).SingleOrDefault();
            //});
            throw new NotImplementedException();
        }

        public virtual Task<User> FindByNameAsync(string userName)
        {
            //if (string.IsNullOrWhiteSpace(userName))
            //    throw new ArgumentNullException("userName");

            //return Task.Factory.StartNew(() =>
            //{
            //    using (SqlConnection connection = new SqlConnection(connectionString))
            //        return connection.Query<User>("select * from Users where lower(UserName) = lower(@userName)", new { userName }).SingleOrDefault();
            //});
            return Task.Factory.StartNew(() =>
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    return new User();
                }
                    //return connection.Query<User>("select * from Users where lower(UserName) = lower(@userName)", new { userName }).SingleOrDefault();
            });
            //throw new NotImplementedException();
        }

        public virtual Task UpdateAsync(User user)
        {
            //if (user == null)
            //    throw new ArgumentNullException("user");

            //return Task.Factory.StartNew(() =>
            //{
            //    using (SqlConnection connection = new SqlConnection(connectionString))
            //        connection.Execute("update Users set UserName = @userName, PasswordHash = @passwordHash, SecurityStamp = @securityStamp where UserId = @userId", user);
            //});
            throw new NotImplementedException();
        }
        #endregion

        #region IUserLoginStore
        public virtual Task AddLoginAsync(User user, UserLoginInfo login)
        {
            //if (user == null)
            //    throw new ArgumentNullException("user");

            //if (login == null)
            //    throw new ArgumentNullException("login");

            //Random rnd = new Random();
            //return Task.Factory.StartNew(() =>
            //{
            //    using (SqlConnection connection = new SqlConnection(connectionString))
            //        connection.Execute("insert into ExternalLogins(ExternalLoginId, UserId, LoginProvider, ProviderKey) values(@externalLoginId, @userId, @loginProvider, @providerKey)",
            //            new { externalLoginId = rnd.Next(1, 999999999), userId = user.UserId, loginProvider = login.LoginProvider, providerKey = login.ProviderKey });
            //});
            throw new NotImplementedException();
        }

        public virtual Task<User> FindAsync(UserLoginInfo login)
        {
            //if (login == null)
            //    throw new ArgumentNullException("login");

            //return Task.Factory.StartNew(() =>
            //{
            //    using (SqlConnection connection = new SqlConnection(connectionString))
            //        return connection.Query<User>("select u.* from Users u inner join ExternalLogins l on l.UserId = u.UserId where l.LoginProvider = @loginProvider and l.ProviderKey = @providerKey",
            //            login).SingleOrDefault();
            //});
            throw new NotImplementedException();
        }

        public virtual Task<IList<UserLoginInfo>> GetLoginsAsync(User user)
        {
            //if (user == null)
            //    throw new ArgumentNullException("user");

            //return Task.Factory.StartNew(() =>
            //{
            //    using (SqlConnection connection = new SqlConnection(connectionString))
            //        return (IList<UserLoginInfo>)connection.Query<UserLoginInfo>("select LoginProvider, ProviderKey from ExternalLogins where UserId = @userId", new { user.UserId }).ToList();
            //});
            throw new NotImplementedException();
        }

        public virtual Task RemoveLoginAsync(User user, UserLoginInfo login)
        {
            //if (user == null)
            //    throw new ArgumentNullException("user");

            //if (login == null)
            //    throw new ArgumentNullException("login");

            //return Task.Factory.StartNew(() =>
            //{
            //    using (SqlConnection connection = new SqlConnection(connectionString))
            //        connection.Execute("delete from ExternalLogins where UserId = @userId and LoginProvider = @loginProvider and ProviderKey = @providerKey",
            //            new { user.UserId, login.LoginProvider, login.ProviderKey });
            //});
            throw new NotImplementedException();
        }
        #endregion

        #region IUserPasswordStore
        public virtual Task<string> GetPasswordHashAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");

            return Task.FromResult(user.PasswordHash);
        }

        public virtual Task<bool> HasPasswordAsync(User user)
        {
            return Task.FromResult(!string.IsNullOrEmpty(user.PasswordHash));
        }

        public virtual Task SetPasswordHashAsync(User user, string passwordHash)
        {
            if (user == null)
                throw new ArgumentNullException("user");

            user.PasswordHash = passwordHash;

            return Task.FromResult(0);
        }

        #endregion

        #region IUserSecurityStampStore
        public virtual Task<string> GetSecurityStampAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException("user");

            return Task.FromResult(user.SecurityStamp);
        }

        public virtual Task SetSecurityStampAsync(User user, string stamp)
        {
            if (user == null)
                throw new ArgumentNullException("user");

            user.SecurityStamp = stamp;

            return Task.FromResult(0);
        }

        #endregion
    }
}