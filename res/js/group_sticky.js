$(function(){
	
	// initialize the common obj
	var stickyCommon = new StickyCommon();

	// copy the sticky details template into the modal
	var stickyDetailMarkup = $('.j-sticky-detail.j-default-hide').clone();
	stickyDetailMarkup.removeClass( "j-default-hide" ).removeAttr( "style" );
	var modalDetail = $(stickyDetailMarkup).insertBefore( "#j-stickyDetailPlaceholder" );
	$("#j-stickyDetailPlaceholder").remove();
	$(".btn", modalDetail).remove();

	// initialize the add new modal
	$("#j-addStickyModal").jqm({
		toTop: true,
		modal: false,
		onHide: function( hash ) {
			hash.w.fadeOut( '2000', function() { hash.o.remove(); stickyCommon.clearFields( hash.w ); } );
		}
	});

	var setupSliders = function() {
		$(".j-sticky-slider").slider({
			min: 0,
			max: 100,
			step: 10,
			slide: function( event, ui ) {
				$(this).closest( ".j-sticky-note" ).find( ".j-sticky-percent-complete" ).val( ui.value );
			}
		});
	};


	// get the stickies from mongo	
	$aw2.callJSON( "ajax.cfc?method=remoteCall", { "component": "sticky", "function": "getStickies", args: "{}" },
		function( response ) {
			if( $aw2.structKeyExists( response, "_success" ) && response._success && $aw2.structKeyExists( response, "_list" ) ) {
				if( $aw2.isArray( response._list ) && ( response._list.length > 0 ) ) {
					for( var i = 0; i < response._list.length; i++ ) {
						var sticky = stickyCommon.cloneToContainer( ".j-sticky-small", ".sticky-bar" );
						stickyCommon.setFields( sticky, response._list[i] );
					}
					setupSliders();
				}
			}
		},
		function( a, b, c ) {
			console.log( "ERROR" );
			console.log( a );
			console.log( b );
			console.log( c );
		});


	// initialize the sliders on the small stickies
	$(".j-sticky-slider").slider({
			min: 0,
			max: 100,
			step: 10,
			slide: function( event, ui ) {
				$(this).closest( ".j-sticky-note" ).find( ".j-sticky-percent-complete" ).val( ui.value );
				console.log( $(this).closest( ".j-sticky-note" ).find( ".j-sticky-percent-complete" ).val() );
			}
		});
	

	// new sticky save
	$aw2.bind( "click", ".j-saveNewSticky", function() {
		// gather the inputs
		var data = stickyCommon.getFields( $(this).closest( ".j-addStickyModal" ).find( ".j-sticky-note" ) );
		var newSticky = stickyCommon.cloneToContainer( ".j-sticky-small", ".sticky-bar" );
		stickyCommon.setFields( $(newSticky), data );

		// set up the sticky slider on the small sticky
		$(".j-sticky-slider", $(newSticky)).slider({
			min: 0, max: 100, step: 10, value: data.percent_complete
		});

		$("#j-addStickyModal").jqmHide();

		$aw2.call( "ajax.cfc?method=remoteCall", { "component": "sticky", "function": "putNewSticky", args: $.toJSON( { data: data } ) },
			function( response ) {
				alert( "saved" );
			},
			function( balls ) {
				alert( "balls" );
			});
	});


	// bind single sticky removing
	$aw2.bind( "click", ".j-sticky-remove", function() {
		var $toRemove = $(this);
		var _id = $(this).closest( ".j-sticky-note" ).find( ".j-sticky-mongoid" ).val();
		// TODO : add in the bit for removing from mongo
		$aw2.callJSON( "ajax.cfc?method=remoteCall", { component: "sticky", "function": "removeSticky", args: $.toJSON( { _id: _id } ) },
		 	function( response ) {
		 		if( $aw2.structKeyExists( response, "_success" ) && response._success ) {
		 			$toRemove.closest( ".j-sticky-note" ).remove();
		 			alert( "sticky removed" );
		 		} else {
		 			var message = "Error removing sticky";
		 			if( $aw2.structKeyExists( response, "_message" ) ) {
		 				message = response._message;
		 			}
		 			alert( message );
		 		}
		 	},
		 	function( a, b, c ) {
		 		console.log( "ERROR" );
		 		console.log( a );
		 		console.log( b );
		 		console.log( c );
		 	});
	});


	$aw2.bind( "click", ".j-sticky-more-info", function() {
		var $sticky = $(this).closest( ".j-sticky-note" );
		var data = stickyCommon.getFields( $sticky );
		stickyCommon.setFields( $(".j-sticky-note", $("#j-addStickyModal")), data );

		// TODO - set the slider value

		$("#j-addStickyModal").jqmShow();
	});

	// make the stickies sortable/draggable
	$(".j-sticky-bar").sortable( { handle: "div.j-sticky-handle", revert: true, tolerance: "pointer" } );
});