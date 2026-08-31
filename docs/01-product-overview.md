# IBM Business Automation Workflow 24.X — Product Overview

## What is IBM BAW?

IBM Business Automation Workflow (BAW) is an enterprise platform for creating workflow applications that coordinate work between human tasks and automated tasks. It unifies **business process management (BPM)** and **case management** into a single platform, enabling organizations to automate digital workflows on-premises or in the cloud.

BAW is a key capability within **IBM Cloud Pak for Business Automation (CP4BA)**, which bundles:

- **Workflow** (BAW) — process and case automation
- **Decisions** (ODM) — business rules and decision management
- **Content** (FileNet) — enterprise content management
- **Insights** (BAI) — business analytics and dashboards

## Editions

| Edition | Description |
|---------|-------------|
| **BAW Enterprise** | Full-featured: BPD processes, BPEL, case management, content integration, advanced integration |
| **BAW Express** | Subset for smaller deployments; no BPEL, limited topology |
| **BAW on Containers** | Kubernetes/OpenShift deployment with operator-managed lifecycle |
| **BAW on Cloud (SaaS)** | IBM-managed cloud service (automationcloud.ibm.com) |

## 24.X Release Timeline

| Version | GA Date | Key Highlights |
|---------|---------|----------------|
| **24.0.0.0** | June 2024 | Solution layouts (CSHS), enhanced saved search, federated data repo indexing, Intelligent Task Prioritization, TLS 1.3, new ibm-workflow-operator |
| **24.0.1.0** | December 2024 | Generative AI for processes, Workflow Assistant (tech preview), watsonx Orchestrate skills (tech preview), JFrog Artifactory integration, customizable task list pages |

## Four Main Components

Every BAW application has four pillars:

### 1. Authoring Environment
- **Process Designer** (web-based) — primary tool for modeling and implementing processes
- **Case Builder** — design case solutions, define case types, properties, stages
- **Integration Designer** (Eclipse-based, deprecated path) — for advanced BPEL and SCA modules

### 2. Workflow Models
- **Structured Processes** (BPD/BPMN) — sequential, rule-driven workflows
- **Unstructured Cases** — dynamic, event-driven case management
- **Hybrid** — cases that contain embedded processes, or processes that spawn cases

### 3. User Experience
- **Workplace** — modern, unified portal for process tasks, cases, and workstreams
- **Process Portal** (heritage, deprecated) — legacy task portal
- **Case Client** — case-specific user interface via IBM Content Navigator
- **Custom UIs** — Coach-based user interfaces with full customization

### 4. Administration
- **Process Admin Console** — server administration, monitoring, installed apps
- **Workflow Center** — application lifecycle: versioning, snapshots, deployment
- **Business Performance Admin Console** — Performance Data Warehouse management

## Key Technical Artifacts

| Artifact | Description |
|----------|-------------|
| **Process Application** | Container for all process/case artifacts; versioned via snapshots |
| **Toolkit** | Shared library of reusable artifacts across process applications |
| **Snapshot** | Immutable version of a process application or toolkit |
| **Business Object** | Data structure (like a class/schema) used in processes and UIs |
| **Service Flow** | Reusable sequence of services, scripts, and integrations |
| **Coach** | User interface page within a human service |
| **Coach View** | Reusable UI component (widget) used in coaches |
| **External Service** | Integration wrapper for REST, Java, or web service calls |
| **Team** | Group of users with specific roles for task assignment |
| **Exposed Process Value (EPV)** | Runtime-configurable business parameters |
| **Environment Variable** | Configuration values that differ between environments |

## Platform Foundation

- **Application Server**: IBM WebSphere Liberty (containers) or WebSphere Application Server (traditional)
- **Database**: DB2, Oracle, SQL Server, PostgreSQL (containers)
- **Search**: OpenSearch or Elasticsearch (for federated data repository)
- **Content Engine**: IBM FileNet Content Platform Engine (for case management and document storage)
- **Navigator**: IBM Content Navigator (for case UI widgets)
- **Message Bus**: JMS / Kafka (for BAI event emission)

## What Changed from Previous Versions

| Area | Change in 24.X |
|------|------------------|
| **Operator** | New `ibm-workflow-operator` for Runtime and Workstream Services |
| **Security** | Default TLS 1.3 for internal and outbound communication |
| **Search** | Direct BPD indexing to federated data repository (OpenSearch/Elasticsearch) |
| **Case UI** | Solution pages now based on Client-Side Human Services (CSHS) |
| **AI** | Generative AI tasks in service flows (24.0.1), Workflow Assistant (24.0.1 tech preview) |
| **Admin** | Audit trail logging, snapshot search, user sync check |
| **CI/CD** | JFrog Artifactory integration, content-typed export packages |

---

*Next: [Architecture & Deployment](02-architecture.md)*
