/* eslint no-undef: "off" */

import delay from './delay';
import breadcrumbs from '../__fakeData__/breadcrumbs';

class BreadcrumbsApi {
  static getForumBreadcrumbs(forumId) {
    let result;
    if (!forumId) {
      result = [];
    }
    else if(parseInt(forumId)<10){
      result = [
        breadcrumbs[0],
        {path: `/Conference/Forum/${forumId}`, title: `Forum id #${forumId}`, level: 2}
      ];
    }
    else if(parseInt(forumId)>=10 && parseInt(forumId)<100 ){
      result = [
        breadcrumbs[0],
        {path: `/Conference/Forum/${Math.floor(parseInt(forumId)/10)}`, title: `Forum id #${Math.floor(parseInt(forumId)/10)}`, level: 2},
        {path: `/Conference/Forum/${forumId}`, title: `Forum id #${forumId}`, level: 3}
      ];
    }

    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(Object.assign([], result));
      }, delay);
    });
  }

  static getTopicBreadcrumbs(topicId) {
    let result;
    if (!topicId) {
      result = [];
    }
    else if(parseInt(topicId)<10){
      result = [
        breadcrumbs[0],
        {path: `/Conference/Forum/${topicId}`, title: `Forum id #${topicId}`, level: 2},
        {path: `/Conference/Topic/${topicId}`, title: `Topic id #${topicId}`, level: 3}
      ];
    }
    else if(parseInt(topicId)>=10 && parseInt(topicId)<100 ){
      result = [
        breadcrumbs[0],
        {path: `/Conference/Forum/${Math.floor(parseInt(topicId)/10)}`, title: `Forum id #${Math.floor(parseInt(topicId)/10)}`, level: 2},
        {path: `/Conference/Forum/${topicId}`, title: `Forum id #${topicId}`, level: 3},
        {path: `/Conference/Topic/${topicId}`, title: `Topic id #${topicId}`, level: 4}
      ];
    }

    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(Object.assign([], result));
      }, delay);
    });
  }
}

export default BreadcrumbsApi;
