# Mixpanel Implementation — Context Block

Updated after each phase. Reference at the start of each phase.

| Field | Value |
|-------|--------|
| **Company name** | Fixpanel (demo site, no company) |
| **Product URL** | https://mixpanel.github.io/fixpanel/ |
| **Business model** | Demo / showcase (multi-vertical demo site) |
| **Growth model** | N/A (demo) |
| **Customer type** | Visitors / demo users |
| **Stage** | Demo |
| **Commercial priority** | Understanding engagement and drop-off |
| **Product type** | Multi-vertical demo (financial, e‑commerce, SaaS, streaming, lifestyle, wellness) |
| **Platform(s)** | Web (Next.js) |
| **CDP in use** | None |
| **Group Analytics** | Yes |
| **EU or CA users** | Yes (California) — consent gate required |
| **Value Moment** | `checkout_completed` |
| **KPIs (2–3)** | (1) Bounce by page (2) Landing engagement (3) Cart abandonment rate |
| **Dev project token** | N/A (single project) |
| **Prod project token** | Set in `.env` as `NEXT_PUBLIC_MIXPANEL_TOKEN` (do not commit) |
| **Tracking method** | Client-side (JavaScript SDK) |
| **Event 1** | `sign_up_completed` — properties: `sign_up_method`, `referral_source`, `platform`, `vertical` |
| **Event 2** | `checkout_completed` — properties: `order_total`, `item_count`, `payment_method`, `vertical` |

## Business questions (Phase 0)
1. Where do users tend to bounce from my page?
2. What do they do when they land on my page?
3. How many users add items to cart and abandon before checking out?
