<cfcomponent output="false">

	<cfscript>
	
	function init() {
		return this;
	}
	
	
	</cfscript>
	
	<cffunction name="cleanIdFormat" access="public" returntype="any">
		<cfargument name="inObject" required="true" />

		<cflock name="lock_cleanIdFormat" throwontimeout="true" timeout="5" type="exclusive">
			<cfif isArray(arguments.inObject)>
				<cfloop array="#arguments.inObject#" index="item">
					<cfset item = cleanIdFormat(item) />
				</cfloop>

				<cfreturn arguments.inObject />
			<cfelseif isStruct(arguments.inObject)>
				<cfif structKeyExists(arguments.inObject, "_id")>
					<cfset arguments.inObject["_id"] = toString(arguments.inObject["_id"]) />
				</cfif>

				<cfreturn arguments.inObject />
			<cfelse>
				<cfreturn arguments.inObject />
			</cfif>
		</cflock>

		<cfreturn false />
	</cffunction>

</cfcomponent>