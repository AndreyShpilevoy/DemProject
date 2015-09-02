using DEM_MVC.Services;
using Unit_Tests.BaseTest;
using Xunit;

namespace Unit_Tests.Tests
{
    public class ViewHelpersTests : UnitTestBase
    {
        [Fact]
        public void IsViewHelper_SelectRightEnding()
        {
            var one = ViewHelper.SelectRightEnding(1, "вариант", "варианта", "вариантов");
            var two = ViewHelper.SelectRightEnding(3, "вариант", "варианта", "вариантов");
            var ten = ViewHelper.SelectRightEnding(10, "вариант", "варианта", "вариантов");
            Assert.Equal(one, "вариант");
            Assert.Equal(two, "варианта");
            Assert.Equal(ten, "вариантов");
        }

        [Fact]
        public void IsViewHelper_IsOdd()
        {
            var itsOdd = ViewHelper.IsOdd(1);
            var itsNotOdd = ViewHelper.IsOdd(2);
            Assert.Equal(itsOdd, true);
            Assert.Equal(itsNotOdd, false);
        }
    }
}
