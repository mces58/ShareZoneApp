declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const SUPABASE_ANON_KEY: string;
  export const SUPABASE_PROJECT_URL: string;
}
