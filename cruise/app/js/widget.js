(function() {
    function Widget() {
        this.boundingBox = null;
    }

    Widget.prototype = {
        on: function(type, handler) {
            if (typeof this.handlers[type] == 'undefined') {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },

        fire: function(type, data) {
            if (this.handlers[type] instanceof Array) {
                var handlerArr = this.handlers[type];
                for (var i = 0; i < handlerArr.length; i++) {
                    handlerArr[i](data);
                }
            }
        },

        renderUI: function() {},
        bindUI: function() {},
        syncUI: function() {},
        render: function(container) {
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },

        destructor: function() {},
        destroy: function() {
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        }
    };

    $.Widget = Widget;
})();
