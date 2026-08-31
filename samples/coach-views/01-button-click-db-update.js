/**
 * IBM BAW 24.X — Coach View Sample
 * Scenario: Button Click → Database Update
 *
 * Architecture:
 *   Button (On Click) → AJAX Service Call → SQL Execute Statement → UI Update
 *
 * Prerequisites:
 *   1. Service Flow "UpdateCustomerService" configured with "Allow calls from all users"
 *   2. Coach View config option: updateService (Type: Service, Default: UpdateCustomerService)
 *   3. JNDI datasource "jdbc/customerdb" configured in server
 */

// ============================================================
// SERVICE FLOW: UpdateCustomerService
// Script Task: Build SQL Update
// ============================================================

// Input variables: customerId, firstName, lastName, email (all String)
// Output variables: success (Boolean), message (String)

tw.local.sqlStatement = new tw.object.SQLStatement();
tw.local.sqlStatement.sql =
    "UPDATE customers SET first_name = ?, last_name = ?, email = ? WHERE customer_id = ?";

tw.local.sqlStatement.parameters = new tw.object.listOf.SQLParameter();

// Parameter 0: firstName
tw.local.sqlStatement.parameters[0] = new tw.object.SQLParameter();
tw.local.sqlStatement.parameters[0].value = tw.local.firstName;
tw.local.sqlStatement.parameters[0].type = "VARCHAR";
tw.local.sqlStatement.parameters[0].mode = "IN";

// Parameter 1: lastName
tw.local.sqlStatement.parameters[1] = new tw.object.SQLParameter();
tw.local.sqlStatement.parameters[1].value = tw.local.lastName;
tw.local.sqlStatement.parameters[1].type = "VARCHAR";
tw.local.sqlStatement.parameters[1].mode = "IN";

// Parameter 2: email
tw.local.sqlStatement.parameters[2] = new tw.object.SQLParameter();
tw.local.sqlStatement.parameters[2].value = tw.local.email;
tw.local.sqlStatement.parameters[2].type = "VARCHAR";
tw.local.sqlStatement.parameters[2].mode = "IN";

// Parameter 3: customerId (WHERE clause)
tw.local.sqlStatement.parameters[3] = new tw.object.SQLParameter();
tw.local.sqlStatement.parameters[3].value = tw.local.customerId;
tw.local.sqlStatement.parameters[3].type = "VARCHAR";
tw.local.sqlStatement.parameters[3].mode = "IN";

// After SQL Execute Statement service task:
// Script Task: Set Result
tw.local.success = true;
tw.local.message = "Customer " + tw.local.customerId + " updated successfully";


// ============================================================
// COACH VIEW: Save Button — On Click Event Handler
// ============================================================

// 'this' refers to the Save Button coach view
// ${CustomerID}, ${FirstName}, etc. are Control IDs of sibling views

var me = this;
var customerData = {
    customerId: ${CustomerID}.getData(),
    firstName:  ${FirstName}.getData(),
    lastName:   ${LastName}.getData(),
    email:      ${Email}.getData()
};

// Disable button during save
me.setEnabled(false);
${StatusMessage}.setData("Saving...");

var serviceArgs = {
    params: JSON.stringify(customerData),
    load: function(data) {
        me.setEnabled(true);
        if (data.success) {
            ${StatusMessage}.setData("✓ " + data.message);
            ${StatusMessage}.context.element.style.color = "green";
        } else {
            ${StatusMessage}.setData("✗ " + data.message);
            ${StatusMessage}.context.element.style.color = "red";
        }
    },
    error: function(e) {
        me.setEnabled(true);
        ${StatusMessage}.setData("✗ Error: " + e.message);
        ${StatusMessage}.context.element.style.color = "red";
        console.error("Update service call failed:", e);
    }
};

// Invoke the service configured in the updateService config option
me.context.options.updateService(serviceArgs);
