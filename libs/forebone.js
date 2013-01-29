// based on Backbone.js source code and idea :)

(function() {

    //reference to global object (window in browser)
    var _global = this;

    //define private Firebone namespace
    Forebone = _global.Forebone = {};

    /**
     *extend method to aplying Forebone's modules
     *
     * usage: extend.call(object_to_extend, parent_object)
     */
    Forebone.extend = _global.extend = function(parent) {
        var _prop;
        for (_prop in parent) {
            this[_prop] = parent[_prop];
        }//for
        return this;
    };


    /**
     * some helper functions, based on source code of underscore.js, require.js,
     * backbone.js and others
     */
    Forebone.Util = {
        /**
         * my own implementation of 'equal' method - compare if two objects
         * are equal
         */
        equal: function(obj) {
            //must be the same obj, so returns true immediately
            if (this === obj)
                return true;
            var _prop;
            //compare properties
            for (_prop in this) {
                if (!(this[_prop] === obj[_prop])) {
                    //returns false on first not equal properties,
                    // no further comparision is needed
                    return false;
                }
            }//for
            //finally, they are identical, but not the same obj :P
            return true;
        },
        /**
         * clone()
         *
         * @returns cloned object
         */
        clone: function() {
            var _prop, _clone = {};
            //compare properties
            for (var _prop in this) {
                _clone[_prop] = this[_prop];
            }//for
            return _clone;
        }
    };

    //define Firebone.Event namepsace
    Forebone.Event = {
        /**
         * attach() method
         * trigger - name of trigger fires event
         * callback - event callback
         */
        attach: function(trigger, callback) {
            // define new namespace obj.events
            this.events = this.events || {};

            // define new property (function) in obj.events
            if (typeof callback === "function") {
                this.events[trigger] = callback;
            }//if
        },
        /**
         * Fire event
         */
        fire: function(trigger, args) {
            if (typeof(args) == "string") {
                this.events[trigger].call(this, args);
                return;
            }//if
            this.events[trigger].apply(this, (args || []));
        }
    };

    Forebone.Canvas = {
        context: null,
        /**
         * initialize 2D canvas context
         *
         * @param {type} elementId
         * @returns {undefined}
         */
        initialize: function(elementId) {
            var canvas = document.getElementById(elementId);
            if (!this.context && canvas.getContext) {
                this.context = canvas.getContext('2d')
            } else {
                //
            }
        },
        /**
         * draw a rectangle
         */
        rect: function(x, y, w, h, r, g, b, a) {
            this.context.fillStyle = (!a) ? "rgb(" + r + "," + g + "," + b + ")" : "rgba(" + r + "," + g + "," + b + "," + a + ")";
            this.context.fillRect(x, y, w, h);
        },
    }
}).call(this);
