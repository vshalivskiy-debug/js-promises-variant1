function randomFail() {
    return Math.random() < 0.2; // 20% помилка
}

// 1
function checkAvailability(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (randomFail()) reject("❌ Немає товару");
            else resolve({ orderId });
        }, 1000);
    });
}

// 2
function reserveItems(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (randomFail()) reject("❌ Не вдалося зарезервувати");
            else resolve({ ...data, amount: 100 });
        }, 1000);
    });
}

// 3
function processPayment(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (randomFail()) reject("❌ Оплата не пройшла");
            else resolve(data);
        }, 1500);
    });
}

// 4
function scheduleDelivery(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (randomFail()) reject("❌ Помилка доставки");
            else resolve("✅ Замовлення доставляється!");
        }, 1000);
    });
}

// RUN
function run() {
    const out = document.getElementById("out");
    out.textContent = "⏳ Обробка замовлення...\n";

    checkAvailability(1)
        .then(res => {
            out.textContent += "✔ Є в наявності\n";
            return reserveItems(res);
        })
        .then(res => {
            out.textContent += "✔ Зарезервовано\n";
            return processPayment(res);
        })
        .then(res => {
            out.textContent += "✔ Оплата успішна\n";
            return scheduleDelivery(res);
        })
        .then(result => {
            out.textContent += result;
        })
        .catch(err => {
            out.textContent += err;
        })
        .finally(() => {
            out.textContent += "\n🔚 Завершено";
        });
}