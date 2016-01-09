using DEM_MVC.Services;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests
{
    public class HelpfulFunctionsServiceTests : UnitTestBase
    {
        [Fact]
        public void IsSelectRightEnding()
        {
            var wordForOne = HelpfulFunctionsService.SelectRightEnding(1, "wordForOne", "wordFromTwoToFive", "wordForElse");
            var wordFromTwoToFive = HelpfulFunctionsService.SelectRightEnding(3, "wordForOne", "wordFromTwoToFive", "wordForElse");
            var wordForElse = HelpfulFunctionsService.SelectRightEnding(10, "wordForOne", "wordFromTwoToFive", "wordForElse");

            Assert.NotNull(wordForOne);
            Assert.NotNull(wordFromTwoToFive);
            Assert.NotNull(wordForElse);

            Assert.Equal(wordForOne, "wordForOne");
            Assert.Equal(wordFromTwoToFive, "wordFromTwoToFive");
            Assert.Equal(wordForElse, "wordForElse");
        }

        [Fact]
        public void IsIsOdd()
        {
            var itsOdd = HelpfulFunctionsService.IsOdd(1);
            var itsNotOdd = HelpfulFunctionsService.IsOdd(2);

            Assert.Equal(itsOdd, true);
            Assert.Equal(itsNotOdd, false);
        }
    }
}
