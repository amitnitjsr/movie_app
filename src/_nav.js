export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer'
        },
        {
            name: 'Manage Movies',
            url: '/movies',
            icon: 'fa fa-film',
            children: [
                {
                    name: 'Add Movie',
                    url: '/movies/add',
                    icon: 'fa fa-plus-square',
                },
                {
                    name: 'Movies List',
                    url: '/movies/list',
                    icon: 'fa fa-list-alt',
                }
            ]
        },
    ],
};
