const forums = [
  {
    id: 10,
    order: 1,
    title: 'Общие вопросы',
    description: 'Все вопросы касательно геймплея и мира игры Ex Machina в целом.',
    topicsCount: 26,
    postsCount: 4113,
    lastTopicInfo: {
      lastActiveTopicId: 1,
      lastActiveTopic: 'Идеи к Ex Machina -2 часть четвертая',
      latesPostTimeCreation: new Date('2015/08/17 13:42:32'),
      latesPostAutorId: 1,
      latesPostAutorName: 'kto',
      latesPostAutorGroupColor: 'ffa510',
    },
    subForumArray: [
      {id: 11, title: 'Самопал', order: 2},
      {id: 12, title: 'Архив форумки', order: 1}
    ]
  },
  {
    id: 20,
    order: 2,
    title: 'Технические вопросы',
    description: 'Вопросы технического характера по игре Ex Machina.',
    topicsCount: 13,
    postsCount: 857,
    lastTopicInfo: {
      lastActiveTopicId: 2,
      lastActiveTopic: 'Проблемы с игрой',
      latesPostTimeCreation: new Date('2016/9/22 12:53:09'),
      latesPostAutorId: 2,
      latesPostAutorName: 'Bykawka',
      latesPostAutorGroupColor: 'fbeab2'
    }
  },
  {
    id: 30,
    order: 3,
    title: 'Обсуждение модификаций',
    description: 'Раздел для общих и технических вопросов по модификациям.',
    topicsCount: 37,
    postsCount: 4328,
    lastTopicInfo: {
      lastActiveTopicId: 3,
      lastActiveTopic: 'Hard Truck Apocalypse MOD 1.7SE',
      latesPostTimeCreation: new Date('2014/07/02 23:11:31'),
      latesPostAutorId: 3,
      latesPostAutorName: 'ololoid',
      latesPostAutorGroupColor: '99ccff'
    },
    subForumArray: [
      {id: 31, title: 'Багтрекер', order: 27}
    ]
  },
  {
    id: 40,
    order: 4,
    title: 'Вопросы по созданию моделей',
    description: 'Вопросы по созданию моделей, конвертированию в игру и всего что с этим связано.',
    topicsCount: 4,
    postsCount: 864,
    lastTopicInfo: {
      lastActiveTopicId: 4,
      lastActiveTopic: 'Exporter Ex Machina for Maya',
      latesPostTimeCreation: new Date('2007/09/06 22:33:09'),
      latesPostAutorId: 4,
      latesPostAutorName: 'Buba',
      latesPostAutorGroupColor: '00AA00'
    }
  },
  {
    id: 50,
    order: 5,
    title: 'Системный раздел для главной',
    description: 'В разделе публикуются статьи, файлы, FAQ и другие полезности для Главной страницы.',
    topicsCount: 93,
    postsCount: 1576,
    lastTopicInfo: {
      lastActiveTopicId: 5,
      lastActiveTopic: 'HD Textures',
      latesPostTimeCreation: new Date('2016/07/12 14:24:11'),
      latesPostAutorId: 5,
      latesPostAutorName: 'Agent005',
      latesPostAutorGroupColor: 'ff00ff'
    },
    subForumArray: [
      {id: 51, title: 'FAQ', order: 51},
      {id: 52, title: 'Юзербары', order: 52},
      {id: 53, title: 'О игре', order: 53},
      {id: 54, title: 'Видео', order: 54},
      {id: 55, title: 'Рассказы', order: 55},
      {id: 56, title: 'Каталог файлов', order: 56}
    ]
  }
];

export default forums;
