<cfcomponent output="false">

<cfscript>

this.stickyCollection = "sticky_notes";

struct function getStickies() {
	var stickyList = [];
	try {
		stickyList = MongoCollectionFind( "sticky_mongo", this.stickyCollection, {} );
	} catch ( any err ) {
		// ignore, let it return an empty list
		console( "error encountered while finding stickies" );
		return { _success: false, _message: "balls", _list: stickyList };
	}

	stickyList = request.commonSticky.cleanIdFormat( stickyList );
	return { _success: true, _list: stickyList };
}


function putNewSticky( data ) {
	if( StructKeyExists( arguments.data, "_id" ) ) {
		StructDelete( arguments.data, "_id" );
	}
	var res = "";
	try {
		res = MongoCollectionInsert( datasource="sticky_mongo", collection=this.stickyCollection, data=arguments.data );
		console( "sticky saved" );
	} catch( any err ) {
		err._success = false;
		err_message = "Error encountered while updating sticky";
		console( err );
		return err;
	}

	console( res );
	if( !IsNull( res ) && res.length() > 0 ) {
		return { _success: true, _message: "Sticky updated", _result: res };
	}
	return { _success: false, _message: "balls" };
}


function saveSticky( _id, data ) {
	var res = { _success: true, _message: "sticky updated successfully" };
	try {
		var qry = { _id: MongoObjectId( arguments._id ) };
		var update = { $set: data };
		res = MongoCollectionFindAndModify( datasource="sticky_mongo", collection=this.stickyCollection, query=qry, update=update, upsert=true, returnnew=true );
	} catch( any err ) {
		err._success = false;
		err._message = "Error encountered while updating sticky note";
		res = err;
	}

	if( IsNull( res ) ) {
		return { _success: false, _message: "Unexpected error encountered while saving sticky" };
	}
	return { _success: true, _message: "Sticky successfully saved", _sticky: request.commonSticky.cleanIdFormat( res ) };
}


function removeSticky( _id ) {
	res = false;
	try {
		var qry = { _id: MongoObjectId( arguments._id ) };
		res = MongoCollectionRemove( datasource="sticky_mongo", collection=this.stickyCollection, query=qry );
		console( res );
	} catch( any err ) {
		err._success = false;
		err._message = "Unexpected error encountered while removing sticky";
		return err;
	}
	return { _success: true, _message: "Sticky successfully removed" };
}



</cfscript>

</cfcomponent>