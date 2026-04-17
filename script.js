// Personal Expense Tracker - Debugged localStorage version

let currentChart = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded - checking localStorage support...");

    // Test localStorage
    try {
        localStorage.setItem('test', 'working');
        localStorage.removeItem('test');
        console.log("localStorage is working properly.");
    } catch (e) {
        console.error("localStorage is NOT available:", e);
        alert("Your browser does not support localStorage. Please use a normal browser window (not incognito/private mode).");
    }

    initDate();
    loadExpensesAndChart();
    document.getElementById('expenseForm').addEventListener('submit', addExpense);
    document.getElementById('refreshReport').addEventListener('click', () => loadExpensesAndChart());
});

function initDate() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    document.getElementById('date').value = todayStr;

    const yearSelect = document.getElementById('year');
    const currentYear = today.getFullYear();
    yearSelect.innerHTML = '';
    for (let y = currentYear - 3; y <= currentYear + 2; y++) {
        const option = document.createElement('option');
        option.value = y;
        option.textContent = y;
        if (y === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }
    document.getElementById('month').value = today.getMonth() + 1;
}

function getExpensesFromStorage() {
    try {
        const stored = localStorage.getItem('expenses');
        if (!stored) return [];
        return JSON.parse(stored);
    } catch (e) {
        console.error("Failed to parse expenses from localStorage:", e);
        return [];
    }
}

function saveExpensesToStorage(expenses) {
    try {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        console.log("Saved", expenses.length, "expenses to localStorage");
        return true;
    } catch (e) {
        console.error("Failed to save to localStorage:", e);
        alert("Cannot save data. Storage may be full or disabled.");
        return false;
    }
}

function addExpense(e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();
    const date = document.getElementById('date').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (!category) {
        alert('Please select a category');
        return;
    }
    if (!date) {
        alert('Please select a date');
        return;
    }

    const newExpense = {
        id: Date.now(),
        amount: amount,
        category: category,
        description: description || '',
        date: date
    };

    console.log("Adding expense:", newExpense);

    let expenses = getExpensesFromStorage();
    expenses.push(newExpense);

    if (!saveExpensesToStorage(expenses)) return;

    // Reset form and set date to today
    document.getElementById('expenseForm').reset();
    document.getElementById('date').value = new Date().toISOString().split('T')[0];

    // Adjust month/year filter to match the new expense's date
    const [expYear, expMonth] = date.split('-');
    document.getElementById('year').value = expYear;
    document.getElementById('month').value = expMonth;

    loadExpensesAndChart();
    alert('Expense added successfully!');
}

function loadExpensesAndChart() {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const allExpenses = getExpensesFromStorage();

    console.log(`Filtering for ${year}-${month}, total expenses:`, allExpenses.length);

    const filtered = allExpenses.filter(exp => {
        if (!exp.date) return false;
        const [expYear, expMonth] = exp.date.split('-');
        return expYear === year && expMonth === month;
    });

    console.log(`Found ${filtered.length} expenses for this month`);
    displayExpenses(filtered);
    updateMonthlySummary(filtered);
}

function displayExpenses(expenses) {
    const tbody = document.getElementById('expensesBody');
    if (expenses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No expenses found for this month</td></tr>';
        return;
    }

    tbody.innerHTML = '';
    expenses.forEach(expense => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = expense.date;
        row.insertCell(1).textContent = expense.description || '-';
        row.insertCell(2).textContent = expense.category;
        row.insertCell(3).textContent = `$${expense.amount.toFixed(2)}`;

        const actionCell = row.insertCell(4);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteExpense(expense.id);
        actionCell.appendChild(deleteBtn);
    });
}

function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    let expenses = getExpensesFromStorage();
    expenses = expenses.filter(exp => exp.id !== id);
    if (saveExpensesToStorage(expenses)) {
        loadExpensesAndChart();
        alert('Expense deleted');
    }
}

function updateMonthlySummary(expenses) {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;

    const categoryMap = new Map();
    expenses.forEach(exp => {
        categoryMap.set(exp.category, (categoryMap.get(exp.category) || 0) + exp.amount);
    });

    const categoryData = Array.from(categoryMap.entries()).map(([cat, amt]) => ({ category: cat, amount: amt }));
    updateChart(categoryData);
}

function updateChart(categoriesData) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const labels = categoriesData.map(c => c.category);
    const amounts = categoriesData.map(c => c.amount);

    if (currentChart) currentChart.destroy();

    if (labels.length === 0) {
        currentChart = new Chart(ctx, {
            type: 'pie',
            data: { labels: ['No data'], datasets: [{ data: [1], backgroundColor: ['#ccc'] }] },
            options: { plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: () => 'No expenses' } } } }
        });
        return;
    }

    currentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: amounts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#4CAF50', '#F06292', '#BA68C8', '#FFB74D', '#4DD0E1', '#81C784', '#E57373', '#64B5F6', '#FFF176', '#FF8A65', '#A1887F', '#E1BEE7', '#B0BEC5']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Category-wise Spending' } }
        }
    });
}