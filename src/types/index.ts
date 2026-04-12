import type { ComponentType, SVGProps } from "react";

export interface RecommendedLocationItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
}
