# Architecture & Deployment — IBM BAW 24.X

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT TIER                              │
│  Workplace │ Process Portal │ Case Client │ Custom Apps │ APIs  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS (TLS 1.3)
┌──────────────────────────▼──────────────────────────────────────┐
│                      PRESENTATION TIER                          │
│  Coach Framework │ REST APIs │ Content Navigator │ BAI Dashboards│
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      APPLICATION TIER                           │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│  │ BPD Engine   │ │ BPEL Engine  │ │ Case Management Engine   │ │
│  │ (Process)    │ │ (Advanced)   │ │ (FileNet PE + CPE)       │ │
│  └─────────────┘ └──────────────┘ └──────────────────────────┘ │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│  │ Service      │ │ Event        │ │ Content Platform Engine   │ │
│  │ Flows        │ │ Manager      │ │ (Document Store)          │ │
│  └─────────────┘ └──────────────┘ └──────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Process Federation Server (PFS) — cross-system federation   ││
│  └─────────────────────────────────────────────────────────────┘│
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                        DATA TIER                                │
│  Process DB │ Perf DW │ Content DB │ OpenSearch │ Kafka/JMS     │
└─────────────────────────────────────────────────────────────────┘
```

## Key Components

### Workflow Center (Authoring)
- Central repository for process applications and toolkits
- Hosts Process Designer (web-based IDE)
- Manages snapshots, versioning, and deployment to Workflow Servers
- Playground server for testing during development

### Workflow Server (Runtime)
- Executes deployed process application snapshots
- Handles task routing, timer events, and service invocations
- Connects back to Workflow Center for deployment packages

### Process Federation Server (PFS)
- Federates multiple Workflow Servers into a unified view
- Powers federated Workplace and Process Portal
- Provides consolidated search across all federated systems
- In 24.X: auto-federation via `FederatedSystem` Custom Resource

### Content Platform Engine (CPE)
- Stores case data, documents, and case history
- Provides object store for design-time and runtime case artifacts
- Target Object Store (TOS) for runtime cases
- Design Object Store (DOS) for case solution definitions

### Business Automation Insights (BAI)
- Emits business events from processes and cases to Kafka
- Provides operational dashboards and KPIs
- Powers Intelligent Task Prioritization (ML-based)

## Deployment Models

### Traditional (On-Premises)

Topology Patterns: Single Cluster, Remote Messaging, Remote Support, Three Cluster.

### Containers (Kubernetes / OpenShift)

Container Deployment Mappings:
- 1 DB → 1 Workflow Server instance → 1..n Pods
- 1 Namespace → 1 CP4BA/BAW CR → 1..n Workflow Server instances
- 1..n Workflow Server instances → 1 Federated Portal

## Security Architecture (24.X)

- **TLS 1.3** default for all internal and outbound communication
- **LTPA tokens** for SSO across BAW components
- **OAuth 2.0/OIDC** via UMS for container deployments
- **BPMCSRFToken** header required for all REST API calls
- **LDAP** integration for user/group management
- **Role-based access control** at process app, team, and lane level

## Database Schema Overview

| Database | Purpose |
|----------|---------|
| **BPMDB** | Process engine: BPD instances, tasks, variables |
| **PDWDB** | Performance Data Warehouse: tracking, reporting |
| **CMNDB** | Common database: shared configuration |
| **DOSDB** | Design Object Store: case solution definitions |
| **TOSDB** | Target Object Store: runtime case instances |
| **ICNDB** | Content Navigator: desktop config, plugins |

---

*Next: [Portals & Tools](03-portals-and-tools.md)*
