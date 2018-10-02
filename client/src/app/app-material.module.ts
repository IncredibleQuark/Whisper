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
  MatTabsModule,
  MatSidenavModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
    MatSnackBarModule, MatListModule, MatChipsModule, MatMenuModule, MatSliderModule, MatTableModule, MatSortModule, MatSlideToggleModule,
    MatSidenavModule],
  exports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
    MatSnackBarModule, MatListModule, MatChipsModule, MatMenuModule, MatSliderModule, MatTableModule, MatSortModule, MatSlideToggleModule,
    MatSidenavModule],
})
export class MaterialModule {
}
