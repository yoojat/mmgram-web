import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    accent: string;
    borderColor: string;
    bgColor: string;
    fontColor: string;
  }
}
