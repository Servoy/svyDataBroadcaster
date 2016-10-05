/**
 * @public 
 * @param {{serverName:String,tableName:String,pks:Array<String|Number>|Array<Array<String|Number>>,action:Number}} content
 * @return {{success:Boolean,error:String}}
 * @properties={typeid:24,uuid:"89018E20-9540-464B-A898-C97080DF20BF"}
 */
function ws_update(content){
	
	//	parse pks into dataset
	var pksDataset = scopes.svyDataBroadcaster.arrayToDataSet(content.pks);
	
	//	notify
	var success = plugins.rawSQL.notifyDataChange(content.serverName,content.tableName,pksDataset,content.action);
	var error = '';
	
	// handle error
	if(!success){
		var ex = plugins.rawSQL.getException();
		error = (!ex) ? 'Unknown problem notify data change' : ex.getMessage();
	}
	
	//	log result
	var logger = scopes.svyDataBroadcaster.logger();
	logger.debug('Notify request received: {data-source:'+content.serverName+'/'+content.tableName+', pks:['+content.pks+'], action:'+scopes.svyDataBroadcaster.getSQLActionName(content.action)+'}')
	if(!success){
		logger.warn('Notify was unsuccessful. Error: ' + error);
	}
	
	//	return to client
	return {success:success,error:error};
}