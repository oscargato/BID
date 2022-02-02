import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-dropdown-inner',
  templateUrl: './notifications-dropdown-inner.component.html',
  styleUrls: ['./notifications-dropdown-inner.component.scss'],
})
export class NotificationsDropdownInnerComponent implements OnInit {
  extrasNotificationsDropdownStyle: 'light' | 'dark' = 'dark';
  activeTabId:
    | 'topbar_notifications_notifications'
    | 'topbar_notifications_events'
    | 'topbar_notifications_logs' = 'topbar_notifications_notifications';
  constructor(private layout: LayoutService, private router: Router) {}

  ngOnInit(): void {
    this.extrasNotificationsDropdownStyle = this.layout.getProp(
      'extras.notifications.dropdown.style'
    );
  }

  setActiveTabId(tabId) {
    this.activeTabId = tabId;
  }

  getActiveCSSClasses(tabId) {
    if (tabId !== this.activeTabId) {
      return '';
    }
    return 'active show';
  }

  perfilUsuario(){

    this.router.navigate(['/tramites/user/1']);
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('tramiteId')
    localStorage.removeItem('id')
    localStorage.removeItem('rol')
    localStorage.removeItem('nombre')
    localStorage.removeItem('idFunc')
    this.router.navigate(['/auth/login'], { queryParams: {}, });
  }
}
