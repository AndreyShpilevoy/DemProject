using System.Data;
using System.Security.Claims;
using DEM_MVC_DAL.Entities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IUserClaimsIdentityRepository
    {
        ClaimsIdentity FindByUserId(int memberId, IConnectionFactory connectionFactory);
        void Delete(int memberId, IConnectionFactory connectionFactory);
        void Insert(Claim memberClaim, int memberId, IConnectionFactory connectionFactory);
        void Delete(UserIdentityEntity member, Claim claim, IConnectionFactory connectionFactory);
    }
}