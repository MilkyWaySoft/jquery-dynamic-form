(function($){

    var methods = {
        init : function( options ) {
            console.log("init:", this);
            return this.each(function() {
                var template = $(this).cloneWithAttribut(true);
                var firstClone = $(this);

                var data = $.extend({
                    template: template,
                    clones: [firstClone]
                }, options);

                $(this).data('dynamicForm', data);
            });
        },

        add: function(disableEffect) {
            var data = $(this).data('dynamicForm');

            var clones = data.clones;
            var template = data.template;

            var clone = template.cloneWithAttribut(true);
            var callbackReturn;

            if (typeof data.afterClone === "function") {
                callbackReturn = data.afterClone(clone);
            }

            if(callbackReturn || typeof callbackReturn == "undefined") {
                clone.insertAfter(clones[clones.length - 1]);
            }

            /* Normalize template id attribute */
            if (clone.attr("id")) {
                clone.attr("id", clone.attr("id") + clones.length);
            }

            if (clone.effect && data.createColor && !disableEffect) {
                clone.effect("highlight", {color: data.createColor}, data.duration);
            }

            clones.push(clone);

            return clone;
        },

        remove: function() {
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
