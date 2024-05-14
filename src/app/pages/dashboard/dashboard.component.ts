import { Component, ViewChild } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import ls from 'local-storage'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  
  userRole: string;
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor() {}

  async openModal() {
    return await this.modalComponent.open();
  }


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
