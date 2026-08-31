# Coach Views & UI Development — IBM BAW 24.X (Deep Dive)

## Overview

The **Coach Framework** is IBM BAW's UI framework. Coaches are pages displayed during human tasks. **Coach Views** are the reusable widgets.

## Coach View Structure

### 1. Variables: Business Data (bindings), Configuration Options (settings), Events
### 2. Layout: HTML structure, nested Coach Views, Custom HTML blocks
### 3. Behavior: Inline JavaScript, Event Handlers (load/unload/view/change/collaboration), Included Scripts
### 4. Events: Built-in (On Load, On Change, On Click) + User-defined

## Event Handlers

| Event | Fires When | Common Use |
|-------|------------|------------|
| **load** | View first rendered | Init data, register events, AJAX calls |
| **change** | Bound data changes | React to input, validate, cascade |
| **view** | View displayed/refreshed | Update visual state |

### The `this` Context
```javascript
this.context.element   // DOM element
this.context.options   // Configuration options
this.getData()         // Get bound data
this.setData(value)    // Set bound data
this.setVisible(bool)  // Show/hide
this.setEnabled(bool)  // Enable/disable
this.setValid(bool, msg) // Validation state
```

### The `page` Variable
```javascript
var nameField = page.ui.get("CustomerName");
page.ui.get("TotalAmount").setData(calculatedTotal);
page.ui.get("ApprovalSection").setVisible(isManager);
```

## Scenario 1: Button Click → Database Update

```
Button Click → Service Flow Call (AJAX) → SQL Execute Statement → Return Result → Update UI
```

**Service Flow (server-side):**
```javascript
tw.local.sqlStatement = new tw.object.SQLStatement();
tw.local.sqlStatement.sql = "UPDATE customers SET first_name = ?, last_name = ?, email = ? WHERE customer_id = ?";
tw.local.sqlStatement.parameters = new tw.object.listOf.SQLParameter();
tw.local.sqlStatement.parameters[0] = new tw.object.SQLParameter();
tw.local.sqlStatement.parameters[0].value = tw.local.firstName;
tw.local.sqlStatement.parameters[0].type = "VARCHAR";
tw.local.sqlStatement.parameters[0].mode = "IN";
// ... repeat for lastName, email, customerId
```

**Coach View Button Click:**
```javascript
var me = this;
var customerData = {
    customerId: ${CustomerID}.getData(),
    firstName: ${FirstName}.getData(),
    lastName: ${LastName}.getData(),
    email: ${Email}.getData()
};
me.setEnabled(false);
var serviceArgs = {
    params: JSON.stringify(customerData),
    load: function(data) {
        me.setEnabled(true);
        ${StatusMessage}.setData(data.success ? "Updated!" : "Failed: " + data.message);
    },
    error: function(e) { me.setEnabled(true); console.error(e); }
};
me.context.options.updateService(serviceArgs);
```

## Scenario 2: Dynamic Dropdown Population

```javascript
// On Load event
var me = this;
me.context.options.getCountriesService({
    params: JSON.stringify({}),
    load: function(data) {
        var select = me.context.element.querySelector("select");
        data.countries.forEach(function(c) {
            var option = document.createElement("option");
            option.value = c.value;
            option.textContent = c.name;
            select.appendChild(option);
        });
    }
});
```

## Scenario 3: Cascading Dropdowns

```javascript
// On Change of Country dropdown
var selectedCountry = me.getData();
if (selectedCountry) {
    ${StateDropdown}.setData("");
    me.context.options.getStatesService({
        params: JSON.stringify({countryCode: selectedCountry}),
        load: function(data) {
            var stateSelect = ${StateDropdown}.context.element.querySelector("select");
            while (stateSelect.options.length > 1) stateSelect.remove(1);
            data.states.forEach(function(s) {
                var opt = document.createElement("option");
                opt.value = s.value; opt.textContent = s.name;
                stateSelect.appendChild(opt);
            });
        }
    });
}
```

## Scenario 4: Table CRUD Operations

```javascript
// Add Row
var newItem = {itemId: "ITEM-" + Date.now(), description: "", quantity: 0, unitPrice: 0};
var list = ${OrderItems}.getData() || [];
list.push(newItem);
${OrderItems}.setData(list);

// Delete Row
var list = ${OrderItems}.getData();
list.splice(rowIndex, 1);
${OrderItems}.setData(list);

// Calculate Total (On Change)
var items = ${OrderItems}.getData();
var total = 0;
for (var i = 0; i < items.length; i++) total += (items[i].quantity || 0) * (items[i].unitPrice || 0);
${OrderTotal}.setData(total);
```

## Scenario 5: Real-Time Validation

```javascript
// Email
var email = me.getData();
if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) me.setValid(false, "Invalid email");
else me.setValid(true, "");

// Phone auto-format
var cleaned = me.getData().replace(/\D/g, "");
if (cleaned.length === 10) me.setData("(" + cleaned.substring(0,3) + ") " + cleaned.substring(3,6) + "-" + cleaned.substring(6));

// Cross-field: password match
var password = ${Password}.getData();
if (me.getData() && password !== me.getData()) me.setValid(false, "Passwords do not match");
```

## Scenario 6: Show/Hide Sections

```javascript
var requestType = me.getData();
${NewAccountSection}.setVisible(requestType === "NEW_ACCOUNT");
${TransferSection}.setVisible(requestType === "TRANSFER");
${CloseAccountSection}.setVisible(requestType === "CLOSE_ACCOUNT");
```

## Scenario 7: File Upload with Preview

```javascript
var fileData = me.getData();
if (fileData && fileData.type && fileData.type.startsWith("image/")) {
    var reader = new FileReader();
    reader.onload = function(e) {
        ${ImagePreview}.context.element.innerHTML = '<img src="' + e.target.result + '" style="max-width:300px"/>';
    };
    reader.readAsDataURL(fileData);
}
```

## Scenario 8: Custom User-Defined Events

```javascript
// Register (Load handler)
this.registerEventHandlingFunction("onButtonClick", {value: "initial"});

// Fire (View/Click handler)
this.executeEventHandlingFunction("onButtonClick", {action: "save", itemId: this.getData()});

// Handle (In parent Coach event section)
${StatusLabel}.setData("Saved at " + value.timestamp);
```

## Scenario 9: REST API Call (Direct XHR)

```javascript
require(["dojo/request/xhr"], function(xhr) {
    xhr("https://api.example.com/lookup", {
        method: "GET", handleAs: "json",
        headers: {"Authorization": "Bearer " + token},
        query: {customerId: ${CustomerID}.getData()}
    }).then(function(data) {
        ${CustomerName}.setData(data.name);
    }, function(error) { console.error(error); });
});
```
> Best Practice: Prefer server-side service flows over direct XHR for security and CORS avoidance.

## Scenario 10: External JS Libraries

```javascript
var script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/chart.js";
script.onload = function() {
    var canvas = document.createElement("canvas");
    this.context.element.appendChild(canvas);
    new Chart(canvas, {type: "bar", data: {labels: ["Q1","Q2"], datasets: [{data: [12000,19000]}]}});
}.bind(this);
document.head.appendChild(script);
```

## Development Checklist

1. Define variable declarations (bindings + config options)
2. Use unique Control IDs; use `$$viewDOMID$$` for DOM IDs
3. Implement load, change, view event handlers
4. Handle errors in AJAX service calls
5. Use `setValid()`, `setVisible()`, `setEnabled()` for dynamic UI
6. Test with multiple instances on one page
7. Use managed assets for external files
8. Don't mix JS frameworks (stick with Dojo or one external)

## Managed Assets

```javascript
var cssUrl = com_ibm_bpm_coach.getManagedAssetUrl("styles.css", com_ibm_bpm_coach.assetType_WEB);
var imgUrl = com_ibm_bpm_coach.getManagedAssetUrl("logo.png", com_ibm_bpm_coach.assetType_WEB);
```

## Unique DOM IDs

```html
<div id="$$viewDOMID$$_container">
    <input id="$$viewDOMID$$_input" type="text"/>
</div>
```

## Best Practices

| Practice | Rationale |
|----------|-----------|
| Use CSHS, not heritage | Heritage is deprecated |
| Service flows over XHR | Security, maintainability |
| Config options for services | Reusability |
| Small, composable views | Single responsibility |
| `$$viewDOMID$$` for DOM IDs | Prevents collisions |
| Don't mix JS frameworks | Consistency |

---
*Next: [Case Management](08-case-management.md)*
