const screenWidthMediumMax = 768;
const screenWidthMobileMax = 992;

export interface ScreenSizeMonitorViewMode {
  screenSize?: number;
  isDesktop?: boolean;
  isTablet?: boolean;
  isMobile?: boolean;
}

export interface TripCardBreakPointConfig {
  mobileBreak?: number;
  tabletBreak?: number;
}

const defaultTripCardViewBreakPoints: TripCardBreakPointConfig = {
  mobileBreak: screenWidthMediumMax,
  tabletBreak: screenWidthMobileMax
};

export function getScreenSizeViewMode(screenSize: number, breaks?: TripCardBreakPointConfig): ScreenSizeMonitorViewMode {
  breaks = { ...defaultTripCardViewBreakPoints, ...breaks };

  return screenSize < breaks.mobileBreak
    ? { screenSize, isMobile: true }
    : (screenSize < breaks.tabletBreak ? { screenSize, isTablet: true } : { screenSize, isDesktop: true });
}
