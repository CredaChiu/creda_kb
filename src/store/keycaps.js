export const keycapsStore = {
  // 获取所有键帽数据
  getAllKeycaps() {
    return [
      {
        id: 1,
        name: 'GMK Dracula R2',
        manufacturer: 'GMK',
        image: 'public/images/gmk-dracula.webp',
        characterColor: '#FFFFFF',
        baseColor: '#282A36',
        colorCategory: ['dark', 'purple', 'violet', 'white', 'monochrome'],
        isFavorite: false,
        isShopping: false
      }
      // 添加更多键帽数据
      ,{
        id: 2,
        name: 'GMK Yuri R2',
        manufacturer: 'GMK',
        image: 'public/images/gmk-yuri.webp',
        characterColor: '#FF6D00',
        baseColor: '#2A3C56',
        colorCategory: ['navy', 'blue', 'orange', 'white', 'contrast'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 3,
        name: 'GMK Olive R2',
        manufacturer: 'GMK',
        image: 'public/images/gmk-olive.png',
        characterColor: '#9DA183',
        baseColor: '#3B3C36',
        colorCategory: ['olive', 'green', 'earth', 'dark'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 4,
        name: 'GMK Pacific',
        manufacturer: 'GMK',
        image: 'public/images/gmk-pacific.webp',
        characterColor: '#FFFFFF',
        baseColor: '#0077BE',
        colorCategory: ['blue', 'sky', 'white', 'bright', 'contrast'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 5,
        name: 'GMK Electric',
        manufacturer: 'GMK',
        image: 'public/images/gmk-electric.webp',
        characterColor: '#00FFFF',
        baseColor: '#000000',
        colorCategory: ['black', 'cyan', 'neon', 'dark', 'contrast'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 6,
        name: 'GMK Blurple',
        manufacturer: 'GMK',
        image: 'public/images/gmk-blurple.webp',
        characterColor: '#FFFFFF',
        baseColor: '#5A4FCF',
        colorCategory: ['purple', 'violet', 'blue', 'white', 'bright'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 7,
        name: 'GMK Olivia Nº3',
        manufacturer: 'GMK',
        image: 'public/images/gmk-olivia.webp',
        characterColor: '#E8C4B8',
        baseColor: '#2A2A2A',
        colorCategory: ['black', 'pink', 'blush', 'dark', 'pastel'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 8,
        name: 'GMK Cubed³',
        manufacturer: 'GMK',
        image: 'public/images/gmk-cubed.webp',
        characterColor: '#FFFFFF',
        baseColor: '#3D5A80',
        colorCategory: ['blue', 'navy', 'white', 'contrast'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 9,
        name: 'GMK Fright Club',
        manufacturer: 'GMK',
        image: 'public/images/gmk-fright club.webp',
        characterColor: '#FF4500',
        baseColor: '#1A1A1A',
        colorCategory: ['black', 'orange', 'red', 'dark', 'halloween'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 10,
        name: 'GMK Terror Below',
        manufacturer: 'GMK',
        image: 'public/images/gmk-terror below.webp',
        characterColor: '#00FF00',
        baseColor: '#000000',
        colorCategory: ['black', 'green', 'neon-green', 'dark', 'halloween'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 11,
        name: 'GMK NTD',
        manufacturer: 'GMK',
        image: 'public/images/gmk-ntd.webp',
        characterColor: '#FFFFFF',
        baseColor: '#2E3440',
        colorCategory: ['dark', 'grey', 'white', 'monochrome'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 12,
        name: 'GMK Gladiator',
        manufacturer: 'GMK',
        image: 'public/images/gmk-gladiator.webp',
        characterColor: '#D4AF37',
        baseColor: '#8B0000',
        colorCategory: ['burgundy', 'crimson', 'red', 'gold', 'warm'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 13,
        name: 'GMK Cyrillic WoB',
        manufacturer: 'GMK',
        image: 'public/images/gmk-cyrillic wob.webp',
        characterColor: '#FFFFFF',
        baseColor: '#000000',
        colorCategory: ['black', 'white', 'monochrome', 'contrast'],
        isFavorite: false,
        isShopping: false
      },
      {
        id: 14,
        name: 'GMK Grey on Black',
        manufacturer: 'GMK',
        image: 'public/images/gmk-grey on black.webp',
        characterColor: '#808080',
        baseColor: '#000000',
        colorCategory: ['black', 'grey', 'monochrome', 'dark'],
        isFavorite: false,
        isShopping: false
      }

    ]
  },

  getAllKeyboard() {
    return [
      {
        id: 20001,
        name: 'Diversity',
        manufacturer: 'DDS',
        design: "SumJoy",
        layout: "80",
        pcb:"Solder/Hotswap",
        price:"1999¥",
        image: 'public/images/diversity.webp',
        isFavorite: false,
        isShopping: false
      },
      {
        id: 20002,
        name: 'DTR',
        manufacturer: 'Kezewa',
        design: "Orakky/Yuriko",
        layout: "60",
        pcb:"Hotswap",
        price:"1600¥",
        image: 'public/images/dtr60.webp',
        isFavorite: false,
        isShopping: false
      },
      {
        id: 10001,
        name: 'SR65',
        manufacturer: '???',
        design: "???",
        layout: "65",
        pcb:"Hotswap",
        price:"967¥",
        image: 'public/images/sr65.webp',
        isFavorite: false,
        isShopping: false
      },
      {
        id: 10002,
        name: 'Sisyphus65',
        manufacturer: 'DM',
        design: "GAGA",
        layout: "65",
        pcb:"Hotswap",
        price:"1980¥",
        image: 'public/images/sisyphus65.webp',
        isFavorite: false,
        isShopping: false
      },
      {
        id: 10003,
        name: 'Axis68',
        manufacturer: 'DM',
        design: "择笔",
        layout: "65",
        pcb:"Hotswap",
        price:"1988¥",
        image: 'public/images/axis68.webp',
        isFavorite: false,
        isShopping: false
      },
      {
        id: 10004,
        name: 'Cycle7',
        manufacturer: '???',
        design: "TKD",
        layout: "70",
        pcb:"Hotswap",
        price:"899¥",
        image: 'public/images/cycle7.webp',
        isFavorite: false,
        isShopping: false
      },
      {
        id: 10005,
        name: 'Angle65',
        manufacturer: '???',
        design: "Vertex",
        layout: "65",
        pcb:"Hotswap",
        price:"2600¥",
        image: 'public/images/angle65.webp',
        isFavorite: false,
        isShopping: false
      },
      {
        id: 10006,
        name: 'Bin50',
        manufacturer: '???',
        design: "牛牛",
        layout: "50",
        pcb:"Hotswap",
        price:"980¥",
        image: 'public/images/bin50.webp',
        isFavorite: false,
        isShopping: false
      },
      {
      id: 10007,
        name: 'Tas60',
      manufacturer: '京凡',
      design: "Lance",
      layout: "60",
      pcb:"Hotswap",
      price:"930¥",
      image: 'public/images/tas60.webp',
      isFavorite: false,
      isShopping: false
      },
      {
        id: 10008,
        name: 'Neo70',
        manufacturer: '???',
        design: "Neo",
        layout: "70",
        pcb:"Hotswap",
        price:"850¥",
        image: 'public/images/neo70.webp',
        isFavorite: false,
        isShopping: false
      }



    ]
  },

  // 获取收藏的键帽
  getFavorites() {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
  },

  getShopping() {
    const shopping = localStorage.getItem('shopping')
    return shopping ? JSON.parse(shopping) : []
  },

  // 添加收藏
  addToFavorites(keycap) {
    const favorites = this.getFavorites()
    favorites.push(keycap)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },

  addToShopping(keycap) {
    const shopping = this.getShopping()
    shopping.push(keycap)
    localStorage.setItem('shopping', JSON.stringify(shopping))
  },

  // 移除收藏
  removeFromFavorites(keycapId) {
    const favorites = this.getFavorites()
    const updatedFavorites = favorites.filter(k => k.id !== keycapId)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  },

  removeFromShopping(keycapId) {
    const shopping = this.getShopping()
    const updatedShopping = shopping.filter(k => k.id !== keycapId)
    localStorage.setItem('shopping', JSON.stringify(updatedShopping))
  }
}
