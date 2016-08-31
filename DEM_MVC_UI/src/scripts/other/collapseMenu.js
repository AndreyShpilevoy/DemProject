import root from "lodash/_root";

const collapseMenu = {
  menuToggleButtonId: "",
  menuContentId: "",
  init: (menuToggleButtonId, menuContentId) => {
    collapseMenu.menuToggleButtonId = menuToggleButtonId;
    collapseMenu.menuContentId = menuContentId;

    root.document.addEventListener("click", (event) => {
      let eventTarget = event.target;
      if(eventTarget.id === collapseMenu.menuToggleButtonId || eventTarget.parentNode.id === collapseMenu.menuToggleButtonId ){
        collapseMenu.toggle();
      } else {
        collapseMenu.hide();
      }
    });
  },
  getNavMenuContent: () => {
    let navMenuContent = root.document.getElementById(collapseMenu.menuContentId);
    return navMenuContent;
  },
  toggle: () => {
    let navMenuContent = collapseMenu.getNavMenuContent();
    if(navMenuContent.classList.contains("openCollapsedMenu")){
      collapseMenu.hide();
    } else {
      collapseMenu.show();
    }
  },
  show: () => {
    let navMenuContent = collapseMenu.getNavMenuContent();
    navMenuContent.classList.add("openCollapsedMenu");
  },
  hide: () => {
    let navMenuContent = collapseMenu.getNavMenuContent();
    navMenuContent.classList.remove("openCollapsedMenu");
  }
};

export default collapseMenu;
