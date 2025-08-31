import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supplier } from '../../../interfaces/supplier.interface';
import { BookPopupComponent } from '../bookpopup/book.popup.component';
import { Appointment } from '../../../interfaces/appointment.interface';
@Component({
    selector: 'app-supplier-card',
    standalone: true,
    imports: [CommonModule, BookPopupComponent],
    templateUrl: './supplier-card.component.html',
    styleUrls: ['./supplier-card.component.scss']
})
export class SupplierCardComponent {
    @Input() supplier!: Supplier;

  showPopup = false;

  onBook() {
    this.showPopup = true;
  }

  handleClosePopup() {
    this.showPopup = false;
  }

  handleBookAppointment(appointment: Appointment) {
    console.log("Booked Appointment:", appointment);
    this.showPopup = false;
  }


}
