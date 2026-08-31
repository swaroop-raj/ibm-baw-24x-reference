<!-- agent:brain -->
<!-- Commit convention: Conventional Commits with agent scope -->
<!-- Format: type(agent:brain): description -->
<!-- Tags: semantic versioning (v0.1.0, v1.0.0) -->
<!-- Branch: main (PRs for all changes) -->

# IBM Business Automation Workflow 24.X — Technical Reference

> A comprehensive, single-source technical reference for IBM Business Automation Workflow (BAW) 24.X line (24.0.0, 24.0.1, and related interim fixes). Covers architecture, modules, portals, developer patterns, code samples, and AI/Agentic capabilities.

## Table of Contents

### Core Documentation

| # | Document | Description |
|---|----------|-------------|
| 1 | [Product Overview](docs/01-product-overview.md) | What BAW is, editions, CP4BA context, licensing |
| 2 | [Architecture & Deployment](docs/02-architecture.md) | Topology patterns, containers vs. traditional, component map |
| 3 | [Portals & Tools](docs/03-portals-and-tools.md) | Process Designer, Process Admin Console, Workplace, Case Builder, Case Client |
| 4 | [Process Modeling & Design](docs/04-process-modeling.md) | BPMN, process applications, toolkits, service flows, gateways |
| 5 | [Server-Side Development](docs/05-server-side-development.md) | JavaScript API (tw namespace), Java integration, SQL/DB, service flows |
| 6 | [REST APIs](docs/06-rest-apis.md) | Process REST APIs, Case APIs, BPEL APIs, Swagger/OpenAPI, authentication |
| 7 | [Coach Views & UI Development](docs/07-coach-views.md) | **Deep Dive** — Coach framework, custom views, events, patterns, scenarios |
| 8 | [Case Management](docs/08-case-management.md) | Case Builder, Case Client, solution layouts, widgets, case properties |
| 9 | [AI & Agentic Capabilities](docs/09-ai-agentic-capabilities.md) | Generative AI, watsonx integration, MCP, Workflow Assistant, Orchestrate |

### Code Samples

| Directory | Contents |
|-----------|----------|
| [samples/coach-views/](samples/coach-views/) | Coach View patterns: button-click DB update, dynamic dropdowns, AJAX calls, validation |
| [samples/server-side/](samples/server-side/) | Server-side scripts: SQL integration, REST calls, Java interop, process manipulation |
| [samples/rest-api/](samples/rest-api/) | REST API examples: cURL commands, process/task/case operations |
| [samples/ai-integration/](samples/ai-integration/) | AI integration: Gen AI task config, watsonx Orchestrate, MCP server setup |

## Version Coverage

- **IBM BAW 24.0.0.0** (GA June 2024)
- **IBM BAW 24.0.1.0** (GA December 2024) — adds Gen AI, Workflow Assistant, watsonx Orchestrate skills
- Interim fixes through IF008
- Forward references to 25.x/26.x for AI agent and MCP features where relevant

## Quick Links

- [IBM BAW 24.x Documentation](https://www.ibm.com/docs/en/baw/24.0.x)
- [IBM CP4BA 24.0.x Documentation](https://www.ibm.com/docs/en/cloud-paks/cp-biz-automation/24.0.0)
- [IBM BAW REST API Explorer](https://host:port/bpm/explorer)
- [IBM BAW Case API Explorer](https://host:port/case/explorer)
- [IBM Community — BAW Blog](https://community.ibm.com/community/user/automation/communities/community-home?communitykey=65a0df07-3745-40d1-a699-304350bd38fc)

## How to Use This Reference

1. Start with the **Product Overview** to understand the platform
2. Review **Architecture** for deployment context
3. Dive into specific modules based on your role (developer, admin, architect)
4. Use **Coach Views** deep-dive for front-end development patterns
5. Reference **Code Samples** for copy-paste-ready implementations

---

*Generated and maintained by ClickUp Brain. Last updated: August 2026.*
