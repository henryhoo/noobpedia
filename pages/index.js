import React, { useRef } from "react";
import styles from "styles/Home.module.css";
import Tree from "components/knowledgeTree";

const myTreeData = [
  {
    name: "Computer Science",
    resources: [
      {
        name: "introduction",
        link: "https://www.w3schools.com/html/html_links.asp",
        type: "video",
      },
    ],
    children: [
      {
        name: "Programming Language",
        resources: [
          {
            name: "introduction",
            link: "https://www.w3schools.com/html/html_links.asp",
            type: "video",
          },
        ],
        children: [
          {
            name: "Python",
            resources: [
              {
                name: "introduction",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
              {
                name: "in-depth",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
              {
                name: "expert",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "text",
              },
            ],
          },
          {
            name: "Java",
            resources: [
              {
                name: "introduction",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
              {
                name: "in-depth",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
              {
                name: "expert",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "text",
              },
            ],
          },
        ],
      },
      {
        name: "Data Structure",
        resources: [
          {
            name: "introduction",
            link: "https://www.w3schools.com/html/html_links.asp",
            type: "video",
          },
        ],
        children: [
          {
            name: "Tree",
            resources: [
              {
                name: "introduction",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
              {
                name: "in-depth",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
              {
                name: "expert",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "text",
              },
            ],
          },
          {
            name: "LinkedList",
            resources: [
              {
                name: "introduction",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
              {
                name: "in-depth",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
              {
                name: "expert",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "text",
              },
            ],
          },
        ],
      },
      {
        name: "Command Line",
        resources: [
          {
            name: "introduction",
            link: "https://www.w3schools.com/html/html_links.asp",
            type: "video",
          },
        ],
        children: [
          {
            name: "Shell",
            resources: [
              {
                name: "what is a shell",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
            ],
          },
          {
            name: "Path",
            resources: [
              {
                name: "How to understand path",
                link: "https://www.w3schools.com/html/html_links.asp",
                type: "video",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function Home() {
  const targetRef = useRef(null);
  return (
    <div className={styles.container} ref={targetRef}>
      <h1> Computer Science </h1>
      <Tree data={myTreeData} targetRef={targetRef} />
    </div>
  );
}
