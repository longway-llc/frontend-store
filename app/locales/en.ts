export const en = {
    meta: {
        index: {
            description: 'Shop of specialized materials for the maintenance of aviation equipment',
            keywords: 'lwaero, longway, aviation, aviation chemistry, maintenance, aircraft'
        }
    },
    page: {
        index: {
            title: 'GLOBAL MRO SUPPLY MANAGEMENT',
            subtitle: 'we will help you purchase the right product at a great price'
        },
        product_id: {
            quantity: 'quantity',
            productDescription: 'Product description',
            specifications: 'Specifications'
        },
        cabinet: {
            information: 'Information',
            showOrders: 'Show orders'
        },
        login: {
            policies: 'Log in to the site, you agree to ',
            policiesLink: 'our privacy policy'
        }
    },
    header: {
        general: 'main',
        products: 'products',
        aboutUs: 'about us'
    },
    footer: {
        home: 'home',
        search: 'search',
        cart: 'cart'
    },
    components: {
        AlgoliaSearch: {
            filters: 'filters'
        },
        ASHit: {
            specifications: 'Specifications',
            price: 'Price',
            buttons: {
                add: 'Add to cart',
                link: 'See more'
            }
        },
        AsHitConsignmentStatus: {
            available: 'in stock',
            unavailable: 'upon request'
        },
        ASHitDetails: {
            group: 'Group',
            uom: 'Uom',
            color: 'Color',
            mfg: 'Manufacturing',
            brand: 'Brand'
        },
        ASBoxInput: {
            searchLabel: 'enter code or product name'
        },
        ASRefinementList: {
            titles: {
                group: 'Group',
                mfg: 'Manufacturing'
            }
        },
        ASRefinementResetButton: {
            reset: 'Reset filters'
        },
        ButtonAddToCart: {
            addToCart: 'add to cart',
            successMessage: 'Product added to cart successfully',
            errorMessage: 'Something was wrong'
        },
        CabinetMenu: {
            cabinet: 'Cabinet',
            orders: 'Orders',
            settings: 'Settings'
        },
        CartItem: {
            productPage: 'product page',
            price: 'Price'
        },
        CartItemList: {
            empty: 'Cart is empty'
        },
        ConsignmentDisplay: {
            inStock: 'In stock',
            quantity: 'quantity',
            dateProduction: 'Manufacture date',
            sellBy: 'Sell by'
        },
        ConsignmentStatus: {
            available: 'Product is available in stock',
            unavailable: 'Product available upon request',
            expectedDelivery: 'Expected delivery date'
        },
        LocaleSetForm: {
            title: 'Change localization',
            label: 'Localization',
            updateButton: 'Save'
        },
        MenuDrawer: {
            menu: 'Menu',
            home: 'Home',
            about: 'About us',
            cabinet: 'Cabinet',
            orders: 'Orders',
            settings: 'Settings'
        },
        OrderCreateForm: {
            totalQuantity: 'Total quantity',
            totalPrice: 'Total price',
            contacts: 'Contacts',
            phone: 'Phone',
            email: 'E-mail',
            fillInSettings: 'fill in the settings',
            checkout: 'Checkout',
            resetCart: 'Reset cart',
            orderSuccess: 'Order successfully created',
            optionalFields: 'Optional fields',
            requestedShippingDate: 'Requested Shipping Date',
            deliveryInstruction: 'Delivery instruction',
            poNumber: 'PO Number'
        },
        OrderList: {
            order: 'Order',
            status: 'Status',
            description: 'Description',
            color: 'Color',
            sellingPrice: 'Selling Price',
            count: 'Quantity',
            total: 'Total'
        },
        PhoneSetForm: {
            phoneSuccessUpdate: 'Phone updated successfully',
            updatePhone: 'Update phone number',
            phoneLabel: 'Phone number',
            wrongPhone: 'Phone number is incorrect',
            phoneRequired: 'Required field',
            updateButton: 'Update'
        },
        Price: {
            quote: 'request quote',
            error: 'Запрос не удался, попробуйте позже',
            success: 'Запрос успешно создан',
            sending: 'Отправление...'
        },
        SearchField: {
            label: 'P\\N or keywords',
            shortLabel: 'search'
        }
    },
    search: {
        input: 'enter code or product name',
    },
    auth: {
        signOut: 'Sign Out',
        signIn: 'Sign In'
    }
} as const