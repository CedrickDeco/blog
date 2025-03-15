export interface Post {
	_id: string;
	title: string;
	content: string;
	imagePath?: string;
	category: string;
  authorId: string;
  authorName: string;
	createdAt: string;
}