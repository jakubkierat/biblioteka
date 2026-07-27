import { defineStore } from 'pinia'
import { mockLoans } from '../data/mockLibrary'
import type { Loan } from '../types/loan'
import { useBooksStore } from './books'
import { useNotificationsStore } from './notifications'

export const useLoansStore = defineStore(
  'loans',
  () => {
    const loans = ref<Loan[]>([...mockLoans])

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

      const booksStore = useBooksStore()
      const book = booksStore.getBookById(bookId)

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'success',
        title: 'Wypożyczenie książki',
        message: `${borrowerName} wypożyczył książkę "${book?.title ?? 'Nieznana książka'}".`
      })

      return loan
    }

    const returnLoan = (bookId: string) => {
      const loan = getActiveLoanByBookId(bookId)

      if (!loan) {
        return
      }

      loan.status = 'returned'
      loan.returnedAt = new Date().toISOString()

      const booksStore = useBooksStore()
      const book = booksStore.getBookById(bookId)

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'info',
        title: 'Zwrot książki',
        message: `Zwrócono książkę "${book?.title ?? 'Nieznana książka'}".`
      })
    }

    return {
      loans,
      activeLoans,
      returnedLoans,
      getActiveLoanByBookId,
      addLoan,
      returnLoan
    }
  },
  {
    persist: true
  }
)