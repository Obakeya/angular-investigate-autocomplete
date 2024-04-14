import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, MatAutocompleteModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
