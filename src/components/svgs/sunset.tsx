import * as React from "react";
const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M18 2h-8v2H8v2H6v4h2V6h2V4h4v2h-2v4h2v2h4v-2h2v4h-2v2h2v-2h2V6h-2v2h-2v2h-4V6h2V4h2V2ZM8 14v-2h4v2H8Zm0 2v-2H4v2H2v4h2v2h10v-2h2v-4h-2v-2h-2v2h2v4H4v-4h4Zm0 0h2v2H8v-2Z" />
  </svg>
);
export default SVGComponent;
