import root from "lodash/_root";

const ToggleClass = {
  init: (toggleButtonId, contentTargetId, classForToggle, itsMainMenu = false) => {
    let button = root.document.getElementById(toggleButtonId);
    button.onclick = () => {
      ToggleClass.toggle(contentTargetId, classForToggle);
    };
    if(itsMainMenu){
      root.document.addEventListener("click", (event) => {
        let eventTarget = event.target;
        if (eventTarget.id !== toggleButtonId && eventTarget.parentNode.id !== toggleButtonId)
        {
          ToggleClass.hide(contentTargetId, classForToggle);
        }
      });
    }
  },

  toggle: (contentTargetId, classForToggle) => {
    let navMenuContent = root.document.getElementById(contentTargetId);
    if(navMenuContent.classList.contains(classForToggle)){
      ToggleClass.hide(contentTargetId, classForToggle);
    } else {
      ToggleClass.show(contentTargetId, classForToggle);
    }
  },

  show: (contentTargetId, classForToggle) => {
    let navMenuContent = root.document.getElementById(contentTargetId);
    navMenuContent.classList.add(classForToggle);
  },
  
  hide: (contentTargetId, classForToggle) => {
    let navMenuContent = root.document.getElementById(contentTargetId);
    navMenuContent.classList.remove(classForToggle);
  }
};

export default ToggleClass;
