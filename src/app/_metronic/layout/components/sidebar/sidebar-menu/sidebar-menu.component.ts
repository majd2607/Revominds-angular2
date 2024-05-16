import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  userRole: string;

  constructor() { }
  async ngOnInit() {
      // Retrieve userData from local storage
      const userData = localStorage.getItem('userData');
      console.log(userData);
      
      if (userData) {
        const user = JSON.parse(userData);
        this.userRole = user.role; // Assuming 'role' is the attribute containing the user's role
        console.log('role', this.userRole);
        
      }
    }
}
