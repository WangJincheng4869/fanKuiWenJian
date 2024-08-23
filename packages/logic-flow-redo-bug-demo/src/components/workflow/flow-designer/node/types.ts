import { type LogicFlow } from '@logicflow/core';

/**
 * 多实例循环特性类型
 *
 * ### singleton（单例、竟签）
 * 只会产生一个任务，只要有一人获取到任务执行后就可以流转到下一个节点、
 *
 * ### parallel（并行、并签）
 * 会产生多个任务，多人同时审批，全部或超过设定比例通过后可到下一节点
 *
 * ### sequential（串行、串签）
 * 会产生多个任务，多人按序逐个审批，全部或超过设定比例通过后可到下一节点
 */
export type MultiInstanceType = 'singleton' | 'parallel' | 'sequential';

/** 用户任务属性 */
export interface UserTaskProperties extends LogicFlow.PropertiesType {
  /** 节点产生任务实例的配置项 */
  taskInstance: TaskInstance;
  /** 节点候选者，可以是员工、部门、技能 */
  candidate: NodeCandidate;
  /** 当前节点表单控制信息 */
  formControls: Record<string, FormControl>;
}

/** 节点产生任务实例的配置项 */
export interface TaskInstance {
  /**
   * 多实例循环特性
   *
   * ### singleton（单例、竟签）
   * 只会产生一个任务，只要有一人获取到任务执行后就可以流转到下一个节点
   *
   * ### parallel（并行、并签）
   * 会产生多个任务，多人同时审批，全部或超过设定比例通过后可到下一节点
   *
   * ### sequential（串行、串签）
   * 会产生多个任务，多人按序逐个审批，全部或超过设定比例通过后可到下一节点
   */
  type: MultiInstanceType;
  /**
   * 循环基数，用于限制循环任务的数量（非 `singleton` 时可用）。可用变量：
   * - `nrOfLoops` - 循环数，即根据配置的候选人数量确定。
   */
  loopCardinality?: string;
  /**
   * 完成条件，当达到这个条件时任务将自动完成进入下一环节，剩余的任务实例将废弃（非 `singleton` 时可用）。 可用变量：
   * - `nrOfCompletedInstances` - 已完成实例数。
   * - `nrOfActiveInstances` - 活动的实例数。
   * - `nrOfInstances` - 产生的实例数。
   */
  completionCondition?: string;
}

/**
 * 节点候选者类型
 * - `employee` - 员工
 * - `department` - 部门
 * - `skill` - 技能
 * - `role` - 角色
 * - `jobPosition` - 岗位
 */
export type NodeCandidateType = 'employee' | 'department' | 'skill' | 'role' | 'jobPosition';

/** 节点候选者，可以是员工、部门、技能 */
export interface NodeCandidate {
  /**
   * 节点候选者类型
   * - `employee` - 员工
   * - `department` - 部门
   * - `skill` - 技能
   * - `role` - 角色
   * - `jobPosition` - 岗位
   */
  type: NodeCandidateType;
  /** 当 `type == employee` 存储员工信息 */
  employees?: NodeCandidateEmployee[];
  /** 当 `type == department` 存储部门信息 */
  departments?: NodeCandidateDepartment[];
  /** 当 `type == skill` 存储技能信息 */
  skills?: NodeCandidateSkill[];
  /** 当 `type == role` 存储角色信息 */
  roles?: NodeCandidateRole[];
  /** 当 `type == jobPosition `存储岗位信息 */
  jobPositions?: NodeCandidateJobPosition[];
}

/** 节点候选人的员工信息 */
export interface NodeCandidateEmployee {
  /** 员工主键id */
  id: number;
  /** 工号 */
  employeeNumber: string;
  /** 姓名 */
  employeeName: string;
}

/** 节点候选部门信息 */
export interface NodeCandidateDepartment {
  /** 部门主键id */
  id: number;
  /** 部门名称 */
  departmentName: string;
}

/** 节点候选技能信息 */
export interface NodeCandidateSkill {
  /** 技能主键id */
  id: number;
  /** 技能编码 */
  skillCode: string;
  /** 技能名称 */
  skillName: string;
}

/** 节点候选角色信息 */
export interface NodeCandidateRole {
  /** 角色主键id */
  id: number;
  /** 角色名称 */
  roleName: string;
}

/**
 * 岗位范围，当选择岗位后，可以选择不同的范围来限制受理人。这个非常有用，比如在请假流程中，首级审批人通常为发起人的部门领导。
 * - `startUserDepartment` - 发起人所在部门。
 * - `startUserSuperiorDepartment` - 发起人上级部门。
 * - `department` - 指定部门。
 * - `all` - 所有、不限制范围，只要是当前岗位的人员均可受理。
 */
export type NodeCandidateJobPositionScopeType =
  | 'startUserDepartment'
  | 'startUserSuperiorDepartment'
  | 'department'
  | 'all';

/** 节点候选岗位信息 */
export interface NodeCandidateJobPosition {
  /**
   * 岗位范围，当选择岗位后，可以选择不同的范围来限制受理人。这个非常有用，比如在请假流程中，首级审批人通常为发起人的部门领导。
   * - `startUserDepartment` - 发起人所在部门。
   * - `startUserSuperiorDepartment` - 发起人上级部门。
   * - `department` - 指定部门。
   * - `all` - 所有、不限制范围，只要是当前岗位的人员均可受理。
   */
  scope: NodeCandidateJobPositionScopeType;
  /** 岗位主键 id */
  jobPositionId: number;
  /** 岗位编码 */
  jobPositionCode: string;
  /** 岗位名称 */
  jobPositionName: string;
  /** 当范围为 `department` 时存贮范围部门的信息 */
  departments?: NodeCandidateDepartment[];
}

/** 用于控制表单内的字段、按钮等信息。在配置节点时，加载表单的 `json schema` 数据后，解析出表单字段信息，以设计中大纲树的模式进行字段权限配置。 */
export interface FormControl {
  /** 是否启用表单 */
  enabled?: boolean;
  /** 表单字段控制信息。使用表单唯一标识为 key 进行存储；表单 json schema 进行动态调整，利用字段的 `path` 信息并结合 [setFieldState](https://core.formilyjs.org/zh-CN/api/models/form#setformstate) 方法快速更新字段状态。 */
  formFields: Record<string, FormField>;
  /** 全部的按钮数组 */
  buttons?: Button[];
}

/** 表单字段 */
export interface FormField {
  /**
   * 字段的显示状态。
   *
   * - `none` - 全隐藏，删除数据
   * - `hidden` - 半隐藏，不会删除数据
   * - `visible` - 显示数据
   */
  display?: FormDisplayType;
  /**
   * 字段交互模式。
   *
   * - `editable` - 可编辑
   * - `disabled` - 禁用
   * - `readOnly` - 只读
   * - `readPretty` - 阅读模式
   */
  pattern?: FormPatternType;

  /** 字段数据路径的完整字符串，就是 [FormPath](https://core.formilyjs.org/zh-CN/api/entry/form-path) 的 `entire` 值。 */
  path?: string;
}

/**
 * 字段的显示状态。
 *
 * - `none` - 全隐藏，删除数据
 * - `hidden` - 半隐藏，不会删除数据
 * - `visible` - 显示数据
 */
export type FormDisplayType = 'none' | 'hidden' | 'visible';

/**
 * 字段交互模式。
 *
 * - `editable` - 可编辑
 * - `disabled` - 禁用
 * - `readOnly` - 只读
 * - `readPretty` - 阅读模式
 */
export type FormPatternType = 'editable' | 'disabled' | 'readOnly' | 'readPretty';

/** 按钮信息 */
export interface Button {
  /** 按钮展现的名字，默认会空，会根据类型自动显示名字 */
  name?: string;
  /**
   * 按钮类型
   *
   * | 类型     | 按钮名字 | 说明                                                   |
   * | -------- | -------- | ------------------------------------------------------ |
   * | save     | 保存     | 保存已认领任务的表单的数据，不会进行流转。             |
   * | complete | 完成     | 将当前任务设置为完成状态。                             |
   * | back     | 退回     | 退回到上一个节点。                                     |
   * | transfer | 转办     | 将当前任务转给其他人办理。                             |
   * | delegate | 委派     | 将当前任务委托给其他人办理，办理完成后会回到自己这里。 |
   * | revoke   | 撤回     | 完成任务后发现有错误需要修改，可以撤回修改后再提交。   |
   */
  type: ButtonType;
  /**
   * 是否启用按钮，不启用则不显示这个按钮
   * @default true
   */
  enabled: boolean;
  /**
   * 是否为下拉菜单项
   * @default false
   */
  dropdownItem?: boolean;

  /** 按钮动作数组。当点击按钮时，会触发动作。 */
  actions?: ButtonAction[];
}

/**
 * 按钮类型
 *
 * | 类型     | 按钮名字 | 说明                                                   |
 * | -------- | -------- | ------------------------------------------------------ |
 * | save     | 保存     | 保存已认领任务的表单的数据，不会进行流转。             |
 * | complete | 完成     | 将当前任务设置为完成状态。                             |
 * | back     | 退回     | 退回到上一个节点。                                     |
 * | transfer | 转办     | 将当前任务转给其他人办理。                             |
 * | delegate | 委派     | 将当前任务委托给其他人办理，办理完成后会回到自己这里。 |
 * | revoke   | 撤回     | 完成任务后发现有错误需要修改，可以撤回修改后再提交。   |
 */
export type ButtonType = 'save' | 'complete' | 'back' | 'transfer' | 'delegate' | 'revoke';

/** 按钮动作 */
export interface ButtonAction {
  /**
   * 动作类型，通过类型来区分点击按钮后的附加动作
   *
   * - `updateValue` - 修改表单的值，使用赋值表达式。
   */
  type: ButtonActionType;
  /** 动作的脚本，当点击按钮时，会执行该脚本。 */
  script: string;
}

/**
 * 动作类型，通过类型来区分点击按钮后的附加动作
 *
 * - `updateValue` - 修改表单的值，使用赋值表达式。
 */
export type ButtonActionType = 'updateValue';
