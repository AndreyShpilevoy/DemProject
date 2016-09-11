import _ from "lodash";
import root from "lodash/_root";

let initialized = false; // init flag

// add shrink class for nav element on page scrolling
export default function ShrinkingHeader(){
  let header = root.document.getElementById("header");
  if(!initialized && header){
    root.document.addEventListener("scroll", _.throttle(() => {
      if(root.pageYOffset > 50) {
        header.classList.add("nav-shrink");
      } else {
        header.classList.remove("nav-shrink");
      }
    }, 250));
    initialized = true;
  }
}
