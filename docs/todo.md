# کارهای پیش رو

این لیست شامل کارهای توسعه باقی‌مانده بر اساس طرح اولیه پروژه در `docs/blueprint.md` است.

## ویژگی‌ها

*   [ ] پیاده‌سازی توصیه های شخصی: نمایش متن توصیه پویا از فیلد `next_steps.recommendation_text` API برای ارائه توصیه مرتبط به مشتری.
*   [ ] ترکیب تست بک لحظه‌ای و تاریخی برای ارزیابی دوره بازتعادل بعدی.
*   [ ] پیاده‌سازی بارگذاری داده از API با نمایش انیمیشن‌های بارگذاری مناسب.

## دستورالعمل‌های سبک

*   [ ] استفاده از رنگ اصلی: آبی فیروزه‌ای (#008080).
*   [ ] استفاده از رنگ پس‌زمینه: آبی فیروزه‌ای روشن (#E0F8F8).
*   [ ] استفاده از رنگ برجسته: طلایی (#D4AF37).
*   [ ] استفاده از فونت بدنه: 'Inter'.
*   [ ] استفاده از فونت عنوان: 'Playfair'.
*   [ ] استفاده از نمادهای مالی که رشد، ثبات و روندهای بازار را نشان دهند.
*   [ ] استفاده از یک طرح تمیز و ساختار یافته برای بهبود ناوبری کاربر.

## کارهای عمومی توسعه

*   [ ] نوشتن تست‌های واحد و ادغام برای عملکردهای کلیدی.
*   [ ] مستندسازی نقاط پایانی API و ساختارهای داده.
*   [ ] راه‌اندازی خطوط لوله یکپارچه‌سازی و استقرار مداوم (CI/CD).
*   [ ] بهینه‌سازی عملکرد برنامه.
*   [ ] انجام تست کامل جریان برنامه.
*   [ ] آماده‌سازی برای استقرار.
# Project Development Roadmap

Based on the `docs/blueprint.md`, the following tasks remain to be completed:

## Features Implementation

### Core Functionality

*   [ ] Implement the backend logic for receiving user portfolio data.
*   [ ] Develop the algorithm for analyzing the user's current portfolio against predefined strategies.
*   [ ] Implement the logic for generating rebalancing recommendations.
*   [ ] Integrate with necessary financial data APIs (if required).
*   [ ] Implement error handling for API calls and data processing.
*   [ ] Set up the backend endpoint for the rebalancing recommendation flow.

### Frontend Development

*   [ ] Create the user interface for inputting portfolio data.
*   [ ] Design and implement the results dashboard to display backtest charts, KPI cards, portfolio composition, and transaction analysis.
*   [ ] Develop the UI for displaying the rebalancing recommendations.
*   [ ] Implement the "Next Steps" section in the results dashboard.
*   [ ] Ensure responsiveness across different devices.
*   [ ] Implement client-side data validation.

## Style Guidelines

*   [ ] Ensure all components adhere to the defined styling principles.
*   [ ] Verify consistent use of colors, typography, and spacing.
*   [ ] Implement light and dark mode toggle if specified in guidelines.
*   [ ] Optimize images and other assets for performance.
*   [ ] Review and refactor CSS/styling code for maintainability.

## General Development Tasks

*   [ ] Write unit and integration tests for key functionalities.
*   [ ] Document the API endpoints and data structures.
*   [ ] Set up continuous integration and continuous deployment (CI/CD) pipelines.
*   [ ] Optimize application performance.
*   [ ] Conduct thorough testing of the complete application flow.
*   [ ] Prepare for deployment.