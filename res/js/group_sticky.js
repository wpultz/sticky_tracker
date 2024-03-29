$(function(){
	
	// initialize the common obj
	var stickyCommon = new StickyCommon();

	// copy the sticky details template into the modal
	var stickyDetailMarkup = $('.j-sticky-detail.j-default-hide').clone();
	stickyDetailMarkup.removeClass( "j-default-hide" ).removeAttr( "style" );
	var modalDetail = $(stickyDetailMarkup).insertBefore( "#j-stickyDetailPlaceholder" );
	$("#j-stickyDetailPlaceholder").remove();
	$(".btn", modalDetail).remove();

	$("#j-addStickyModal").dialog({
		autoOpen: false,
		height: 550,
		width: 450,
		modal: true,
		position: "top",
		buttons: {
			"Save" : function() {
				var data = stickyCommon.getFields( $(this).find( ".j-sticky-note" ) );
				saveSticky( data );
			},
			"Cancel" : function() {
				$(this).dialog( "close" );
			}
		}
	});

/*
	// initialize the add new modal
	$("#j-addStickyModal").jqm({
		toTop: true,
		modal: false,
		onHide: function( hash ) {
			hash.w.fadeOut( '2000', function() { hash.o.remove(); stickyCommon.clearFields( hash.w ); } );
		}
	});
*/
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
	var populateStickies = function( criteria ) {
		$aw2.callJSON( "ajax.cfc?method=remoteCall", { "component": "sticky", "function": "getStickies", "args": $.toJSON( { criteria: criteria } ) },
			function( response ) {
				if( $aw2.structKeyExists( response, "_success" ) && response._success && $aw2.structKeyExists( response, "_list" ) ) {
					if( $aw2.isArray( response._list ) && ( response._list.length > 0 ) ) {
						for( var i = 0; i < response._list.length; i++ ) {
							var stage = "unknown";
							if( $aw2.structKeyExists( response._list[i], "dev_stage" ) && response._list[i].dev_stage.length > 0 ) {
								stage = response._list[i].dev_stage;
							}
							var sticky = stickyCommon.cloneToContainer( ".j-sticky-small", ".j-sticky-bar[data-dev_stage=" + stage + "]" );
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
		};

	// go ahead and populate the stickies into their areas.
	populateStickies( {} );

	$aw2.bind( "click", "#run-search", function() {
		var userSearch = $("#search-users").val();

		var criteria = {};

		criteria.user = userSearch;

		$(".board .j-sticky-small").remove();
		populateStickies( criteria );
	});

	$aw2.bind( "click", "#reset-search", function() {
		$("#search-users").val( "" );
		$(".board .j-sticky-small").remove();
		populateStickies( {} );
	});

	// initialize the sliders on the small stickies
	$(".j-sticky-slider").slider({
			min: 0,
			max: 100,
			step: 10,
			slide: function( event, ui ) {
				$(this).closest( ".j-sticky-note" ).find( ".j-sticky-percent-complete" ).val( ui.value );
			}
		});
	

	var saveSticky = function( data ) {
		var _id = "";
		if( $aw2.structKeyExists( data, "_id" ) && data._id.length > 0 ) {
			_id = data._id;
			$aw2.structDelete( data, "_id" );
		}
		if( _id.length > 0 ) {
			$aw2.call( "ajax.cfc?method=remoteCall", { "component": "sticky", "function": "saveSticky", args: $.toJSON( { _id: _id, data: data } ) },
				function( response ){
					if( $aw2.structKeyExists( response, "_sticky" ) && $aw2.structKeyExists( response._sticky, "_id" ) ) {
						var sticky = $(".j-sticky-mongoid[key=_id][value=" + response._sticky._id + "]").closest( ".j-sticky-small" );
						stickyCommon.setFields( $(sticky), response._sticky );

						// set up the sticky slider on the small sticky
						$(".j-sticky-slider", $(sticky)).slider({
							min: 0, max: 100, step: 10, value: response._sticky.percent_complete
						});

						$("#j-addStickyModal").dialog( "close" );
					}
				},
				function( balls ) {
					alert( "balls" );
				});
		} else {
			$aw2.call( "ajax.cfc?method=remoteCall", { "component": "sticky", "function": "putNewSticky", args: $.toJSON( { data: data } ) },
				function( response ){
					if( $aw2.structKeyExists( response, "_id" ) && response._id.length > 0 ) {
						data._id = response._id;

						var newSticky = stickyCommon.cloneToContainer( ".j-sticky-small", ".sticky-bar[data-dev_stage=indev]" );
						stickyCommon.setFields( $(newSticky), data );

						// set up the sticky slider on the small sticky
						$(".j-sticky-slider", $(newSticky)).slider({
							min: 0, max: 100, step: 10, value: data.percent_complete
						});
					}

					$("#j-addStickyModal").dialog( "close" );
				},
				function( balls ) {
					alert( "balls" );
				});
		}		
	};

	// new sticky save
	$aw2.bind( "click", ".j-saveNewSticky", function() {
		// gather the inputs
		var data = stickyCommon.getFields( $(this).closest( ".j-addStickyModal" ).find( ".j-sticky-note" ) );

		saveSticky( data );
	});


	// bind single sticky removing
	$aw2.bind( "click", ".j-sticky-remove", function() {
		if( !confirm( "Delete sticky?" ) ) {
			return;
		}

		var $toRemove = $(this);
		var _id = $(this).closest( ".j-sticky-note" ).find( ".j-sticky-mongoid" ).val();
		
		$aw2.callJSON( "ajax.cfc?method=remoteCall", { component: "sticky", "function": "removeSticky", args: $.toJSON( { _id: _id } ) },
		 	function( response ) {
		 		if( $aw2.structKeyExists( response, "_success" ) && response._success ) {
		 			$toRemove.closest( ".j-sticky-note" ).remove();
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

		//$("#j-addStickyModal").jqmShow();
		$("#j-addStickyModal").dialog( "open" );
	});

	$aw2.bind( "click", ".j-new-sticky", function() {
		stickyCommon.clearFields( $("#j-addStickyModal") );
		$("#j-addStickyModal").dialog( "open" );
	});

	// make the stickies sortable/draggable
	$(".j-sticky-bar").sortable( {
			handle: "div.j-sticky-handle",
			revert: true,
			tolerance: "pointer",
			connectWith: ".j-sticky-bar",
			update: function( event, ui ) {
				var $sticky = $(ui.item);
				var $_idInp = $($sticky.find( "[key=_id]" ));
				var $stageInp = $($sticky.find( "[key=dev_stage]" ));
				var toStage = $sticky.closest( ".j-sticky-bar" ).attr( "data-dev_stage" );
				$stageInp.val( toStage );

				var _id = $_idInp.val();
				var data = { dev_stage: toStage };
				$aw2.call( "ajax.cfc?method=remoteCall", { "component": "sticky", "function": "saveSticky", args: $.toJSON( { _id: _id, data: data } ) },
				function( response ){
					if( $aw2.structKeyExists( response, "_sticky" ) && $aw2.structKeyExists( response._sticky, "_id" ) ) {
						// all good
					} else {
						console.log( "bollocks" );
						console.log( response );
					}
				},
				function( balls ) {
					alert( "balls" );
				});

			}
		});

	$aw2.bind( "click", ".ui-widget-overlay", function() {
		$(".j-modal").dialog( "close" );
	});
});