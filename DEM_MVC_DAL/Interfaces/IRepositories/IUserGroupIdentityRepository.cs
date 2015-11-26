﻿using System.Collections.Generic;
using System.Data;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IUserGroupIdentityRepository
    {
        List<string> FindByUserId(int memberId, IConnectionFactory connectionFactory);
        void Delete(int memberId, IConnectionFactory connectionFactory);
        void Insert(UserIdentityEntity member, int roleId, IConnectionFactory connectionFactory);
    }
}