import _ from "lodash";
import root from "lodash/_root";

// add shrink class for nav element on page scrolling
class ShrinkingHeader {
  init(){
    let header = root.document.getElementById("header");
    if(!root.document.onscroll && header){
       root.document.onscroll = _.throttle(() => {
        if(root.pageYOffset > 50) {
          header.classList.add("nav-shrink");
        } else {
          header.classList.remove("nav-shrink");
        }
      }, 250);
    }
  }
}

export default new ShrinkingHeader();
