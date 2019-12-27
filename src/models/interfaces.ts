export interface Contact{
    id: number,
    first_name: string,
    last_name: string,
    twitter?: string | null,
    emails: [Email],
    phone_numbers: [PhoneNumber];
}

export interface PhoneNumber{
  id?: number,
  phone_number: string
}

export interface Email{
  id?: number,
  email: string
}