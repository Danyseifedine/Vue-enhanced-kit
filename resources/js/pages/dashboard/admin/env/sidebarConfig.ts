import { index } from "@/actions/App/Http/Controllers/Admin/IndexController";
import { NavItem } from "@/shared/types";
import {
    BookOpen, Folder,
    LayoutGrid
} from "lucide-vue-next";

/**
 * Configuration file for the sidebar component
 * This file contains all the configuration options for the sidebar
 */

/**
 * Controls whether the sidebar title is displayed
 */
export const ADMIN_SIDEBAR_TITLE_EXIST: boolean = true;

/**
 * The title displayed in the sidebar header
 */
export const ADMIN_SIDEBAR_TITLE: string = "Dany Seifeddine";

/**
 * Controls the padding of the sidebar menu items
 */
export const ADMIN_SIDEBAR_PADDING: string = "py-5";

/**
 * The variant of the sidebar to display
 * Available options: "inset", "floating", "sidebar"
 */
export const ADMIN_SIDEBAR_VARIANTS: "inset" | "floating" | "sidebar" = "inset";

/**
 * Controls the design style of the sidebar submenu
 * Available options: "tree", "bullet", "minimal", "glass", "neon"
 * - tree: Shows connecting lines between parent and children
 * - bullet: Uses dots and subtle visual cues
 * - minimal: Simple indentation without visual elements
 * - glass: Frosted glass effect with blurred backgrounds
 * - neon: Vibrant glowing borders and highlights
 */
export const ADMIN_SIDEBAR_SUBMENU_STYLE: "tree" | "bullet" | "minimal" | "glass" | "neon" = "tree";
/**
 * ? ONLY USED IF SIDEBAR_SUBMENU_STYLE IS "neon"
 *
 * The color of the neon border
 * Can be any valid CSS color (hex, rgb, hsl, etc.)
 */
export const ADMIN_SIDEBAR_NEON_BORDER_COLOR: string = "#d9ff00";

/**
 * Controls the direction of the sidebar
 * Available options: "left" | "right"
 * Automatically set based on the application locale
 */
export const ADMIN_SIDEBAR_DIRECTION: "left" | "right" = document.documentElement.dir === 'rtl' ? "right" : "left";

/**
 * Items displayed in the footer section of the sidebar
 * Each item requires title, href, and icon properties
 */
export const ADMIN_SIDEBAR_FOOTER_ITEMS: NavItem[] = [
    {
        title: 'Github Repo',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

/**
 * Main navigation items displayed in the sidebar
 * Each item requires title, href, and icon properties
 * Items can have children for nested navigation (dropdown)
 * Use isSection: true to create a section header
 */
export const ADMIN_SIDEBAR_MAIN_ITEMS: NavItem[] = [
    {
        title: 'Dashboard',
        href: index().url,
        icon: LayoutGrid,
    },
    {
        title: 'Projects',
        isSection: true,
    },
    {
        title: 'My Projects',
        href: "#",
        icon: Folder,
        children: [
            {
                title: 'Project 1',
                href: route('admin.settings.profile.edit'),
                icon: Folder,
            },
            {
                title: 'Project 2',
                href: route('admin.settings.appearance'),
                icon: Folder,
            },
        ],
    },
    {
        title: 'Notifications',
        isSection: true,
    },

];
