import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { MOCK_BUSINESS_TYPES, BusinessType, Category, Subcategory } from '../../../core/models/mock-data';

@Component({
  selector: 'app-item-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './item-registration.html',
  styleUrls: ['./item-registration.css']
})
export class ItemRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  businessTypes: BusinessType[] = [];

  availableCategories: Category[] = [];
  availableSubcategories: Subcategory[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.businessTypes = MOCK_BUSINESS_TYPES;
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.fb.group({
      businessTypeId: ['', Validators.required],
      categoryId: ['', Validators.required],
      customCategoryName: [''],
      subcategoryId: [null], // Optional
      customSubcategoryName: [''],
      items: this.fb.array([])
    });

    // Listen to Business Type changes
    this.registrationForm.get('businessTypeId')?.valueChanges.subscribe(btId => {
      const selectedBt = this.businessTypes.find(bt => bt.id === btId);
      this.availableCategories = selectedBt ? selectedBt.categories : [];
      this.registrationForm.get('categoryId')?.reset();
      this.registrationForm.get('customCategoryName')?.reset();
      this.availableSubcategories = [];
    });

    // Listen to Category changes
    this.registrationForm.get('categoryId')?.valueChanges.subscribe(catId => {
      if (catId === 'custom') {
        this.availableSubcategories = [];
        this.registrationForm.get('subcategoryId')?.reset('custom');
        this.registrationForm.get('customCategoryName')?.setValidators([Validators.required]);
        this.registrationForm.get('customSubcategoryName')?.setValidators([Validators.required]);
      } else {
        const selectedCat = this.availableCategories.find(c => c.id === catId);
        this.availableSubcategories = selectedCat ? selectedCat.subcategories : [];
        this.registrationForm.get('subcategoryId')?.reset();
        this.registrationForm.get('customCategoryName')?.clearValidators();
        this.registrationForm.get('customCategoryName')?.reset();
      }
      this.registrationForm.get('customCategoryName')?.updateValueAndValidity();
    });

    // Listen to Subcategory changes
    this.registrationForm.get('subcategoryId')?.valueChanges.subscribe(subcatId => {
       if (subcatId === 'custom') {
         this.registrationForm.get('customSubcategoryName')?.setValidators([Validators.required]);
       } else {
         this.registrationForm.get('customSubcategoryName')?.clearValidators();
         this.registrationForm.get('customSubcategoryName')?.reset();
       }
       this.registrationForm.get('customSubcategoryName')?.updateValueAndValidity();
    });

    // Add exactly one item structure by default
    this.addItem();
  }

  // Quick Getter for FormArray
  get items(): FormArray {
    return this.registrationForm.get('items') as FormArray;
  }

  // --- Item Level ---
  addItem() {
    const itemGroup = this.fb.group({
      name: ['', Validators.required],
      unitOfMeasurement: ['', Validators.required],
      variantColumns: this.fb.array([]), // The names of custom headers, e.g. 'Color'
      variants: this.fb.array([]) // The actual dynamic rows
    });
    this.items.push(itemGroup);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // --- Dynamic Variant Columns ---
  getVariantColumns(itemIndex: number): FormArray {
    return this.items.at(itemIndex).get('variantColumns') as FormArray;
  }

  addColumnToItem(itemIndex: number, columnName: string) {
    if (!columnName.trim()) return;
    const columnsArray = this.getVariantColumns(itemIndex);
    // Add the column string definition
    columnsArray.push(this.fb.control(columnName));

    // After adding the column definition, we must add a matching form control to every existing variant
    const variantsArray = this.getVariants(itemIndex);
    variantsArray.controls.forEach((variantGroup: any) => {
      variantGroup.addControl(columnName, this.fb.control(''));
    });
  }

  removeColumnFromItem(itemIndex: number, colIndex: number) {
    const columnsArray = this.getVariantColumns(itemIndex);
    const columnName = columnsArray.at(colIndex).value;
    columnsArray.removeAt(colIndex);

    // Remove this control from all existing variants
    const variantsArray = this.getVariants(itemIndex);
    variantsArray.controls.forEach((variantGroup: any) => {
      variantGroup.removeControl(columnName);
    });
  }

  // --- Variants Level ---
  getVariants(itemIndex: number): FormArray {
    return this.items.at(itemIndex).get('variants') as FormArray;
  }

  addVariant(itemIndex: number) {
    const variantGroup: FormGroup = this.fb.group({
      unitPrice: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]]
    }) as FormGroup;

    // If there are custom columns assigned to this item, dynamically attach them
    const colDefinitions = this.getVariantColumns(itemIndex).value;
    colDefinitions.forEach((colName: string) => {
      variantGroup.addControl(colName, this.fb.control(''));
    });

    this.getVariants(itemIndex).push(variantGroup);
  }

  removeVariant(itemIndex: number, variantIndex: number) {
    this.getVariants(itemIndex).removeAt(variantIndex);
  }

  // --- Submission ---
  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted!', this.registrationForm.value);
      this.snackBar.open('Registered successfully!', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
      // You can redirect to merchant dashboard or reset the form
      setTimeout(() => this.router.navigate(['/merchantdashboard']), 2000);
    } else {
      this.snackBar.open('Please fill out all required fields properly.', 'Close', { duration: 3000 });
    }
  }

  navigateBack() {
    this.router.navigate(['/merchantdashboard']);
  }
}
