# REST APIs — IBM BAW 24.X

## API Categories

| API Family | Base URL | Purpose |
|-----------|----------|---------|
| **Process REST APIs** | `/rest/bpm/wle/v1/` | BPD processes, tasks, search |
| **Case REST APIs** | `/rest/bpm/case/v1/` | Case operations |
| **Open Case APIs** | `/case/` | FileNet case CRUD |
| **BPEL REST APIs** | `/rest/bpm/bfm/v1/` | BPEL processes, human tasks |
| **Operations REST APIs** | `/ops/` | Admin operations, login |
| **Swagger/OpenAPI** | `/bpm/explorer` or `/bpm/docs` | API documentation |

## Authentication

All REST API calls require the `BPMCSRFToken` header:

```bash
curl -k -X POST "https://host:9443/ops/system/login" \
  -u "admin:password" \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{"refresh_groups": true, "requested_lifetime": 7200}'
```

## Key Endpoints

| Operation | Method | Endpoint |
|-----------|--------|---------|
| List my tasks | GET | `/rest/bpm/wle/v1/tasks` |
| Start process | POST | `/rest/bpm/wle/v1/process?action=start` |
| Get process | GET | `/rest/bpm/wle/v1/process/{id}` |
| Claim task | PUT | `/rest/bpm/wle/v1/task/{id}?action=assign&toMe=true` |
| Complete task | PUT | `/rest/bpm/wle/v1/task/{id}?action=finish` |
| Get task data | GET | `/rest/bpm/wle/v1/task/{id}/data` |
| Search | POST | `/rest/bpm/wle/v1/search/query` |
| Create case | POST | `/rest/bpm/case/v1/case` |
| Get case | GET | `/rest/bpm/case/v1/case/{id}` |
| Login | POST | `/ops/system/login` |
| API docs | GET | `/bpm/docs` |

## HTTP Method Overrides

```bash
POST /rest/bpm/wle/v1/task/12345
Headers: X-HTTP-Method-Override: PUT
```

See `samples/rest-api/` for full cURL examples.

---

*Next: [Coach Views & UI Development](07-coach-views.md)*
