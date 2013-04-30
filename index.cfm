<cfinclude template="res/template/common/header.inc" />


<button id="j-add">Add a Sticky</button>
<button id="j-save">GET BUSY (save)</button>
<button id="j-clear">Clear Stickies</button>


<div "area-container">
	
	<div id="sticky-container">
		
		<div class="j-sticky-bar">
			<!--- stickies will be appended here --->
		</div> <!--- /.j-sticky-bar --->
		
	</div>

</div>

<!--- include the sticky template for the javascript to clone --->
<cfinclude template="res/template/sticky.inc" />


<!--- hidden sticky bar used to templating purposes --->
<div class="j-sticky-bar j-default-hidden" style="display:none;">
</div>


<cfset ArrayAppend( request.jsFiles, "res/js/sticky.js" ) />
<cfinclude template="res/template/common/footer.inc" />