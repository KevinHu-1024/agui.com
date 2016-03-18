userPage.controller('tabController', ['$scope', '$rootScope', '$state', function ($scope,$rootScope,$state) {
    $scope.tabs = [
        {
            description: '答题记录',
            state: 'userLog',
            templateUrl: 'views/userPage.userLog.view.html'
        },
        {
            description: '个人信息',
            state: 'userInfo',
            templateUrl: 'views/userPage.userInfo.view.html'
        },
        {
            description: '志愿者工作',
            state: 'volunteer',
            templateUrl: 'views/userPage.volunteer.view.html'
        },
        {
            description: '问卷管理',
            state: 'admin.main',
            templateUrl: 'views/userPage.admin.view.html'
        }
    ];
}]);