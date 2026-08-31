/**
 * IBM BAW 24.X — Coach View Sample: Custom User-Defined Events
 */

// Step 1: Add Config Option "onItemSaved" (Type: Event) in Variable Declarations

// Step 2: Load Event Handler — Register
this.registerEventHandlingFunction("onItemSaved", { status: "pending" });

// Step 3: Button Click — Fire the event
var itemData = { itemId: ${ItemID}.getData(), itemName: ${ItemName}.getData(), action: "save", timestamp: new Date().toISOString() };
this.executeEventHandlingFunction("onItemSaved", itemData);

// Step 4: Parent Coach event handler for onItemSaved
// Available: me (view), value (parameter)
${SaveStatus}.setData("Item '" + value.itemName + "' saved at " + value.timestamp);
${ItemsTable}.context.options.refreshService({ params: JSON.stringify({}), load: function(data) { ${ItemsTable}.setData(data.items); } });
