import { Component, inject } from '@angular/core'
import { FormControl } from '@angular/forms'
import { map, startWith } from 'rxjs'
import { SalesService } from '../sales.service'
import { Sales } from '../sales'

@Component({
  selector: 'app-autocomplete-test',
  templateUrl: './autocomplete-test.component.html',
  styleUrls: ['./autocomplete-test.component.css'],
  providers: [SalesService]
})
export class AutocompleteTestComponent {
  private readonly salesService = inject(SalesService)
  get salesRepositories (): Sales[] {
    return this.salesService.getSales()
  }

  salesCodeCtrl = new FormControl<string>('', { nonNullable: true })
  salesNameCtrl = new FormControl('')

  filteredSalesReps = this.salesCodeCtrl.valueChanges.pipe(
    startWith(''),
    map(input => this.filterReps(input))
  )

  setSalesCodeBlur (event: FocusEvent) {
    const target = event.relatedTarget as HTMLElement
    if (!this.optionSelected(target)) {
      this.setSalesCodeInner(this.salesCodeCtrl.value)
    } else {
      //調査対象元のコードは、keyup.enterも、blurもsetCustomerCodeに接続しているが、
      //なぜFocusEventの型を受けとれているかが分からない。下記の警告エラーとなったため、
      // Argument of type 'Event' is not assignable to parameter of type 'FocusEvent'.
      // Type 'Event' is missing the following properties from type 'FocusEvent': relatedTarget, detail, view, which, initUIEvent
      //
      // したがって、本コードでは、Blurで呼び出す後の、売上のコードに対する処理を接続させるように実装した
      this.setSalesCodeInner(this.getCodeBeforeColon(target?.textContent))
    }
  }

  private getCodeBeforeColon (input: string | null): string {
    if (!input) {
      return ''
    }
    const colonIndex = input.indexOf(':')
    if (colonIndex !== -1) {
      //先頭に半角スペースがあるため
      return input.substring(1, colonIndex)
    }
    return input
  }

  setSalesCodeEnter (input: string) {
    this.setSalesCodeInner(input)
  }

  private setSalesCodeInner (input: string) {
    if (this.salesService.exists(input)) {
      this.setSalesName(input)
    } else {
      this.salesCodeCtrl.setValue('')
      this.salesNameCtrl.setValue('')
    }
  }

  private setSalesName (code: string | null) {
    const salesName = this.salesService.getName(code)
    this.salesNameCtrl.setValue(salesName)
  }

  private filterReps (input: string) {
    return this.salesRepositories.filter(
      rep => rep.code.toLowerCase().indexOf(input?.toLowerCase()) === 0
    )
  }

  private optionSelected (target: HTMLElement) {
    return target && target?.tagName === 'MAT-OPTION'
  }
}
