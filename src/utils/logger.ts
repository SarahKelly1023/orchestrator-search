export function log(correlationId: string, message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [correlationId=${correlationId}] ${message}`);
}