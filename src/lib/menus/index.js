const userProfile = [
  { id: 1, label: "Profile", icon: "User", url: "/profile" },
  { id: 2, label: "Add Account", icon: "Edit", url: "" },
  { id: 3, label: "Reset Password", icon: "Lock", url: "" },
  { id: 4, label: "Help", icon: "HelpCircle", url: "/profile/help" },
];
const sideMenu = [
  { icon: "Home", title: "Dashboard", pathname: "/" },
  {
    icon: "Package2",
    title: "Products",
    subMenu: [
      { icon: "Zap", pathname: "/products", title: "Product List" },
      {
        icon: "GalleryHorizontalEnd",
        pathname: "/products/images",
        title: "Product Images",
      },
    ],
  },
  "divider",
  {
    icon: "Users",
    title: "Users",
    subMenu: [
      {
        icon: "ScrollText",
        pathname: "/auth/users-list",
        title: "Users List",
      },
    ],
  },
];

const menus = { userProfile, sideMenu };

export default menus;
