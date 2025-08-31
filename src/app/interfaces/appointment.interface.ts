export interface Appointment {
  supplierId:string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
}
