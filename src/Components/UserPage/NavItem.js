export const NavItem = [
    {
      label: 'Home',
      href: '/',
      component: ''
    },

    {
      label: 'Find Work',
      children: [
        {
          label: 'Job Board',
          subLabel: 'Find your dream design job',
          href: '#',
          component: '<Home/>'
        },
        {
          label: 'Freelance Projects',
          subLabel: 'An exclusive list for contract work',
          href: '#',
          component: '<Home/>'
        },
      ],
    },
  ]