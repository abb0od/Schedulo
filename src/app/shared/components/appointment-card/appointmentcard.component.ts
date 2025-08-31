import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../interfaces/appointment.interface';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointmentcard.component.html',
  styleUrls: ['./appointmentcard.component.scss'],
})
export class AppointmentcardComponent implements OnInit {
  @Input() appointment!: Appointment;

  ngOnInit(): void {
    console.log(this.appointment);
  }
}
