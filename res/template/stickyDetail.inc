<div class="sticky-detail j-sticky-note j-sticky-detail j-default-hide" style="display:none;">

	<input type="hidden" value="" class="j-sticky-mongoid" key="_id" />
	<input type="hidden" value="" class="j-sticky-percent-complete" key="percent_complete" />
	<input type="hidden" value="indev" class="j-sticky-dev-stage" key="dev_stage" />

	<div class="sticky-handle j-sticky-handle"></div>
	<table style="width: 100%;">
		<th style=""></th><th style="width: 75%;"></th>
		<tr>
			<td><label>Task Title</label></td>
			<td><div class="sticky-field sticky-title j-sticky-title" contenteditable="true" key="title"></div></td>
		</tr>
		<tr>
			<td><label>Description</label></td>
			<td><div class="sticky-field sticky-field-large" contenteditable="true" key="desc"></div></td>
		</tr>
		<tr>
			<td><span>Goal Date</span></td>
			<td><div class="sticky-field" contenteditable="true" key="goal_dt"></div></td>
		</tr>
		<tr>
			<td><label>% Complete</label></td>
			<td><div class="sticky-slider j-sticky-slider"></div></td>
		</tr>
		<tr>
			<td><label>Assignee</label></td>
			<cfif IsDefined( "page.users" ) && IsArray( page.users )>
				<td>
					<cfoutput>
					<select class="" key="user">
						<cfloop array="#page.users#" index="user">
						<option value="#user.username#">#user.display_name#</option>
						</cfloop>
					</select>
					</cfoutput>
				</td>
			<cfelse>
				<td><div class="sticky-field" contenteditable="true" key="user"></div></td>
			</cfif>
		</tr>
		<tr>
			<td><label>Notes</label></td>
			<td><div class="sticky-field sticky-field-large" contenteditable="true" key="notes"></div></td>
		</tr>
		<tr>
			<td><label>Ticket #</label></td>
			<td><div class="sticky-field" contenteditable="true" key="ticket_number"></div></td>
		</tr>
	</table>
	
	<button class="btn j-sticky-save">Save</button>
	<button class="btn">Cancel</button>

</div>