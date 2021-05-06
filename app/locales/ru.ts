export const ru = {
    meta: {
        index: {
            description: 'Магазин специализированных материалов для технического обслуживания авиационной техники',
            keywords: 'логнгвей, лваеро, авиахимия, авиация, техническое обслуживание, самолёты'
        }
    },
    page: {
        index: {
            title: 'GLOBAL MRO SUPPLY MANAGEMENT',
            subtitle: 'Мы поможем вам приобрести нужный товар по отличной цене'
        },
        product_id: {
            quantity: 'quantity',
            productDescription: 'Описание товара',
            specifications: 'Характеристики'
        },
        cabinet: {
            information: 'Информация',
            showOrders: 'Посмотреть заказы'
        },
        login: {
            policies: 'Авторизуйтесь на сайте, Вы соглашаетесь с ',
            policiesLink: 'нашей политикой конфиденциальности'
        }
    },
    header: {
        general: 'главная',
        products: 'продукция',
        aboutUs: 'о компании'
    },
    footer: {
        home: 'Главная',
        search: 'Поиск',
        cart: 'Корзина'
    },
    components: {
        AlgoliaSearch: {
            filters: 'фильтры'
        },
        ASHit: {
            specifications: 'Характеристики',
            price: 'Цена',
            buttons: {
                add: 'Добавить',
                link: 'Подробнее'
            }
        },
        AsHitConsignmentStatus: {
            available: 'на складе',
            unavailable: 'под заказ'
        },
        ASHitDetails: {
            group: 'Группа',
            uom: 'Uom',
            color: 'Цвет',
            mfg: 'Производитель',
            brand: 'Бренд'
        },
        ASBoxInput: {
            searchLabel: 'введите наименование или код продукта'
        },
        ASRefinementList: {
            titles: {
                group: 'Группа',
                mfg: 'Производитель'
            }
        },
        ASRefinementResetButton: {
            reset: 'Сбросить фильтры'
        },
        ButtonAddToCart: {
            addToCart: 'Добавить в корзину',
            successMessage: 'Товар успешно добавлен в корзину',
            errorMessage: 'Что-то пошло не так'
        },
        CabinetMenu:{
            cabinet: 'Кабинет',
            orders: 'Мои заказы',
            settings: 'Настройки'
        },
        CartItem: {
            productPage: 'страница товара',
            price: 'Стоимость'
        },
        CartItemList: {
            empty: 'Корзина пуста'
        },
        ConsignmentDisplay: {
            inStock: 'В наличии на складе',
            quantity: 'в количестве',
            dateProduction: 'Дата изготовления',
            sellBy: 'Годен до'
        },
        ConsignmentStatus: {
            available: 'Товар доступен на складе',
            unavailable: 'Товар доступен под заказ'
        },
        LocaleSetForm:{
            title: 'Сменить локализацию',
            label: 'Язык',
            updateButton: 'Сохранить'
        },
        MenuDrawer: {
            menu: 'Меню',
            home: 'Главная',
            about: 'О компании',
            cabinet: 'Кабинет',
            orders: 'Мои заказы',
            settings: 'Настройки'
        },
        OrderCreateForm: {
            totalQuantity: 'Товаров всего',
            totalPrice: 'Общая стоимость',
            contacts: 'Контакты',
            phone: 'Телефон',
            email: 'E-mail',
            fillInSettings: 'заполнить в кабинете',
            checkout: 'Оформить заказ',
            resetCart: 'Очистить корзину',
            orderSuccess: 'Заказ успешно создан'
        },
        OrderList:{
            order: 'Заказ',
            status: 'Статус',
            description: 'Описание',
            color: 'Цвет',
            sellingPrice: 'Цена продажи',
            count: 'Кол-во',
            total: 'Итого'
        },
        PhoneSetForm:{
            phoneSuccessUpdate: 'Номер телефона успешно обновлен',
            updatePhone: 'Обновить номер телефона',
            phoneLabel: 'Номер телефона',
            wrongPhone: 'Номер указан неверно',
            phoneRequired: 'Обязательное поле',
            updateButton: 'Обновить'
        },
        Price: {
            quote: 'Запросить КП',
            error: 'Request failed, try again later',
            success: 'Request success',
            sending: 'Sending...'
        },
        SearchField: {
            label: 'наименование или код продукта',
            shortLabel: 'поиск'
        }
    },
    search: {
        input: 'введите наименование или код продукта'
    },
    auth: {
        signOut: 'Выйти',
        signIn: 'Войти'
    }
} as const