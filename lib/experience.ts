export type Experience = {
  company: string
  role: string
  dates: string
  url?: string
}

export const experience: Experience[] = [
  {
    company: 'dotData',
    role: 'Senior Product Designer',
    dates: '2019—2025',
    url: 'https://dotdata.com/',
  },
  { company: 'Kahuna', role: 'UX Designer', dates: '2016—2018' },
  {
    company: 'Wislite Technology',
    role: 'Interaction Designer & Software Engineer',
    dates: '2007—2013',
  },
]
