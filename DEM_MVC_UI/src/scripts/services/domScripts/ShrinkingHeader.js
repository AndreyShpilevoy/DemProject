import _ from 'lodash';
import root from 'lodash/_root';

// add shrink class for nav element on page scrolling
class ShrinkingHeader {
  init(className){
    let header = root.document.getElementById('header');
    if(header){
       root.document.addEventListener('scroll', _.throttle(() => {
        if(root.pageYOffset > 50) {
          header.classList.add(className);
        } else {
          header.classList.remove(className);
        }
      }, 250));
    }
  }
}

export default new ShrinkingHeader();
