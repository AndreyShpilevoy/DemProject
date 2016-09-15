import root from "lodash/_root";

const ToggleClass = {
  init: (toggleButtonId, contentElementId, classForToggle, itsMenu = false) => {
    let button = root.document.getElementById(toggleButtonId);
    let contentElement = root.document.getElementById(contentElementId);
    button.onclick = () => {
      ToggleClass.toggle(contentElement, classForToggle);
    };
    if(itsMenu){
      root.document.addEventListener("click", (event) => {
        let eventTarget = event.target;
        //second param in if query needed if we click by items that contains in button
        if (eventTarget.id !== toggleButtonId && eventTarget.parentNode.id !== toggleButtonId)
        {
          ToggleClass.hide(contentElement, classForToggle);
        }
      });
    }
  },

  toggle: (contentElement, classForToggle) => {
    if(contentElement.classList.contains(classForToggle)){
      ToggleClass.hide(contentElement, classForToggle);
    } else {
      ToggleClass.show(contentElement, classForToggle);
    }
  },

  show: (contentElement, classForToggle) => {
    contentElement.classList.add(classForToggle);
  },

  hide: (contentElement, classForToggle) => {
    contentElement.classList.remove(classForToggle);
  }
};

export default ToggleClass;
