declare module '*.png';

declare module '*.jpg';

declare module '*.svg' {
    import { BoxProps } from '@mui/material/Box';
    const Svg: React.FC<BoxProps<'svg'>>;
    export default Svg;
}

declare module '*.svg?url';
