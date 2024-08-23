const i18nData = {
  zhCN: {
    multiInstanceType: '多任务处理方式',
    singletonDescribe: '竞签：任意一人处理完成即可到下一节点',
    parallelDescribe: '并签：多人同时处理，全部或超过设定比例通过后可到下一节点',
    sequentialDescribe: '串签：多人按序逐个处理，全部或超过设定比例通过后可到下一节点',
    nodeCandidateType: '候选者类型',
    loopCardinality: '最大任务数',
    completionCondition: '完成条件',
  },
  en: {
    multiInstanceType: 'Multi instance type',
    singletonDescribe: 'Singleton: Any one person can complete the processing and move on to the next node',
    parallelDescribe:
      'Parallel: Multiple people processing simultaneously, all or exceeding the set proportion can be passed to the next node',
    sequentialDescribe:
      'Sequential: Multiple people are processed one by one in order, and after passing all or exceeding the set proportion, they can proceed to the next node',
    nodeCandidateType: 'Candidate type',
    loopCardinality: 'Loop cardinality',
    completionCondition: 'Completion condition',
  },
};

/**
 * 流程编辑器配置面板多语言处理
 */
export function useFlowSettingPanelI18n() {

  return { i18nData: i18nData.zhCN };
}
