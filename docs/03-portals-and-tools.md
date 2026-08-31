# Portals & Tools — IBM BAW 24.X

## Overview

| Portal/Tool | URL Pattern | Primary Users |
|-------------|-------------|---------------|
| **Workflow Center** | `https://host:port/WorkflowCenter` | Developers, Admins |
| **Process Designer** | Launched from Workflow Center | Developers |
| **Case Builder** | `https://host:port/CaseBuilder` | Case Solution Designers |
| **Workplace** | `https://host:port/Workplace` | End Users, Case Workers |
| **Process Portal** | `https://host:port/ProcessPortal` | End Users (deprecated) |
| **Case Client** | Via Content Navigator | Case Workers |
| **Process Admin Console** | `https://host:port/ProcessAdmin` | Administrators |

## Process Designer (Web-Based)

Primary modeling and implementation IDE, accessed via browser.

### Key Capabilities
- BPMN Modeling, Service Flow Editor, Coach Editor, Variable Editor
- Concurrent Editing with real-time collaboration
- Diagram View with data mapping

### Artifacts: Process (BPD), Client-Side Human Service, Service Flow, Coach, Coach View, Business Object, External Service, Team, Tracking Group

## Case Builder

### Key Functions
- Case Type Design with properties, stages, and activities
- Solution Layouts (CSHS-based, new in 24.X)
- Vertical stage orientation (new in 24.X)
- Task list layouts based on CSHS (24.0.1)

## Workplace

Modern, unified work portal. Unified task list, case management, saved searches, bulk actions, federation support.

### New in 24.X
- Auto-logout for inactive users
- Enhanced saved search (AND, OR, NOT operators)
- Customizable task pages with CSHS

## Process Admin Console

`https://host:port/ProcessAdmin`

### Key Sections
- **Server Admin**: Installed Apps (search by name), Runtime Settings, User Management
- **Monitoring**: Process Inspector, System Maintenance, Performance Dashboard, Audit Trail (new)
- **Health Management**: Task Cleanup, Process Instance Management, Snapshot Management

### New in 24.X
- Audit trail logging, delete confirmation, snapshot search, user sync check

## Case Client (via Content Navigator)

Custom Dojo-based widgets extending `icm/base/BasePageWidget`. Deployed via Case Configuration Tool.

## Portal Comparison

| Feature | Workplace | Process Portal | Case Client |
|---------|-----------|----------------|-------------|
| Process Tasks | ✅ | ✅ | ❌ |
| Case Tasks | ✅ | Limited | ✅ |
| Modern UI | ✅ | ❌ | ❌ |
| Recommended | ✅ | Deprecated | Case-heavy |

---

*Next: [Process Modeling & Design](04-process-modeling.md)*
