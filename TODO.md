# TODO.md

## 1. The Main Dashboard (The "Big Picture" View)

1. Net Worth/Total Balance:

    - UX: This is the most important number. It's the sum of all connected accounts. It gives the user their ultimate financial snapshot.
    - UI: Display this prominently at the top of the page in a large font. You could have a smaller sub-text showing the change from the previous day or month (e.g., "+$250.75 in the last 30 days").
    - Component: A Card component would be perfect for this.

2. Cash Flow Summary:

    - UX: Show total income vs. total expenses for the current month. This helps users understand their immediate spending habits.
    - UI: A simple bar chart is very effective here. One green bar for "Income" and one red bar for "Expenses".
    - Component: Your chart-area-interactive.tsx could be adapted for this.

3. Spending by Category:

    - UX: To show users where their money is going, a breakdown of spending is essential.
    - UI: A donut chart or a pie chart is the classic and intuitive choice. Show the top 5-6 categories (e.g., Groceries, Transport, Rent, Shopping) and group the rest into "Other." Hovering over a slice should show the category name and amount.
    - Component: Your chart.tsx component is ideal for this.

4. Recent Transactions:

    - UX: A feed of the last 5-10 transactions from all accounts. This gives a sense of recent activity without being overwhelming.
    - UI: A simple list or table. Each row should have: Merchant/Description, Amount, and maybe a small icon for the bank account it belongs to.
    - Component: You could use a simplified version of your data-table.tsx.

5. Upcoming Bills & Subscriptions (Action Center):
    - UX: This is highly actionable. Show a list of known recurring bills or subscriptions that are due soon (e.g., "Netflix - $15.99 - Due in 3 days").
    - UI: A simple Card with a list inside. Each item could have the service name, amount, and due date.

## 2. Specific Bank Account Dashboard (The "Detailed" View)

1. Account Header:

    - UX: Clearly state which account the user is looking at. Show the bank's logo, the account name ("Chase Checking"), the account number (masked, e.g., "...1234"), and the current balance.
    - UI: A clean header at the top of the page. The balance should be the most prominent element. You could also include quick action buttons here like "Add Transaction" or "Transfer".
    - Component: Card or just a well-structured div with h1, h2, and Button components.

2. Transaction History Table:

    - UX: This is the core of this page. It's a full, detailed list of all transactions for this account. It MUST be searchable and filterable.
    - UI: A robust data table.
        - Columns: Date, Description/Merchant, Category (this should be an editable dropdown!), Amount.
        - Filtering: Allow users to filter by date range (This month, Last 3 months, Custom), and by category.
        - Search: A search bar to find specific transactions (e.g., "Starbucks").
    - Component: This is a perfect use case for your data-table.tsx.

3. Balance History Chart:
    - UX: Show how this specific account's balance has changed over time. This helps users visualize their spending and saving patterns for that account.
    - UI: A line chart showing the balance over the last 30, 60, or 90 days. The user should be able to select the time range.
    - Component: chart-area-interactive.tsx would be excellent here.

## 3. Future Functionality & Ideas

-   Budgets:
    -   UX: Users can create monthly budgets for specific categories (e.g., "$500 for Groceries"). On the Main Dashboard, you could add a "Budget" card that shows a summary ("You've spent $250 of your $1500 total budget"). You could also create a dedicated
        "Budgets" page to manage them in detail.
-   Savings Goals:
    -   UX: Allow users to create goals like "Vacation Fund" or "New Car". They can link accounts to a goal and track their progress. This is highly motivating.
    -   UI: A Card on the main dashboard with a progress bar for each goal.
-   Investment Tracking:
    -   UX: Allow connecting brokerage accounts to track stocks, ETFs, and crypto. The main dashboard could have a card showing total portfolio value and daily change.
-   Financial Insights/AI:
    -   UX: Once you have enough data, you can provide smart insights. "You've spent 30% more on dining out this month." or "We've detected a new subscription for $9.99." These can appear in a dedicated "For You" section.
