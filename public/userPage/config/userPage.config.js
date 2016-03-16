userPage.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('userLog', {
            url: '/userLog',
            templateUrl: 'userPage/views/userPage.userLog.view.html'
        })
        .state('userInfo', {
            url: '/userInfo',
            templateUrl: 'userPage/views/userPage.userInfo.view.html'
        })
        .state('volunteer', {
            url: '/volunteer',
            templateUrl: 'userPage/views/userPage.volunteer.view.html'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'userPage/views/userPage.admin.view.html'
        })
        .state('admin.detail', {
            views: {
                '': {
                    templateUrl: 'userPage/views/userPage.admin.main.view.html'
                },
                'edit': {
                    templateUrl: 'userPage/views/userPage.admin.editQuestion.view.html'
                }
            }
        });
        // .state('admin.main', {
        //     url: '/main',
        //     templateUrl: 'userPage/views/userPage.admin.main.view.html'
        // })
        // .state('admin.edit', {
        //     url: '/edit',
        //     templateUrl: 'userPage/views/userPage.admin.editQuestion.view.html'
        // });
    $urlRouterProvider.otherwise('/userLog');  
})