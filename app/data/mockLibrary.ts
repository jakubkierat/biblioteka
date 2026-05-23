import type { Author } from '~/types/author'
import type { Book } from '~/types/book'
import type { Category } from '~/types/category'
import type { Loan } from '~/types/loan'

export const mockAuthors: Author[] = [
  {
    id: 'author-1',
    firstName: 'Adam',
    lastName: 'Mickiewicz',
    biography: 'Polski poeta romantyczny.'
  },
  {
    id: 'author-2',
    firstName: 'Bolesław',
    lastName: 'Prus',
    biography: 'Polski pisarz i publicysta.'
  },
  {
    id: 'author-3',
    firstName: 'Henryk',
    lastName: 'Sienkiewicz',
    biography: 'Polski powieściopisarz, laureat Nagrody Nobla.'
  },
  {
    id: 'author-4',
    firstName: 'Stanisław',
    lastName: 'Lem',
    biography: 'Polski pisarz science fiction i filozof.'
  }
]

export const mockCategories: Category[] = [
  {
    id: 'category-1',
    name: 'Literatura piękna',
    description: 'Powieści, opowiadania i klasyka literatury.'
  },
  {
    id: 'category-2',
    name: 'Poezja',
    description: 'Utwory poetyckie i dramaty.'
  },
  {
    id: 'category-3',
    name: 'Science fiction',
    description: 'Literatura fantastycznonaukowa.'
  },
  {
    id: 'category-4',
    name: 'Historia',
    description: 'Publikacje historyczne i biograficzne.'
  }
]

export const mockBooks: Book[] = [
  {
    id: 'book-1',
    title: 'Pan Tadeusz',
    isbn: '9788373271890',
    authorId: 'author-1',
    categoryId: 'category-2',
    publishedYear: 1834,
    description: 'Epopeja narodowa opisująca życie polskiej szlachty.',
    status: 'available',
    createdAt: '2026-05-20T10:00:00.000Z',
    updatedAt: '2026-05-20T10:00:00.000Z'
  },
  {
    id: 'book-2',
    title: 'Lalka',
    isbn: '9788373271760',
    authorId: 'author-2',
    categoryId: 'category-1',
    publishedYear: 1890,
    description: 'Powieść społeczno-obyczajowa przedstawiająca Warszawę końca XIX wieku.',
    status: 'borrowed',
    createdAt: '2026-05-20T10:05:00.000Z',
    updatedAt: '2026-05-20T10:05:00.000Z'
  },
  {
    id: 'book-3',
    title: 'Quo Vadis',
    isbn: '9788373272118',
    authorId: 'author-3',
    categoryId: 'category-4',
    publishedYear: 1896,
    description: 'Powieść historyczna osadzona w czasach starożytnego Rzymu.',
    status: 'available',
    createdAt: '2026-05-20T10:10:00.000Z',
    updatedAt: '2026-05-20T10:10:00.000Z'
  },
  {
    id: 'book-4',
    title: 'Solaris',
    isbn: '9788374801973',
    authorId: 'author-4',
    categoryId: 'category-3',
    publishedYear: 1961,
    description: 'Powieść science fiction o kontakcie człowieka z obcą inteligencją.',
    status: 'borrowed',
    createdAt: '2026-05-20T10:15:00.000Z',
    updatedAt: '2026-05-20T10:15:00.000Z'
  }
]

export const mockLoans: Loan[] = [
  {
    id: 'loan-1',
    bookId: 'book-2',
    borrowerName: 'Jan Kowalski',
    borrowedAt: '2026-05-18T12:00:00.000Z',
    status: 'active'
  },
  {
    id: 'loan-2',
    bookId: 'book-4',
    borrowerName: 'Anna Nowak',
    borrowedAt: '2026-05-19T15:30:00.000Z',
    status: 'active'
  }
]