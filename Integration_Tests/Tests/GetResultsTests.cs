using System.Data;
using DEM_MVC_DAL.Interfaces.IRepositories;
using Integration_Tests.BaseTest;
using Microsoft.Practices.ServiceLocation;
using Xunit;

namespace Integration_Tests.Tests
{
    public class GetResultsTests : IntegrationTestBase
    {
        [Fact]
        public void IsIForumEntityRepository_GetAllForums()
        {
            DataTable dataTable;
            using (var unitOfWork = UnitOfWorkFactory.Create())
            {
                IForumRepository repository = ServiceLocator.Current.GetInstance<IForumRepository>();
                dataTable = repository.GetAllForums(unitOfWork);
            }
            Assert.NotEqual(dataTable.Rows.Count, 0);
        }

        [Fact]
        public void IsIForumEntityRepository_GetForumById()
        {
            DataTable dataTable;
            using (var unitOfWork = UnitOfWorkFactory.Create())
            {
                IForumRepository repository = ServiceLocator.Current.GetInstance<IForumRepository>();
                dataTable = repository.GetForumById(8, unitOfWork);
            }
            Assert.NotEqual(dataTable.Rows.Count, 0);
        }

        [Fact]
        public void IsITopicEntityRepository_GetAllTopicsByForumId()
        {
            DataTable dataTable;
            using (var unitOfWork = UnitOfWorkFactory.Create())
            {
                ITopicRepository repository = ServiceLocator.Current.GetInstance<ITopicRepository>();
                dataTable = repository.GetAllTopicsByForumId(11, unitOfWork, 50, 1);
            }
            Assert.NotEqual(dataTable.Rows.Count, 0);
        }

        [Fact]
        public void IsITopicEntityRepository_GetTopicById()
        {
            DataTable dataTable;
            using (var unitOfWork = UnitOfWorkFactory.Create())
            {
                ITopicRepository repository = ServiceLocator.Current.GetInstance<ITopicRepository>();
                dataTable = repository.GetTopicById(1448, unitOfWork);
            }
            Assert.NotEqual(dataTable.Rows.Count, 0);
        }

        [Fact]
        public void IsIPostEntityRepository_GetAllPostsWithUsersByTopicId()
        {
            DataTable dataTableUsers;
            DataTable dataTablePosts;
            DataSet dataSet;
            using (var unitOfWork = UnitOfWorkFactory.Create())
            {
                IPostRepository repository = ServiceLocator.Current.GetInstance<IPostRepository>();
                dataSet = repository.GetAllPostsWithUsersByTopicId(1448, unitOfWork, 20, 1);
            }
            dataTableUsers = dataSet.Tables["Posts"];
            dataTablePosts = dataSet.Tables["Users"];
            Assert.NotEqual(dataTableUsers.Rows.Count, 0);
            Assert.NotEqual(dataTablePosts.Rows.Count, 0);
        }

        [Fact]
        public void IsIPollEntityRepository_GetAllPollOptionsByTopicId()
        {
            DataTable dataTablePolls;
            DataTable dataTablePollsOptions;
            DataSet dataSet;
            using (var unitOfWork = UnitOfWorkFactory.Create())
            {
                IPollRepository repository = ServiceLocator.Current.GetInstance<IPollRepository>();
                dataSet = repository.GetPollWithOptionsByTopicId(1448, unitOfWork);
            }
            dataTablePolls = dataSet.Tables["Polls"];
            dataTablePollsOptions = dataSet.Tables["PollsOptions"];
            Assert.NotEqual(dataTablePolls.Rows.Count, 0);
            Assert.NotEqual(dataTablePollsOptions.Rows.Count, 0);
        }

        [Fact]
        public void IsIConfigEntityRepository_GetAllConfigs()
        {
            //DataTable dataTableConfigs;
            //using (var unitOfWork = UnitOfWorkFactory.Create())
            //{
            //    IConfigRepository repository = ServiceLocator.Current.GetInstance<IConfigRepository>();
            //    dataTableConfigs = repository.GetAllConfigs(unitOfWork);
            //}
            //Assert.NotEqual(dataTableConfigs.Rows.Count, 0);
        }

        [Fact]
        public void IsIBbCodeEntityRepository_GetAllBbCodes()
        {
            //DataTable dataTableBbCodes;
            //using (var unitOfWork = UnitOfWorkFactory.Create())
            //{
            //    IBbCodeRepository repository = ServiceLocator.Current.GetInstance<IBbCodeRepository>();
            //    dataTableBbCodes = repository.GetAllBbCodes(unitOfWork);
            //}
            //Assert.NotEqual(dataTableBbCodes.Rows.Count, 0);
        }
    }
}
