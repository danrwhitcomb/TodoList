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

    this.exportList = function(list){
        var list_str = list.title + "\n\n";
        for(var i=0; i < list.items.length; i++){
            var item = list.items[i]
            list_str += String(i + 1) + ". " + item.title + "\n"
            list_str += item.time + "\n"
            list_str += item.description + "\n\n";
        }
        download(list_str, list.title + ".txt", "text/plain");
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

//MDA Functions

function getController(){
    return angular.element($("#listCtrl")).controller();
}

function getScope(){
    return angular.element($("#listCtrl")).scope();
}

function applyScope(){
    return getScope().$apply();
}

function mdaNewList(){
    getController().newList();
    applyScope();
}

function mdaDeleteList(){
    var controller = getController();
    controller.deleteList(controller.currentList)
    applyScope();
}

function mdaEditList(){
    var controller = getController();
    controller.toggleEditForList(controller.currentList);
    applyScope();
}

function mdaExport(){
    var controller = getController();
    controller.exportList(controller.currentList);
}

function mdaShowDone(){
    getController().currentList.toggleDone();
    applyScope();
}