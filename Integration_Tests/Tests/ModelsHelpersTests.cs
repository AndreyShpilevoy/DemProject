using System.Collections.Generic;
using System.Text.RegularExpressions;
using DEM_MVC_BL.Services.ModelsHelpers;
using Integration_Tests.BaseTest;
using Xunit;

namespace Integration_Tests.Tests
{
    public class ModelsHelpersTests : IntegrationTestBase
    {
        [Fact]
        public void IsBbCodeHelper_Ctor()
        {
            var testVar = BbCodeHelper.BbCodes;
            Assert.NotNull(testVar);
            Assert.NotEqual(0, testVar.Count);
            foreach (var bbCode in testVar)
            {
                Assert.NotNull(bbCode.Key);
                Assert.NotNull(bbCode.Value);
            }
        }

        [Fact]
        public void IsConfigHelper_Ctor()
        {
            var testVar = ConfigHelper.ConfigModels;
            Assert.NotNull(testVar);
            Assert.NotEqual(0,testVar.Count);
            foreach (var bbCode in testVar)
            {
                Assert.NotNull(bbCode);
            }
        }
    }
}
