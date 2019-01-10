import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Biểu Đồ',  icon: 'dashboard', class: '' },
    { path: '/table-list', title: 'Danh Sách',  icon:'content_paste', class: '' },
    { path: '/controller', title: 'Điều Khiển',  icon:'keyboard', class: '' },
    // { path: '/controller', title: 'Điều Khiển',  icon:'keyboard', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
