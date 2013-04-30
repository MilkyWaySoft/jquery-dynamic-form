(function($){

    var methods = {
        init : function( options ) {
            console.log("init:", this);
            return this.each(function() {
                var $this = $(this);

                var template = $this.cloneWithAttribut(true);

                var data = $.extend({
                    externalPlus: false,
                    externalMinus: false,
                    source: this,
                    template: template,
                    clones: []
                }, options);

                $this.data('dynamicForm', data);

                var plus = $this.find(data.plusSelector)
                var minus = $this.find(data.minusSelector)

                if(plus.get(0) == undefined) {
                    plus = $(data.plusSelector);
                    data.externalPlus = true;
                }

                if(minus.get(0) == undefined) {
                    minus = $(data.minusSelector);
                    data.externalMinus = true;
                }
                // XXX: This section looks pretty nasty, but I don't really know the best way to fix it.
                minus.hide();
                minus.click({master: $this}, function(event) {
                    event.preventDefault();

                    var master = event.data.master;
                    master.dynamicForm('remove');

                    return false;
                })
                plus.click({master: $this}, function(event) {
                    event.preventDefault();

                    var master = event.data.master;
                    var addAfter = master;

                    if(master.data('dynamicForm').externalPlus) {
                        addAfter = null; // If this is an external button, we want new clones added at the end
                    }
                    master.dynamicForm('add', {addAfter: addAfter});

                    return false;
                })
            });
        },

        add: function(options) {
            options = options || {};

            var $this = $(this);
            var disableEffect = options.disableEffect;
            var addAfter = options.addAfter;

            var data = $this.data('dynamicForm');

            var source = data.source;
            var clones = data.clones;
            var template = data.template;

            var clone = template.cloneWithAttribut(true);
            var callbackReturn;

            if (typeof data.afterClone === "function") {
                callbackReturn = data.afterClone(clone);
            }

            if(callbackReturn || typeof callbackReturn == "undefined") {
                clone.insertAfter(addAfter || clones[clones.length - 1] || source);
            }

            /* Normalize template id attribute */
            if (clone.attr("id")) {
                clone.attr("id", clone.attr("id") + clones.length);
            }

            if (clone.effect && data.createColor && !disableEffect) {
                clone.effect("highlight", {color: data.createColor}, data.duration);
            }

            clones.push(clone);

            clone.find(data.plusSelector).click({clone: clone, master: $this}, function(event) {
		event.preventDefault();

                var master = event.data.master;
                var clone = event.data.clone;

                master.dynamicForm('add', {addAfter: clone});

                return false;
            })

            clone.find(data.minusSelector).click({clone: clone, master: $this}, function(event) {
                event.preventDefault();

                var master = event.data.master;
                var clone = event.data.clone;

                master.dynamicForm('remove', {clone: clone});

                return false;
            })

            if(data.externalMinus) {
                $(data.minusSelector).show();
            }

            return clone;
        },

        remove: function(options) {
            options = options || {};

            var $this = $(this);
            var data = $this.data('dynamicForm');

            // I'm keeping data.clones broken out here to be explicit
            var clone = options.clone || data.clones[data.clones.length - 1]
            if(clone == undefined) {
                return false;
            }

            // We need to make sure we're assigning clones back into data
            data.clones = $.grep(data.clones, function(value) {
                // XXX: Is there a better way to do this?
                var unwrappedClone = $(clone).get(0);
                var unwrappedValue = $(value).get(0);
                return unwrappedClone != unwrappedValue;
            })
            clone.remove();

            if(data.clones.length == 0 && data.externalMinus) {
                $(data.minusSelector).hide();
            }

            return true;
        },

        inject: function(data) {
            console.log("Inject data:", data);
        },

        destroy: function() {
            var $this = $(this),
                data = $this.data('dynamicForm');

            data.dynamicForm.remove();
        }
    };

$.fn.dynamicForm = function( method ) {
    // Method calling logic
    if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.dynamicForm' );
    }

    return items;
};

/**
 * jQuery original clone method decorated in order to fix an IE < 8 issue
 * where attributs especially name are not copied
 */
jQuery.fn.cloneWithAttribut = function( withDataAndEvents ){
	if ( jQuery.support.noCloneEvent ){
		return $(this).clone(withDataAndEvents);
	}else{
		$(this).find("*").each(function(){
			$(this).data("name", $(this).attr("name"));
		});
		var clone = $(this).clone(withDataAndEvents);
		
		clone.find("*").each(function(){
			$(this).attr("name", $(this).data("name"));
		});
		
		return clone;
	}
};

})(jQuery);
