# 💰 Personal Expense Tracker

A clean, responsive, and fully client-side web app to track your daily expenses, visualize spending by category, and generate monthly reports – all without any backend or database. Your data stays in your browser’s local storage.
   
## ✨ Features

- ➕ **Add Expenses** – Record amount, category, description, and date.
- 📅 **Monthly Reports** – Filter by month/year and see total spent.
- 🥧 **Interactive Pie Chart** – Visual breakdown of spending per category (powered by Chart.js).
- 🗑️ **Delete Entries** – Remove unwanted expenses instantly.
- 💾 **Persistent Storage** – All data is saved in your browser’s `localStorage` – no login, no server.
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile.

## 🛠️ Tech Stack

- **HTML5** – Semantic structure
- **CSS3** – Modern styling with Flexbox/Grid, gradients
- **JavaScript (ES6)** – All logic, including data handling and Chart.js integration
- **Chart.js** – For beautiful pie charts
- **Font Awesome** – Icons for better UX

## 🚀 How to Run

1. **Download or clone** this repository.
2. **Open `index.html`** in any modern web browser (Chrome, Firefox, Edge, Safari).
3. **Start tracking** – your expenses are saved automatically in the browser.

No server, no installation, no database required.

## 📁 Project Structure

```
expense-tracker/
│
├── index.html          # Main page (HTML structure + inline styles/scripts)
├── style.css           # External styles (optional – can be inlined)
├── script.js           # All JavaScript logic (localStorage, chart, filters)
└── README.md           # Project documentation
```

> 💡 **Note:** The provided code includes everything in one `index.html` file for simplicity, but you can split it into separate CSS/JS files if preferred.

## 🧑‍💻 Usage

1. **Add an expense**  
   - Enter amount, select category, add a description (optional), pick a date.  
   - Click **Add Expense**.

2. **View monthly summary**  
   - Choose a month and year from the dropdowns.  
   - Click **Generate Report** – the total amount and pie chart update automatically.

3. **Delete an expense**  
   - In the expense table, click the **Delete** button next to any entry.

4. **Data persistence**  
   - Close the browser tab or refresh – your data remains.  
   - To clear all data, open Developer Tools (F12) → Application → Local Storage → delete `expenses_tracker` key.

## 📊 Data Structure (localStorage)

All expenses are stored under the key `expenses_tracker` as a JSON array. Each expense object looks like:

```json
{
  "id": 1744867200000,
  "amount": 25.50,
  "category": "Food & Dining",
  "description": "Lunch with team",
  "date": "2026-04-17"
}
```

## 🧪 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔮 Future Enhancements

- 📈 Add bar/line charts for spending trends
- 💰 Set monthly budgets and receive alerts
- 📤 Export data to CSV/JSON
- 🔍 Search and edit expenses
- 🌙 Dark mode toggle

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/probal2004/Personal-Expense-Tracker/issues).

## 📄 License

Distributed under the **Apache License**. See `LICENSE` file for more information.

## 👨‍💻 Author

**Probal Dhali**  
- GitHub: Probal Dhali (https://github.com/probal2005)  
- Project Link: [https://github.com/probal2005/Personal-Expense-Tracker]

## 🙏 Acknowledgements

- [Chart.js](https://www.chartjs.org/) – Simple yet flexible JavaScript charting
- [Font Awesome](https://fontawesome.com/) – Icons
- [Google Fonts](https://fonts.google.com/) – (if used)


⭐ **Show your support** – star this repository if you find it useful!  
🐛 **Report bugs** – open an issue on GitHub.
```
