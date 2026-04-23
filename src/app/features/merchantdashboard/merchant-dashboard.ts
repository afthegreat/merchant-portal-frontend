import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MOCK_BUSINESS_TYPES, BusinessType, Item, ItemVariant } from '../../core/models/mock-data';

@Component({
  selector: 'app-merchant-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './merchant-dashboard.html',
  styleUrls: ['./merchant-dashboard.css']
})
export class MerchantDashboardComponent implements OnInit {
  businessTypes: BusinessType[] = [];
  expandedItemId: number | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.businessTypes = MOCK_BUSINESS_TYPES;
  }

  navigateToAddItem() {
    this.router.navigate(['/registeritem']);
  }

  toggleItemExpansion(itemId: number) {
    if (this.expandedItemId === itemId) {
      this.expandedItemId = null;
    } else {
      this.expandedItemId = itemId;
    }
  }

  editVariant(variant: ItemVariant, event: Event) {
    event.stopPropagation();
    console.log('Edit Variant:', variant);
    // In a real application, you'd open a dialog or navigate to an edit form
  }

  deleteVariant(variant: ItemVariant, item: Item, event: Event) {
    event.stopPropagation();
    console.log('Delete Variant:', variant);
    item.variants = item.variants.filter(v => v.id !== variant.id);
  }
}
