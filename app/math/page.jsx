import Script from "next/script";
import Head from "next/head";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

// create a json lesson plan to solve linear equations
const lesson = {
  name: "Lesson 1",
  description: "Solve linear equations",
  problems: [
    {
      equation: "\\int \\sqrt{\\frac{1}{x}}\\, dx",
      solution: "x = 2.5",
      steps: [
        {
          description: "Subtract 5 from both sides",
          equation: "\\int \\sqrt{\\frac{1}{x}}\\, dx",
          block: true,
        },
        {
          description: "Divide both sides by 2",
          equation: "\\frac{2x}{2} = \\frac{5}{2}",
          block: true,
        },
        {
          description: "Simplify",
          equation: "x = 2.5",
          block: true,
        },
      ],
    },
    {
      equation: "3x - 2 = 7",
      solution: "x = 3",
      steps: [
        {
          description: "Add 2 to both sides",
          equation: "3x - 2 + 2 = 7 + 2",
          block: true,
        },
        {
          description: "Divide both sides by 3",
          equation: "\\frac{3x}{3} = \\frac{9}{3}",
          block: true,
        },
        {
          description: "Simplify",
          equation: "x = 3",
          block: true,
        },
      ],
    },
    {
      equation: "4x + 3 = 12",
      solution: "x = 3",
      steps: [
        {
          description: "Subtract 3 from both sides",
          equation: "4x + 3 - 3 = 12 - 3",
          block: true,
        },
        {
          description: "Divide both sides by 4",
          equation: "\\frac{4x}{4} = \\frac{9}{4}",
          block: true,
        },
        {
          description: "Simplify",
          equation: "x = 2.25",
          block: true,
        },
      ],
    },
  ],
};

export default async function Page() {
  return (
    <>
      <div className="min-h-screen">
        {/* <InlineMath>\int_0^\infty x^2 dx</InlineMath> */}
        <InlineMath>
          {"x^{2} - 7 x + 10 = \\left(x - 5\\right) \\left(x - 2\\right)"}
        </InlineMath>
        <BlockMath math="\int \sqrt{\frac{1}{x}}\, dx" />
        <BlockMath
          math="\left( \begin{array}{ccc|c}
            2 & 1 & 1 & 5 \\
            1 & -2 & -2 & 3
          \end{array} \right)"
        />

        <h1>{lesson.title}</h1>
        <h2>{lesson.description}</h2>
        {lesson.problems.map((problem) => (
          <div key={lesson.name}>
            <BlockMath math={problem.equation} />
            {problem.steps.map((step) => (
              <div key={step.description}>
                <p>{step.description}</p>
                {step.block ? (
                  <BlockMath>{step.equation}</BlockMath>
                ) : (
                  <InlineMath>{step.equation}</InlineMath>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
