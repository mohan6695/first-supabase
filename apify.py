from apify_client import ApifyClient

# Initialize the ApifyClient with your API token
client = ApifyClient("apify_api_U9PL1rkFty3clG3kyOo1yQckkgztPF3NAoCZ")

# Prepare the Actor input
run_input = {
    "anticaptchaKey": "bf98d32422747472501a9e72525ff411",
    "imap": {
        "user": "",
        "password": "",
        "host": "imap.gmail.com",
        "port": 993,
        "tls": True,
        "mailbox": "INBOX"
    },
    "password": "Nmknmk33@@",
    "proxyConfiguration": {
        "useApifyProxy": True,
        "apifyProxyGroups": [
            "RESIDENTIAL"
        ]
    },
    "timeout": 600,
    "username": "varunchinna5966@gmail.com"
}

# Run the Actor and wait for it to finish
run = client.actor("o2bTUjkGaxB6HCypr").call(run_input=run_input)
client.run(run["id"]).wait_for_finish()

# Fetch and print Actor results from the run's dataset (if there are any)
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)