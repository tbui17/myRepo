import json
from playwright.sync_api import sync_playwright
from playwright import sync_api
from .common_utils import get_configs
from pathlib import Path

configs = get_configs()


def get_auth_and_cookies():
    domain_name = configs["base_url"]
    options = []
    options.append("--profile-directory=Default")
    portNumber: str = "9222"

    with sync_playwright() as playwright:

        browser = playwright.chromium.connect_over_cdp(f"http://localhost:{portNumber}")

        context = browser.contexts[0]

        all_cookies = context.cookies()
        snow_cookies = [
            cookie for cookie in all_cookies if cookie["domain"] in domain_name
        ]
        cookies_dict = {}
        for cookie_entry in snow_cookies:
            cookies_dict[cookie_entry["name"]] = cookie_entry["value"]

        snow_page: sync_api.Page = [
            page for page in context.pages if domain_name in page.url
        ][0]
        try:
            g_ck = snow_page.evaluate("g_ck")
        except ReferenceError:
            print(
                "g_ck not defined selected page for playwright cdp may not be snow page"
            )
    try:
        cookies_dict[configs['cookie_variable']]
    except KeyError:
        print(
            f"(pw get cookies) Key error {configs['cookie_variable']} not found. Client may not be connected to snow."
        )

    # results_dict = {}
    # results_dict["g_ck"] = g_ck
    # results_dict["cookies_dict"] = cookies_dict
    headers_dict = {}
    # headers_dict['Cookie'] = cookies_dict
    headers_dict["X-UserToken"] = g_ck
    headers_dict["content-type"] = "application/json"
    headers_dict["accepts"] = "application/json"
    info_dict = {"headers": headers_dict, "cookies": cookies_dict}
    path = Path(__file__).parent / "configs.json"
    with open(path, "r") as f:
        json_data = json.load(f)
        json_data['headers'] = headers_dict
        json_data['cookies'] = cookies_dict
    with open(path, "w") as f:
        json.dump(json_data, f, indent=2)
