export const languages = [
  {
    name: 'JavaScript',
    value: 'javascript',
    version: '18.15.0',
    sampleCode: `// write your code here\n\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  },
  {
    name: 'TypeScript',
    value: 'typescript',
    version: '5.0.3',
    sampleCode: `// write your code here\n\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  },
  {
    name: 'Python',
    value: 'python',
    version: '3.10.0',
    sampleCode: `# write your code here\n\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  },
  {
    name: 'C#',
    value: 'csharp',
    version: '6.12.0',
    sampleCode: `// write your code here\n\nusing System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n`,
  },
  {
    name: 'Java',
    value: 'java',
    version: '15.0.2',
    sampleCode: `// write your code here\n\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  },
  {
    name: 'PHP',
    value: 'php',
    version: '8.2.3',
    sampleCode: `// write your code here\n\n<?php\n\n$name = 'Alex';\necho $name;\n`,
  },
];
