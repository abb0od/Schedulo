import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../interfaces/appointment.interface';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = 'http://localhost:5277/api/appointments';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('jwe_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }

  getForUser(userId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/user/${userId}`, this.getAuthHeaders());
  }

  getForSupplier(supplierId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/supplier/${supplierId}`, this.getAuthHeaders());
  }

  getById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  create(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment, this.getAuthHeaders());
  }

  update(id: string, appointment: Appointment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, appointment, this.getAuthHeaders());
  }

  updateStatus(id: string, status: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/status`, status, this.getAuthHeaders());
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
