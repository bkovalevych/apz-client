import LocalizedStrings from 'react-localization';

 let strings = new LocalizedStrings({
 en:{
     menuMain: "Main",
     menuHome: "Home",
     menuProfile: "Profile",
     menuMoveMedia: "Move media",
     menuMoveBase: "Move base",
     menuUsers: "Users",
     menuGroups: "Groups",
     menuLogin: "Login",

     password: 'password',
     signUp: "Sign up",
     dontHaveAcc: "Dont have account",
     firstName: "First Name",
     lastName: "LastName",
     alreadyHaveAcc: "Already have an account?"
 },
 ua: {
     menuLogin: "Зайти",
     menuMain: "Головна",
     menuHome: "Домашня сторінка",
     menuProfile: "Профіль",
     menuMoveMedia: "Медіа руху",
     menuMoveBase: "Модулі руху",
     menuUsers: "Користувачі",
     menuGroups: "Групи",

     password: 'пароль',
     signUp: "Зареєструватися",
     dontHaveAcc: "Не маєте профілю",
     firstName: "Ім'я",
     lastName: "Прізвище",
     alreadyHaveAcc: "Вже маєте профіль?"
 }
});

export default strings;