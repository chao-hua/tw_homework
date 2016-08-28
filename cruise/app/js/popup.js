(function() {
    function Popup() {
        this.cfg = {
            // width: 500,
            height: 100,
            x: null,
            y: null,
            isModule: false,
            content: '',
            container: null,
            confirmBtnValue: 'Confirm',
            cancelBtnValue: 'Cancel',
            skinClassName: null,
            defaultValue4Input: '',
            handler4ConfirmBtn: null,
            handler4CancelBtn: null
        };
    }

    Popup.prototype = $.extend({}, new $.Widget(), {
        renderUI: function() {
            this.boundingBox = $(
                '<div class="bounding-box col-md-6">' +
                '<div class="arrow">' +
                '<em></em><span></span>' +
                '</div>' +
                '<div class="content">' +
                '<span>' + this.cfg.content + '</span>' +
                '<input type="text" value="' + this.cfg.defaultValue4Input + '" class="popup_input">' +
                '<button class="btn btn-default btn-ellipse popup_confirmBtn">' + this.cfg.confirmBtnValue + '</button>' +
                '<button class="btn btn-default btn-ellipse popup_cancelBtn">' + this.cfg.cancelBtnValue + '</button>' +
                '</div>' +
                '</div>');
            if (this.cfg.isModule) {
                this.moduleBg = $('<div class="popup-module-container" id="popup-module-container"></div>');
                this.moduleBg.prependTo('body');
            }
            this.input = this.boundingBox.find('.popup_input');
        },
        bindUI: function() {
            var that = this;
            this.boundingBox.delegate('.popup_confirmBtn', 'click', function(event) {
                that.fire('confirm', that.input.val());
                that.destroy();
            });
            this.boundingBox.delegate('.popup_cancelBtn', 'click', function(event) {
                that.fire('cancel');
                that.destroy();
            });
            if (this.cfg.handler4ConfirmBtn) {
                this.on('confirm', this.cfg.handler4ConfirmBtn);
            }
            if (this.cfg.handler4CancelBtn) {
                this.on('cancel', this.cfg.handler4CancelBtn);
            }
        },
        syncUI: function() {
            this.boundingBox.css({
                width: this.cfg.width + 'px',
                'min-height': this.cfg.height + 'px',
                left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px',
            });

            if (this.cfg.skinClassName) {
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
        },
        destructor: function() {
            this.moduleBg && this.moduleBg.remove();
        },
        prompt: function(cfg) {
            ($(".bounding-box").length > 0) && $(".bounding-box").remove();
            ($(".popup-module-container").length > 0) && $(".popup-module-container").remove();

            $.extend(this.cfg, cfg);
            this.render(this.cfg.container);
            this.input.focus();
            return this;
        }
    });

    $.Popup = Popup;
})();
