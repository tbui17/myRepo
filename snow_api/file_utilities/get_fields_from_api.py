from resources.request_setup import TableApiWorker

worker: TableApiWorker = TableApiWorker(url="https://dev40853.service-now.com/api/now/table/sn_customerservice_case/d142259147592110c78e5e52e36d43c9",table_name='sn_customerservice_case')

entries = worker.get_by_number('CS0001001')
fields = entries.items()
import json, os

page_dir_path = "resources/pages"
python_file_name = "dev_cs_fields2.py"


os.chdir(page_dir_path)

with open(python_file_name, 'w') as f:
    sortlist = []
    for k,v in fields:
        sortlist.append(k)
    sortlist.sort()
    for u in sortlist:
        f.write(f'{u.upper()}="{u}"\n')
print(f"{python_file_name} successfully written to {os.getcwd()}")