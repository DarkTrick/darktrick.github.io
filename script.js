

function getHeaders(){
  const headersToCollect = ["H1","H2","H3"];
  const rootContainer = document.body;
  const headers = [];
  let nextHeaderId = 0;

  const collectHeaders = (element) => {
    if(!element) return;

    const tag = element.tagName.toUpperCase();

    if(headersToCollect.indexOf(tag) >= 0) {
      headers.push(element);

      // set header Id to reference later from menu
      element.id = "header_" + nextHeaderId;
      ++nextHeaderId;
    }


    if(!element.children) return;
    for (let i = 0; i< element.children.length; ++i){
      const child = element.children[i];
      collectHeaders(child);
    }
  }

  collectHeaders(rootContainer);

  return headers;
}

function createSideMenu(root){
  /*const menu = document.createElement("div");
  menu.id = "menu";
  menu.classList.add = "menu";
  root.appendChild(menu);//*/
  const menu = document.getElementById("menu");

  const headers = getHeaders();
  const menuItems = document.createElement("div");
  menuItems.innerHTML = headers.map((header) => {
    const className = "menu" + header.tagName.toUpperCase();
    const content = header.textContent;
    const link = "#" + header.id;
    return "<div class='" + className + "'><a href=" + link + ">" + content + "</a></div>";
  }).join("");


  const menuShowButton = document.createElement("div");
  menuShowButton.classList.add("menuButton");
  menuShowButton.textContent = ">";
  menuShowButton.addEventListener("click", () => {
    menu.classList.remove("hiddenMenu");
    content.classList.remove("contentWithHiddenMenu");
    menuHideButton.style.display = "block";
    menuShowButton.style.display = "none";
    menuItems.style.display = "block";
  });
  menuShowButton.style.display = "none";

  const menuHideButton = document.createElement("div");
  menuHideButton.classList.add("menuButton");
  menuHideButton.textContent = "<";
  menuHideButton.addEventListener("click", () => {
    menu.classList.add("hiddenMenu");
    content.classList.add("contentWithHiddenMenu");
    menuHideButton.style.display = "none";
    menuShowButton.style.display = "block";
    menuItems.style.display = "none";
  })

  menu.appendChild(menuShowButton);
  menu.appendChild(menuHideButton);
  menu.appendChild(menuItems);
}

function showMenu(){
  setMenu(true);
}

function hideMenu(){
  setMenu(false);
}

function setMenu(show){
  const menu = document.getElementById("menu");
  const content = document.getElementById("content");
  const menuItems = document.getElementById("menuItems");
  const menuToggleButton = document.getElementById("menuToggleButton");

  // hide
  if (!show)
  {

    menu.classList.add("hiddenMenu");
    content.classList.add("contentWithHiddenMenu");
    menu.addEventListener("click", showMenu);
    menu.removeEventListener("click", hideMenu);
    menuItems.style.visibility = "hidden";
    menuToggleButton.style.visibility = "visible";

    return;
  }

  menu.classList.remove("hiddenMenu");
  content.classList.remove("contentWithHiddenMenu");
  menu.removeEventListener("click", showMenu);
  menu.addEventListener("click", hideMenu);
  menuItems.style.visibility = "visible";
  menuToggleButton.style.visibility = "hidden";
}

createSideMenu(document.body);
//hideMenu();