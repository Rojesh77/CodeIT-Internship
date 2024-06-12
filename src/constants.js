export const LANGUAGE_VERSIONS = {
  javascript : "18.15.0",
  typescript : "5.0.3" ,
  python : "3.10.0",
  php : "8.2.3",
  dart : "2.x",
}

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Discover your capacity with CodeIT");\n`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Discover your capacity with CodeIT" });\n`,
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Discover your capacity with CodeIT")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Discover your capacity with CodeIT");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Discover your capacity with CodeIT");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Discover your capacity with CodeIT';\necho $name;\n",
  dart: `void main() {\n\tString name = 'Discover your capacity with CodeIT';\n\tprint(name);\n}\n`,

};
