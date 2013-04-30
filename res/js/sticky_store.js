function StickyStore( id, max ) {
	if( !localStorage ) {
		return null;
	}
	//localStorage.clear();
	var self = this;
	var storeId = id ? id : "r.sticky";
	var storeMax = max ? max : 100;
	
	var serialize = function( data ) {
		return $.toJSON( data );
	};
	
	var deserialize = function( data ) {
		return $.parseJSON( data );
	};
	
	var getInternal = function() {
		return deserialize( localStorage.getItem( storeId ) ) || [];
	};
	
	this.get = function( cb ) {
		var getFiles = getInternal();
		
		if( getFiles.length > 0 ) {
			return getFiles;
		} else {
			return [];
		}
	};
	
	this.removeItems = function( itemList ) {
		var files = getInternal();
		
		self.clear();
		
		for( var i = 0; i < files.length; i++ ) {
			var fileFound = false;
			var itemcount = 0;
			while( !fileFound && ( itemcount < itemList.length ) ) {
				fileFound = ( itemList[itemcount] == files[i] );
				itemcount++;
			}
			if( !fileFound ) {
				self.push( files[i] );
			}
		}
	}
	
	this.push = function(item) {
		var update = getInternal();
		
		var exists = $.inArray(item, update);
		if(exists > -1) {
			update.splice(exists, 1);
		}
		
		update.push(item);
		
		if(update.length > storeMax) {
			update.splice(0, (update.length - storeMax));
		}
		
		localStorage.setItem(storeId, serialize(update));
	};
	
	this.clear = function() {
		localStorage.removeItem(storeId);
	};
	
};