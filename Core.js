AppInspector = {};

Event.prototype.stopEvent = function() {
    this.stopPropagation();
    this.preventDefault();  
};