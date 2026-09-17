#!/usr/bin/env python3
"""Create a test Stripe Checkout Session for a purchase from a connected
seller account (a Connect "destination charge").

Funds from the payment settle on the connected account (CONNECTED_ACCOUNT_ID
below — defaults to the "Test Seller Co." account from
create_test_seller_account.py), minus an application fee that stays on the
platform account whose secret key is used to run this script.

The secret key is read from the STRIPE_SECRET_KEY environment variable —
never hardcode it here, pass it on the command line, or commit it anywhere.
Only Stripe TEST keys (sk_test_...) are accepted; the script refuses to run
against a live key.

Usage:
    STRIPE_SECRET_KEY=sk_test_... python3 scripts/create_test_checkout_session.py

Override the connected account or product details with env vars:
    CONNECTED_ACCOUNT_ID, PRODUCT_NAME, UNIT_AMOUNT_CENTS, APPLICATION_FEE_CENTS

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
# "Test Seller Co." — override with CONNECTED_ACCOUNT_ID if testing a
# different connected account.
DEFAULT_CONNECTED_ACCOUNT_ID = "acct_1UGjwk3hSh9OlyBt"

DEFAULT_PRODUCT_NAME = "Test Product"
DEFAULT_UNIT_AMOUNT_CENTS = 2000  # $20.00
DEFAULT_APPLICATION_FEE_CENTS = 200  # $2.00 platform fee (10% of the above)

SUCCESS_URL = "https://example.com/success?session_id={CHECKOUT_SESSION_ID}"
CANCEL_URL = "https://example.com/cancel"


def create_checkout_session(secret_key: str, connected_account_id: str, product_name: str,
                             unit_amount_cents: int, application_fee_cents: int) -> dict:
    params = {
        "mode": "payment",
        "success_url": SUCCESS_URL,
        "cancel_url": CANCEL_URL,
        "line_items[0][quantity]": "1",
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][unit_amount]": str(unit_amount_cents),
        "line_items[0][price_data][product_data][name]": product_name,
        "payment_intent_data[transfer_data][destination]": connected_account_id,
        "payment_intent_data[application_fee_amount]": str(application_fee_cents),
    }
    data = urllib.parse.urlencode(params).encode("utf-8")

    request = urllib.request.Request(f"{STRIPE_API_BASE}/checkout/sessions", data=data, method="POST")
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

    connected_account_id = os.environ.get("CONNECTED_ACCOUNT_ID", DEFAULT_CONNECTED_ACCOUNT_ID)
    product_name = os.environ.get("PRODUCT_NAME", DEFAULT_PRODUCT_NAME)
    unit_amount_cents = int(os.environ.get("UNIT_AMOUNT_CENTS", DEFAULT_UNIT_AMOUNT_CENTS))
    application_fee_cents = int(os.environ.get("APPLICATION_FEE_CENTS", DEFAULT_APPLICATION_FEE_CENTS))

    session = create_checkout_session(
        secret_key, connected_account_id, product_name, unit_amount_cents, application_fee_cents
    )

    print(f'Created Checkout Session for "{product_name}" (${unit_amount_cents / 100:.2f})')
    print(f"Seller (connected account): {connected_account_id}")
    print(f"Platform fee: ${application_fee_cents / 100:.2f}")
    print(f"Session ID: {session['id']}")
    print(f"Checkout URL: {session['url']}")


if __name__ == "__main__":
    main()
