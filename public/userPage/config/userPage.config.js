userPage.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('userLog', {
            url: '/userLog',
            templateUrl: 'userPage/views/userPage.userLog.view.html',
        })
        .state('userInfo', {
            url: '/userInfo',
            templateUrl: 'userPage/views/userPage.userInfo.view.html',
        })
        .state('volunteer', {
            url: '/volunteer',
            templateUrl: 'userPage/views/userPage.volunteer.view.html',
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'userPage/views/userPage.admin.view.html',
        });
    $urlRouterProvider.otherwise('/userLog');        
})