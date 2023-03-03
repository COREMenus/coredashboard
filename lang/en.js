export default async (context, locale) => {
    return await Promise.resolve({
        dashboard: 'Dashboard',
        menu_settings: 'Menu Settings',
        settings: 'Settings',
        language: 'Language',
        range: 'Range',
        hello: 'Hello',
        quantity: 'Quantity',
        description: 'Description',
        image: 'Image',
        manage: 'Manage',
        general: 'General',
        home: 'Home',


        // * Table Headers and Inputs
        name: 'Name',
        status: 'Status',
        price: 'price',
        total: 'total',
        time: 'Time',
        date: 'Date',
        type: 'Type',
        active: 'active',
        actions: 'Actions',
        customer_name: 'Customer Name',
        notes: 'Notes',

        // * Inputs Errors
        required: 'Required',

        // * Buttons
        cancel: 'Cancel',
        save: 'Save',
        send: 'Send',
        next: 'Next',


        // * Toast
        deleted_success: 'Deleted Successfully',
        saved: 'Saved',

        // * Errors
        error_occured: 'An Error Has Occured',
        notfound: 'Page not found',

        // * Login / Sign Up / Logout
        login_to_core: 'Login To Coremenus',
        login: 'Login',
        no_account: "Don't have an account?",
        sign_up: 'Sign Up',
        join_core: 'Join Coremenus Now',
        try_core: 'Try Coremenus for Free. No Credit Card.',
        logout: 'Logout',
        email: 'email',
        username: 'Username',
        password: 'Password',
        confirm_password: 'Confirm Password',
        remember_me: 'Remember Me',
        forgot_password: 'Forgot Password',
        create_account: 'Create Account',
        have_account: 'Aready have an account?',
        login_panel: 'Go To Panel Login',
        reset_password: 'Reset Password',
        new_password: 'New Password',
        reset_password_desc: 'If email exists, you will recieve an email with reset password link.',
        reset_link_sent: 'We have sent you a reset link, check your email.',

        // * Shops
        your_shops: 'Your Shops',
        go: 'Go',

        // * Menu Manager
        menu_manager: 'Menu Manager',
        create_menu: 'Create Menu',
        no_menu: "You don't have any menus. Create menu to get started",
        new_menu: 'New Menu',
        edit_menu: 'Edit Menu',
        manage_menu_branches: 'Manage menu branches',
        disabled_branches: 'Disabled Branches',
        select_branch_disable: 'Select Branch To Disable',

        // * Products
        new_product: 'New Product',
        edit_product: 'Edit Product',
        no_product: 'You do not have products',
        labels: 'Labels',
        warnings: 'Warnings',
        calories: 'Calories',

        // * Options
        options: 'Options',
        option: 'Option',
        new_option: 'New Option',
        edit_option: 'Edit Option',

        // * Translation
        translation: 'Translation',
        locale: 'Locale',
        new_translation: 'New Translation',
        edit_translation: 'Edit Translation',

        // * Sections
        sections: 'Sections',
        section: 'Section',
        edit_section: 'Edit Section',
        new_section: 'New Section',
        delete_section: 'Delete Section',

        // * Analytics
        analytics: 'Analytics',
        view_analytics: 'View Analytics',
        order_locations: 'Order Location',
        top_orders: 'Top Orders',
        total_orders: 'Total Orders',
        cars_orders: 'Cars Orders',
        table_orders: 'Table Orders',
        top_products: 'Top Products',
        revenue: 'Revenue',
        overall_revenue: 'Overall Revenue',
        overall_orders: 'Overall Orders',

        // * Orders
        orders: 'Orders',
        receive_orders: 'Receive Orders',
        todays_orders: "Today's Orders",
        select_branch: 'Select Branch',
        new_order: 'New Order',
        confirm_order: 'Confirm Order',
        complete_order: 'Complete Order',
        order: 'Order',
        car_number: 'Car Number',
        table_number: 'Table Number',

        // * Branches
        branches: 'Branches',
        branch: 'Branch',
        create_branch: 'Create Branch',
        edit_branch: 'Edit Branch',
        branch_name: 'Branch Name',
        max_branches: 'You reach the maximum number of branches, please upgrade your plan to create more branches',

        // * Users
        users: 'Users',
        new_user: 'New User',

        // * Feedbacks
        feedbacks: 'Feedbacks',
        feedback_for_order: 'Feedback for order',
        rating: 'Rating',
        comment: 'Comment',

        // * Settings
        menu_preference: 'Menu Preference',
        symbol: 'Symbol',
        currency: 'Currency',
        tax: 'Tax',
        theme: 'Theme',
        primary_font: 'Primary Font Color',
        secondary_font: 'Secondary Font Color',
        accent_color: 'Accent Color',
        background_color: 'Background Color',
        default_language: 'Default Language',
        enabled_languages: 'Enabled Languages',
        // * QR CODE GENERATOR
        qr_generator: 'QR Code Generator',
        color: 'Color',
        download: 'Download',

        // * Tables
        tables_preference: 'Tables Preference',
        new_table: 'New Table',
        edit_table: 'Edit Table',
        table_ordering: 'Enable Table Order',

        // * Cars
        cars_preference: 'Cars Preference',
        car_ordering: 'Enable Cars Orders',

        // * Subscriptions
        no_sub: "You don't have active subscription",
        days_left: 'Days Left',
        on_trail: 'days left for your free trail to expire',
        features: 'Features',
        subscribe: 'Subscribe',

        // * Plans
        basic_plan: "Basic Plan",
        intermediate_plan: 'Intermediate Plan',
        premium_plan: 'Premium Plan',
        upgrade: 'Upgrade',


        // * Onboarding and account settings
        account_info: 'Account Information',
        first_name: 'First Name',
        last_name: 'Last Name',
        country_code: 'Country Code',
        phone_number: 'Phone Number',
        company_name: 'Company Name',
        company_type: 'Company Type',
        country: 'Country',
        shop_info: 'Shop Info',
        used_trail: 'You used your free trail',
        domain_will_be: 'Shop panel login domain:',
        shop_unique: 'Shop name must be unique',
        shop_taken: 'Name is taken',
        shop_name: 'Shop Name',
        account_created: 'Account Created',
        account_created_description: 'Your account has been created succssfully. To finish registeration, please check your email inbox to confirm your email address.',
        reset: 'Reset',
        not_verified: 'Please check your inbox, and confirm your email address.',



        billing_settings: 'Billing Settings',
        billing_manager: 'Billing Manager',
        current_plan: 'Current Plan',
        next_billing_date: 'Next Billing Date',
        change_card: 'Change Card',
        change_card_desc: 'You will be charged a small amount for 3D Secure. The amount will be refunded as soon as the card successfully changes.',
        cancel_subscription: 'Cancel Subscription',
        subscription_history: 'Subscription Histroy',
        cycle: 'Cycle',
        annual: 'Annual',
        monthly: 'Monthly',
        card_holder: 'Card Holder',
        card_number: 'Card Number',
        expire_date: 'Expire Date',
        checkout: 'Checkout',
        invalid_card: 'Invalid Card',
        invalid_date: 'Invalid Date',

        onboarding: 'Oboarding',
        few_mins: 'This will take few minutes',
        personal_info: 'Personal Information',
        company_info: 'Company Information',
        pick_plan: 'Pick a Plan',

        per_month: 'Per Month',
        billed_annually: 'Billed Annually',
        billed_monthly: 'Billed Monthly',
        pick: 'Pick',
        picked: 'Picked',
        start_trial: 'Start Free Trial',
        twenty_off: 'Annual Billing Has 20% Off',

        unpaid: 'Unpaid',
        expired: 'Expired',
        failed: 'Failed',


      })
  }
  
 