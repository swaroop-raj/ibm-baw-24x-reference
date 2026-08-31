# Case Management — IBM BAW 24.X

## Overview

IBM BAW unifies structured BPM and unstructured case management. Case management handles dynamic, event-driven workflows.

## Case Architecture

Case Solution > Case Types > Properties, Stages, Activities, Business Rules, In-Baskets. Solution Layouts (CSHS-based) for Case List, Task List (24.0.1), Add Case, Case Details.

## Case Builder

1. Create Case Type with properties, stages, activities
2. Configure Business Rules for auto-assign, escalation, stage transitions
3. Define Solution Layouts (CSHS templates)
4. Assign Layouts to Roles

### Stages
```
[Intake] → [Investigation] → [Resolution] → [Closed]
```
New in 24.X: Vertical stage orientation.

### Activities: User, Automatic, Discretionary, Required, Container

## Solution Layouts (24.X)

Templates: Cases, Tasks (24.0.1), Add Case, Case Details. All CSHS-based, customizable in Process Designer.

### Custom Menu Actions in Case List
```javascript
me.handleStandardActions(data);
if (data.menuId === "manageTeam") {
    var manageTeamView = ${Manage_Team1};
    manageTeamView._instance.caseId = data.rowData.Id.substring(1, data.rowData.Id.length - 1);
    manageTeamView._instance.objectStoreTOS = me._instance.tosName;
    manageTeamView.openManageTeamModal();
}
```

## Custom ICN Widgets (Legacy)

Dojo-based, extending `icm/base/BasePageWidget`:
```javascript
define(["dojo/_base/declare", "icm/base/BasePageWidget"], function(declare, BasePageWidget) {
    return declare("mypackage.MyWidget", [BasePageWidget], {
        postCreate: function() { this.inherited(arguments); },
        handleICMCaseSelected: function(event) { /* load case data */ }
    });
});
```

## CSHS Layouts vs. Classic Widgets

| Aspect | CSHS | Classic Widgets |
|--------|------|----------------|
| Framework | Coach/Coach View | Dojo/ICN Plugin |
| Design Tool | Process Designer | Integration Designer |
| Recommended | Yes | Legacy only |

---
*Next: [AI & Agentic Capabilities](09-ai-agentic-capabilities.md)*
