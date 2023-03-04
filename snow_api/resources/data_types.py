from dataclasses import dataclass
from typing import TypedDict

import requests


class JsonFail(TypedDict):
    error:dict
    status:str

class JsonSingle(TypedDict):
    result:dict

class JsonMultiple(TypedDict):
    result:list

class FieldResp(TypedDict):
    display_value:str
    value:str

class CsResp(TypedDict):
    active: FieldResp
    activity_due: FieldResp
    additional_assignee_list: FieldResp
    approval: FieldResp
    approval_history: FieldResp
    approval_set: FieldResp
    assigned_to: FieldResp
    assignment_group: FieldResp
    business_duration: FieldResp
    business_service: FieldResp
    calendar_duration: FieldResp
    close_notes: FieldResp
    closed_at: FieldResp
    closed_by: FieldResp
    cmdb_ci: FieldResp
    comments: FieldResp
    comments_and_work_notes: FieldResp
    company: FieldResp
    contact_type: FieldResp
    contract: FieldResp
    correlation_display: FieldResp
    correlation_id: FieldResp
    delivery_plan: FieldResp
    delivery_task: FieldResp
    description: FieldResp
    due_date: FieldResp
    escalation: FieldResp
    expected_start: FieldResp
    follow_up: FieldResp
    group_list: FieldResp
    impact: FieldResp
    knowledge: FieldResp
    location: FieldResp
    made_sla: FieldResp
    number: FieldResp
    opened_at: FieldResp
    opened_by: FieldResp
    order: FieldResp
    parent: FieldResp
    priority: FieldResp
    reassignment_count: FieldResp
    route_reason: FieldResp
    service_offering: FieldResp
    short_description: FieldResp
    skills: FieldResp
    sla_due: FieldResp
    state: FieldResp
    sys_class_name: FieldResp
    sys_created_by: FieldResp
    sys_created_on: FieldResp
    sys_domain: FieldResp
    sys_domain_path: FieldResp
    sys_id: FieldResp
    sys_mod_count: FieldResp
    sys_tags: FieldResp
    sys_updated_by: FieldResp
    sys_updated_on: FieldResp
    task_effective_number: FieldResp
    time_worked: FieldResp
    universal_request: FieldResp
    upon_approval: FieldResp
    upon_reject: FieldResp
    urgency: FieldResp
    user_input: FieldResp
    watch_list: FieldResp
    work_end: FieldResp
    work_notes: FieldResp
    work_notes_list: FieldResp
    work_start: FieldResp
    
    
class TaskResp(TypedDict):
    parent: FieldResp 
    made_sla: FieldResp 
    watch_list: FieldResp 
    upon_reject: FieldResp 
    sys_updated_on: FieldResp 
    task_effective_number: FieldResp 
    approval_history: FieldResp 
    skills: FieldResp 
    number: FieldResp 
    sys_updated_by: FieldResp 
    opened_by: FieldResp 
    user_input: FieldResp 
    sys_created_on: FieldResp 
    sys_domain: FieldResp 
    state: FieldResp 
    route_reason: FieldResp 
    sys_created_by: FieldResp 
    knowledge: FieldResp 
    order: FieldResp 
    closed_at: FieldResp 
    cmdb_ci: FieldResp 
    delivery_plan: FieldResp 
    contract: FieldResp 
    impact: FieldResp 
    active: FieldResp 
    work_notes_list: FieldResp 
    business_service: FieldResp 
    priority: FieldResp 
    sys_domain_path: FieldResp 
    time_worked: FieldResp 
    expected_start: FieldResp 
    opened_at: FieldResp 
    business_duration: FieldResp 
    group_list: FieldResp 
    work_end: FieldResp 
    approval_set: FieldResp 
    work_notes: FieldResp 
    universal_request: FieldResp 
    short_description: FieldResp 
    correlation_display: FieldResp 
    delivery_task: FieldResp 
    work_start: FieldResp 
    assignment_group: FieldResp 
    additional_assignee_list: FieldResp 
    description: FieldResp 
    calendar_duration: FieldResp 
    close_notes: FieldResp 
    service_offering: FieldResp 
    sys_class_name: FieldResp 
    closed_by: FieldResp 
    follow_up: FieldResp 
    sys_id: FieldResp 
    contact_type: FieldResp 
    urgency: FieldResp 
    company: FieldResp 
    reassignment_count: FieldResp 
    activity_due: FieldResp 
    assigned_to: FieldResp 
    comments: FieldResp 
    approval: FieldResp 
    sla_due: FieldResp 
    comments_and_work_notes: FieldResp 
    due_date: FieldResp 
    sys_mod_count: FieldResp 
    sys_tags: FieldResp 
    escalation: FieldResp 
    upon_approval: FieldResp 
    correlation_id: FieldResp 
    location: FieldResp
