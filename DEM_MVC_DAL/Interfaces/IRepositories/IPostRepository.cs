using System.Collections.Generic;
using DEM_MVC_DAL.Entities.PostEntities;
using DEM_MVC_DAL.Entities.UserForPostViewEntities;
using DEM_MVC_DAL.Interfaces.IFactory;

namespace DEM_MVC_DAL.Interfaces.IRepositories
{
    public interface IPostRepository
    {
        List<ReadPostEntity> GetAllPostsByTopicId(int topicId, IConnectionFactory connectionFactory, int onPage, int? page);
        List<UserForPostViewEntity> GetUsersForPostsByUsersId(IConnectionFactory connectionFactory, List<int> usersId);
        void CreateNewPost(NewPostEntity newPostEntity, IConnectionFactory connectionFactory);
        bool DeletePost(int postId, IConnectionFactory connectionFactory);
    }
}