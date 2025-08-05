export function generateReferralCode(username: string) {
  return (
    username.toUpperCase().replace(/\s+/g, "").slice(0, 4) +
    "-" +
    Math.random().toString(36).substring(2, 7).toUpperCase()
  );
}

export function generateCouponCode(username: string) {
  return (
    "DISC-25-OFF-" +
    username.toUpperCase().replace(/\s+/g, "").slice(0, 3) +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase()
  );
}
