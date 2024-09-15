//Обробка форми

"use strict"

document.addEventListener('DOMContentLoaded', function() { //Стандартна перевірка, що документ вже загружен
    const form = document.getElementById('form'); // перехват відправки форми по натисканю кнопки та присвоєння обєкту ха id form
    form.addEventListener('submit', formSend); // вішаємо подію на сабміт - виклик функції formSend

    // функція ormSend
    async function formSend(e) {
    e.preventDefault(); // забороняємо стандартну відправку форми
    
    // Валідація форми
    let error = formValidate(form); // присвоєння змінній результату роботи функції formValidate
    if (form === 0) {

    } else {
        alert("Заповніть обов'язкові поля.");
    }
}

    // Функція formValidate
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req'); // присвоєння всіх обєктів з класом ._req 

        // Створюємо цикл
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            // кожного разу, до розпочинання перевірки, видаляємо у обєкта клас error 
            formRemoveError(input);

            // Починаємо переаврку
            if (input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input); // якщо теcт не пройден, тоді добавимо цьому обєкту та його батьку клас error
                    error++; // також збільшемо на 1 змінну error
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) { // перевірка checkbox-а
                formAddError(input);
                error++; // якщо чекбокс не зазначений - вішаємо обєкту та його батьку клас error
            } else {
                if (input.value === '') { // чи поле не пусте
                    formAddError(input);
                    error++;
                }
            }
        }
            return error; // повертаємо значення error
    }

    // Додавання об'єкту клас error та батьківському об'єкту
    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }

    // Функція тесту email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); // перевірка на відповідність регулярним виразом
    }

});

