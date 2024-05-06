import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { AutocompleteTestComponent } from './autocomplete-test/autocomplete-test.component'

@NgModule({
  declarations: [AppComponent, AutocompleteTestComponent],
  imports: [BrowserModule, ReactiveFormsModule, MatAutocompleteModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
