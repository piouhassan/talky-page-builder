
export interface HeaderProps {
  onViewportChange?: (size: 'desktop' | 'tablet' | 'mobile') => void;
  onWidthChange?: (width: string) => void;
  viewportSize?: 'desktop' | 'tablet' | 'mobile';
  selectedWidth?: string;
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onMediaLibraryOpen?: () => void;
}
