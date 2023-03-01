from resources.request_setup import TableApi
from resources.playwright_get_cookies import get_auth_and_cookies
from small_scripts import general


def main():
    get_auth_and_cookies()

if __name__ == "__main__":
    main()
