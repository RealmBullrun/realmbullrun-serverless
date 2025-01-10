import MobileDetect from 'mobile-detect';

export const isMobileDevice = (userAgent: any) => {
  const md = new MobileDetect(userAgent);
  return !!md.mobile();
};