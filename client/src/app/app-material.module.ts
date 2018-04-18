
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
              MatSnackBarModule, MatListModule, MatChipsModule],
    exports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
              MatSnackBarModule, MatListModule, MatChipsModule],
})
export class MaterialModule { }
