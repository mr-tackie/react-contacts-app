export interface Contact{
    id: number,
    first_name: string,
    last_name: string,
    twitter?: string | null,
    emails: [{
        email: string,
    }],
    phone_numbers: [{
      phone_number: string  
    }];
}