from resources.table_enumerators import SysUserEnums as sysen
base_url = "https://dev40853.service-now.com"
assigned_to_default = "Don Goodliffe"
assignment_group_default = "Hardware"
email_api = "/api/x_980299_a1/asdflow"
filters = [
    "junk@mail.com",
    "missingmail@mail.com",
]

default_params_post = {
    "sysparm_display_value": "true",
    "sysparm_input_display_value": "true",
}
display_value_default = 'true'
default_new_post_body = {
                'assigned_to': assigned_to_default,
                'assignment_group': assignment_group_default,
            }
