
import {MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule],
    exports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule],
})
export class MaterialModule { }
