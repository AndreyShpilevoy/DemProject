using DEM_MVC.Services;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests.DEM_MVC.Services.HelpfulFunctionsService_Tests
{
    public class When_I_use_SelectRightEnding_function : UnitTestBase
    {
        [Theory]
        [InlineData(1)]
        public void Function_should_return_first_value(int value)
        {
            var wordForOne = HelpfulFunctionsService.SelectRightEnding(value, "wordForOne", "wordFromTwoToFour", "wordForElse");

            Assert.NotNull(wordForOne);
            Assert.Equal(wordForOne, "wordForOne");
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        public void Function_should_return_second_value(int value)
        {
            var wordFromTwoToFour = HelpfulFunctionsService.SelectRightEnding(value, "wordForOne", "wordFromTwoToFour", "wordForElse");

            Assert.NotNull(wordFromTwoToFour);
            Assert.Equal(wordFromTwoToFour, "wordFromTwoToFour");
        }

        [Theory]
        [InlineData(5)]
        [InlineData(10)]
        [InlineData(20)]
        [InlineData(152456)]
        public void Function_should_return_third_value(int value)
        {
            var wordForElse = HelpfulFunctionsService.SelectRightEnding(value, "wordForOne", "wordFromTwoToFour", "wordForElse");

            Assert.NotNull(wordForElse);
            Assert.Equal(wordForElse, "wordForElse");
        }
    }
}
