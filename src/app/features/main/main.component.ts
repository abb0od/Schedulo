import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierCardComponent } from '../../shared/components/supplier-card/supplier-card.component';
import { Supplier } from '../../interfaces/supplier.interface';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule, SupplierCardComponent],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    suppliers: Supplier[] = [
        {
            name: 'Dr. Sarah Johnson',
            businessName: 'Family Medicine Clinic',
            description: 'Experienced family physician with over 15 years of practice. Specializes in preventive care and chronic disease management.',
            image: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        {
            name: 'Dr. Michael Chen',
            businessName: 'Dental Care Center',
            description: 'Expert dentist offering comprehensive dental services including routine check-ups, cosmetic dentistry, and dental surgeries.',
            image: 'https://randomuser.me/api/portraits/men/2.jpg'      
        },
        {
            name: 'Dr. Emily Rodriguez',
            businessName: 'Pediatric Care Plus',
            description: 'Dedicated pediatrician providing comprehensive care for children from newborns to adolescents. Friendly and patient-centered approach.',
            image: 'https://randomuser.me/api/portraits/women/3.jpg'
        },
        {
            name: 'Dr. James Wilson',
            businessName: 'Physical Therapy & Rehabilitation',
            description: 'Specialized physical therapist with expertise in sports injuries, post-surgery rehabilitation, and chronic pain management.',
            image: 'https://randomuser.me/api/portraits/men/4.jpg'
        },
        {
            name: 'Dr. Lisa Thompson',
            businessName: "Women's Health Center",
            description: "Experienced gynecologist providing comprehensive women's health services, prenatal care, and preventive screenings.",
            image: 'https://randomuser.me/api/portraits/women/5.jpg'
        },
        {
            name: 'Dr. Robert Kim',
            businessName: 'Mental Health & Wellness',
            description: 'Licensed psychologist specializing in anxiety, depression, and stress management. Offering both in-person and virtual consultations.',
            image: 'https://randomuser.me/api/portraits/men/6.jpg'  
        }
    ];
}