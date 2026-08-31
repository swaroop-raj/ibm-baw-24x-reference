# Server-Side Development — IBM BAW 24.X

## JavaScript API Namespaces

| Namespace | Description | Example |
|-----------|-------------|---------|
| `tw` | Top-level namespace | — |
| `tw.local` | Local process/service variables | `tw.local.customerName` |
| `tw.object` | Business object constructors | `new tw.object.CustomerInfo()` |
| `tw.system` | System features and functions | `tw.system.currentProcessInstance` |
| `tw.system.user` | Current user info | `tw.system.user.name` |
| `tw.system.org` | Security/org functions | `tw.system.org.findTeamByName()` |
| `tw.epv` | Exposed Process Values | `tw.epv.MaxRetries` |
| `tw.env` | Environment Variables | `tw.env.ServiceURL` |

## Common Patterns

### Business Objects
```javascript
var customer = new tw.object.CustomerInfo();
customer.firstName = "John";
tw.local.customer = customer;
tw.local.customers = new tw.object.listOf.CustomerInfo();
```

### Dates
```javascript
var dueDate = new Date();
dueDate.setDate(dueDate.getDate() + 7);
tw.local.dueDate = new tw.object.Date(dueDate);
```

### Process Instance
```javascript
var processInstance = tw.system.currentProcessInstance;
tw.system.startProcessByName("ApprovalProcess", { requestId: tw.local.requestId });
var currentUser = tw.system.user;
```

## SQL / Database Integration

Uses System Data Toolkit SQL Integration Service Flows.

### SELECT
```javascript
tw.local.sqlStatement = new tw.object.SQLStatement();
tw.local.sqlStatement.sql = "SELECT customer_id, first_name FROM customers WHERE customer_id = ?";
tw.local.sqlStatement.parameters = new tw.object.listOf.SQLParameter();
tw.local.sqlStatement.parameters[0] = new tw.object.SQLParameter();
tw.local.sqlStatement.parameters[0].value = tw.local.customerId;
tw.local.sqlStatement.parameters[0].type = "VARCHAR";
tw.local.sqlStatement.parameters[0].mode = "IN";
// Wire to SQL Execute Statement (SQLResult) service task
```

### INSERT
```javascript
tw.local.sqlStatement.sql = "INSERT INTO orders (order_id, customer_id, amount) VALUES (?, ?, ?)";
// Set parameters[0..2] with value, type, mode = "IN"
```

### UPDATE
```javascript
tw.local.sqlStatement.sql = "UPDATE customers SET first_name = ?, email = ? WHERE customer_id = ?";
// Set parameters with new values + WHERE clause
```

### Stored Procedure
```javascript
tw.local.sqlStatement.sql = "{CALL GetCustomerOrders(?, ?)}";
// IN + OUT parameters supported
```

### DB Config (Containers)
```xml
<server>
  <dataSource id="CustomerDS" jndiName="jdbc/customerdb">
    <jdbcDriver libraryRef="DBLib"/>
    <properties.db2.jcc databaseName="CUSTDB" serverName="db2.example.com" portNumber="50000" user="dbuser" password="dbpass"/>
  </dataSource>
  <library id="DBLib"><file name="/opt/ibm/bawfile/db2jcc4.jar"/></library>
</server>
```

## Calling Java from JavaScript (LiveConnect)
```javascript
var uuid = Packages.java.util.UUID.randomUUID().toString();
var encoder = Packages.java.util.Base64.getEncoder();
var encoded = encoder.encodeToString(new Packages.java.lang.String(tw.local.plainText).getBytes("UTF-8"));
```

## REST APIs from Server Scripts
```javascript
var url = "https://yourserver:9443/rest/bpm/wle/v1/process/errors?instanceIds=12345";
var ssoToken = Packages.com.ibm.websphere.security.web.WebSecurityHelper.getSSOCookieFromSSOToken();
var httpClient = new Packages.org.apache.commons.httpclient.HttpClient();
var method = new Packages.org.apache.commons.httpclient.methods.GetMethod(url);
method.setRequestHeader(new Packages.org.apache.commons.httpclient.Header("Cookie", "LtpaToken2=" + ssoToken.getValue()));
var responseCode = String(httpClient.executeMethod(method));
tw.local.apiResponse = method.getResponseBodyAsString();
```

## Error Handling
```javascript
try {
    tw.local.result = performComplexCalculation();
} catch (e) {
    log.error("Error: " + e.message);
    throw new BPMError("CALC_ERROR", "Calculation failed: " + e.message);
}
```

See `samples/server-side/` for full CRUD examples.

---
*Next: [REST APIs](06-rest-apis.md)*
