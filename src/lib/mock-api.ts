import delay from 'delay';
import { features, modelMetadata } from './data';
import { ICrNode, IModelMetadata } from './types';

export async function fetchFeatures(): Promise<Array<ICrNode>> {
  await delay(1500);

  return features;
}

export async function fetchModelMetadata(): Promise<IModelMetadata> {
    await delay(1500);
  
    return modelMetadata;
  }
  
