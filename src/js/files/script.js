// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const dtClass = document.querySelectorAll('.dt-price__class');

dtClass.forEach(element => {
	if (element.previousElementSibling != null && element.innerHTML) {
		element.previousElementSibling.previousElementSibling.style.cssText = `border-bottom: 1px solid #e7e7e7;`;
	}
});

//=======================================================

//Настройка ползунка и Инпута чтобы синхронно показывали литры
const calcRange = document.querySelector('.calc-page__range');
const calcRangeInp = document.querySelector('.calc-page__text-inp');
let liters;
let toplivo;

liters = calcRangeInp.value;

calcRange.addEventListener("input", function (e) {
	calcRangeInp.value = calcRange.value;

	liters = calcRange.value;

	result(toplivo, calcRangeInp.value);

	benefit(toplivo, liters);
});

calcRangeInp.addEventListener("input", function (e) {
	if (e.target.value > 20000) {
		e.target.value = 20000;
		calcRange.value = 20000;

		result(toplivo, calcRange.value);

		liters = calcRange.value;

		benefit(toplivo, liters);
	} else {
		calcRange.value = calcRangeInp.value;

		result(toplivo, calcRange.value);

		liters = calcRange.value;

		benefit(toplivo, liters);
	}
});


// ПОЛУЧЕНИЕ ЗНАЧЕНИЕ СЕЛЕКТОВ С ИНПУТА
const options = document.querySelectorAll('.select__option');
const resultLiter = document.querySelector('.result-calc__liter span'); // Путь для вывода


options.forEach(item => {
	item.addEventListener("click", function (e) {
		setTimeout(() => {
			if (item.innerHTML == document.querySelector('.select__content').innerHTML) {
				resultLiter.innerHTML = item.dataset.value + ' ₽';

				toplivo = item.dataset.value;

				result(item.dataset.value, calcRange.value);

				finish(item.dataset.value);

				benefit(toplivo, liters);
			}
		}, 10);
	});
});

// Присвоение псевдо значения рыночной стоимости топлива(+1,05)
const resultFinish = document.querySelector('.result-calc__desc span');
function finish(price) {
	resultFinish.innerHTML = +price + 1.05;
}

// Присвоение значение литров при загрузке страницы
options.forEach(element => {
	if (element.hasAttribute('hidden')) {
		resultLiter.innerHTML = element.dataset.value + ' ₽';

		toplivo = element.dataset.value;

		finish(element.dataset.value);
	}
});

// Получение общего стоимости топлива
const resultPrice = document.querySelector('.result-calc__price span');

function result(fuel, litr) {
	resultPrice.innerHTML = +fuel * +litr + ' ₽';

}

const resultBenefit = document.querySelector('.result-calc__benefit span');

function benefit(toplivo, liters) {
	resultBenefit.innerHTML = Math.round((+toplivo * 1.05 * +liters) - (+toplivo * +liters)) + ' ₽';
}
benefit(toplivo, liters);