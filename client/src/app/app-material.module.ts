import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
    MatSnackBarModule, MatListModule, MatChipsModule, MatMenuModule, MatSliderModule, MatTableModule, MatSortModule, MatSlideToggleModule],
  exports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
    MatSnackBarModule, MatListModule, MatChipsModule, MatMenuModule, MatSliderModule, MatTableModule, MatSortModule, MatSlideToggleModule],
})
export class MaterialModule {
}
