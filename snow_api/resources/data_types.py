from dataclasses import dataclass
from typing import TypedDict

import requests


class JsonFail(TypedDict):
    error: dict
    status: str


class JsonSingle(TypedDict):
    result: dict


class JsonMultiple(TypedDict):
    result: list


class FieldResp(TypedDict):
    display_value: str
    value: str

@dataclass
class CsTicket:
    active: str
    activity_due: str
    additional_assignee_list: str
    approval: str
    approval_history: str
    approval_set: str
    assigned_to: str
    assignment_group: str
    business_duration: str
    business_service: str
    calendar_duration: str
    close_notes: str
    closed_at: str
    closed_by: str
    cmdb_ci: str
    comments: str
    comments_and_work_notes: str
    company: str
    contact_type: str
    contract: str
    correlation_display: str
    correlation_id: str
    delivery_plan: str
    delivery_task: str
    description: str
    due_date: str
    escalation: str
    expected_start: str
    follow_up: str
    group_list: str
    impact: str
    knowledge: str
    location: str
    made_sla: str
    number: str
    opened_at: str
    opened_by: str
    order: str
    parent: str
    priority: str
    reassignment_count: str
    route_reason: str
    service_offering: str
    short_description: str
    skills: str
    sla_due: str
    state: str
    sys_class_name: str
    sys_created_by: str
    sys_created_on: str
    sys_domain: str
    sys_domain_path: str
    sys_id: str
    sys_mod_count: str
    sys_tags: str
    sys_updated_by: str
    sys_updated_on: str
    task_effective_number: str
    time_worked: str
    universal_request: str
    upon_approval: str
    upon_reject: str
    urgency: str
    user_input: str
    watch_list: str
    work_end: str
    work_notes: str
    work_notes_list: str
    work_start: str


@dataclass
class TaskResp:
    parent: str
    made_sla: str
    watch_list: str
    upon_reject: str
    sys_updated_on: str
    task_effective_number: str
    approval_history: str
    skills: str
    number: str
    sys_updated_by: str
    opened_by: str
    user_input: str
    sys_created_on: str
    sys_domain: str
    state: str
    route_reason: str
    sys_created_by: str
    knowledge: str
    order: str
    closed_at: str
    cmdb_ci: str
    delivery_plan: str
    contract: str
    impact: str
    active: str
    work_notes_list: str
    business_service: str
    priority: str
    sys_domain_path: str
    time_worked: str
    expected_start: str
    opened_at: str
    business_duration: str
    group_list: str
    work_end: str
    approval_set: str
    work_notes: str
    universal_request: str
    short_description: str
    correlation_display: str
    delivery_task: str
    work_start: str
    assignment_group: str
    additional_assignee_list: str
    description: str
    calendar_duration: str
    close_notes: str
    service_offering: str
    sys_class_name: str
    closed_by: str
    follow_up: str
    sys_id: str
    contact_type: str
    urgency: str
    company: str
    reassignment_count: str
    activity_due: str
    assigned_to: str
    comments: str
    approval: str
    sla_due: str
    comments_and_work_notes: str
    due_date: str
    sys_mod_count: str
    sys_tags: str
    escalation: str
    upon_approval: str
    correlation_id: str
    location: str
