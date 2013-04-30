<cfcomponent output="false">
	<cffunction name="remoteCall" access="remote" returnformat="JSON">
		<cfargument name="component" required="true" />
		<cfargument name="function" required="true" />
		<cfargument name="args" required="true" />
		
		<cfset var prepArgs = DeserializeJSON(arguments.args) />
		<cfset var resultData = false />
		
		<cfinvoke component="component.#arguments.component#" method="#arguments.function#" argumentcollection="#prepArgs#" returnvariable="resultData" />

		<cfreturn resultData />
	</cffunction>
</cfcomponent>