import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useLoansStore } from '../app/stores/loans'

describe('useLoansStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('dodaje nowe wypożyczenie', () => {
    const loansStore = useLoansStore()
    const initialCount = loansStore.loans.length

    const loan = loansStore.addLoan('book-1', 'Jan Kowalski')

    expect(loansStore.loans.length).toBe(initialCount + 1)
    expect(loan.borrowerName).toBe('Jan Kowalski')
    expect(loan.status).toBe('active')
  })

  it('zwraca aktywne wypożyczenie dla książki', () => {
    const loansStore = useLoansStore()

    loansStore.addLoan('book-1', 'Jan Kowalski')

    const loan = loansStore.getActiveLoanByBookId('book-1')

    expect(loan?.borrowerName).toBe('Jan Kowalski')
  })

  it('oznacza wypożyczenie jako zwrócone', () => {
    const loansStore = useLoansStore()

    loansStore.addLoan('book-1', 'Jan Kowalski')
    loansStore.returnLoan('book-1')

    const loan = loansStore.loans.find((item) => item.bookId === 'book-1')

    expect(loan?.status).toBe('returned')
    expect(loan?.returnedAt).toBeDefined()
  })
})