
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
              MatSnackBarModule, MatListModule],
    exports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
              MatSnackBarModule, MatListModule],
})
export class MaterialModule { }
