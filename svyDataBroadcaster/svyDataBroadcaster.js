/**
 * Logger name
 * @private 
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AE0A536A-2451-4D22-A859-80754CC47149"}
 */
var LOGGER_NAME = 'com.servoy.bap.svyDataBroadcaster';

/**
 * @public 
 * @return {scopes.svyLogManager.Logger}
 * @properties={typeid:24,uuid:"A4A069BB-CD98-4107-90A1-CC4629CE02E4"}
 */
function logger(){
	return scopes.svyLogManager.getLogger(LOGGER_NAME);
}
/**
 * Converts 1 or 2 dimensional array to a (PK)JSDataSet 
 * @public 
 * @param {Array<String|Number>|Array<Array<String|Number>>} array
 * @return {JSDataSet}
 * @properties={typeid:24,uuid:"67C40127-6DDA-4194-A008-577D9E0A2CF1"}
 */
function arrayToDataSet(array) {
	var item = array[0];
	if(item instanceof array){
		var ds = databaseManager.createEmptyDataSet(0,item.length);
		for(var i in array){
			/** @type {Array<String|Number>} */
			var row = array[i];
			ds.addRow(row);
		}
		return ds;
	}
	
	return databaseManager.convertToDataSet(array);
}


/**
 * Converts a (PK)Data Set to a 1 or 2 dimensional array
 *  
 * @public 
 * @param {JSDataSet} dataSet
 * @return {Array<String|Number>|Array<Array<String|Number>>}
 * @properties={typeid:24,uuid:"7AEAB265-8EF2-4599-9CBC-27106F681079"}
 */
function dataSetToArray(dataSet){
	if(dataSet.getMaxColumnIndex() == 1){
		return dataSet.getColumnAsArray(1);
	}
	var array = [];
	for (var i = 1; i <= dataSet.getMaxRowIndex(); i++) {
		array.push(dataSet.getRowAsArray(i));
	}
	return array;
}

/**
 * Utility to convert SQL Action constant to a string
 * 
 * TODO Move to svyUtils
 * @public 
 * @param {Number} action
 * @return {String}
 *
 * @properties={typeid:24,uuid:"792B63E3-0EB3-4DFD-9E7B-E6A8666BEC36"}
 */
function getSQLActionName(action){
	switch (action) {
		case SQL_ACTION_TYPES.DELETE_ACTION: return 'DELETE';
		case SQL_ACTION_TYPES.INSERT_ACTION: return 'INSERT';
		case SQL_ACTION_TYPES.SELECT_ACTION: return 'SELECT';
		case SQL_ACTION_TYPES.UPDATE_ACTION: return 'UPDATE';

	default:
		return 'NO-ACTION';
	}
}