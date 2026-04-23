import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface BusinessType {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SetupBusinessService {

  constructor(private http: HttpClient) { }

  // Mocking the list for now as requested
  getBusinessTypes(): Observable<BusinessType[]> {
    const mockTypes: BusinessType[] = [
      { id: 1, name: 'Retail', description: 'Physical products like electronics or clothes' },
      { id: 2, name: 'Utility', description: 'Services like electricity, water, or internet' },
      { id: 3, name: 'Rental', description: 'Houses, vehicles, or equipment rentals' },
      { id: 4, name: 'Service', description: 'Professional services like cleaning or consulting' }
    ];
    return of(mockTypes);
  }

  saveSubscriptions(selectedIds: number[]): Observable<any> {
    // This will hit your user_subscriptions junction table later
    console.log('Saving Business Type IDs:', selectedIds);
    return of({ success: true });
  }
}
