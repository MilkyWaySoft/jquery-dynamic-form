(function($){
    var methods = {
        init : function( options ) {
            console.log("init:", this);
            return this.each(function() {
                var data = $.extend({
                }, options);

                $(this).data('dynamicForm', data);
            });
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
