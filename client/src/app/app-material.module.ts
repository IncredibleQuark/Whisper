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
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
    MatSnackBarModule, MatListModule, MatChipsModule, MatMenuModule, MatSliderModule, MatTableModule, MatSortModule],
  exports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
    MatSnackBarModule, MatListModule, MatChipsModule, MatMenuModule, MatSliderModule, MatTableModule, MatSortModule],
})
export class MaterialModule {
}
