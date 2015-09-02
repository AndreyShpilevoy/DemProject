using System.Collections.Generic;
using System.Text.RegularExpressions;
using DEM_MVC_BL.Models;
using DEM_MVC_BL.Services.ModelsHelpers;
using Moq;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests
{
    public class ModelsHelpersTests : UnitTestBase
    {
        [Fact]
        public void IsBbCodeHelper_BbCodeReplacerToHtml()
        {
            BbCodeHelper.BbCodes = new Dictionary<Regex, string>() { { new Regex(@"\[b\](.+?)\[\/b\]", RegexOptions.Compiled), "<span style=\"font-weight:bold;\">${1}</span>" } };
            var testString = BbCodeHelper.BbCodeReplacerToHtml("[b]Test[/b] string. String [b]for[/b] testing.");
            Assert.Equal("<span style=\"font-weight:bold;\">Test</span> string. String <span style=\"font-weight:bold;\">for</span> testing.", testString);
        }

        [Fact]
        public void IsConfigModel_GetPostsOnPageCount()
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
        public void IsConfigModel_GetTopicsOnPageCount()
        {
            var topicsOnPage = new ConfigModel
            {
                ConfigName = "topicsOnPage",
                ConfigValue = "12"
            };
            ConfigHelper.ConfigModels = new List<ConfigModel>() { topicsOnPage };
            Assert.Equal(12, ConfigHelper.GetTopicsOnPageCount());
        }

        [Fact]
        public void IsPollModelHelper_CalculatePollOptionTotalPercent()
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
}
