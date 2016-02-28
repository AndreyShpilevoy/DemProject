using System.Collections.Generic;
using Autofac.Extras.Moq;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Models.BbCodeModels;
using DEM_MVC_BL.Services;
using DEM_MVC_BL.Services.ModelsHelpers;
using DEM_MVC_Infrastructure.Models;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests.DEM_MVC_BL.Services.BbCodeModelHelper_Tests
{
    public class When_I_create_new_item : BbCodeModelHelperUnitTestBase
    {
        [Fact]
        public void Constructor_should_init_BbCodeModels_with_3_objects()
        {
            var bbCodeModelHelper = new BbCodeModelHelper(_dataLoadService, _appCache);
            Assert.Equal(3, bbCodeModelHelper.BbCodeModels.Count);
        }

        [Fact]
        public void Constructor_shouldnt_init_BbCodeModels_without_objects()
        {
            var bbCodeModelHelper = new BbCodeModelHelper(_dataLoadService, _appCache);
            Assert.NotEmpty(bbCodeModelHelper.BbCodeModels);
        }

        [Fact]
        public void Constructor_shouldnt_be_null()
        {
            var bbCodeModelHelper = new BbCodeModelHelper(_dataLoadService, _appCache);
            Assert.NotNull(bbCodeModelHelper);
        }
    }
}