import { TemplateType } from "@prisma/client";

export { TemplateType };

export enum FrontendSubType {
  REACT = "React",
  ANGULAR = "Angular",
  VUE = "Vue",
  ASTRO = "Astro",
  SVELTE = "Svelte",
  OTHER = "Other",
}

export enum BackendSubType {
  NODEJS = "Node.js",
  RUBY = "Ruby",
  PYTHON = "Python",
  JAVA = "Java",
  GO = "Go",
  PHP = "PHP",
  OTHER = "Other",
}

export enum FullstackSubType {
  DJANGO = "Django",
  RAILS = "Rails",
  SPRING = "Spring",
  MERN = "MERN",
  MEAN = "MEAN",
  LAMP = "LAMP",
  OTHER = "Other",
}

export enum MiscellaneousSubType {
  DOCKER = "Docker",
  KUBERNETES = "Kubernetes",
  TERRAFORM = "Terraform",
  OTHER = "Other",
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  defaultBranch: string;
  tags: string[];
  authorId: string;
  templateType: TemplateType;
  subtype: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateWithAuthor extends Template {
  author: User;
}

export interface Repository {
  id: number;
  name: string;
  githubUrl: string;
  description: string;
  defaultBranch: string;
}

export interface UserWithTemplates extends User {
  template: Template[];
}
