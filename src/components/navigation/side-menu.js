import { slideDown, slideUp } from "@/utils/helper";

// Setup side menu
const findActiveMenu = (subMenu, location) => {
  let match = false;

  subMenu.forEach((item) => {
    if (location.startsWith(item.pathname) && !item.ignore) {
      match = true;
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, location);
    }
  });
  return match;
};

const nestedMenu = (menu, location) => {
  const formattedMenu = [];

  menu.forEach((item) => {
    if (typeof item !== "string") {
      const menuItem = {
        icon: item.icon,
        title: item.title,
        pathname: item.pathname,
        subMenu: item.subMenu,
        ignore: item.ignore,
      };

      menuItem.active =
        (menuItem.pathname === location ||
          (menuItem.subMenu && findActiveMenu(menuItem.subMenu, location))) &&
        !menuItem.ignore;

      if (menuItem.subMenu) {
        menuItem.activeDropdown = findActiveMenu(menuItem.subMenu, location);

        //   Nested Menu
        const subMenu = [];
        nestedMenu(menuItem.subMenu, location).map(
          (menu) => typeof menu !== "string" && subMenu.push(menu)
        );
        menuItem.subMenu = subMenu;
      }
      formattedMenu.push(menuItem);
    } else {
      formattedMenu.push(item);
    }
  });
  return formattedMenu;
};

const linkTo = (menu, router) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    if (menu.pathname !== undefined) {
      router.push(menu.pathname);
    }
  }
};

const enter = (el) => slideDown(el, 300);

const leave = (el) => slideUp(el, 300);

export { nestedMenu, enter, leave, linkTo };
