export const menus = {
  userProfile: [
    { id: 1, label: "Profile", icon: "User", url: "/auth/profile" },
    { id: 2, label: "Add Account", icon: "Edit", url: "" },
    { id: 3, label: "Reset Password", icon: "Lock", url: "" },
    { id: 4, label: "Help", icon: "HelpCircle", url: "/auth/help" },
    { id: 5, label: "Logout", icon: "ToggleRight", url: "/auth/signout" },
  ],
  sideMenu: [
    { icon: "Home", title: "Dashboard", pathname: "/" },
    {
      icon: "Package2",
      title: "Products",
      subMenu: [
        { icon: "Zap", pathname: "/products-list", title: "Product List" },
        {
          icon: "GalleryHorizontalEnd",
          pathname: "/products-images",
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
  ],
};
