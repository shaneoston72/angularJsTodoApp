function TodoController(ToDoService) {
    var ctrl = this;

    ctrl.newTodo = '';
    ctrl.list = [];

    ctrl.addTodo = function () {
        if (!ctrl.newTodo) {
            return;
        }

        ToDoService.create({
            title: ctrl.newTodo,
            completed: false
        })
            .then(function (response) {
                ctrl.list.unshift(response);
                ctrl.newTodo = '';
            });

    };

    ctrl.updateTodo = function (item, index) {
        if (!item.title) {
            ctrl.removeTodo(item, index);
            return;
        }
        ToDoService.update(item);
    };

    ctrl.removeTodo = function (item, index) {
        ToDoService.remove(item)
            .then(function (response) {
                ctrl.list.splice(index, 1);
            });
    };

    ctrl.getRemaining = function () {
        return ctrl.list.filter(function(item) {
            return !item.completed;
        }).length;
    };

    ctrl.toggleState = function (item) {
        ToDoService.update(item)
            .then(function () {

            }, function (error) {
                if (error) {
                    item.completed = !item.completed;
                }
            })


    }

    function getTodos() {
        ToDoService.retrieve()
            .then(function (response) {
                ctrl.list = response;
            })
    }

    getTodos();

    console.info('right after getTodos');
}

angular
    .module('app')
    .controller('TodoController', TodoController);