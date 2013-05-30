<cfcomponent output="false">
<cfscript>

userCollection = "user";

function init() {
	return this;
}

function listUsers() {
	try {
		users = MongoCollectionFind( "sticky_mongo", userCollection, {} );
	} catch( any err ) {
		// handle error
		users = [];
	}
	
	return { _success: true, _message: "", _users: request.commonSticky.cleanIdFormat( users ) };
}

</cfscript>
</cfcomponent>