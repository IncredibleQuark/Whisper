
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
              MatSnackBarModule],
    exports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
              MatSnackBarModule],
})
export class MaterialModule { }
