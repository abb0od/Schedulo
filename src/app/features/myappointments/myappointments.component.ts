import { Component } from '@angular/core';
import { Appointment } from '../../interfaces/appointment.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-myappointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myappointments.component.html',
  styleUrl: './myappointments.component.scss'
})
export class MyAppointmentsComponent {
constructor(private router: Router) {}
  appointments: Appointment[] = [
    {supplierId:'',
      title: 'Dentist Visit',
      description: 'Routine check-up and cleaning',
      date: new Date('2025-08-30'),
      time: '10:00 AM',
      location: 'Smile Clinic',
      status: 'scheduled'
    },
    {supplierId:'',
      title: 'Meeting with John',
      description: 'Discuss Q3 marketing strategy',
      date: new Date('2025-09-15'),
      time: '02:30 PM',
      location: 'Conference Room A',
      status: 'cancelled'
    }
  ];

  BookNow(){
        this.router.navigate(['/main']);
   }
}
