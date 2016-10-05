/**
 * @public 
 * @param {{serverName:String, tableName:String}} content
 *
 * @properties={typeid:24,uuid:"BB7E55F3-9BEF-49FF-818E-DBE47B0F6C8C"}
 */
function ws_update(content){
	
	//	flush cache
	var success = plugins.rawSQL.flushAllClientsCache(content.serverName,content.tableName);
	
	//	log result
	var logger = scopes.svyDataBroadcaster.logger();
	logger.debug('Flush cache request received: {data-source:'+content.serverName+'/'+content.tableName+'}');
	var error = '';
	if(!success){
		var ex = plugins.rawSQL.getException();
		error = (!ex) ? 'Unknown problem notify data change' : ex.getMessage();
		logger.warn('Flush cache was unsuccessful. Error: ' + error);
	}
	
	//	respond to client
	return {success:success, error:error};
}