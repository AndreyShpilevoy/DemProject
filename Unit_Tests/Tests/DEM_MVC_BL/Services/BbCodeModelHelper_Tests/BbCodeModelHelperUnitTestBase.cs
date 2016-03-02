using System.Collections.Generic;
using Autofac.Extras.Moq;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.Common;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Models.BbCodeModels;
using Unit_Tests.BaseTest;

namespace Unit_Tests.Tests.DEM_MVC_BL.Services.BbCodeModelHelper_Tests
{
    public abstract class BbCodeModelHelperUnitTestBase : UnitTestBase
    {

        protected readonly IBbCodeReadService BbCodeReadService;
        protected readonly IAppCacheService AppCache;

        protected BbCodeModelHelperUnitTestBase()
        {
            using (var mock = AutoMock.GetLoose())
            {

                mock.Mock<IBbCodeReadService>().Setup(x => x.GetAllBbCodeModels()).Returns(new List<BbCodeModel>()
                {
                    new BbCodeModel()
                    {
                        BbCodeHelpLine = "Жирный текст: [b]текст[/b]",
                        BbCodeMatch = @"\[b\](.*?)\[\/b\]",
                        BbCodeOnPosting = true,
                        BbCodeOrder = 1,
                        BbCodeRegexpOptions = "IgnoreCase/Compiled/Singleline",
                        BbCodeTag = "b",
                        BbCodeTemplate = "<span style=\"font-weight:bold; \">${1}</span>",
                        NoParse = false
                    },
                    new BbCodeModel()
                    {
                        BbCodeHelpLine = "Добавлено: [upd=Время][/upd]",
                        BbCodeMatch = @"\[upd=(.*?)\[\/upd\]",
                        BbCodeOnPosting = false,
                        BbCodeOrder = 2,
                        BbCodeRegexpOptions = "IgnoreCase/Compiled/Singleline",
                        BbCodeTag = "upd",
                        BbCodeTemplate = "<span style=\"font - size: 85 %; line - height: normal; color: #a7a7a7;\"><i>Добавлено:</i></span>",
                        NoParse = false
                    },
                    new BbCodeModel()
                    {
                        BbCodeHelpLine = "[code]код[/code]",
                        BbCodeMatch = @"\[code\](.*?)\[\/code\]",
                        BbCodeOnPosting = true,
                        BbCodeOrder = 3,
                        BbCodeRegexpOptions = "IgnoreCase/Compiled/Singleline",
                        BbCodeTag = "code",
                        BbCodeTemplate = "<dl class=\"codebox\"><dt>Код: <span>Ctrl+A, Ctrl+C</span></dt><dd><code>&nbsp; &nbsp;&nbsp; &nbsp;${1}</code></dd></dl>",
                        NoParse = true
                    }
                });
                BbCodeReadService = mock.Create<IBbCodeReadService>();
                AppCache = mock.Create<IAppCacheService>();

            }
        }
    }
}