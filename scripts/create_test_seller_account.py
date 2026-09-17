#!/usr/bin/env python3
"""Create a Stripe Connect Express-style account for a fictional test seller.

Uses the Stripe Accounts v2 API (v1 account creation is deprecated for new
Connect integrations as of 2026). The secret key is read from the
STRIPE_SECRET_KEY environment variable — never hardcode it here, pass it on
the command line, or commit it anywhere. Only Stripe TEST keys (sk_test_...)
are accepted; the script refuses to run against a live key.

Usage:
    STRIPE_SECRET_KEY=sk_test_... python3 scripts/create_test_seller_account.py

No third-party packages are required (uses only the standard library), since
this environment doesn't have the Stripe SDK or `requests` installed.
"""

import json
import os
import sys
import urllib.error
import urllib.request

STRIPE_API_BASE = "https://api.stripe.com/v2/core/accounts"
STRIPE_VERSION = "2026-08-26.dahlia"
SELLER_NAME = "Test Seller Co."


def create_express_account(secret_key: str) -> dict:
    body = {
        "display_name": SELLER_NAME,
        "dashboard": "express",
        "identity": {
            "country": "us",
            "entity_type": "company",
            "business_details": {"registered_name": SELLER_NAME},
        },
        "defaults": {
            "responsibilities": {
                "fees_collector": "application",
                "losses_collector": "application",
            },
        },
        "configuration": {
            "merchant": {
                "capabilities": {
                    "card_payments": {"requested": True},
                },
            },
            # Needed to *receive* transferred funds (e.g. from a destination
            # charge) — without this, checkout scripts fail with
            # insufficient_capabilities_for_transfer even after the account
            # completes onboarding for card_payments alone.
            "recipient": {
                "capabilities": {
                    "stripe_balance": {"stripe_transfers": {"requested": True}},
                },
            },
        },
        "include": ["configuration.merchant", "configuration.recipient", "identity", "defaults"],
    }
    data = json.dumps(body).encode("utf-8")

    request = urllib.request.Request(STRIPE_API_BASE, data=data, method="POST")
    request.add_header("Authorization", f"Bearer {secret_key}")
    request.add_header("Stripe-Version", STRIPE_VERSION)
    request.add_header("Content-Type", "application/json")

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

    account = create_express_account(secret_key)
    print(f'Created Express account for "{SELLER_NAME}"')
    print(f"Account ID: {account['id']}")
    print(
        "\nThis account can't receive money yet — it still needs onboarding "
        "(business/representative details, a bank account, etc.), same as any "
        "new Connect account. Run scripts/create_onboarding_link.py "
        f"(with CONNECTED_ACCOUNT_ID={account['id']} if it differs from the "
        "default) and complete the hosted flow before using this account in "
        "scripts/create_test_checkout_session.py."
    )


if __name__ == "__main__":
    main()
