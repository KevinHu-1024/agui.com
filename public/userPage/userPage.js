// angular.module('userPage', []).run(function ($rootScope) {
//     $rootScope.tabs = ['答题记录', '个人信息', '志愿者工作', '问卷管理'];
// });

// angular.module('userPage', ['tabController']).controller('tabController', ['$rootScope', function ($rootScope) {
//     $rootScope.tabs = ['答题记录', '个人信息', '志愿者工作', '问卷管理'];
//     $rootScope.active = {
//         style: ''
//         },
//     $rootScope.activeController = function (num, index) {
//             // console.log($rootScope.active.isActive);
//             $rootScope.active.style = 'active';
//             console.log(index);
//         }
//     }
// ]);

var userPage = angular.module('userPage', ['ui.router']);