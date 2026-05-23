export type LoanStatus = 'active' | 'returned'

export interface Loan {
  id: string
  bookId: string
  borrowerName: string
  borrowedAt: string
  returnedAt?: string
  status: LoanStatus
}