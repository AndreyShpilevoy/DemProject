const posts =
[
  {
    id: 1,
    postTime: new Date("2015/01/01 10:10:10"),
    subject: "subject 2",
    message: "Народ, кто может прислать скрины такого плана автомобилей из модов?\r\n[spoiler][img]http://cs615717.vk.me/v615717358/f843/NoO3LUHNbYE.jpg[/img][/spoiler]\r\nНу там &quot;Бульдога&quot; и прочих, которых не было в оригинале.\r\nНадо для настолки.",
    rate: 5,
    userInfo: {
      id: 1,
      name: "Buba",
      avatar: "http://i70.fastpic.ru/big/2015/0628/36/ccbb1e2cb8ba8dbd379a6a12dc6b8336.jpg",
      groupColor: "00AA00",
    },
    editInfo: null,
    signature: "[img]http://forums.euw.leagueoflegends.com/board/attachment.php?attachmentid=186257[/img]"
  },
  {
    id: 2,
    postTime: new Date("2015/01/02 10:10:10"),
    subject: "subject 3",
    message: "Вот вам тема для &quot;беседы&quot;:\r\nЕсли кто пройдёт какой-нибудь рут [b]Clannad[/b] без использования подсказок хотя бы с трёх попыток, не слив его в &quot;Ничего нового не будет, ничто не изменится.&quot; - я сожру свои дырявые ботинки!",
    rate: 2,
    userInfo: {
      id: 2,
      name: "Bykawka",
      avatar: null,
      groupColor: "fbeab2",
    },
    editInfo: null,
    signature: null
  },
  {
    id: 3,
    postTime: new Date("2015/01/03 10:10:10"),
    subject: null,
    message: "[b]Golden_Fox[/b], видимо некорректно отработала кнопка \r\n[code][url][/url][/code]\r\n\r\nВ итоге в БД ушло:\r\n[code][b]Хотите[/b] общаться с лисом - идите к нему в стим или вк:\r\n[url=http://]http://steamcommunity.com/profiles/76561198013411783/[/url]\r\n[url=http://]https://vk.com/asx1347[/url]\r\n\r\nКто не в курсе, ВК подвезли немножко допиленную версию, можно включить там, внизу страницы: [url]https://new.vk.com/blog[/url][/code]\r\n\r\nЭта кнопка, каки все остальные, будут переписаны при переезде на AngularJS или ReactJS.",
    rate: 4,
    userInfo: {
      id: 3,
      name: "Agent005",
      avatar: "https://pp.vk.me/c9558/u61600334/a_153d373f.jpg",
      groupColor: "ff00ff",
    },
    editInfo: {
      userId: 5,
      userName: "kto",
      userGroupColor: "ffa510",
      editReason: "Сосиска. П.п.2",
      editCount: 1
    },
    signature: "Бла-бла-бла"
  },
  {
    id: 4,
    postTime: new Date("2015/01/04 10:10:10"),
    subject: "subject 5",
    message: "[u][right][b]Ну[/b] [i]надо[/i] [u]же[/u], [s]работает[/s][/right][/u]\r\n[spoiler][media]https://youtu.be/WHBbt-Qk6mk[/media][/spoiler]",
    rate: 343,
    userInfo: {
      id: 4,
      name: "ololoid",
      avatar: "http://i72.fastpic.ru/big/2015/0522/10/f93fff451e934900bfb1463615b5b310.png",
      groupColor: "99ccff",
    },
    editInfo: null,
    signature: null
  },
  {
    id: 5,
    postTime: new Date("2015/01/05 10:10:10"),
    subject: "subject 1",
    message: "text before tag 01 [img]http://i69.fastpic.ru/big/2015/0729/7e/6a397a33426917b4087e403270383c7e.gif[/img] [U]text in [color='red']tag[/color] 11 [b]text in tag 21[/b] [u]text in tag 22[/u]\r\ntext beetwin tags 12 [b]text in tag 23[/b] [/U][code]ss[b]g[/b]fsfdgdfg[/code] tar\r\n [img]http://i69.fastpic.ru/big/2015/0729/7e/6a397a33426917b4087e403270383c7e.gif\r\nhttp://i69.fastpic.ru/big/2015/0729/7e/6a397a33426917b4087e403270383c7e.gif\r\nhttp://i69.fastpic.ru/big/2015/0729/7e/6a397a33426917b4087e403270383c7e.gif\r\nhttp://i69.fastpic.ru/big/2015/0729/7e/6a397a33426917b4087e403270383c7e.gif[/img] [quote]blah blah [quote]blah  blah [i]ta[u]r[/u]am[/i] param[/quote] [b]ta[i]r[/i]am[/b] param[/quote]",
    rate: 0,
    userInfo: {
      id: 5,
      name: "kto",
      avatar: "http://i69.fastpic.ru/big/2015/0729/7e/6a397a33426917b4087e403270383c7e.gif",
      groupColor: "ffa510",
    },
    editInfo: {
      userId: 5,
      userName: "kto",
      userGroupColor: "ffa510",
      editReason: "gust for lulz",
      editCount: 1
    },
    signature: "__________!///_ _____\r\n_________( @@ )_____\r\n_______ooO-(_)-o o____\r\nПришёл, увидел, забанил. Ещё вопросы?"
  },
];

export default posts;
