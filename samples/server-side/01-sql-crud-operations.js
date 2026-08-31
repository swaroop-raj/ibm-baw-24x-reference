/**
 * IBM BAW 24.X — Server-Side: SQL CRUD Operations
 * Uses System Data Toolkit. Requires JNDI datasource "jdbc/appdb"
 */

// CREATE
tw.local.sqlStatement = new tw.object.SQLStatement();
tw.local.sqlStatement.sql = "INSERT INTO customers (customer_id, first_name, last_name, email, phone, created_date) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";
tw.local.sqlStatement.parameters = new tw.object.listOf.SQLParameter();
var params = [
    { value: tw.local.customer.customerId, type: "VARCHAR" },
    { value: tw.local.customer.firstName, type: "VARCHAR" },
    { value: tw.local.customer.lastName, type: "VARCHAR" },
    { value: tw.local.customer.email, type: "VARCHAR" },
    { value: tw.local.customer.phone, type: "VARCHAR" }
];
for (var i = 0; i < params.length; i++) {
    tw.local.sqlStatement.parameters[i] = new tw.object.SQLParameter();
    tw.local.sqlStatement.parameters[i].value = params[i].value;
    tw.local.sqlStatement.parameters[i].type = params[i].type;
    tw.local.sqlStatement.parameters[i].mode = "IN";
}

// READ
tw.local.sqlStatement = new tw.object.SQLStatement();
tw.local.sqlStatement.sql = "SELECT customer_id, first_name, last_name, email, phone FROM customers WHERE customer_id = ?";
tw.local.sqlStatement.parameters = new tw.object.listOf.SQLParameter();
tw.local.sqlStatement.parameters[0] = new tw.object.SQLParameter();
tw.local.sqlStatement.parameters[0].value = tw.local.customerId;
tw.local.sqlStatement.parameters[0].type = "VARCHAR";
tw.local.sqlStatement.parameters[0].mode = "IN";
// Parse: tw.local.results[0].columns.first_name etc.

// DELETE
tw.local.sqlStatement = new tw.object.SQLStatement();
tw.local.sqlStatement.sql = "DELETE FROM customers WHERE customer_id = ?";
tw.local.sqlStatement.parameters = new tw.object.listOf.SQLParameter();
tw.local.sqlStatement.parameters[0] = new tw.object.SQLParameter();
tw.local.sqlStatement.parameters[0].value = tw.local.customerId;
tw.local.sqlStatement.parameters[0].type = "VARCHAR";
tw.local.sqlStatement.parameters[0].mode = "IN";
