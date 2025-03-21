
export interface HeaderProps {
  onViewportChange?: (viewport: 'desktop' | 'tablet' | 'mobile') => void;
  onWidthChange?: (width: string) => void;
  viewportSize?: 'desktop' | 'tablet' | 'mobile';
  selectedWidth?: string;
  onUndo?: () => void;
  onSave?: () => void;
}
