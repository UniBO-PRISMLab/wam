export function trimFileExt(file: string): string {
  return file.replace(/\.[^/.]+$/, '');
}
