import dynamic from "next/dynamic";

const Tree = dynamic(() => import("react-d3-tree"), {
  ssr: false,
});

export default Tree;
