export default async (context, locale) => {
    return await Promise.resolve({
        // * General
        dashboard: 'الرئيسية',
        menu_settings: 'إعدادات القائمة',
        settings: 'إعدادات',
        language: 'لغة',
        range: 'نطاق',
        hello: 'مرحبًا',
        quantity: 'الكمية',
        description: 'الوصف',
        image: 'الصورة',
        manage: 'أدارة',
        general: 'عام',
        home: 'الرئيسية',


        // * Table Headers and Inputs
        name: 'الاسم',
        status: 'الحالة',
        price: 'السعر',
        total: 'المجموع',
        time: 'التوقيت',
        date: 'تاريخ',
        type: 'النوع',
        active: 'نشيط',
        actions: 'أجراءات',

        // * Inputs Errors
        required: 'مطلوب',

        // * Buttons
        cancel: 'إالغاء',
        save: 'حفظ',
        send: 'ارسال',
        next: 'التالي',

        // * Toast
        deleted_success: 'تم حذف بنجاح',
        saved: 'تم الحفظ',

        // * Errors
        error_occured: 'حدث خطأ',
        notfound: 'الصفحة غير موجودة',

        // * Login / Sign up / Logout
        login_to_core: 'تسجيل الدخول إلى Coremenus',
        login: 'تسجيل الدخول',
        no_account: 'ليس لديك حساب؟',
        sign_up: 'سجل حساب جديد',
        join_core: 'انضم إلى Coremenus الآن',
        try_core: 'جرب Coremenus مجانا',
        logout: 'تسجيل خروج',
        email: 'البريد الإلكتروني',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        confirm_password: 'تأكيد كلمة المرور',
        remember_me: 'تذكرنى',
        forgot_password: 'هل نسيت كلمة السر',
        create_account: 'حساب جدجد',
        have_account: 'لديك حساب؟',
        login_panel: 'التسجيل في لوحة استقبال الطلبات',
        reset_password: 'اعادة تعيين كلمة المرور',
        new_password: 'كلمة المرور الجديدة',
        reset_password_desc: 'سيتم ارسال رابط تعيين كلمة المرور في بيردك الالكتروني',
        reset_link_sent: 'تم ارسال رابط تعيين كلمة المرور في بريدك',
        account_created: 'تم إنشاء الحساب بنجاح',
        account_created_description: 'لاتمام تسجيل الدخول، تحقق من صندوق بريدك الالكتروني لتأكيد حسابك.',
        reset: 'اعادة تعيين',
        not_verified: 'الرجاء التأكد من صندوق بريدك الالكتروني لتأكيد حسابك',


        // * Shops
        your_shops: 'متاجرك',
        go: 'ذهاب',


        // * Menu Manager
        menu_manager: 'إدارة القائمة',
        create_menu: 'إنشاء قائمة',
        no_menu: 'ليس لديك أي قوائم. إنشاء قائمة لتبدأ',
        new_menu: 'قائمة جديدة',
        edit_menu: 'عدل القائمة',
        manage_menu_branches: 'إدارة فروع القائمة',
        disabled_branches: 'الفروع المعطلة',
        select_branch_disable: 'حدد الفرع المراد تعطيله',

        // * Products
        new_product: 'منتج جديد',
        edit_product: 'تحرير المنتج',
        no_product: 'ليس لديك منتجات',
        labels: 'العلامات',
        warnings: 'التحذيرات',
        calories: 'السعرات',

        // * Options
        options: 'الخيارات',
        option: 'الخيار',
        new_option: 'خيار جديد',
        edit_option: 'تحرير الخيار',

        // * Translation
        translation: 'الترجمة',
        locale: 'اللغه',
        new_translation: 'ترجمة جديدة',
        edit_translation: 'تحرير الترجمة',

        // * Sections
        sections: 'الأقسام',
        section: 'القسم',
        edit_section: 'تحرير القسم',
        new_section: 'قسم جديد',
        delete_section: 'حذف القسم',

        // * Analytics
        analytics: 'التقرير',
        view_analytics: 'عرض التقرير',
        order_locations: 'موقع الطلب',
        top_orders: 'أعلى الطلبات',
        total_orders: 'إجمالي الطلبات',
        cars_orders: 'طلبات السيارات',
        table_orders: 'طلبات الطاولات',
        top_products: 'أهم المنتجات',
        revenue: 'الربح',

        // * Orders
        orders: 'الطلبات',
        todays_orders: 'طلبات اليوم',
        select_branch: 'حدد الفرع',
        new_order: 'طلب جديد',
        confirm_order: 'أكد الطلب',
        complete_order: 'اكمل الطلب',
        order: 'الطلب',
        car_number: 'رقم السياره',
        table_number: 'رقم الطاولة',

        // * Branches
        branches: 'الفروع',
        branch: 'فرع',
        create_branch: 'انشاء فرع',
        edit_branch: 'تحرير الفرع',
        branch_name: 'اسم الفرع',
        max_branches: 'لقد وصلت إلى الحد الأقصى لعدد الفروع ، يرجى تحديث خطتك لإنشاء المزيد من الفروع',

        // * Users
        users: 'المستخدمون',
        new_user: 'مستخدم جديد',

        // * Feedbacks
        feedbacks: 'الملاحظات',
        feedback_for_order: 'ملاحظات للطلب',
        rating: 'التقييم',
        comment: 'التعليق',

        // * Settings
        menu_preference: 'اعدادات القائمة',
        symbol: 'الرمز',
        currency: 'العملة',
        tax: 'الضريبة',
        theme: 'السمة',
        primary_font: 'لون الخط الأساسي',
        secondary_font: 'لون الخط الثانوي',
        accent_color: 'لون التمييز',
        background_color: 'لون الخلفية',
        // * QR CODE GENERATOR
        qr_generator: 'مولد رمز ال QR CODE',
        color: 'اللون',
        download: 'تحميل',

        // * Tables
        tables_preference: 'اعدادات قائمة الطاولات',
        new_table: 'طاولة جديدة',
        edit_table: 'تحرير الجدول',
        table_ordering: 'تفعيل طلبات الجدول',

        // * Cars
        cars_preference: 'اعدادات قائمة السيارات',
        car_ordering: 'تفعيل طلبات السيارات',

        //* Subscriptions and Onboarding
        no_sub: 'ليس لديك اشتراك',
        days_left: 'الايام المتبقية',
        on_trail: 'يوم هي الأيام المتبقية على انتهاء الفترة التجريبية ',
        features: 'الميزات',
        subscribe: 'اشترك',


         // * Plans
         basic_plan: "الخطة الأساسية",
         intermediate_plan: 'الخطة المتوسطة',
         premium_plan: 'خطة بريميوم',

        account_info: 'معلومات الحساب',
        first_name: 'الاسم الاول',
        last_name: 'الاسم الاخير',
        country_code: 'الرقم الدولي',
        phone_number: 'رقم الهاتف',
        company_name: 'اسم الشركة',
        company_type: 'نوع الشركة',
        country: 'الدولة',
        shop_info: 'معلومات المتجر',
        used_trail: 'لقد استخدمت الفترة التجريبية',
        domain_will_be: 'نطاق تسجيل الدخول إلى لوحة المتجر:',
        shop_unique: 'يجب أن يكون اسم المتجر فريدًا',
        shop_taken: 'الاسم مأخوذ',
        shop_name: 'اسم المتجر',

        billing_settings: 'إعدادات الفواتير',
        billing_manager: 'إدارة الفواتير',
        current_plan: 'الخطة الحالية',
        next_billing_date: 'موعد المحاسبة التالي',
        change_card: 'تغيير البطاقة',
        change_card_desc: 'سيتم تحصيل مبلغ صغير مقابل خدمة 3D Secure. سيتم إعادة المبلغ بمجرد تغيير البطاقة بنجاح.',
        cancel_subscription: 'إلغاء الاشتراك',
        subscription_history: 'سجل الاشتراك',
        cycle: 'الدورة',
        annual: 'سنوي',
        monthly: 'شهريا',
        card_holder: 'حامل البطاقة',
        card_number: 'رقم البطاقة',
        expire_date: 'تاريخ انتهاء الصلاحية',
        checkout: 'الدفع',
        invalid_card: 'بطاقة غير صالحة',
        invalid_date: 'تاريخ غير صالح',

        // * Onboarding
        onboarding: 'الاعداد',
        few_mins: 'سيستغرق هذا بضع دقائق',
        personal_info: 'المعلومات الشخصية',
        company_info: 'معلومات الشركة',
        pick_plan: 'اختر خطة',

        per_month: 'في الشهر',
        billed_annually: 'دفع سنوى',
        billed_monthly: 'دفع شهري',
        pick: 'اختر',
        picked: 'مختار',
        start_trial: 'ابدأ الفترة المجانية',
        twenty_off: 'يتم خصم ٢٠٪ للدفع السنوي',

        unpaid: 'غير مدفوع',
        expired: 'منتهي',
        failed: 'فشل'


    }
    )
}

