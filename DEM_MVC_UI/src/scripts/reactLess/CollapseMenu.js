import root from "lodash/_root";

const CollapseMenu = {
  menuToggleButtonId: "",
  menuContentId: "",
  init: (menuToggleButtonId, menuContentId) => {
    CollapseMenu.menuToggleButtonId = menuToggleButtonId;
    CollapseMenu.menuContentId = menuContentId;

    root.document.addEventListener("click", (event) => {
      let eventTarget = event.target;
      if(eventTarget.id === CollapseMenu.menuToggleButtonId || eventTarget.parentNode.id === CollapseMenu.menuToggleButtonId ){
        CollapseMenu.toggle();
      } else {
        CollapseMenu.hide();
      }
    });
  },
  getNavMenuContent: () => {
    let navMenuContent = root.document.getElementById(CollapseMenu.menuContentId);
    return navMenuContent;
  },
  toggle: () => {
    let navMenuContent = CollapseMenu.getNavMenuContent();
    if(navMenuContent.classList.contains("open-links")){
      CollapseMenu.hide();
    } else {
      CollapseMenu.show();
    }
  },
  show: () => {
    let navMenuContent = CollapseMenu.getNavMenuContent();
    navMenuContent.classList.add("open-links");
  },
  hide: () => {
    let navMenuContent = CollapseMenu.getNavMenuContent();
    navMenuContent.classList.remove("open-links");
  }
};

export default CollapseMenu;
