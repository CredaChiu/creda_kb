const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/keycaps',
        component: () => import('pages/keycaps.vue')
      },
      {
        path: '/keyboard',
        component: () => import('pages/keyboard.vue')
      },

      {
        path: '/favorites',
        component: () => import('pages/Favorites.vue')
      },
      {
        path: '/favorites/Keycaps/JTK',
        component: () => import('pages/FavoritesJTK.vue')
      },
      {
        path: '/favorites/Keycaps/GMK',
        component: () => import('pages/FavoritesGMK.vue')
      },
      {
        path: '/following',
        component: () => import('pages/Following.vue')
      },
      {
        path: '/following/Keyboard',
        component: () => import('pages/FollowingKeyboard.vue')
      },
      {
        path: '/following/Keycaps',
        component: () => import('pages/FollowingKeycaps.vue')
      },
      {
        path: '/favorites/Keyboard',
        component: () => import('pages/FavoritesKeyboard.vue')
      },
      {
        path: '/favorites/Keycaps',
        component: () => import('pages/FavoritesKeycaps.vue')
      }


    ]
  }
]

export default routes
