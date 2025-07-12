# **App Name**: Nava Portfolio

## Core Features:

- Strategy Selection: Strategy Selection: Displays three strategy options (Defensive, Balanced, Aggressive) on the landing page, each represented as a strategy card.
- Strategy Cards: Strategy Cards: Each card provides a title in Farsi and English, a brief description, and an icon. Hover effects reveal additional information like factor bars.
- Results Dashboard: Results Dashboard: Displays key performance indicators (KPIs), portfolio composition (pie chart and table), transaction analysis, and backtest performance in a visually appealing dashboard format based on the chosen strategy.
- API Integration: API Integration: Calls the /optimize-strategy API endpoint upon loading the Results Dashboard, passing the selected strategy ID to fetch and display real-time results.  The frontend correctly consumes and displays data from all fields in the /optimize-strategy API endpoint's response.
- Navigation: Navigation: Transitions the user from the Strategy Selection page to the Results Dashboard page after a strategy is chosen, maintaining context via the URL.
- Email Subscription: Email Subscription: An email input form in the last section to save user emails.
- Personalized Recommendations: Dynamic Recommendation Text: Uses the next_steps.recommendation_text field of the API to generate a relevant recommendation for the client to read. The text is shown to the user for consideration, based on a tool that synthesizes real-time and historic backtesting to evaluate the next rebalance period.

## Style Guidelines:

- Primary color: Teal (#008080) to convey trust, stability, and growth.
- Background color: Light teal (#E0F8F8) to provide a soft, unobtrusive backdrop.
- Accent color: Gold (#D4AF37) to highlight key information, call-to-action buttons, and enhance the feeling of value.
- Body font: 'Inter', a sans-serif font known for its readability, will be used for the main content.
- Headline font: 'Playfair', a serif font, to provide a touch of sophistication, will be paired with Inter to improve the aesthetic.
- Use financial icons. These icons should visually represent growth, stability, and market trends, reinforcing the theme of financial optimization.
- Employ a clean and structured layout to enhance user navigation, ensuring an intuitive and user-friendly experience.
- Loading animations when retrieving data from the API.