using DEM_MVC_BL.Services;
using DEM_MVC_BL.Services.ModelsHelpers;
using DEM_MVC_DAL.Interfaces.IRepositories;
using DEM_MVC_DAL.Interfaces.IUnitOfWork;
using DEM_MVC_DAL.UnitOfWork;
using Moq;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests
{
    public class DataLoadServiceTests : UnitTestBase
    {
        private Mock<UnitOfWorkFactory> _uowFactoryMocked;
        private Mock<ForumModelHelper> _forumModelHelperMocked;
        private Mock<PollModelHelper> _pollModelHelperMocked;
        private Mock<IForumEntityRepository> _forumEntityRepository;
        private Mock<ITopicEntityRepository> _topicEntityRepository;
        private Mock<IPollEntityRepository> _pollEntityRepository;
        private Mock<IPostEntityRepository> _postEntityRepository;
        private Mock<IBbCodeEntityRepository> _bbCodeEntityRepository;
        private Mock<IConfigEntityRepository> _configEntityRepository;
        private DataLoadService _dataLoadService;

        public DataLoadServiceTests()
        {
            _uowFactoryMocked = new Mock<UnitOfWorkFactory>("");
            _forumModelHelperMocked = new Mock<ForumModelHelper>();
            _pollModelHelperMocked = new Mock<PollModelHelper>();
            _forumEntityRepository = new Mock<IForumEntityRepository>();
            _topicEntityRepository = new Mock<ITopicEntityRepository>();
            _pollEntityRepository = new Mock<IPollEntityRepository>();
            _postEntityRepository = new Mock<IPostEntityRepository>();
            _bbCodeEntityRepository = new Mock<IBbCodeEntityRepository>();
            _configEntityRepository = new Mock<IConfigEntityRepository>();
            _dataLoadService = new DataLoadService(_uowFactoryMocked.Object, _forumModelHelperMocked.Object,
                _pollModelHelperMocked.Object, _forumEntityRepository.Object, _topicEntityRepository.Object,
                _pollEntityRepository.Object, _postEntityRepository.Object, _bbCodeEntityRepository.Object,
                _configEntityRepository.Object);
        }

        [Fact]
        public void IsGetAllForumTableViewModels()
        {
            var uowMocked = new Mock<IUnitOfWork>();

            _uowFactoryMocked.Setup(fw => fw.Create()).Returns(uowMocked.Object);
            var uow = _uowFactoryMocked.Object.Create();

            Assert.Equal(uow, uowMocked.Object);
        }
    }
}