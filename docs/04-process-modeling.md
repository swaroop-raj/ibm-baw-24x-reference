# Process Modeling & Design — IBM BAW 24.X

## BPMN Process Design

### Activity Types

| Activity | Description | Implementation |
|----------|-------------|----------------|
| **User Task** | Human interaction | Client-Side Human Service with Coaches |
| **System Task** | Automated processing | Service Flow or Script |
| **Script Task** | Inline JavaScript | Server-side `tw.local.*` scripting |
| **Decision Task** | Business rule evaluation | Decision Table or ODM service |
| **Subprocess** | Embedded or linked process | Nested BPD |
| **Service Task** | External service invocation | External Service (REST/Java/WSDL) |

### Gateway Types: Exclusive (XOR), Parallel (AND), Inclusive (OR), Event Gateway

### Event Types: Start, End, Intermediate Timer, Intermediate Message, Boundary Error, Boundary Timer

## Service Flows

Service Flow Palette: Script, Service Task, Linked Service Flow, Content Integration, Exclusive Gateway, Parallel Gateway, Error Event, **Generative AI Task** (24.0.1+), **AI Agent Activity** (25.0.1+)

```javascript
// Example: Discount calculation
if (tw.local.orderTotal > 1000) { tw.local.discountPercent = 15; }
else if (tw.local.orderTotal > 500) { tw.local.discountPercent = 10; }
else { tw.local.discountPercent = 5; }
tw.local.discountAmount = tw.local.orderTotal * (tw.local.discountPercent / 100);
```

## Client-Side Human Services (CSHS)

Modern way to build user task UIs. Components: Coach, Script Task, Decision Gateway, Stay on Page, Data Change.

```javascript
// Data Change Validation
if (tw.local.startDate.getTime() > tw.local.endDate.getTime()) {
    tw.system.coachValidation.addValidationError("tw.local.startDate", "Start date must precede end date.");
}
tw.local.readyToSubmit = tw.system.coachValidation.validationErrors.length == 0;
```

## System Toolkits

| Toolkit | Purpose |
|---------|---------|
| **UI Toolkit** | Standard Coach Views |
| **System Data** | SQL integration services |
| **Content Management** | Document operations |
| **Workplace Toolkit** | Shared Workplace components |

## Deployment Lifecycle

Development (Tip) → Snapshot → Test → Staging → Production. Methods: Online Deploy, Offline (.twx), CI/CD (REST APIs + JFrog Artifactory in 24.0.1+).

---

*Next: [Server-Side Development](05-server-side-development.md)*
