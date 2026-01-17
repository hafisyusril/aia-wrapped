export async function logAudit(vitalityId: string, action: string) {
  if (!vitalityId) return;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

  // Fire and forget
  fetch(`${baseUrl}/api/v1/audit-logs`, {
    method: 'POST',
    keepalive: true,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      user_id: vitalityId,
      action: action,
      context: {},
      ip_address: "client"
    })
  }).catch(err => console.error("Audit log failed:", err));
}
