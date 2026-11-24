import * as allure from 'allure-js-commons';

export type AllureSeverity = 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';

export interface AllureMeta {
  epic: string;
  feature: string;
  story?: string;
  severity?: AllureSeverity;
  owner?: string;
  /** Test case id (added as a custom label for traceability) */
  testId?: string;
  tags?: string[];
}

/**
 * Applies Allure metadata in one call so every spec stays consistent.
 * Call it at the top of a test body.
 */
export async function applyAllureMeta(meta: AllureMeta): Promise<void> {
  await allure.epic(meta.epic);
  await allure.feature(meta.feature);
  if (meta.story) await allure.story(meta.story);
  await allure.severity(meta.severity ?? 'normal');
  if (meta.owner) await allure.owner(meta.owner);
  if (meta.testId) await allure.label('testId', meta.testId);
  if (meta.tags?.length) await allure.tags(...meta.tags);
}
