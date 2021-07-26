export const en = {
  meta: {
    index: {
      description: 'Shop of specialized materials for the maintenance of aviation equipment',
      keywords: 'lwaero, longway, aviation, aviation chemistry, aircraft maintenance, aircraft',
    },
    login: {
      description: 'Login into LWaero system',
      keywords: 'lwaero, longway, aviation, aviation chemistry, maintenance, aircraft, authorization in LWaero',
    },
    policies: {
      description: 'Private policies rules of LWaero store',
      keywords: 'LWaero private policies, rules of collect personal data on LWaero',
    },
    search: {
      description: 'Search products in LWaero store',
      keywords: 'LWaero search, products LWaero, filtering products LWaero',
    },
  },
  page: {
    index: {
      title: 'GLOBAL MRO SUPPLY MANAGEMENT',
      subtitle: 'we will help you purchase the right product at a great price',
    },
    product_id: {
      quantity: 'quantity',
      productDescription: 'Product description',
      specifications: 'Specifications',
    },
    cabinet: {
      information: 'Information',
      showOrders: 'Show orders',
    },
    login: {
      policies: 'Log in to the site, you agree to ',
      policiesLink: 'our privacy policy',
      sendEmail: 'Authorize message was sending to your email!',
      loginToCabinet: 'Sign in personal cabinet',
      // TODO: перевести корректно
      callbackError: 'Please use authorize method when you login first time',
      unhandingError: 'Unhanding error, connect to support please',
    },
    orders: {
      orderList: 'Orders list',
      title: 'Orders',
    },
  },
  header: {
    general: 'main',
    products: 'products',
    aboutUs: 'about us',
  },
  footer: {
    home: 'home',
    search: 'search',
    cart: 'cart',
  },
  components: {
    AlgoliaSearch: {
      filters: 'filters',
    },
    AvailableOnVirtualStock: {
      option: 'You can also request this product from the following warehouses by contacting the manager',
      for: 'for',
    },
    ASHit: {
      specifications: 'Specifications',
      price: 'Price',
      buttons: {
        add: 'Add to cart',
        link: 'See more',
      },
    },
    AsHitConsignmentStatus: {
      available: 'in stock',
      unavailable: 'upon request',
    },
    ASHitDetails: {
      group: 'Group',
      uom: 'Uom',
      color: 'Color',
      mfg: 'Manufacturing',
      brand: 'Brand',
    },
    ASBoxInput: {
      searchLabel: 'enter code or product name',
    },
    ASRefinementList: {
      titles: {
        group: 'Group',
        mfg: 'Manufacturing',
      },
    },
    ASRefinementResetButton: {
      reset: 'Reset filters',
    },
    ButtonAddToCart: {
      addToCart: 'add to cart',
      successMessage: 'Product added to cart successfully',
      errorMessage: 'Something was wrong',
    },
    CabinetMenu: {
      cabinet: 'Cabinet',
      orders: 'Orders',
      settings: 'Settings',
    },
    CartItem: {
      productPage: 'product page',
      price: 'Price',
    },
    CartItemList: {
      empty: 'Cart is empty',
    },
    ConsignmentDisplay: {
      inStock: 'In stock',
      quantity: 'quantity',
      dateProduction: 'Manufacture date',
      sellBy: 'Sell by',
    },
    ConsignmentStatus: {
      available: 'Available total products units on stocks',
      detail: 'Contact with the manager for details',
      unavailable: 'Product available upon request',
      expectedDelivery: 'Expected delivery date',
      verifiedRequirement: 'Wait for the admin to set your verified status to see the details of the placement in warehouses',
    },
    LocaleSetForm: {
      title: 'Change localization',
      label: 'Localization',
      updateButton: 'Save',
    },
    MenuDrawer: {
      menu: 'Menu',
      home: 'Home',
      about: 'About us',
      cabinet: 'Cabinet',
      orders: 'Orders',
      settings: 'Settings',
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
      poNumber: 'PO Number',
    },
    OrderList: {
      order: 'Order',
      status: 'Status',
      description: 'Description',
      color: 'Color',
      sellingPrice: 'Selling Price',
      count: 'Quantity',
      total: 'Total',
      notFound: 'Orders not found',
    },
    OrderSearch: {
      searchBy: 'Search order by invoice',
    },
    PhoneSetForm: {
      phoneSuccessUpdate: 'Phone updated successfully',
      updatePhone: 'Update phone number',
      phoneLabel: 'Phone number',
      wrongPhone: 'Phone number is incorrect',
      phoneRequired: 'Required field',
      updateButton: 'Update',
    },
    Price: {
      quote: 'request quote',
      error: 'Запрос не удался, попробуйте позже',
      success: 'Запрос успешно создан',
      sending: 'Отправление...',
    },
    SearchField: {
      label: 'P\\N or keywords',
      shortLabel: 'search',
    },
  },
  search: {
    input: 'enter code or product name',
  },
  auth: {
    signOut: 'Sign Out',
    signIn: 'Sign In',
  },
} as const
