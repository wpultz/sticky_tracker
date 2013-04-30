<cfcomponent output="false">

<cfscript>


	if( !MongoIsValid("sticky_mongo") ) {
		MongoRegister( name="sticky_mongo", server="localhost", port="27017", db="sticky_tracker_ide" );
		//MongoRegister( name="sticky_mongo", server="mongogen21.royall.dev", port="49140", db="sticky_tracker_ide" );
	}
	
	request.commonSticky = createObject( "component.common" );

</cfscript>

</cfcomponent>