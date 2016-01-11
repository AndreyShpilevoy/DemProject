using DEM_MVC.Services;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests.DEM_MVC.HelpfulFunctionsServiceTests
{
    public class When_I_use_IsOdd_function : UnitTestBase
    {
        [Theory]
        [InlineData(1)]
        [InlineData(31)]
        [InlineData(157487)]
        public void Function_should_return_true(int value)
        {
            Assert.True(HelpfulFunctionsService.IsOdd(value));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(88)]
        [InlineData(5464312)]
        public void Function_should_return_false(int value)
        {
            Assert.False(HelpfulFunctionsService.IsOdd(value));
        }
    }
}
