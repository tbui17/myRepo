import json, os

page_dir_path = "../resources/pages"
source_file_name = "dev_cs_fields.JSON"
python_file_name = "dev_cs_fields.py"
python_dict_name = "fields"


os.chdir(page_dir_path)

with open(source_file_name) as json_file:
    json_contents = json.load(json_file)
with open(python_file_name, "w") as f:
    for word in json_contents:
        print(word)
        f.write(f"{word.upper()}='{word}'\n")
print(f"{python_file_name} successfully written to {os.getcwd()}")
