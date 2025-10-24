const buttons = document.querySelectorAll(".tip-btn");
const billInput = document.getElementById("billNumber");
const peopleInput = document.getElementById("peopleNumber");
const customInput = document.getElementById("customTip");
const tipAmountValue = document.getElementById("tipAmountResult");
const totalAmountValue = document.getElementById("totalAmountResult");
const resetBtn = document.getElementById("resetBtn");
const errorText = document.querySelector(".error-text");

const showError = () => {
	errorText.classList.remove("hidden");
	peopleInput.classList.add("error");
};

const hideError = () => {
	errorText.classList.add("hidden");
	peopleInput.classList.remove("error");
};

const updateResults = (tip, total) => {
	tipAmountValue.textContent = tip.toFixed(2);
	totalAmountValue.textContent = total.toFixed(2);
};

const resetButtons = () =>
	buttons.forEach((btn) => {
		btn.classList.remove("button");
	});

const calculateTip = (bill, people, percent) => {
	if (people <= 0) {
		return;
	}
	const tip = ((bill / people) * percent) / 100;
	const total = bill / people + tip;
	updateResults(tip, total);
	activateReset();
};

const activateReset = () => {
	resetBtn.style.backgroundColor = " hsl(172, 67%, 45%)";
	resetBtn.style.color = " hsl(183, 100%, 15%)";
};

const getInputValues = () => ({
	bill: Number(billInput.value.trim()) || 0,
	people: Number(peopleInput.value.trim()) || 0,
	customTipValue: Number(customInput.value),
});
const calculate = () => {
	const { bill, people, customTipValue } = getInputValues();
	if (people === 0) {
		showError();
		return;
	}
	hideError();
	if (!isNaN(customTipValue) && customTipValue > 0) {
		calculateTip(bill, people, customTipValue);
	}
};

const resetUI = () => {
	updateResults(0, 0);
	customInput.value = "";
	billInput.value = "";
	peopleInput.value = "";
	resetBtn.style.backgroundColor = "";
	resetBtn.style.color = "";
	resetButtons();
};

// EVENT LISTNERS

[billInput, peopleInput, customInput].forEach((input) => {
	input.addEventListener("input", () => {
		calculate();
		resetButtons();
	});
});

buttons.forEach((tipBtn) => {
	tipBtn.addEventListener("click", () => {
		const { bill, people } = getInputValues();
		const percent = Number(tipBtn.value);
		if (people === 0) {
			showError();
			return;
		}
		hideError();
		resetButtons();
		tipBtn.classList.add("button");
		customInput.value = "";
		calculateTip(bill, people, percent);
	});
});

resetBtn.addEventListener("click", resetUI);
