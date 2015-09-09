using DEM_MVC_BL.Services;
using DEM_MVC_BL.Services.ModelsHelpers;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.UnitOfWork;
using Moq;
using Unit_Tests.BaseTest;

namespace Unit_Tests.Tests
{
    public class DataLoadServiceTests : UnitTestBase
    {
        private DataLoadService _dataLoadService;

        public DataLoadServiceTests()
        {
            var uowFactoryMocked = new Mock<UnitOfWorkFactory>();
            var forumModelHelperMocked = new Mock<ForumModelHelper>();
            var pollModelHelperMocked = new Mock<PollModelHelper>();
            var forumEntityRepository = new Mock<IForumEntityRepository>();
            var topicEntityRepository = new Mock<ITopicEntityRepository>();
            var pollEntityRepository = new Mock<IPollEntityRepository>();
            var postEntityRepository = new Mock<IPostEntityRepository>();
            var bbCodeEntityRepository = new Mock<IBbCodeEntityRepository>();
            var configEntityRepository = new Mock<IConfigEntityRepository>();
            _dataLoadService = new DataLoadService(uowFactoryMocked.Object, forumModelHelperMocked.Object,
                pollModelHelperMocked.Object, forumEntityRepository.Object, topicEntityRepository.Object,
                pollEntityRepository.Object, postEntityRepository.Object, bbCodeEntityRepository.Object,
                configEntityRepository.Object);
        }
    }
}