# AI & Agentic Capabilities — IBM BAW 24.X

## AI Feature Timeline

| Version | Feature | Status |
|---------|---------|--------|
| **24.0.1** | Generative AI for Processes | GA |
| **24.0.1** | IBM Workflow Assistant | Tech Preview |
| **24.0.1** | watsonx Orchestrate Skills | Tech Preview |
| **25.0.0** | Custom + Deploy-on-Demand Foundation Models | GA |
| **25.0.1** | AI Agent Integration (watsonx Orchestrate) | GA |
| **25.0.1** | MCP Server for BAW | GA |
| **25.0.1** | Authoring Assistant | Tech Preview |
| **26.0.0** | AI Model Gateway (multi-LLM) | GA |
| **26.0.0** | Workflow Runtime MCP Server (K8s) | GA |
| **26.0.0** | Document Processing with Gen AI | GA |

## 1. Generative AI for Processes (24.0.1+)

Embed Gen AI tasks in service flows using IBM watsonx.ai foundation models (Granite, Llama, Mixtral).

### Configuration (100Custom.xml)
```xml
<server merge="mergeChildren">
  <gen-ai merge="mergeChildren">
    <provider-url>https://us-south.ml.cloud.ibm.com</provider-url>
    <project-id>your-watsonx-project-id</project-id>
    <credential-alias>watsonxAICredAlias</credential-alias>
    <default-foundation-model>ibm/granite-13b-instruct-v2</default-foundation-model>
    <supported-foundation-model-type>watsonx</supported-foundation-model-type>
  </gen-ai>
</server>
```

### Sample Prompts
```
// Content Generation
Generate a professional product description for:
Product Name: {{productName}}
Category: {{category}}
Key Features: {{features}}

// Email Classification
Classify the email into: COMPLAINT, INQUIRY, FEEDBACK, URGENT_ISSUE, OTHER
Email: {{emailBody}}
Respond with category name and confidence score (0-100).
```

### Use Cases
Ad copy generation, job descriptions, email templates, ticket triage, content summarization, translation.

## 2. IBM Workflow Assistant (24.0.1 Tech Preview)

AI-powered conversational assistant in Workplace. Capabilities: task discovery, filtering, summarization, content generation, team management (25.0.1+), multi-step actions (25.0.1+).

## 3. watsonx Orchestrate Integration

### Skills (24.0.1 Tech Preview)
1000+ out-of-the-box skills (Gmail, Salesforce, Workday, Twilio, etc.).

### AI Agent Integration (25.0.1+ GA)

```xml
<!-- 100Custom.xml: watsonx Orchestrate endpoint -->
<server>
  <wxo merge="mergeChildren">
    <token-url>https://iam.platform.saas.ibm.com/siusermgr/api/1.0/apikeys/token</token-url>
    <discovery>
      <service-instance-url>https://api.hostname/instances/tenant_id</service-instance-url>
    </discovery>
  </wxo>
</server>
```

Workflow: Discover AI Agents > Create Artifact > Add AI Agent Activity to Service Flow > Configure Prompt with `{{variable_name}}` > Test Inline > Map Output.

### Sample AI Agent Prompt
```
Analyze the following insurance claim:
Claim Type: {{claimType}}
Claim Amount: {{claimAmount}}
Incident Description: {{incidentDescription}}

Provide:
1. Risk assessment (LOW, MEDIUM, HIGH)
2. Recommended action (AUTO_APPROVE, MANUAL_REVIEW, DENY)
3. Reasoning (2-3 sentences)
```

## 4. Model Context Protocol (MCP)

Open protocol for AI agent integration with BAW.

### Local MCP Server (25.0.1+)
```bash
uvx --from git+https://github.com/ibmbpm/ibm-baw-mcp-server ibm-baw-mcp-server
```

### Claude Configuration
```json
{
  "mcpServers": {
    "ibm-baw": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/ibmbpm/ibm-baw-mcp-server", "ibm-baw-mcp-server"],
      "env": { "BAW_HOST": "https://your-baw-server:9443", "BAW_USER": "admin", "BAW_PASSWORD": "password" }
    }
  }
}
```

All exposed REST services auto-added as MCP tools. Supports process, task, case, and search operations.

### Workflow Runtime MCP Server (26.0.0+, K8s)
Production-grade: OAuth identity propagation, topology-aware, federated queries via PFS, Instana tracing.
Endpoints: `/process/mcp` and `/case/mcp`.

## 5. Intelligent Task Prioritization

ML-based task prioritization via Business Automation Insights. Training data in OpenSearch (was Elasticsearch). New `RETRAIN_MODEL_SCHEDULE` env variable in 24.X.

## 6. Third-Party AI Integration Patterns

### Pattern 1: REST-Based LLM
```javascript
var httpClient = new Packages.org.apache.commons.httpclient.HttpClient();
var method = new Packages.org.apache.commons.httpclient.methods.PostMethod("https://api.openai.com/v1/chat/completions");
method.setRequestHeader(new Packages.org.apache.commons.httpclient.Header("Authorization", "Bearer " + tw.env.OPENAI_API_KEY));
method.setRequestHeader(new Packages.org.apache.commons.httpclient.Header("Content-Type", "application/json"));
var requestBody = JSON.stringify({
    model: "gpt-4",
    messages: [{role: "system", content: "You are a claims assistant."}, {role: "user", content: "Assess: " + tw.local.claimDescription}],
    temperature: 0.3, max_tokens: 500
});
method.setRequestBody(requestBody);
httpClient.executeMethod(method);
tw.local.aiAssessment = JSON.parse(method.getResponseBodyAsString()).choices[0].message.content;
```

### Pattern 2: OpenAPI External Service
Import LLM provider's OpenAPI spec as External Service, configure REST server with API key, use in service flow.

### Pattern 3: Client-Side AI in Coach Views
```javascript
// AI autocomplete with debounce
var searchText = me.getData();
if (searchText && searchText.length > 2) {
    clearTimeout(me._debounceTimer);
    me._debounceTimer = setTimeout(function() {
        me.context.options.aiSuggestionService({
            params: JSON.stringify({query: searchText}),
            load: function(data) { renderSuggestions(data.suggestions); }
        });
    }, 300);
}
```

## Capability Matrix

| Capability | Where | Integration | From |
|-----------|-------|-------------|------|
| Gen AI Task | Server (service flow) | watsonx.ai | 24.0.1 |
| Workflow Assistant | Client (Workplace) | watsonx.ai | 24.0.1 |
| AI Agent Activity | Server (service flow) | watsonx Orchestrate | 25.0.1 |
| Local MCP Server | Local (Python) | Any MCP client | 25.0.1 |
| Runtime MCP Server | K8s Pod | Any MCP client | 26.0.0 |
| Model Gateway | Server | Multi-LLM | 26.0.0 |
| Custom REST | Server | Any REST API | Any |

---
*Back to: [README](../README.md)*
