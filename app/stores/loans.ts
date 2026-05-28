import { defineStore } from 'pinia'
import { mockLoans } from '~/data/mockLibrary'
import type { Loan } from '~/types/loan'

export const useLoansStore = defineStore('loans', () => {
  const loans = ref<Loan[]>([...mockLoans])

  const loadLoans = async () => {
  const data = await $fetch<Loan[]>('/api/loans')

  loans.value = data
  }
  
  const activeLoans = computed(() => {
    return loans.value.filter((loan) => loan.status === 'active')
  })

  const returnedLoans = computed(() => {
    return loans.value.filter((loan) => loan.status === 'returned')
  })

  const getActiveLoanByBookId = (bookId: string) => {
    return loans.value.find((loan) => loan.bookId === bookId && loan.status === 'active')
  }

  const addLoan = (bookId: string, borrowerName: string) => {
    const loan: Loan = {
      id: crypto.randomUUID(),
      bookId,
      borrowerName,
      borrowedAt: new Date().toISOString(),
      status: 'active'
    }

    loans.value.push(loan)

    return loan
  }

  const returnLoan = (bookId: string) => {
    const loan = getActiveLoanByBookId(bookId)

    if (!loan) {
      return
    }

    loan.status = 'returned'
    loan.returnedAt = new Date().toISOString()
  }

  return {
    loans,
    activeLoans,
    returnedLoans,
    loadLoans,
    getActiveLoanByBookId,
    addLoan,
    returnLoan
  }
})