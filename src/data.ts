export type EventType = 'vac' | 'dew' | 'insp' | 'quar' | 'treat'
export type EventStatus = 'done' | 'overdue' | 'planned'

export const EVENT_TYPES: Record<EventType, { label: string; color: string }> = {
  vac: { label: 'Вакцинація', color: 'var(--color-vac)' },
  dew: { label: 'Дегельмінтизація', color: 'var(--color-dew)' },
  insp: { label: 'Огляд', color: 'var(--color-insp)' },
  quar: { label: 'Карантин', color: 'var(--color-quar)' },
  treat: { label: 'Лікування', color: 'var(--color-treat)' },
}

export const STATUS_LABEL: Record<EventStatus, string> = {
  done: 'виконано',
  overdue: 'прострочено',
  planned: 'заплановано',
}

export interface Animal {
  tag: string
  type: string
  name: string
  health: { label: string; tone: 'ok' | 'warn' | 'bad' }
  breed: string
  age: string
  location: string
  events: { type: EventType; title: string; date: string; note: string }[]
}

export const ANIMALS: Animal[] = [
  {
    tag: '1234 5678 90',
    type: 'Корова-первістка',
    name: 'Зорянка',
    health: { label: 'Здорова', tone: 'ok' },
    breed: 'Голштинська',
    age: '2 р. 4 міс.',
    location: 'Корпус 1, секція 3',
    events: [
      { type: 'vac', title: 'Вакцинація проти лептоспірозу', date: '12.10', note: 'заплановано' },
      { type: 'insp', title: 'Плановий огляд', date: '28.09', note: 'Іваненко О. В.' },
      { type: 'treat', title: 'Лікування маститу, каренція 4 дні', date: '14.09', note: 'завершено' },
    ],
  },
  {
    tag: '1234 5678 91',
    type: 'Нетель',
    name: 'Ласка',
    health: { label: 'На обстеженні', tone: 'warn' },
    breed: 'Українська чорно-ряба',
    age: '1 р. 7 міс.',
    location: 'Корпус 2, секція 1',
    events: [
      { type: 'insp', title: 'Повторний огляд', date: '08.10', note: 'заплановано' },
      { type: 'dew', title: 'Дегельмінтизація', date: '20.09', note: 'Петренко М. С.' },
      { type: 'vac', title: 'Вакцинація проти ящуру', date: '02.09', note: 'виконано' },
    ],
  },
  {
    tag: '1234 5679 18',
    type: 'Теличка',
    name: 'Теличка №418',
    health: { label: 'Здорова', tone: 'ok' },
    breed: 'Симентальська',
    age: '3 міс.',
    location: 'Телятник, загін 4',
    events: [
      { type: 'vac', title: 'Вакцинація проти сальмонельозу', date: '15.10', note: 'заплановано' },
      { type: 'insp', title: 'Огляд новонародженої', date: '04.07', note: 'Коваль Т. І.' },
      { type: 'insp', title: 'Біркування UA 1234 5679 18', date: '03.07', note: 'у строк 7 днів' },
    ],
  },
]

/** [день тижня 0–6, тип, назва, об'єкт, статус] */
export const WEEK_EVENTS: { day: number; type: EventType; title: string; target: string; status: EventStatus }[] = [
  { day: 0, type: 'vac', title: 'Вакцинація проти ящуру', target: 'Дійні корови, 120 гол.', status: 'done' },
  { day: 0, type: 'insp', title: 'Плановий огляд', target: 'Телята 0–2 міс., 38 гол.', status: 'done' },
  { day: 1, type: 'treat', title: 'Обробка копит', target: 'Корпус 2, 46 гол.', status: 'overdue' },
  { day: 2, type: 'dew', title: 'Дегельмінтизація', target: 'Нетелі 14–18 міс., 52 гол.', status: 'planned' },
  { day: 2, type: 'insp', title: 'Огляд', target: 'UA 1234 5678 91', status: 'planned' },
  { day: 3, type: 'quar', title: 'Карантин', target: 'Нові надходження, 12 гол.', status: 'planned' },
  { day: 3, type: 'vac', title: 'Вакцинація проти лептоспірозу', target: 'Молодняк 6–12 міс.', status: 'planned' },
  { day: 4, type: 'treat', title: 'Лікування маститу', target: 'UA 1234 5678 90', status: 'planned' },
  { day: 4, type: 'insp', title: 'Ректальне обстеження', target: 'Телиці, 18 гол.', status: 'planned' },
  { day: 5, type: 'vac', title: 'Вакцинація проти сальмонельозу', target: 'Телятник, 24 гол.', status: 'planned' },
]

export const LIFECYCLE = [
  { id: 1, name: 'Теличка', note: '0–6 міс.', text: 'Молочний період: тварина п\'є молоко або замінник і поступово переходить на грубі та концентровані корми. EasyVet нагадує про біркування протягом 7 днів і перші щеплення.' },
  { id: 2, name: 'Телиця', note: '6–18 міс.', text: 'Активний ріст і статеве дозрівання. У 180 днів система сама переводить теличку в телиці, а ветлікар планує дегельмінтизацію і вакцинації за віком.' },
  { id: 3, name: 'Нетель', note: 'перша тільність', text: 'Після підтвердженої тільності зоотехнік переводить тварину в нетелі. Тільність триває близько 9 місяців — увага раціону і підготовці вимені.' },
  { id: 4, name: 'Корова-первістка', note: 'після 1-го отелення', text: 'Перша лактація. Тварина ще росте, тому потребує посиленого годування; огляди й лікування в період лактації враховують каренцію молока.' },
  { id: 5, name: 'Повновікова корова', note: 'після 2-го отелення', text: 'Регулярний цикл: осіменіння, тільність, лактація, запуск. Вся історія щеплень, хвороб і лікувань лишається в одній картці.' },
]

export const FAQ = [
  {
    q: 'Чи можна працювати з телефона в корівнику?',
    a: 'Так, інтерфейс адаптований для телефона від 360 px. Для роботи потрібен інтернет: режим без зв\'язку в першу версію не входить.',
  },
  { q: 'Скільки тварин можна вести?', a: 'Перша версія розрахована на господарства до 10 000 голів і до 50 користувачів.' },
  {
    q: 'Хто бачить дані мого господарства?',
    a: 'Лише люди, яких ви запросили. Дані господарств ізольовані одне від одного, з\'єднання захищене HTTPS.',
  },
  {
    q: 'Чи формує система паспорт ВРХ?',
    a: 'Так, паспорт і ветеринарна картка формуються в PDF з даних картки тварини. Формат паспорта звіряється з вимогами державного реєстру.',
  },
  {
    q: 'Що з обміном даними з державними реєстрами?',
    a: 'Автоматичний обмін не входить у першу версію. Зараз ми досліджуємо, які реєстри і як можна підключити.',
  },
]
