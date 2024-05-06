import { Injectable } from '@angular/core'
import { Sales } from './sales'

@Injectable()
export class SalesService {
  private salesRepositories: Map<string, string> = new Map<string, string>([
    ['J001', 'James'],
    ['M001', 'Mike'],
    ['T001', 'Tom'],
    ['G001', 'Greg'],
    ['J002', 'Jack'],
    ['T002', 'Tara'],
    ['M002', 'Matt']
  ])

  exists (code: string): boolean {
    return this.salesRepositories.has(code)
  }

  getName (code: string | null): string {
    return code ? this.salesRepositories.get(code) || '' : ''
  }

  getSales (): Sales[] {
    return Array.from(this.salesRepositories.entries()).map(([code, name]) => ({
      code,
      name
    }))
  }
}
