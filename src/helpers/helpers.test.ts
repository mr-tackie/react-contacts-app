import {validateEmail, validatePhone, getRandomColor} from  './index';

test('Test email', () => {
    expect(validateEmail("babyboy@gmail.com")).toBe(true);
    expect(validateEmail("somerandon.c.t")).toBe(false);
    expect(validateEmail("nickname@domain.co.uk")).toBe(true);
    expect(validateEmail("someEmail@domain")).toBe(false);
});

test('Test phone', ()=>{
    expect(validatePhone('+233244111222')).toBe(true);
    expect(validatePhone('343423')).toBe(false);
    expect(validatePhone('0244111111')).toBe(true);
    expect(validatePhone('1800-ABD-200')).toBe(false)
});

test('Test color generate', () => {
    expect(getRandomColor().length).toEqual(7);
    expect(getRandomColor().substr(0, 1)).toEqual("#");
});