using System.Data;
using System.Security.Claims;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IUserClaimsIdentityRepository
    {
        ClaimsIdentity FindByUserId(int userId, IConnectionFactory connectionFactory);
        void Delete(int userId, IConnectionFactory connectionFactory);
        void Insert(Claim userClaim, int userId, IConnectionFactory connectionFactory);
        void Delete(UserIdentityEntity user, Claim claim, IConnectionFactory connectionFactory);
    }
}