import { ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";

interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export const Container = ({
  children,
  className = "",
  ...rest
}: ContainerProps) => {
  return (
    <div {...rest} className={`mx-auto w-full max-w-5xl px-4 ${className}`}>
      {children}
    </div>
  );
};
