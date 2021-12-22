export interface Link {
  link: string;
  desc: string;
}

export interface CategoryT {
  desc: string;
  categories: CategoryT[];
  links: Link[];
  poll: boolean;
}