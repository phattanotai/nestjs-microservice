export type MENU_TYPE = {
  name: string;
  icon: string;
  path: string;
};

export const AM_MENU = {
  MENU_TH: [
    {
      name: "แดชบอร์ด",
      icon: "ni ni-tv-2 text-primary",
      path: "/dashboard",
    },
    {
      name: "จัดการสินค้า",
      icon: "ni ni-ui-04 text-green",
      path: "/products",
    },
    {
      name: "จัดการผู้ใช้",
      icon: "ni ni-bullet-list-67 text-red",
      path: "/reports",
    },
  ],
  MENU_EN: [
    {
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      path: "/dashboard",
    },
    {
      name: "Product Management",
      icon: "ni ni-pin-3 text-orange",
      path: "/products",
    },
    {
      name: "User Management",
      icon: "ni ni-bullet-list-67 text-red",
      path: "/reports",
    },
  ],
};

export const US_MENU = {
  MENU_TH: [
    {
      name: "แดชบอร์ด",
      icon: "ni ni-tv-2 text-primary",
      path: "/dashboard",
    },
    {
      name: "จัดการสินค้า",
      icon: "ni ni-ui-04 text-green",
      path: "/products",
    },
  ],
  MENU_EN: [
    {
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      path: "/dashboard",
    },
    {
      name: "Product Management",
      icon: "ni ni-pin-3 text-orange",
      path: "/products",
    },
  ],
};
