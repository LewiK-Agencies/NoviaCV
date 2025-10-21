import { ResumeData, ResumeCustomization } from '../types/resume';

const RESUME_DATA_KEY = 'resumeBuilderData';
const CUSTOMIZATION_KEY = 'resumeCustomization';
const PAYMENT_STATUS_KEY = 'paymentCompleted';

export const saveResumeData = (data: ResumeData): void => {
  try {
    localStorage.setItem(RESUME_DATA_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save resume data:', error);
  }
};

export const loadResumeData = (): ResumeData | null => {
  try {
    const data = localStorage.getItem(RESUME_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load resume data:', error);
    return null;
  }
};

export const saveCustomization = (customization: ResumeCustomization): void => {
  try {
    localStorage.setItem(CUSTOMIZATION_KEY, JSON.stringify(customization));
  } catch (error) {
    console.error('Failed to save customization:', error);
  }
};

export const loadCustomization = (): ResumeCustomization | null => {
  try {
    const data = localStorage.getItem(CUSTOMIZATION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load customization:', error);
    return null;
  }
};

export const setPaymentCompleted = (): void => {
  localStorage.setItem(PAYMENT_STATUS_KEY, 'true');
};

export const hasCompletedPayment = (): boolean => {
  return localStorage.getItem(PAYMENT_STATUS_KEY) === 'true';
};

export const clearPaymentStatus = (): void => {
  localStorage.removeItem(PAYMENT_STATUS_KEY);
};
