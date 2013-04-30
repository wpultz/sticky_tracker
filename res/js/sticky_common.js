function StickyCommon() {
	
	//gets fields from an individual sticky
	this.getFields = function( $editable ) {
		var vals = {};
		var fields = $("[key]", $editable);
		for( var i = 0; i < fields.length; i++ ) {
			var $field = $(fields[i]);
			if( $field.prop( "tagName" ).toLowerCase() == "input" ) {
				vals[$field.attr( "key")] = $field.val();
			} else {
				vals[$field.attr( "key")] = $field.text();
			}
		}
		
		return vals;
	};
	
	
	// sets fields in individual sticky
	this.setFields = function( $editable, fields ) {
		$.each( fields, function( i, v ) {
			var $input = $("[key=" + i + "]", $editable);
			if( $input.prop( "tagName" ).toLowerCase() == "input" ) {
				$input.val( v );
			} else {
				$input.text( v );
			}
		});
	};


	this.clearFields = function( $editable ) {
		var fields = $("[key]", $editable);
		for( var i = 0; i < fields.length; i++ ) {
			var $field = $(fields[i]);
			if( $field.prop( "tagName" ).toLowerCase() == "input" ) {
				$field.val( "" );
			} else {
				$field.text( "" );
			}
		}
	};
	
	
	// adds a sticky to the sticky bar, and return reference to that sticky
	this.addSticky = function( stickyParentSelector ) {
		var markup = $(".j-sticky-note.j-default-hidden").clone();
		return $(markup).appendTo( stickyParentSelector ).removeClass( "j-default-hidden" ).removeAttr( "style" );
	};

	this.cloneToContainer = function( cloneSelector, parentSelector ) {
		console.log( "1" );
		var $markup = $(cloneSelector + ".j-default-hidden").clone();
		$markup.removeClass( "j-default-hidden" ).removeAttr( "style" );
		console.log( "2" );
		$(parentSelector).append( $markup );
		return $markup;
		//var ball = $markup.appendTo( $(parentSelector) ).removeClass( "j-default-hidden" ).removeAttr( "style" );
		//console.log( ball );
		//return ball;
	};
}