<!---

--->

<cfsilent>
<cfscript>
page = {};
page.users = CreateObject( "component.user" ).init().listUsers()._users;
</cfscript>
</cfsilent>

<cfinclude template="res/template/common/header.inc" />

<button class="j-new-sticky">Add Sticky</button>

<cfoutput>
<select id="search-users">
	<option value="">--</option>
	<cfloop array="#page.users#" index="user">
	<option value="#user.username#">#user.display_name#</option>
	</cfloop>
</select>
</cfoutput>

<button id="run-search">Search</button>
<button id="reset-search">Reset</button>


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


<div class="j-addStickyModal j-modal jqDnR" id="j-addStickyModal">
	<!--- include the sticky detail template, to get the proper fields --->
	<span id="j-stickyDetailPlaceholder"></span>
</div>



<!--- sticky template included for javascript cloning purposes. --->
<cfinclude template="res/template/sticky.inc" />
<cfinclude template="res/template/stickySmall.inc" />
<cfinclude template="res/template/stickyDetail.inc" />

<cfset ArrayAppend( request.jsFiles, "res/js/group_sticky.js" ) />
<cfinclude template="res/template/common/footer.inc" />