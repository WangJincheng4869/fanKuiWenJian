import type {
  NodeCandidate,
  NodeCandidateDepartment,
  NodeCandidateEmployee,
  NodeCandidateJobPosition,
  NodeCandidateRole,
  NodeCandidateSkill,
  NodeCandidateType,
} from '../types';

/** 节点候选者，这个类可以生成一个默认的节点候选者 */
export class DefaultNodeCandidate implements NodeCandidate {
  type: NodeCandidateType;
  employees: NodeCandidateEmployee[];
  departments: NodeCandidateDepartment[];
  skills: NodeCandidateSkill[];
  roles: NodeCandidateRole[];
  jobPositions: NodeCandidateJobPosition[];

  constructor() {
    this.type = 'employee';
    this.employees = [];
    this.departments = [];
    this.skills = [];
    this.roles = [];
    this.jobPositions = [];
  }
}
