import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SearchPageComponent } from './pages/search-page/search-page.component';

import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
