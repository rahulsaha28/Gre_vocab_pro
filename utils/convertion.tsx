export function convertMathToHTML(input: string): string {
  // Handle block-level \[ \] equations

  let output = input.replace(/\\\[([\s\S]*?)\\\]/g, (_, equation) => {
    return `<div class="math-block">${convertInlineMath(equation)}</div>`;
  });

  // Handle inline \( \) equations
  output = output.replace(/\\\(([\s\S]*?)\\\)/g, (_, equation) => {
    return `<span class="math-inline">${convertInlineMath(equation)}</span>`;
  });

  // Handle boxed answers
  output = output.replace(
    /\\boxed{([^}]*)}/g,
    '<span class="math-boxed">$1</span>'
  );

  output = output.replace(
    /\\text{([^}]*)}/g,
    '<span class="math-text">$1</span>'
  );

  output = output.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // content = content.replace(/^### (.*$)/gm, '<h3>$1</h3>');

  output = output.replace(/^### (.*$)/gm, '<h3 class="solution-step">$1</h3>');

  output = output.replace(
    /^-\s*\*\*(.*?):\*\*/gm,
    '<h4 class="contract-label">$1:</h4>'
  );

  output = output.replace(/\\log/g, "log");
  output = output.replace(/\\ln/g, "ln");
  output = output.replace(/\\log_{(\d+)}/g, "log<sub>$1</sub>");
  output = output.replace(/\\left\(/g, "(");
  output = output.replace(/\\right\)/g, ")");
  output = output.replace(
    /\\frac\{(.*?)\}\{(.*?)\}/g,
    '<span class="math-frac"><span class="frac-top">$1</span><span class="frac-bottom">$2</span></span>'
  );
  output = output.replace(
    /\\sqrt\{(.+?)\}/g,
    '<span class="math-sqrt">√<span class="math-radical">$1</span></span>'
  );

  output = output.replace(/(\d+)\^(\d+)/g, "$1<sup>$2</sup>");
  output = output.replace(/([a-zA-Z])_([a-zA-Z0-9]+)/g, "$1<sub>$2</sub>");
  output = output.replace(/\\quad/g, "&emsp;");
  output = output.replace(/(\d+)\\?^\s*\\?circ/g, "$1°");

  return output;
}

function convertInlineMath(equation: string): string {
  // Handle superscripts
  equation = equation.replace(/(\w+)\^\{([^}]+)\}/g, "$1<sup>$2</sup>");
  equation = equation.replace(/(\w+)\^(\w)/g, "$1<sup>$2</sup>");

  // Handle fractions (simple cases)
  equation = equation.replace(
    /\\frac{([^}]+)}{([^}]+)}/g,
    '<span class="math-frac"><span class="math-numerator">$1</span><span class="math-denominator">$2</span></span>'
  );

  // Handle Greek letters and common symbols
  const symbols: Record<string, string> = {
    alpha: "α",
    beta: "β",
    gamma: "γ",
    Delta: "Δ",
    delta: "δ",
    epsilon: "ε",
    zeta: "ζ",
    eta: "η",
    theta: "θ",
    lambda: "λ",
    mu: "μ",
    pi: "π",
    rho: "ρ",
    sigma: "σ",
    phi: "φ",
    omega: "ω",
    cdot: "·",
    times: "×",
    div: "÷",
    pm: "±",
    mp: "∓",
    leq: "≤",
    geq: "≥",
    neq: "≠",
    approx: "≈",
    infty: "∞",
    sum: "∑",
    prod: "∏",
    int: "∫",
    rightarrow: "→",
    Rightarrow: "⇒",
  };

  for (const [key, value] of Object.entries(symbols)) {
    // console.log(key, value);
    // equation = equation.replace(new RegExp(key, "g"), value);
    equation = equation.replace(/\\cdot|\cdot/g, "·");
    equation = equation.replace(/\\times|\times/g, "×");
    equation = equation.replace(/\\div|\div/g, "÷");
    equation = equation.replace(/\\pm|\pm/g, "±");
    equation = equation.replace(/\\mp|\mp/g, "∓");
    equation = equation.replace(/\\leq|\leq/g, "≤");
    equation = equation.replace(/\\geq|\geq/g, "≥");
    equation = equation.replace(/\\neq|\neq/g, "≠");
    equation = equation.replace(/\\approx|\approx/g, "≈");
    equation = equation.replace(/\\infty|\infty/g, "∞");
    equation = equation.replace(/\\sum|\sum/g, "∑");
    equation = equation.replace(/\\prod|\prod/g, "∏");
    equation = equation.replace(/\\int|\int/g, "∫");
    equation = equation.replace(/\\rightarrow|\rightarrow/g, "→");
    equation = equation.replace(/\\Rightarrow|\Rightarrow/g, "⇒");
    equation = equation.replace(/\\alpha|\alpha/g, "α");
    equation = equation.replace(/\\beta|\beta/g, "β");
    equation = equation.replace(/\\gamma|\gamma/g, "γ");
    equation = equation.replace(/\\Delta|\Delta/g, "Δ");
    equation = equation.replace(/\\delta|\delta/g, "δ");
    equation = equation.replace(/\\epsilon|\epsilon/g, "ε");
    equation = equation.replace(/\\zeta|\zeta/g, "ζ");
    equation = equation.replace(/\\eta|\eta/g, "η");
    equation = equation.replace(/\\theta|\theta/g, "θ");
    equation = equation.replace(/\\lambda|\lambda/g, "λ");
    equation = equation.replace(/\\mu|\mu/g, "μ");
    equation = equation.replace(/\\pi|\pi/g, "π");
    equation = equation.replace(/\\rho|\rho/g, "ρ");
    equation = equation.replace(/\\sigma|\sigma/g, "σ");
    equation = equation.replace(/\\phi|\phi/g, "φ");
    equation = equation.replace(/\\omega|\omega/g, "ω");
    equation = equation.replace(/\\%|\%/g, "%");
    equation = equation.replace(/(\d+)\s*\\?\^\s*\\?circ\b/g, "$1°");
    equation = equation.replace(
      /\\binom\{([^}]+)\}\{([^}]+)\}/g,
      '<span class="binom"><span>$1</span><span>$2</span></span>'
    );

    console.log(value, equation);
  }

  return equation;
}
