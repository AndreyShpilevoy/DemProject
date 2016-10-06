import topics from "./topics";

const lastActiveTopics = [
  Object.assign({}, topics[0], {parentForumId: 10, parentForumTitle: "Общие вопросы"}),
  Object.assign({}, topics[1], {parentForumId: 20, parentForumTitle: "Технические вопросы"}),
  Object.assign({}, topics[2], {parentForumId: 30, parentForumTitle: "Обсуждение модификаций"}),
  Object.assign({}, topics[3], {parentForumId: 40, parentForumTitle: "Вопросы по созданию моделей"}),
  Object.assign({}, topics[4], {parentForumId: 50, parentForumTitle: "Системный раздел для главной"})
];

export default lastActiveTopics;
