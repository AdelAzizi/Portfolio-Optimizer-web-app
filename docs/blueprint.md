# **App Name**: Nava Portfolio

## ویژگی های اصلی:

- انتخاب استراتژی: نمایش سه گزینه استراتژی (دفاعی، متوازن، تهاجمی) در صفحه فرود، هر کدام به صورت یک کارت استراتژی نمایش داده می شود.
- کارت های استراتژی: هر کارت شامل عنوان به زبان فارسی و انگلیسی، توضیحات مختصر و یک نماد است. افکت های شناور اطلاعات اضافی مانند میله های عامل را نشان می دهد.
- داشبورد نتایج: نمایش شاخص های کلیدی عملکرد (KPI)، ترکیب پورتفولیو (نمودار دایره ای و جدول)، تحلیل معاملات و عملکرد تست بک در یک فرمت داشبورد جذاب بصری بر اساس استراتژی انتخابی.
- یکپارچه سازی API: فراخوانی نقطه پایانی API /optimize-strategy هنگام بارگیری داشبورد نتایج، ارسال شناسه استراتژی انتخاب شده برای دریافت و نمایش نتایج لحظه ای. رابط کاربری داده ها را از تمام فیلدها در پاسخ نقطه پایانی API /optimize-strategy به درستی مصرف و نمایش می دهد.
- ناوبری: انتقال کاربر از صفحه انتخاب استراتژی به صفحه داشبورد نتایج پس از انتخاب یک استراتژی، حفظ زمینه از طریق URL.
- اشتراک ایمیل: فرم ورودی ایمیل در بخش آخر برای ذخیره ایمیل کاربران.
- توصیه های شخصی: متن توصیه پویا: از فیلد next_steps.recommendation_text API برای تولید یک توصیه مرتبط برای مشتری استفاده می کند. متن برای بررسی به کاربر نشان داده می شود، بر اساس ابزاری که تست بک لحظه ای و تاریخی را برای ارزیابی دوره بازتعادل بعدی ترکیب می کند.

## Core Features:

- Strategy Selection: Strategy Selection: Displays three strategy options (Defensive, Balanced, Aggressive) on the landing page, each represented as a strategy card.
- Strategy Cards: Strategy Cards: Each card provides a title in Farsi and English, a brief description, and an icon. Hover effects reveal additional information like factor bars.
- Results Dashboard: Results Dashboard: Displays key performance indicators (KPIs), portfolio composition (pie chart and table), transaction analysis, and backtest performance in a visually appealing dashboard format based on the chosen strategy.
- API Integration: API Integration: Calls the /optimize-strategy API endpoint upon loading the Results Dashboard, passing the selected strategy ID to fetch and display real-time results.  The frontend correctly consumes and displays data from all fields in the /optimize-strategy API endpoint's response.
- Navigation: Navigation: Transitions the user from the Strategy Selection page to the Results Dashboard page after a strategy is chosen, maintaining context via the URL.
- Email Subscription: Email Subscription: An email input form in the last section to save user emails.
- Personalized Recommendations: Dynamic Recommendation Text: Uses the next_steps.recommendation_text field of the API to generate a relevant recommendation for the client to read. The text is shown to the user for consideration, based on a tool that synthesizes real-time and historic backtesting to evaluate the next rebalance period.

## دستورالعمل های سبک:

- رنگ اصلی: آبی فیروزه ای (#008080) برای انتقال حس اعتماد، ثبات و رشد.
- رنگ پس زمینه: آبی فیروزه ای روشن (#E0F8F8) برای ایجاد یک پس زمینه نرم و غیر مزاحم.
- رنگ برجسته: طلایی (#D4AF37) برای برجسته کردن اطلاعات کلیدی، دکمه های فراخوان به عمل و افزایش حس ارزش.
- فونت بدنه: 'Inter'، یک فونت بدون سریف که به خاطر خوانایی اش شناخته می شود، برای محتوای اصلی استفاده خواهد شد.
- فونت عنوان: 'Playfair'، یک فونت سریف، برای ارائه یک لمس ظریف، با Inter جفت می شود تا زیبایی شناسی را بهبود بخشد.
- از نمادهای مالی استفاده کنید. این نمادها باید به صورت بصری رشد، ثبات و روندهای بازار را نشان دهند و موضوع بهینه سازی مالی را تقویت کنند.
- از یک طرح تمیز و ساختار یافته برای بهبود ناوبری کاربر استفاده کنید، اطمینان حاصل کنید که تجربه کاربری بصری و دوستانه است.
- انیمیشن های بارگیری هنگام دریافت داده از API.

## Style Guidelines:

- Primary color: Teal (#008080) to convey trust, stability, and growth.
- Background color: Light teal (#E0F8F8) to provide a soft, unobtrusive backdrop.
- Accent color: Gold (#D4AF37) to highlight key information, call-to-action buttons, and enhance the feeling of value.
- Body font: 'Inter', a sans-serif font known for its readability, will be used for the main content.
- Headline font: 'Playfair', a serif font, to provide a touch of sophistication, will be paired with Inter to improve the aesthetic.
- Use financial icons. These icons should visually represent growth, stability, and market trends, reinforcing the theme of financial optimization.
- Employ a clean and structured layout to enhance user navigation, ensuring an intuitive and user-friendly experience.
- Loading animations when retrieving data from the API.