
const data = {
  account: {
    id: 1,
    first_name: 'Mohammed',
    last_name: 'Balfaqih',
    subscription: {
      id: 2,
      plan: {
        id: 3,
        branches: 5,
        video: true,
        pdf_export: true,
        price_per_month: 12,
        price_per_year: 34,
      },
      start_date: new Date('2022-05-20'),
      end_date: new Date('2022-05-29'),
      override_price: 12,
    },
  },
  shop: {
    shop_name: 'Core Cafe',
    menus: [
      {
        id: 0,
        name: 'Breakfast Menu',
        description: 'Healthy Breakfast in the morning',
        active: true,
        order: 0,
        branches: [
          { name: 'Wakrah', active: true },
          { name: 'Al Rayan', active: true },
        ],
        sections: [
          {
            name: 'Breakfast Pastries',
            order: 0,
            products: [
              {
                name: 'Breakfast Criossant',
                price: 10,
                image:
                  'https://media.istockphoto.com/photos/criossant-picture-id183272364?s=612x612',
              },
            ],
          },
          {
            name: 'Hot Drinks',
            order: 0,
            products: [
              {
                name: 'Coffee',
                price: 5,
                image:
                  'https://media.istockphoto.com/photos/black-coffee-isolated-on-a-white-background-picture-id1286808993',
              },
            ],
          },
        ],
      },

      {
        id: 1,
        name: 'Lunch Menu',
        description: 'Evening meal',
        active: true,
        order: 0,
        branches: [
          { name: 'Wakrah', active: true },
          { name: 'Al Rayan', active: true },
        ],
        sections: [
          {
            name: 'Sandwiches',
            order: 0,
            products: [
              {
                name: 'Shawarma',
                price: 10,
                image:
                  'https://media.istockphoto.com/photos/criossant-picture-id183272364?s=612x612',
              },
            ],
          },
          {
            name: 'Pasta',
            order: 0,
            products: [
              {
                name: 'something',
                price: 5,
                image:
                  'https://media.istockphoto.com/photos/black-coffee-isolated-on-a-white-background-picture-id1286808993',
              },
            ],
          },
        ],
      },
      
      
    ],
  },
}


exports.getMenus = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.shop.menus)
    }, 1000);
  })
}

exports.getOneMenu = async (id) => {
  await setTimeout(() => {
    return data.shop.menus.find(m => m.id === id)
  }, 1000);
}

exports.updateMenu = (payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let menu = data.shop.menus.find(m => m.id === payload.id)
      if (!menu) reject(new Error('Menu Does not exist'))
      menu = payload
      resolve(menu)
    }, 1000);
  })
}

