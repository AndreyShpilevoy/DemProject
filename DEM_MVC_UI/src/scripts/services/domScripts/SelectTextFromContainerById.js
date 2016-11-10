import root from 'lodash/_root';

class SelectTextFromContainerById {
  init(toggleButtonId, contentElementId) {
    let button = root.document.getElementById(toggleButtonId);
    let contentElement = root.document.getElementById(contentElementId);
    button.addEventListener('click', ()=>{this.selectText(contentElement);});
  }

  selectText(contentElement){
    this.unSelectText();
    if (root.document.selection) {
      let range = root.document.body.createTextRange();
      range.moveToElementText(contentElement);
      range.select();
    }
    else if (root.getSelection) {
    let range = root.document.createRange();
    range.selectNode(contentElement);
    root.getSelection().addRange(range);
    }
  }

  unSelectText() {
    if (root.document.selection) {
      root.document.selection.empty();
    }
    else if (root.document.getSelection) {
      root.getSelection().removeAllRanges();
    }
  }
}
export default new SelectTextFromContainerById();
