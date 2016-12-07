/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4496D84A-EF91-4156-AE6A-4CF088BFBAAD"}
 */
var host = application.getServerURL();

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8A3D6496-E2F1-49EB-A97C-9F95A87ACF82"}
 */
var serverName = 'example_data';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6097CA27-1D0B-4CD1-A1B9-771F32E76325"}
 */
var tableName = 'customers';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"776DF325-16AE-434C-A906-8CCFA3008D7F"}
 */
var pks = 'ALFKI\nANTON';

/**
 * @type {Number}
 * @properties={typeid:35,uuid:"EC5522DF-1DEA-4093-A1C6-B820D169FDFC",variableType:8}
 */
var sqlAction = SQL_ACTION_TYPES.UPDATE_ACTION;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"09A56B4E-8D7A-434A-A984-11A228C58D22"}
 */
var action = 'Flush'
	
/**
 * @properties={typeid:24,uuid:"EA0D404F-565B-493E-9FAC-01BF666F9E5C"}
 */
function test(){
	if(action == 'Flush'){
		testFlush();
	} else {
		testNotify();
	}
}
/**
 * Perform the element default action.

 * @private
 * @properties={typeid:24,uuid:"614B614D-7E55-4CFC-94AE-7F19466DBA63"}
 */
function testNotify() {
	
	/** @type {Array<String|Number>|JSDataSet} */
	var pkArray = pks.split('\n');
	var resp = scopes.svyDataBroadcasterClient.notifyDataChange(host,serverName,tableName,pkArray,SQL_ACTION_TYPES.UPDATE_ACTION);
	plugins.dialogs.showInfoDialog('Notify',JSON.stringify(resp));
}

/**
 * @private 
 * @properties={typeid:24,uuid:"9C1C4CA6-8702-4023-8EC1-3282ED34B5F7"}
 */
function testFlush(){
	var resp = scopes.svyDataBroadcasterClient.flushClientsChache(host,serverName,tableName);
	plugins.dialogs.showInfoDialog('Flush',JSON.stringify(resp));
}

/**
 * @properties={typeid:24,uuid:"F27ED3D6-825C-4EA9-976A-E9FBDB570512"}
 */
function updateUI(){
	var notify = action == 'Notify';
	elements.pks.enabled = notify;
	elements.sqlAction.enabled = notify;
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"87CD0C3E-0753-480B-9B8D-0CFBF9E43B8E"}
 */
function onDataChangeAction(oldValue, newValue, event) {
	updateUI();
	return true
}
