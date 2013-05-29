<cfinclude template="res/template/common/header.inc" />

<button class="jqModal">add Sticky</button>

<div class="board clearfix">

	<table>
		<tr>
			<td>
				<div class="stage-header">In Development</div>
				<div class="bar-container">
					<div class="sticky-bar j-sticky-bar" data-dev_stage="indev"></div>
				</div>
			</td>
			<td>
				<div class="stage-header">Completed</div>
				<div class="bar-container">
					<div class="sticky-bar j-sticky-bar" data-dev_stage="complete"></div>
				</div>
			</td>
		</tr>
		<tr colspan="2">
			<td>
				<div class="stage-header">Unknown Status</div>
				<div class="bar-container">
					<div class="sticky-bar j-sticky-bar" data-dev_stage="unknown"></div>
				</div>
			</td>
		</tr>
	</table>

</div>


<div class="j-addStickyModal jqmWindow" id="j-addStickyModal">
	<!--- include the sticky detail template, to get the proper fields --->
	<span id="j-stickyDetailPlaceholder"></span>
	
	<button class="cancel-sticky jqmClose">Cancel</button>
	<button class="j-saveNewSticky">Save</button>
	
</div>



<!--- sticky template included for javascript cloning purposes. --->
<cfinclude template="res/template/sticky.inc" />
<cfinclude template="res/template/stickySmall.inc" />
<cfinclude template="res/template/stickyDetail.inc" />

<cfset ArrayAppend( request.jsFiles, "res/js/group_sticky.js" ) />
<cfinclude template="res/template/common/footer.inc" />