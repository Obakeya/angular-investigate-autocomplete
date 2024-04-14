import { Component, ElementRef, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { startWith, map } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('input') input!: ElementRef

  salesReps: string[] = ['James', 'Mike', 'Tom', 'Greg']

  salesRepCtrl = new FormControl()
  filteredSalesReps = this.salesRepCtrl.valueChanges.pipe(
    startWith(''),
    map(rep => (rep ? this.filterReps(rep) : this.salesReps.slice()))
  )

  filterReps (name: string) {
    return this.salesReps.filter(
      rep => rep.toLowerCase().indexOf(name.toLowerCase()) === 0
    )
  }

  onBlur (event: FocusEvent) {
    this.adjustControlValue(event)
  }

  adjustControlValue (event: FocusEvent) {
    const target = event.relatedTarget as HTMLElement
    if (target && target.tagName === 'MAT-OPTION') {
      this.salesRepCtrl.setValue(target.textContent)
    }
  }
}
