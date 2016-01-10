using DEM_MVC.Services;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests
{
    public class HelpfulFunctionsServiceTests : UnitTestBase
    {
        [Theory]
        [InlineData(1)]
        public void SelectRightEndingFunctionShouldReturnFirstOptionAndShoudntBeNull(int value)
        {
            var wordForOne = HelpfulFunctionsService.SelectRightEnding(value, "wordForOne", "wordFromTwoToFour", "wordForElse");

            Assert.NotNull(wordForOne);
            Assert.Equal(wordForOne, "wordForOne");
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        public void SelectRightEndingFunctionShouldReturnSecondOptionAndShoudntBeNull(int value)
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
        public void SelectRightEndingFunctionShouldReturnThirdOptionAndShoudntBeNull(int value)
        {
            var wordForElse = HelpfulFunctionsService.SelectRightEnding(value, "wordForOne", "wordFromTwoToFour", "wordForElse");

            Assert.NotNull(wordForElse);
            Assert.Equal(wordForElse, "wordForElse");
        }

        [Theory]
        [InlineData(1)]
        [InlineData(31)]
        [InlineData(157487)]
        public void IsOddFunctionShouldReturnTrue(int value)
        {
            Assert.True(HelpfulFunctionsService.IsOdd(value));
        }

        [Theory]
        [InlineData(2)]
        [InlineData(88)]
        [InlineData(5464312)]
        public void IsOddFunctionShouldReturnFalse(int value)
        {
            Assert.False(HelpfulFunctionsService.IsOdd(value));
        }
    }
}
