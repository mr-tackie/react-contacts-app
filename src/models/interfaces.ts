export interface Contact{
    id: number,
    first_name: string,
    last_name: string,
    twitter?: string | null,
    emails: Email[],
    phone_numbers: PhoneNumber[];
}

export interface PhoneNumber{
  __typename?: string,
  id?: number,
  contact_id?: number,
  phone_number: string
}

export interface Email{
  __typename?: string,
  id?: number,
  contact_id?: number,
  email: string
}