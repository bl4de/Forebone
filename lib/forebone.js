
/**
 * Copyright (C) 2013 bl4de

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software
 is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.


 *  Forebone.js
 *
 *  JavaScript library
 *
 *  Wrapper for: Canvas, Date, XHR, BOM, DOM, misc HTML5 APIs, other purposes
 *  (see README.md)
 *
 *  Rafal 'bl4de' Janicki <bloorq@gmail.com> | Twitter: @_bl4de
 *
 */

/*jshint strict:true */
/*jslint devel: true, browser:true, es5:true, vars:true, indent:4, nomen:true*/
/*global navigator*/

(function () {

    "use strict";

    /* reference to global object (window in browser) */
    var global = this,
        Forebone = global.Forebone = {};

    // // for now supports both only in Chrome 
    // if (typeof performance.memory === "object" &&
    //         typeof performance.timing === "object") {

    //     /**
    //      *  Forebone.Performance - wrapper for performance.timing 
    //      *  and performance.memory
    //      */
    //     Forebone.Performance = {

    //         // memory functions
    //         getHeapSize : function() {
    //             return performance.memory.totalJSHeapSize;
    //         },

    //         getHeapSizeLimit : function() {
    //             return performance.memory.jsHeapSizeLimit;
    //         },

    //         getHeapSizeUsed : function() {
    //             return performance.memory.usedJSHeapSize;
    //         },

    //         getHeapSizeUsage : function() {
    //             return "JavaScript memory heap usage: " + (( this.getHeapSizeUsed() * 100 ) / this.getHeapSizeLimit()).toFixed(2) + "%";
    //         },

    //         // timing functions
    //         getTiming : function() {
    //             var start = this.getNavigationStart();
    //             var str = "Performance timing flow: ";

    //             str += "\ndomLoading: " + (this.getDomLoading()-start) + " ms.";

    //             return str;
    //         },

    //         getNavigationStart : function() {
    //             return performance.timing.navigationStart;
    //         },

    //         getDomLoading : function() {
    //             return performance.timing.domLoading;
    //         },

    //          getDomComplete : function() {
    //             return performance.timing.domComplete;
    //         }

    //     };
    // } else {
    //     Forebone.Performance = {};
    // }

    /**
     *extend method to aplying Forebone's modules
     *
     * usage: extend.call(objectto_extend, parent_object)
     */
    Forebone.extend = global.extend = function (parent) {

        var prop;

        for (prop in parent) {
            this[prop] = parent[prop];
        } /* for */
        return this;
    };

    /**
     * DOM manipulating object - some little 'Sizzle' lib :P
     */
    Forebone.Dom = {
        elem: null,

        // temporary HTMLElement for manipulating
        HTMLElement: null,

        //array of all elements found by findAll
        HTMLElementArray: [],

        __findHTMLElement: function (HTMLElement) {
            this.HTMLElement = this.find(HTMLElement);
        },

        /*
        Find DOM element by class or ID
        */
        find: function (selector) {
            this.elem = document.querySelector(selector);
            if (false === (typeof (this.elem) === "object")) {
                return false;
            }
            return this.elem;
        },

        /*
        Find all DOM elemenst
        */
        findAll: function (selector) {
            this.HTMLElementArray = document.querySelectorAll(selector);
            if (this.HTMLElementArray.length < 1) {
                return false;
            }
            return this.HTMLElementArray;
        },

        /*
        Find all DOM elemenst
        */
        findByClass: function (selector) {
            this.HTMLElementArray = document.getElementsByClassName(selector);
            if (this.HTMLElementArray.length < 1) {
                return false;
            }
            return this.HTMLElementArray;
        },

        /*
        HTMLElementArray iterator
        */
        forEach: function (selector, callback) {
            this.findAll(selector);
            if (this.HTMLElementArray.length > 0) {
                // this.HTMLElementArray.forEach(function(item, index, array) {
                //   callback(item);
                // });
                var iterator = 0;
                for (iterator in this.HTMLElementArray) {
                    var _nodeType = this.HTMLElementArray[iterator].nodeType;
                    if (_nodeType == 1 || _nodeType == 9 || _nodeType == 11) {
                        callback(this.HTMLElementArray[iterator]);
                    }
                }
            }
        },

        /*
        wrapper for innerText
        */
        content: function(HTMLElement, content) {
            if (false ===("object" === typeof(HTMLElement)) ) {
                this.__findHTMLElement(HTMLElement);
                this.HTMLElement.innerText = content;
            } else {
                HTMLElement.innerText = content;
            }
        },

        /*
        Set attribute of DOM ELement
        */
        set: function (HTMLElement, _name, _value) {
            if (false === (typeof (HTMLElement) === "object")) {
                HTMLElement = this.find(HTMLElement);
            }
            HTMLElement.setAttribute(_name, _value);
            return HTMLElement;
        },

        /*
      Get attribute of DOM Element
      */
        get: function (HTMLElement, _name) {
            if (false === (typeof (HTMLElement) === "object")) {
                HTMLElement = this.find(HTMLElement);
            }
            return HTMLElement.getAttribute(_name);
        },

        /*
        Check if contains class
        */
        containClass: function(HTMLElement, className) {
            this.__findHTMLElement(HTMLElement);
            return this.HTMLElement.classList.contains(className);
        },

        /*
        Add CSS class
        */
        addClass: function (HTMLElement, className) {
            this.__findHTMLElement(HTMLElement);
            if (this.HTMLElement) {
                this.HTMLElement.classList.add(className);
            }
        },

        /*
        Remove CSS class
        */
        removeClass: function (HTMLElement, className) {
            this.__findHTMLElement(HTMLElement);
            if (this.HTMLElement) {
                this.HTMLElement.classList.remove(className);
            }
        },

        /*
        Toggle CSS class
        */
        toggleClass: function (HTMLElement, className) {
            this.__findHTMLElement(HTMLElement);
            if (this.HTMLElement) {
                this.HTMLElement.classList.toggle(className);
            }
        },

        /*
        Attach browser event on DOM Element
        */
        on: function (HTMLElement, eventName, eventHandler) {
            this.__findHTMLElement(HTMLElement);
            if (this.HTMLElement) {
                if (this.HTMLElementArray.addEventListener) {
                    this.HTMLElement.addEventListener(eventName, eventHandler, false);
                } else if (this.HTMLElement.attachEvent) {
                    this.HTMLElement.attachEvent("on"+eventName, eventHandler);
                } else {
                    this.HTMLElement["on"+eventName] = eventHandler;
                }
            }
        },

        /*
        Detach browser event on DOM element
        */
        off: function(HTMLElement, eventHandler) {
            this.__findHTMLElement(HTMLElement);
            if (this.HTMLElement) {
                if (this.HTMLElementArray.removeEventListener) {
                    this.HTMLElement.removeEventListener(eventName, eventHandler);
                } else if (this.HTMLElement.detachEvent) {
                    this.HTMLElement.detachEvent("on"+eventName, eventHandler);
                } else {
                    this.HTMLElement["on"+eventName] = null;
                }
            }
        },

        /*
        Dynamic load JavaScript file and append to document.body
        From: "Professional JS for web developers" by Nicholas C. Zakas
        */
        include: function (url) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            document.body.appendChild(script);
        }
    };

    /**
     * Forebone.Window - BOM manipulation object
     */
    Forebone.Window = {

        getPosX: function () {
            return (typeof global.screenX === "number") ? global.screenX : global.screenLeft;
        },

        getPosY: function () {
            return (typeof global.screenY === "number") ? global.screenY : global.screenTop;
        }
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
        equal: function (obj) {

            /* must be the same obj, so returns true immediately */
            if (this === obj) {
                return true;
            }

            var prop;

            /* compare properties */
            for (prop in this) {
                if (this[prop] !== obj[prop]) {

                    /* returns false on first not equal properties,
                      no further comparision is needed 
                      */
                    return false;
                }
            } /* for */
            /* finally, they are identical, but not the same obj :P */
            return true;
        },

        /**
         * clone()
         *
         * @returns cloned object
         */
        clone: function () {

            var prop,
                clone = {};

            /* compare properties */
            for (prop in this) {
                clone[prop] = this[prop];
            }
            return clone;
        },

        /*
         * returns random from 0 to max
         *
         * @param {type} max
         * @returns {@exp;Math@call;floor}
         */
        random: function (max) {
            if (!max) {
                max = 255;
            }

            return Math.floor(Math.random() * max);
        }
    };

    /**
     * Simple XMLHTTPRequest object wrapper
     * 
     */
    Forebone.Ajax = {
        url: null,
        xhr: null,
        async: true,
        method: 'GET',

        makeRequest: function (params, success, error, progress) {

            this.xhr.onprogress = onprogress;
            this.xhr.onerror = error;
            this.xhr.open(this.method, this.url, this.async);

            if (this.method === "POST") {
                this.xhr.setRequestHeader("Content-Type",
                    "application/x-www-form-urlencoded");
            }

            var that = this;

            try {
                this.xhr.onreadystatechange = function (e) {
                    if (that.xhr.readyState === 4) {
                        if (that.xhr.status === 200) {
                            if (that.xhr.getResponseHeader("Content-type") ===
                                "text/xml" && that.xhr.responseXML) {
                                success(that.xhr.responseXML);
                            } else {
                                success(that.xhr.responseText);
                            }
                        }
                    }
                };
                this.xhr.send(params);
            } catch (e) {
                console.log("makeReqest() thrown new excpetion: " + e.message +
                    " " + e.number);
            }
        },

        initialize: function (url, async) {

            // Mozilla, Safari, Opera ...
            if (window.XMLHttpRequest) {
                this.xhr = new XMLHttpRequest();
                // IE
            } else if (window.ActiveXObject) {
                this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            this.url = url;

            // async = true is default
            if (!async) {
                this.async = true;
            }
        },

        post: function (params, success, error) {
            var i,
                queryString = "";

            if (params) {
                for (i in params) {
                    queryString += i + "=" + encodeURIComponent(params[i]) + "&";
                }
            }

            this.method = 'POST';
            this.makeRequest(queryString, success, error);
        },

        get: function (param, success, error, progress) {
            this.method = 'GET';
            this.makeRequest(param, success, error, progress);
        }
    };

    /*
     * Date/time helper
     *
     */
    Forebone.Dater = {

        // local wrapper for Date obj 
        obj: null,

        // ready-to display, formatted string with Date/Time
        dateStr: null,

        dayOfWeeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

        createDate: function (ts) {
            var timestamp = ts || Date.now();
            this.obj = new Date(timestamp);
            this.dateStr = this.obj.toString();
        },

        // main Date format function
        formatDate: function (params) {
            // misc formaters...
            // return ready-to-use string
            this.dateStr = this.obj.getDate() + ' ' + this.obj.getMonth() +
                ' ' + this.obj.getFullYear();
        },

        // main Time format function
        formatTime: function () {

        },

        showDate: function () {
            return this.dateStr;
        }
    };


    // define Firebone.User namepsace
    Forebone.User = {

        /**
         * check is user online/offline
         * 
         * @returns {undefined}
         */
        isOnline: function () {
            var status = (navigator.onLine) ? true : false;
            return status;
        }
    };

    // define Firebone.Event namepsace
    Forebone.Event = {

        /**
         * attach() method
         * trigger - name of trigger fires event
         * callback - event callback
         */
        attach: function (trigger, callback) {

            // define new namespace obj.events
            this.events = this.events || {};

            // define new property (function) in obj.events
            if (typeof callback === "function") {
                this.events[trigger] = callback;
            }
        },

        fire: function (trigger, args) {

            if (typeof (args) === "string") {
                this.events[trigger].call(this, args);
                return;
            }
            this.events[trigger].apply(this, (args || []));
        }
    };

    Forebone.Media = {
        getMedia: function (options) {
            // video = true/false
            var _video = options.video;

            // audio = true/false
            var _audio = options.audio;

            // <video> DOM element id
            var videoDomElement = options.videoDomElement;

            // <canvas> for images
            var canvasDomElement = options.canvasDomElement;


            navigator._getMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);

            navigator._getMedia({
                video: _video,
                audio: _audio
            }, function (stream) {
                if (navigator.mozGetUserMedia) {
                    videoDomElement.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    videoDomElement.src = vendorURL.createObjectURL(stream);
                }
                videoDomElement.play();
            }, function (error) {
                console.log("Forebone.Media error");
            });
        }
    };


    Forebone.Canvas = {
        context: null,
        image: null,
        width: null,
        height: null,

        /**
         * initialize 2D canvas context
         *
         * @param {type} elementId
         * @returns {undefined}
         */
        initialize: function (elementId) {

            var canvas = global.document.getElementById(elementId);

            if (!this.context && canvas.getContext) {
                this.context = canvas.getContext('2d');
                /*  creating ImageData for pixel manipulating */
                this.image = this.context.createImageData(canvas.width,
                    canvas.height);
                this.height = canvas.height;
                this.width = canvas.width;
            }
        },

        // wrapper for fillStyle - simply sets color
        color: function (r, g, b, a) {

            if (r >= 0 && r < 256 && g >= 0 && g < 256 && b >= 0 && b < 256) {
                this.context.fillStyle = (!a) ? "rgb(" + r + "," + g + "," + b +
                    ")" : "rgba(" + r + "," + g + "," + b + "," + a + ")";
            } else {

                // set default color 
                this.context.fillStyle = "rgb(10,10,10)";
            }
        },

        /*
         * wrapper for moveTo
         *
         * call simply move() moves to 0,0
         */
        move: function (x, y) {

            if (x > 0 && y > 0) {
                this.context.moveTo(x, y);
            } else {

                // default behaviour - move to 0,0
                this.context.moveTo(0, 0);
            }
        },

        /*
         * wrapper for lineTo
         */
        line: function (x, y) {

            if (x > 0 && y > 0) {
                this.context.lineTo(x, y);
            } else {

                // default behaviour - draws line to 0,0
                this.context.lineTo(0, 0);
            }

            this.context.fill();
        },

        /**
         * wrapper for fillRect
         */
        rect: function (x, y, w, h, r, g, b, a) {
            this.color(r, g, b, a);
            this.context.fillRect(x, y, w, h);
        },

        /**
         * wrapper for strokeRect
         */
        stroke: function (x, y, w, h) {
            this.context.strokeRect(x, y, w, h);
        },

        /*
         * wrapper for clearRect
         */
        clear: function (x, y, w, h) {
            this.context.clearRect(x, y, w, h);
        },

        /*
         * wrapper for path draw
         *
         * points is an array of single point coords array [x,y]
         */
        path: function (points) {

            if (points.length > 1) {
                this.context.beginPath();
                this.context.moveTo(points[0][0], points[0][1]);

                var i;
                for (i = 1; i < points.length; i++) {
                    this.context.lineTo(points[i][0], points[i][1]);
                }
            }

            this.context.fill();
        },

        /*
         * wrapper for arc/arcTo
         */
        circle: function (x, y, radius, startAngle, endAngle, anticlockwise, fill) {
            var startAngleRadians = (Math.PI / 180) * startAngle,
                endAngleRadians = (Math.PI / 180) * endAngle;

            this.context.arc(x, y, radius, startAngleRadians, endAngleRadians,
                anticlockwise);
            if (fill === 1) {
                this.context.fill();
            } else {
                this.context.stroke();
            }
        },

        /*
         * single pixel manipulation function - start
         */
        pixel: function (x, y, r, g, b, a) {

            var pos = ((this.width * y) + x) * 4;

            this.image.data[pos + 0] = (r) ? r : 10;
            this.image.data[pos + 1] = (g) ? g : 10;
            this.image.data[pos + 2] = (b) ? b : 10;
            this.image.data[pos + 3] = (a) ? a : 255;
        },

        /*
         * render ImageData
         */
        render: function () {
            this.context.putImageData(this.image, 0, 0);
        }
    };

}).call(this);