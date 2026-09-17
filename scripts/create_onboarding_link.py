#!/usr/bin/env python3
"""Create a Stripe-hosted onboarding link for a connected account.

A brand-new Connect account (test or live) can't receive transferred funds
until it completes onboarding — business/representative details, a bank
account, accepting the Stripe Connected Account Agreement, etc. This script
generates the one-time hosted URL for that flow; open it in a browser and
click through it (Stripe's test mode autofills/accepts fake data instantly,
so it only takes a minute) to activate the account used by
create_test_checkout_session.py.

The secret key is read from the STRIPE_SECRET_KEY environment variable —
never hardcode it here, pass it on the command line, or commit it anywhere.
Only Stripe TEST keys (sk_test_...) are accepted; the script refuses to run
against a live key.

Usage:
    STRIPE_SECRET_KEY=sk_test_... python3 scripts/create_onboarding_link.py

Override the target account with the CONNECTED_ACCOUNT_ID env var.

No third-party packages are required (uses only the standard library), since
this environment doesn't have the Stripe SDK or `requests` installed.
"""

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

STRIPE_API_BASE = "https://api.stripe.com/v1"

# Created by scripts/create_test_seller_account.py for the fictional seller
# "Test Seller Co." — override with CONNECTED_ACCOUNT_ID for a different one.
DEFAULT_CONNECTED_ACCOUNT_ID = "acct_1UGjwk3hSh9OlyBt"

REFRESH_URL = "https://example.com/reauth"
RETURN_URL = "https://example.com/return"


def create_account_link(secret_key: str, account_id: str) -> dict:
    params = {
        "account": account_id,
        "type": "account_onboarding",
        "refresh_url": REFRESH_URL,
        "return_url": RETURN_URL,
    }
    data = urllib.parse.urlencode(params).encode("utf-8")

    request = urllib.request.Request(f"{STRIPE_API_BASE}/account_links", data=data, method="POST")
    request.add_header("Authorization", f"Bearer {secret_key}")
    request.add_header("Content-Type", "application/x-www-form-urlencoded")

    try:
        with urllib.request.urlopen(request) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        print(f"Stripe API error ({e.code}):\n{body}", file=sys.stderr)
        sys.exit(1)


def main():
    secret_key = os.environ.get("STRIPE_SECRET_KEY")
    if not secret_key:
        print("Set STRIPE_SECRET_KEY in your environment before running this script.", file=sys.stderr)
        sys.exit(1)
    if not secret_key.startswith("sk_test_"):
        print("Refusing to run: this script only accepts a Stripe TEST secret key (sk_test_...).", file=sys.stderr)
        sys.exit(1)

    account_id = os.environ.get("CONNECTED_ACCOUNT_ID", DEFAULT_CONNECTED_ACCOUNT_ID)
    link = create_account_link(secret_key, account_id)

    print(f"Onboarding link for {account_id} (expires in ~5 minutes, single-use):")
    print(link["url"])


if __name__ == "__main__":
    main()
