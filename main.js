var todoListApp = angular.module('todoListApp', []);

todoListApp.controller('ListController', function ($scope) {
    var default_list = new List("Your First List");
    this.lists = [default_list];
    this.currentList = default_list;

    this.setCurrentList = function(list){
        this.currentList = list;
    };

    this.newList = function(){
        var new_list = new List("New List");
        new_list.editMode = true;
        this.setCurrentList(new_list);
        this.lists.push(new_list);
    };

    this.deleteList = function(list){
        var i = this.lists.indexOf(list);
        if(i !== -1){
            this.lists.splice(i,1);
            if(this.currentList.length > 0){
                this.currentList = this.lists[0];
            } else {
                this.currentList = null;
            }
        }
    }

    this.toggleEditForList = function(list){
        if(list.editMode){
            list.title = list.input
            list.editMode = false;
        } else {
            list.editMode = true;
        }
    };

});

function List(name){
    this.title = name;
    this.items = [];
    this.editMode = false;
    this.areDoneVisible = false;
    this.input = name;
    this.itemInput = {
        title: "",
        desc: "",
        time: ""
    }
}

List.prototype.newItem = function(){
    var newItem = new ListItem(this.itemInput.title, this.itemInput.desc, this.itemInput.time);
    this.items.push(newItem);

    this.itemInput.title = "";
    this.itemInput.desc  = "";
    this.itemInput.time  = "";
};

List.prototype.removeItem = function(item){
    var index = this.items.indexOf(item);
    if( index !== -1 ) {
        this.items.splice(index, 1);
    }
};

List.prototype.toggleDone = function(){
    this.areDoneVisible = !this.areDoneVisible;
}

function ListItem(title, description, time){
    this.title = title;
    this.description = description;
    this.time = time;
    this.isDone = false;
    this.editMode = false;
};

ListItem.prototype.toggleEditMode = function(){
    this.editMode = !this.editMode;
}

ListItem.prototype.toggleDone = function(bool){
    this.isDone = !this.isDone;
}