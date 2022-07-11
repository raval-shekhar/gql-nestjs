import { css, CSSObject } from "styled-components";

type Breakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export const sizes: Breakpoints = {
  xs: 479,
  sm: 575,
  md: 767,
  lg: 991,
  xl: 1199,
};

const initAcc: Interpolation<Breakpoints> = {
  xs: () => "",
  sm: () => "",
  md: () => "",
  lg: () => "",
  xl: () => "",
};

type BreakpointEntry = [keyof Breakpoints, Breakpoints[keyof Breakpoints]];
type Interpolation<T> = {
  [key in keyof T]:
    | ((
        first: CSSObject | TemplateStringsArray,
        ...interpolations: any[]
      ) => any)
    | (() => string);
};

interface CustomObject extends ObjectConstructor {
  entries<K extends keyof Breakpoints, T>(
    o: { [s in K]: T } | ArrayLike<T>
  ): [K, T][];
}

const object: CustomObject = Object;

export const respondTo = object
  .entries(sizes)
  .reduce<Interpolation<Breakpoints>>((acc, cur: BreakpointEntry) => {
    const [key, value] = cur;
    acc[key] = (first, ...interpolations) =>
      css`
        @media (max-width: ${value}px) {
          ${css(first, ...interpolations)}
        }
      `;

    return acc;
  }, initAcc);

// export const respondTo = Object.keys(breakpoints).reduce(
//   (accumulator, label) => {
//     accumulator[label] = (...args: any) => css`
//       @media (max-width: ${breakpoints[label]}) {
//         ${css(...args)};
//       }
//     `;
//     return accumulator;
//   },
//   {},
// );
