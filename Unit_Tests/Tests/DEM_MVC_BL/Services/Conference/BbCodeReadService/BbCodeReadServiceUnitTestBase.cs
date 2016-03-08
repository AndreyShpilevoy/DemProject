using System.Collections.Generic;
using Autofac.Extras.Moq;
using DEM_MVC_BL.Interfaces.IServices;
using DEM_MVC_BL.Interfaces.IServices.Common;
using DEM_MVC_BL.Interfaces.IServices.Conference;
using DEM_MVC_BL.Models.BbCodeModels;
using DEM_MVC_DAL.Entities.BbCodeEntities;
using DEM_MVC_DAL.Interfaces.IFactory;
using DEM_MVC_DAL.Interfaces.IRepositories;
using Unit_Tests.BaseTest;

namespace Unit_Tests.Tests.DEM_MVC_BL.Services.BbCodeModelHelper_Tests
{
    public abstract class BbCodeReadServiceUnitTestBase : UnitTestBase
    {

        protected readonly IBbCodeRepository BbCodeRepository;
        protected readonly IConnectionFactory ConnectionFactory;
        protected readonly IAppCacheService AppCache;

        protected BbCodeReadServiceUnitTestBase()
        {
            using (var mock = AutoMock.GetLoose())
            {

                ConnectionFactory = mock.Create<IConnectionFactory>();
                mock.Mock<IBbCodeRepository>().Setup(x => x.GetAllBbCodes(ConnectionFactory)).Returns(new List<BbCodeEntity>()
                {
                    new BbCodeEntity()
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
                    new BbCodeEntity()
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
                    new BbCodeEntity()
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
                BbCodeRepository = mock.Create<IBbCodeRepository>();
                AppCache = mock.Create<IAppCacheService>();

            }
        }
    }
}