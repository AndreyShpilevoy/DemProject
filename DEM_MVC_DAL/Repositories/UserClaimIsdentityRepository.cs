using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Security.Claims;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_Infrastructure.Models;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace DEM_MVC_DAL.Repositories
{
    public class UserClaimIsdentityRepository  : IUserClaimsIdentityRepository
    {
        public ClaimsIdentity FindByUserId(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Delete(int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Insert(Claim memberClaim, int memberId, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }

        public void Delete(UserIdentityEntity member, Claim claim, IConnectionFactory connectionFactory)
        {
            throw new NotImplementedException();
        }
    }
}