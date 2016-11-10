import root from 'lodash/_root';

class ToggleClass {
  init(toggleButtonId, contentElementId, classForToggle, itsMenu = false) {
    let button = root.document.getElementById(toggleButtonId);
    let contentElement = root.document.getElementById(contentElementId);
    button.addEventListener('click', ()=>{this.toggle(contentElement, classForToggle);});

    if(itsMenu){
      root.document.addEventListener('click', (event) => {
        //second param in 'if' statement needed if we click by items that contains in button
        if (event.target.id !== toggleButtonId && event.target.parentNode.id !== toggleButtonId)
        {
          this.hide(contentElement, classForToggle);
        }
      });
    }
  }

  toggle(contentElement, classForToggle){
    if(contentElement.classList.contains(classForToggle)){
      this.hide(contentElement, classForToggle);
    } else {
      this.show(contentElement, classForToggle);
    }
  }

  show(contentElement, classForToggle){
    contentElement.classList.add(classForToggle);
  }

  hide(contentElement, classForToggle){
    contentElement.classList.remove(classForToggle);
  }
}
export default new ToggleClass();
