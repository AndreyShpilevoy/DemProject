using DEM_MVC_DAL.Entities.GroupIdentityEntities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IGroupIdentityRepository
    {
        void Delete(int groupId, IConnectionFactory connectionFactory);
        void Insert(GroupIdentityEntity group, IConnectionFactory connectionFactory);
        string GetGroupName(int groupId, IConnectionFactory connectionFactory);
        int GetGroupId(string groupName, IConnectionFactory connectionFactory);
        GroupIdentityEntity GetGroupById(int groupId, IConnectionFactory connectionFactory);
        GroupIdentityEntity GetGroupByName(string groupName, IConnectionFactory connectionFactory);
        void Update(GroupIdentityEntity group, IConnectionFactory connectionFactory);
    }
}