using System.Collections.Generic;
using System.Text.RegularExpressions;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Services.ModelsHelpers;
using Moq;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests
{
    public class BbCodeHelperTests : UnitTestBase
    {
        [Fact]
        public void IsBbCodeReplacerToHtml()
        {
            BbCodeHelper.BbCodes = new Dictionary<Regex, string>() { { new Regex(@"\[b\](.+?)\[\/b\]", RegexOptions.Compiled), "<span style=\"font-weight:bold;\">${1}</span>" } };
            var testString = BbCodeHelper.BbCodeReplacerToHtml("[b]Test[/b] string. String [b]for[/b] testing.");
            Assert.Equal("<span style=\"font-weight:bold;\">Test</span> string. String <span style=\"font-weight:bold;\">for</span> testing.", testString);
        }
    }

    public class ForumModelHelperTests : UnitTestBase
    {
        [Fact]
        public void IsTransformToHierarchy()
        {
            var forumTableList = new List<ForumTableViewModel>()
            {
                new ForumTableViewModel()
                {
                    Title = "Root",
                    ForumId = 1,
                    ParentId = 0,
                    PostsCount = 0,
                    TopicsCount = 0
                },
                new ForumTableViewModel()
                {
                    Title = "Level 1",
                    ForumId = 2,
                    ParentId = 1,
                    PostsCount = 10,
                    TopicsCount = 10
                },
                new ForumTableViewModel()
                {
                    Title = "Level 1",
                    ForumId = 3,
                    ParentId = 1,
                    PostsCount = 10,
                    TopicsCount = 10
                },
                new ForumTableViewModel()
                {
                    Title = "Level 2",
                    ForumId = 4,
                    ParentId = 2,
                    PostsCount = 10,
                    TopicsCount = 10
                }
            };
            var forumModelHelper = new ForumModelHelper();
            forumTableList = forumModelHelper.TransformToHierarchy(forumTableList);
            Assert.Equal(30, forumTableList[0].PostsCount);
            Assert.Equal(30, forumTableList[0].TopicsCount);
            Assert.Equal("Root", forumTableList[0].Title);
            Assert.Equal(2, forumTableList[0].SubForums.Count);
        }

        [Fact]
        public void IsGetGorumTreeById()
        {
            var forumTableList = new List<ForumTableViewModel>()
            {
                new ForumTableViewModel()
                {
                    Title = "Root",
                    ForumId = 1,
                    ParentId = 0,
                    PostsCount = 30,
                    TopicsCount = 30,
                    SubForums = new List<ForumTableViewModel>()
                    {
                        new ForumTableViewModel()
                        {
                            Title = "Level 1.1",
                            ForumId = 2,
                            ParentId = 1,
                            PostsCount = 20,
                            TopicsCount = 20,
                            SubForums = new List<ForumTableViewModel>()
                            {
                                new ForumTableViewModel()
                                {
                                    Title = "Level 2.1",
                                    ForumId = 4,
                                    ParentId = 2,
                                    PostsCount = 10,
                                    TopicsCount = 10
                                }
                            }
                        },
                        new ForumTableViewModel()
                        {
                            Title = "Level 1.2",
                            ForumId = 3,
                            ParentId = 1,
                            PostsCount = 10,
                            TopicsCount = 10,
                            SubForums = new List<ForumTableViewModel>()
                        }
                    }
                }
            };
            var forumModelHelper = new ForumModelHelper();
            var forumTable = forumModelHelper.GetGorumTreeById(forumTableList, 2);
            Assert.Equal("Level 1.1", forumTable.Title);
        }
    }

    public class PollModelHelperTests : UnitTestBase
    {
        [Fact]
        public void IsCalculatePollOptionTotalPercent()
        {
            var pollOptionsList = new List<PollOptionViewModel>()
            {
                new PollOptionViewModel()
                {
                    PollId = 1,
                    PollOptionId = 1,
                    PollOptionText = "1",
                    PollOptionTotal = 50,
                    PollOptionTotalPercent = 0
                },
                new PollOptionViewModel()
                {
                    PollId = 1,
                    PollOptionId = 2,
                    PollOptionText = "2",
                    PollOptionTotal = 50,
                    PollOptionTotalPercent = 0
                }
            };
            var pollHelper = new PollModelHelper();
            pollOptionsList = pollHelper.CalculatePollOptionTotalPercent(pollOptionsList);
            foreach (var pollOption in pollOptionsList)
            {
                Assert.Equal(50.0, pollOption.PollOptionTotalPercent);
            }
        }
    }

    public class ConfigHelperTests : UnitTestBase
    {
        [Fact]
        public void IsGetPostsOnPageCount()
        {
            var postsOnPage = new ConfigModel
            {
                ConfigName = "postsOnPage",
                ConfigValue = "25"
            };
            ConfigHelper.ConfigModels = new List<ConfigModel>() { postsOnPage };
            Assert.Equal(25, ConfigHelper.GetPostsOnPageCount());
        }

        [Fact]
        public void IsGetTopicsOnPageCount()
        {
            var topicsOnPage = new ConfigModel
            {
                ConfigName = "topicsOnPage",
                ConfigValue = "12"
            };
            ConfigHelper.ConfigModels = new List<ConfigModel>() { topicsOnPage };
            Assert.Equal(12, ConfigHelper.GetTopicsOnPageCount());
        }
    }
}
