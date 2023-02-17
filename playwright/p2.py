from resources import driver, pages
from playwright.sync_api import sync_playwright


# user-data-dir=C:\Users\PCS\AppData\Local\Google\Chrome\User Data
options = []
user_dir = ("C:/Users/PCS/AppData/Local/Google/Chrome/User Data")
options.append('--profile-directory=Default')

playwright = sync_playwright().start()


# browser = playwright.chromium.launch_persistent_context(user_dir, headless=False, args=options)
browser = playwright.chromium.connect_over_cdp("http://localhost:8955")

context1 = browser.contexts[0]

page1 = context1.pages[0]
# page1.goto("https://www.gstatic.com/cloud-site-ux/text_to_speech/text_to_speech.min.html")

page1.get_by_role("button", name="Audio device profile").click()