import requests
from resources import functs, constants


def main():
    resp = requests.get(
        "https://api.agify.io/",
        headers={
            "content-type": "application/json",
            "X-UserToken": constants.gck,
        },
        params={
            "name": "john",
        },
    )
    print(resp.text)


if __name__ == "__main__":
    main()
