export interface ILink {
  link: string;
  desc: string;
}

export interface ICategory {
  desc: string;
  categories: ICategory[];
  links: ILink[];
  poll: boolean;
}