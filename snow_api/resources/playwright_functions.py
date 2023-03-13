from typing import Any
from playwright.sync_api import sync_playwright
from playwright import sync_api
from configs import uconfigs

def get_pw_request_api():

    domain_name = uconfigs.base_url
    portNumber: str = "9222"

    playwright = sync_playwright().start()
    browser = playwright.chromium.connect_over_cdp(f"http://localhost:{portNumber}")

    context = browser.contexts[0]
    snow_page: sync_api.Page = [
        page for page in context.pages if domain_name in page.url
    ][0]
    try:
        g_ck = snow_page.evaluate("g_ck")
    except ReferenceError:
        print(
            "g_ck not defined selected page for playwright cdp may not be snow page"
        )
    context.set_extra_http_headers({'X-UserToken':g_ck})
    return context.request



def get_auth_and_cookies() -> Any:
    domain_name = uconfigs.base_url
    portNumber: str = "9222"

    playwright = sync_playwright().start()
    browser = playwright.chromium.connect_over_cdp(f"http://localhost:{portNumber}")

    context = browser.contexts[0]
    all_cookies = context.cookies()
    snowdomaincookies = [
        cookie for cookie in all_cookies if cookie["domain"] in domain_name
    ]
    snow_page: sync_api.Page = [
        page for page in context.pages if domain_name in page.url
    ][0]
    try:
        g_ck = snow_page.evaluate("g_ck")
    except ReferenceError:
        print(
            "g_ck not defined selected page for playwright cdp may not be snow page"
        )
    head1 = sync_api
    state1 = context.storage_state(path='state.json')
    playwright.stop()
        
        
        
    headers_dict:dict = {
        "X-UserToken": g_ck,
        "content-type": "application/json",
        "accepts": "application/json",
    }
    
    
    
    # for cookie in snowdomaincookies:
    #     name1 = cookie.pop('name')
    #     Cookie.objects.update_or_create(name=name1, defaults=dict(cookie))
        
    
    # Header.objects.update_or_create(name='snow_headers',value=headers_dict)
    
    