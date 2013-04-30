$(function() {
	
	// initialize the common obj
	var stickyCommon = new StickyCommon();
	
	// initialize the sticky store
	var stickyStore = new StickyStore();
	
	// get existing stickies and populate them onto the sticky bar
	var oldStickies = stickyStore.get();
	if( oldStickies.length > 0 ) {
		for( var i = 0; i < oldStickies.length; i++ ) {
			var ref = stickyCommon.addSticky( '.j-sticky-bar' );
			stickyCommon.setFields( $(ref), oldStickies[i] );
		}
	} else {
		stickyCommon.addSticky( '.j-sticky-bar' );
	}
	
	// make the stickies sortable/draggable
	$(".j-sticky-bar").sortable( { handle: "div.j-sticky-handle", revert: true, tolerance: "pointer" } );
	
	// bind sticky clearing
	$aw2.bind( "click", "#j-clear", function() {
		if( confirm( "Are you sure you want to clear your stickies? People might think you're goofing off..." ) ) {
			stickyStore.clear();
			location.reload( true );
		}
	});
	
	// bind sticky adding
	$aw2.bind( "click", "#j-add", function() {
		stickyCommon.addSticky( '.j-sticky-bar' );
	});
	
	// bind single sticky removing
	$aw2.bind( "click", ".j-sticky-remove", function() {
		$(this).closest( ".j-sticky-note" ).remove();
	});
	
	// bind task saving
	$aw2.bind( "click", "#j-save", function() {
		stickyStore.clear();
		var stickies = $(".j-sticky-note:visible");
		
		for( var i = 0; i < stickies.length; i++ ) {
			var stickFields = stickyCommon.getFields( $(stickies[i]) );
			if( $aw2.structKeyExists( stickFields, "task_title" ) && $.trim( stickFields.task_title ).length > 0 ) {
				stickyStore.push( stickFields );
			}
		}
		location.reload( true );
	});
	
	
	
	
});