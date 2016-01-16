using Autofac.Extras.Moq;
using DEM_MVC_BL.Services;
using Unit_Tests.BaseTest;

namespace Unit_Tests.Tests
{
    public class DataLoadServiceTests : UnitTestBase
    {
        private DataLoadService _dataLoadService;

        public DataLoadServiceTests()
        {
            using (var mock = AutoMock.GetLoose())
            {
                _dataLoadService = mock.Create<DataLoadService>();
            }
        }

        //[Fact]
        //public void IsGetAllForumTableViewModels()
        //{
        //    #region  create DataTable

        //    var dataTable = new DataTable();
        //    var columnsNameList =
        //        "ForumId;ParentId;Title;Description;DisplaySubForums;DisplayOnIndex;TopicsCount;PostsCount;LastPostTime;UserId;Username;Groupcolor;LastTopicTitle;LastPostId;ForumOrder"
        //            .Split(';').ToList();
        //    foreach (var columnsName in columnsNameList)
        //    {
        //        dataTable.Columns.Add(columnsName, typeof(string));
        //    }

        //    var entitiesStringList =
        //        "8;31;Форум внеигрового общения;Общаемся на любые темы.\nЗапрещены реклама и варьёз.;True;True;4391;73;8/24/2015 02:02:15 PM;513;MATT;99ccff;Как вы выключаете ПК?;79306;0#9;5;Обсуждение модификаций;Раздел для общих и технических вопросов по модификациям.;True;True;4322;37;7/26/2015 05:53:58 AM;873;Apocalypse007;99ccff;Rusya_27 MOD for EMM113;78468;0#11;5;Вопросы по пакету SDK;Вопросы по созданию карт, квестов всего, что с ними связано.;True;True;743;7;7/12/2015 08:08:03 PM;1337;Ocelotik1;fbeab2;Вопросы по созданию карт;78096;0#17;12;Общие вопросы;Все вопросы касательно геймплея и мира игры Ex Machina в целом.;True;True;4113;26;8/17/2015 01:42:32 PM;1456;tamok;fbeab2;Идеи к Ex Machina -2 часть четвертая;79192;0#19;12;Технические вопросы;Вопросы технического характера по игре Ex Machina.;True;True;836;5;7/9/2015 01:59:45 PM;1595;GTRP;fbeab2;Починка слотов оружия неиграбельных машин.;77975;0#20;18;Общие вопросы;Все вопросы касательно геймплея и мира игры Ex Machina Меридиан 113 в целом.;True;True;1278;13;7/29/2015 12:53:09 PM;2336;Bykawka;fbeab2;Книги и звания в \"Мередиане 113\";78646;0#21;18;Технические вопросы;Вопросы технического характера по игре Ex Machina Меридиан 113.;True;True;280;13;5/19/2015 12:01:59 PM;2242;Furrai;fbeab2;Ошбка при загрузке.;76452;0#23;22;Общие вопросы;Все вопросы касательно геймплея и мира игры Ex Machina: Arcade в целом.;True;True;204;6;3/12/2015 06:03:12 PM;310;John;99ccff;Обсуждение Ex Machina ARCADE;74941;0#25;24;Правила сайта;Прежде чем начать общение - ознакомьтесь с правилами сайта.;True;True;2;1;4/22/2009 05:54:11 PM;66;kto;ffa510;Правила сайта;121;0#27;5;Вопросы по созданию модификаций;Задаём вопросы по созданию модификаций здесь.;True;True;3074;18;8/23/2015 09:48:44 AM;1708;ololoid;99ccff;Вопросы по созданию модов;79285;0#29;28;Предложения по работе сайта;Раздел для внесения предложений по дальнейшему развитию сайта.;True;True;53;2;8/10/2013 05:01:12 PM;66;kto;ffa510;Улучшение сайта;57876;0#30;22;Технические вопросы;Вопросы технического характера по игре Ex Machina: Arcade.;True;True;79;3;3/1/2015 12:28:48 AM;647;Raizor;fbeab2;А почему нет модов для Аркады?;74638;0#32;31;Игровой форум;Обсуждаем любые игры.\nЗапрещены ссылки на скачивание игр, кряки и варьёз.;True;True;2868;117;8/23/2015 09:40:27 PM;310;John;99ccff;Borderlands 2;79297;0#39;28;Багтрекер;Раздел для оповещения о найденных ошибках сайта.;True;True;1;1;5/1/2011 10:35:34 AM;150;Seel;ffa510;Багтрекер;43880;0#40;48;Форумная игра;;True;True;1;1;9/28/2011 08:12:36 PM;150;Seel;ffa510;Реконструкция.;48707;0#41;48;Форумная игра. Сезон 2;;True;True;629;23;8/24/2011 01:19:59 AM;150;Seel;ffa510;Пожелания и предложения;48053;0#42;5;Вопросы по созданию моделей;Вопросы по созданию моделей, конвертированию в игру и всего что с этим связано.;True;True;862;4;7/15/2015 03:48:32 AM;1343;Роман Атаман;fbeab2;Модели и идеи;78158;0#45;53;FAQ;FAQ по серии игр Ex Machina.;True;False;227;18;7/7/2015 10:07:19 PM;292;kosty-x17;99ccff;Видеоуроки по M3DEditor;77874;0#48;47;Корзина;;True;False;0;0;;;;;;;0#49;24;Новости сайта;Новостной раздел сайта.;True;False;887;27;8/22/2015 10:06:51 AM;150;Seel;ffa510;Конверсия Ex Machina на Меридиан 113;79274;0#50;49;Голосования;Раздел для голосований на Главной страницы.;True;False;79;14;3/7/2015 07:25:18 AM;310;John;99ccff;Голосование \"Самый лучший Фан-Арт\";74803;0#51;49;Объявления;Раздел для объявлений на Главной страницы.;True;False;0;0;;;;;;;0#53;24;Системный раздел для главной;В разделе публикуются статьи, файлы, FAQ и другие полезности для Главной страницы.;True;False;0;0;;;;;;;0#54;53;Юзербары;;True;False;1;1;8/8/2013 08:49:25 PM;66;kto;ffa510;Юзербары;57832;0#55;53;О игре;;True;False;36;5;6/23/2015 07:21:55 PM;1708;ololoid;99ccff;Ex Machina;77257;0#56;53;Видео;Видео по миру игр серии Ex Machina.;True;False;7;7;8/9/2013 04:38:25 PM;66;kto;ffa510;Рекламный ролик Ex Machina;57844;0#63;5;Каталог моделей и исходников;Выкладываем свои модели и исходники к ним здесь.\nПравила раздела внутри.;True;False;9;6;4/6/2015 08:24:16 AM;66;kto;ffa510;Охотник - 3 кабины - 9 моделей;75479;0#64;8;Самопал;Делимся своими самопальными проектами.\nВ пост апокалиптическом мире мы должны уметь возрождать и приспосабливать древние механизмы.;True;True;168;17;7/11/2015 10:05:05 AM;320;Lertu;99ccff;Лигерад Nusume;78049;0#65;53;Рассказы;Рассказы основанные на миру игры Ex Machina.;True;False;23;6;5/5/2015 05:29:27 AM;1708;ololoid;99ccff;Chronicles Postapocalypse: Equestria;76132;0#66;45;Устаревшие FAQ;FAQ по серии игр Ex Machina, которые устарели после выхода более актуальных FAQ.;True;False;24;7;6/14/2015 02:03:39 AM;2272;Lex_Wen;fbeab2;StarForce - Ошибка на Windows 7;77063;0#67;8;Архив форумки;Архив двух сезонов форумной ролевой игры за 2009ый и 2011ый год;True;True;1052;16;8/18/2014 03:24:56 AM;150;Seel;ffa510;Идеи для новой \"текстовой\" ролевой игры;68761;0#68;53;Каталог файлов;;True;False;0;0;;;;;;;0#69;68;Модификации Ex Machina;;True;False;1033;28;8/2/2015 08:35:52 PM;1708;ololoid;99ccff;kto MOD 5.0;78791;0#70;68;Модификации Ex Machina Меридиан 113;;True;False;35;4;12/7/2014 08:29:38 AM;1978;Alexam850;fbeab2;Rusya_27 MOD;72172;0#71;68;SDK и другие программы;;True;False;40;7;7/1/2014 07:55:37 PM;66;kto;ffa510;WXE (Weapon Xml Editor);69796;0#72;68;Патчи;;True;False;13;2;7/2/2015 03:26:45 AM;2300;sanel;fbeab2;Патчи Ex Machina Меридиан 113;77526;0#73;68;Лаунчеры;;True;False;62;1;8/1/2015 09:19:11 AM;231;Golden_Fox;99ccff;Лаунчеры для всех игр серии ExMachina (Мод-Менеджер);78761;0#74;68;Разное;;True;False;69;6;3/4/2015 03:50:56 PM;281;Faktor;99ccff;Структура оригинального сценария (3 концовки);74762;0#24;0;Административный раздел;;True;True;0;0;;;;;;;1#12;0;Ex Machina;;True;True;0;0;;;;;;;2#18;0;Ex Machina Меридиан 113;;True;True;0;0;;;;;;;3#22;0;Ex Machina: Arcade;;True;True;0;0;;;;;;;4#5;0;Модификации для игр серии Ex Machina;;True;True;0;0;;;;;;;5#31;0;Общалка;;True;True;0;0;;;;;;;6#28;0;Технический раздел;;True;True;0;0;;;;;;;7#47;0;Корзина;;True;False;0;0;;;;;;;8"
        //            .Split('#').ToList();
        //    List<string[]> listparams = new List<string[]>();
        //    foreach (var entitiesString in entitiesStringList)
        //    {
        //        listparams.Add(entitiesString.Split(';'));
        //    }
        //    foreach (var paramslist in listparams)
        //    {
        //        var workRow = dataTable.NewRow();
        //        for (int i = 0; i < paramslist.Length; i++)
        //        {
        //            workRow[i] = paramslist[i];
        //        }
        //        dataTable.Rows.Add(workRow);
        //    }

        //    #endregion

        //    var uowMocked = new Mock<IUnitOfWork>();
        //    _uowFactoryMocked.Setup(fw => fw.Create()).Returns(uowMocked.Object);
        //    _forumEntityRepository.Setup(x => x.GetAllForums(uowMocked.Object)).Returns(dataTable);

        //    var o = _dataLoadService.GetAllForumTableViewModels();


        //    Assert.NotEqual(o, null);
        //}
    }
}