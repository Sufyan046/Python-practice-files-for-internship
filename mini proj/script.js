let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const form = document.getElementById("transaction-form");
const list = document.getElementById("list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

form.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    const text = document.getElementById("text").value;
    const amount = +document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    const transaction = {
        id: Date.now(),
        text,
        amount,
        category
    };

    transactions.push(transaction);
    updateLocalStorage();
    updateUI();

    form.reset();
}

function updateUI() {
    list.innerHTML = "";

    transactions.forEach(transaction => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${transaction.text} (${transaction.category}) 
            ₹${transaction.amount}
            <button onclick="deleteTransaction(${transaction.id})">X</button>
        `;
        list.appendChild(li);
    });

    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0);
    const income = amounts.filter(a => a > 0)
                          .reduce((acc, item) => acc + item, 0);
    const expense = amounts.filter(a => a < 0)
                           .reduce((acc, item) => acc + item, 0);

    balanceEl.innerText = total;
    incomeEl.innerText = income;
    expenseEl.innerText = Math.abs(expense);

    updateCharts(income, expense);
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    updateUI();
}

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

/* ---------- CHARTS ---------- */

let pieChart, barChart;

function updateCharts(income, expense) {

    if (pieChart) pieChart.destroy();
    if (barChart) barChart.destroy();

    pieChart = new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, Math.abs(expense)],
                backgroundColor: ["green", "red"]
            }]
        }
    });

    const categoryTotals = {};
    transactions.forEach(t => {
        if (t.amount < 0) {
            categoryTotals[t.category] = 
                (categoryTotals[t.category] || 0) + Math.abs(t.amount);
        }
    });

    barChart = new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                label: "Expenses by Category",
                data: Object.values(categoryTotals),
                backgroundColor: "orange"
            }]
        }
    });
}

updateUI();
