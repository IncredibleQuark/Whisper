
import {MatCardModule, MatTabsModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
    imports: [MatCardModule, MatTabsModule],
    exports: [MatCardModule, MatTabsModule],
})
export class MaterialModule { }
