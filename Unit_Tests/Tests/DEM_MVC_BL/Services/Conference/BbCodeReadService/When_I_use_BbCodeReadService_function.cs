using DEM_MVC_BL.Services.Conference;
using Xunit;

namespace Unit_Tests.Tests.DEM_MVC_BL.Services.BbCodeModelHelper_Tests
{
    public class When_I_use_BbCodeReadService_function : BbCodeReadServiceUnitTestBase
    {
        [Fact]
        public void First_object_that_was_returned_should_have_BbCodeTag_field_equel_to_b()
        {
            var bbCodeReadService = new BbCodeReadService(BbCodeRepository, ConnectionFactory, AppCache);
            var bbCodeModels = bbCodeReadService.GetAllBbCodeModels();
            Assert.Equal("b", bbCodeModels[0].BbCodeTag);
        }

        [Fact]
        public void Should_return_3_objects()
        {
            var bbCodeReadService = new BbCodeReadService(BbCodeRepository, ConnectionFactory, AppCache);
            var bbCodeModels = bbCodeReadService.GetAllBbCodeModels();
            Assert.Equal(3, bbCodeModels.Count);
        }

        [Fact]
        public void Shouldnt_return_empty()
        {
            var bbCodeReadService = new BbCodeReadService(BbCodeRepository, ConnectionFactory, AppCache);
            var bbCodeModels = bbCodeReadService.GetAllBbCodeModels();
            Assert.NotEmpty(bbCodeModels);
        }

        [Fact]
        public void Shouldnt_return_null()
        {
            var bbCodeReadService = new BbCodeReadService(BbCodeRepository, ConnectionFactory, AppCache);
            var bbCodeModels = bbCodeReadService.GetAllBbCodeModels();
            Assert.NotNull(bbCodeModels);
        }
    }
}