export async function logAudit(vitalityId: string, action: string) {
  if (!vitalityId) return;
  // Fire and forget
  fetch(`/api/v1/audit-logs`, {
    method: "POST",
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      user_id: vitalityId,
      action: action,
      context: {},
      ip_address: "client",
    }),
  }).catch((err) => console.error("Audit log failed:", err));
}
