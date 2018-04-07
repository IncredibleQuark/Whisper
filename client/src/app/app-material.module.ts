
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule],
    exports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule],
})
export class MaterialModule { }
