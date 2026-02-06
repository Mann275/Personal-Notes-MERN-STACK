# Currency Converter - Custom Hooks & API Integration

## Topics Covered

- Custom Hooks creation and usage
- API integration with useEffect
- Component reusability patterns
- Real-time data fetching
- State management across components
- Input handling and validation

## What This Project Does

A real-world currency converter application that:

- Fetches live exchange rates from a currency API
- Allows users to convert between different currencies in real-time
- Demonstrates how to create and use custom hooks for reusable logic
- Shows best practices for API integration in React

## How It Works

1. **Custom Hook (useCurrencyInfo)**:
   - Takes currency code as input (e.g., "usd", "inr")
   - Fetches exchange rates from API when currency changes
   - Returns object with all conversion rates
   - Can be reused anywhere in the app

2. **API Integration**:
   - Uses fetch API to get currency data
   - Data updates automatically when currency selection changes
   - Handles loading states and errors

3. **Two-Way Conversion**:
   - User enters amount in one currency
   - Automatically calculates and shows equivalent in other currency
   - Swap button to reverse currency selection

## Code Example

```javascript
// Custom Hook
function useCurrencyInfo(currency) {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch(`https://api.example.com/currency/${currency}`)
      .then(res => res.json())
      .then(res => setData(res[currency]))
  }, [currency])

  return data
}

// Using in Component
function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')

  const currencyInfo = useCurrencyInfo(from)
  const convertedAmount = amount * currencyInfo[to]

  return (
    // UI here
  )
}
```

## Key Concepts

### Why Custom Hooks?

- **Reusability**: Write once, use anywhere
- **Clean Code**: Separate logic from UI
- **Easy Testing**: Test logic independently
- **Sharing Logic**: Share between multiple components

### Component Reusability

```javascript
// Same InputBox component used for both "From" and "To"
<InputBox
  label="From"
  amount={amount}
  onAmountChange={setAmount}
  currency={from}
  onCurrencyChange={setFrom}
/>

<InputBox
  label="To"
  amount={convertedAmount}
  currency={to}
  onCurrencyChange={setTo}
  amountDisabled  // Can't edit converted amount
/>
```

## Setup

```bash
npm install
npm run dev
```

## Features

✅ Live currency exchange rates
✅ 50+ currencies support
✅ Swap currencies with one click
✅ Real-time conversion calculation
✅ Responsive design
✅ Custom hooks pattern demonstration
✅ Clean and maintainable code
