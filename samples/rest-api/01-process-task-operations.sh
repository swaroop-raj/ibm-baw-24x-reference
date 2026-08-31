#!/bin/bash
# IBM BAW 24.X — REST API cURL Examples
BAW_HOST="https://localhost:9443"
USER="admin"; PASS="admin"

# Login
curl -k -c cookies.txt -X POST "$BAW_HOST/ops/system/login" -u "$USER:$PASS" -H "Accept: application/json" -H "Content-Type: application/json" -d '{"refresh_groups": true, "requested_lifetime": 7200}'
CSRF_TOKEN=$(grep BPMCSRFToken cookies.txt | awk '{print $7}')

# List tasks
curl -k -b cookies.txt -X GET "$BAW_HOST/rest/bpm/wle/v1/tasks?status=Received" -H "Accept: application/json" -H "BPMCSRFToken: $CSRF_TOKEN"

# Start process
curl -k -b cookies.txt -X POST "$BAW_HOST/rest/bpm/wle/v1/process?action=start&bpdId=25.a1b2c3d4" -H "Accept: application/json" -H "Content-Type: application/json" -H "BPMCSRFToken: $CSRF_TOKEN" -d '{"params": {"customerId": "CUST-001", "orderAmount": 5000}}'

# Claim task
TASK_ID="12345"
curl -k -b cookies.txt -X PUT "$BAW_HOST/rest/bpm/wle/v1/task/$TASK_ID?action=assign&toMe=true" -H "Accept: application/json" -H "BPMCSRFToken: $CSRF_TOKEN"

# Complete task
curl -k -b cookies.txt -X PUT "$BAW_HOST/rest/bpm/wle/v1/task/$TASK_ID?action=finish" -H "Accept: application/json" -H "Content-Type: application/json" -H "BPMCSRFToken: $CSRF_TOKEN" -d '{"params": {"approved": true, "comments": "Approved"}}'
