import * as React from "react";
const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M15 5H9v2H5v2H3v2H1v6h2v2h2v-2H3v-6h2V9h4V7h6V5zm8 6h-2v6h-2v2h2v-2h2v-6zm-13 2h4v4h-4v-4zm6-2h-2v2h2v-2zm2-2v2h-2V9h2zm0 0V7h2v2h-2z"
      fill="currentColor"
    />
  </svg>
);
export default SVGComponent;
