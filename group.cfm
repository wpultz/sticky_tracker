<cfinclude template="res/template/common/header.inc" />

<button class="jqModal">add Sticky</button>


<div class="sticky-bar j-sticky-bar"></div>


<div class="j-addStickyModal jqmWindow" id="j-addStickyModal">
	<div class="modal-header j-modal-header j-modal-handle">
		<h2>Add a Sticky</h2>
	</div>
	<!--- include the sticky detail template, to get the proper fields --->
	<span id="j-stickyDetailPlaceholder"></span>
	<div class="modal-footer">
		<button class="cancel-sticky jqmClose">Cancel</button>
		<button class="j-saveNewSticky">Save</button>
	</div>
</div>



<!--- sticky template included for javascript cloning purposes. --->
<cfinclude template="res/template/sticky.inc" />
<cfinclude template="res/template/stickySmall.inc" />
<cfinclude template="res/template/stickyDetail.inc" />

<cfset ArrayAppend( request.jsFiles, "res/js/group_sticky.js" ) />
<cfinclude template="res/template/common/footer.inc" />