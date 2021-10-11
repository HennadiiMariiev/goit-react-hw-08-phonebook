export const name = /^([a-zA-Zа-яА-ЯёіїґІЇ_ -]){2,30}$/;
// export const name = /^([a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*){2,30}$/;
export const number = /([+(\d]{1})(([\d+() -.]){3,16})([+(\d]{1})/;
export const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
export const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;
