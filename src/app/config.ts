export enum Menu {
    HOME = "Trang chủ",
    PROJECT = "Dự án",
    SERVICE = "Dịch vụ",
    // SHOP = "Shop",
    ABOUT = "Về chúng tôi",
    BLOG = "Blog",
    CONTACT = "Liên hệ"
}

export type MenuItem = { routerLink: string, title: string, isActive: boolean }
export const NavMenu : MenuItem[] = [
    {
        title: Menu.HOME,
        routerLink: '/',
        isActive: false
    },
    {
        title: Menu.PROJECT,
        routerLink: '/project',
        isActive: false
    },
    {
        title: Menu.SERVICE,
        routerLink: '/service',
        isActive: false
    },
    {
        title: Menu.ABOUT,
        routerLink: '/about',
        isActive: false
    },
    {
        title: Menu.BLOG,
        routerLink: '/blog',
        isActive: false
    },
    {
        title: Menu.CONTACT,
        routerLink: '/contact',
        isActive: false
    }
]