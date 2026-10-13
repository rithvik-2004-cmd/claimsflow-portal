import { USE_MOCKS } from '../constants/env';
import policiesData from '../mock-data/policies.json';
import apiClient from './apiClient';
import { notFound, withLatency } from './mockUtils';

// GET /policies
export async function getPolicies() {
  if (!USE_MOCKS) {
    const { data } = await apiClient.get('/policies');
    return data;
  }
  return withLatency(() => policiesData);
}

// GET /policies/:policyNumber
export async function getPolicyByNumber(policyNumber) {
  if (!USE_MOCKS) {
    const { data } = await apiClient.get(`/policies/${policyNumber}`);
    return data;
  }
  return withLatency(() => {
    const policy = policiesData.find(
      (item) => item.policyNumber.toLowerCase() === policyNumber.trim().toLowerCase(),
    );
    if (!policy) throw notFound('We could not find a policy with that number');
    return policy;
  }, 500);
}