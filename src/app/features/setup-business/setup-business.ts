import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelectionListChange } from '@angular/material/list';
// Use TWO dots levels to get back to 'app' from 'features/setup-business'
import { SetupBusinessService, BusinessType } from '../../core/services/setup-business/setup-business-service';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-setup-business',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './setup-business.html',
  styleUrls: ['./setup-business.css']
})
export class SetupBusinessComponent implements OnInit {
  businessTypes: BusinessType[] = [];
  selectedIds: number[] = [];

  constructor(
    private service: SetupBusinessService, // This will work once path is fixed
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getBusinessTypes().subscribe((types: BusinessType[]) => {
      this.businessTypes = types;
    });
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.selectedIds = event.source.selectedOptions.selected.map((option: any) => option.value);
  }

  finish() {
    this.service.saveSubscriptions(this.selectedIds).subscribe({
      next: () => this.router.navigate(['/merchantdashboard']),
      error: (err: any) => console.error('Error saving sectors', err)
    });
  }
}
