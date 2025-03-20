"use client";

import { Post } from "../../../type";
import { useRouter } from "next/navigation";

interface PostItemProps {
	post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/pages/posts/${post._id}`);
	};

	return (
		<div
			className="p-4 border hover:cursor-pointer border-gray-300 rounded-lg flex flex-col gap-4"
			onClick={handleClick}
		>
			{post.imagePath &&
				<img
					src={post.imagePath}
					alt={post.title}
					className="mt-4 rounded-lg w-full h-48 object-contain"
				/>}
			<h2 className="text-xl font-bold">
				{post.title}
			</h2>
			<p className="text-gray-700 line-clamp-4">
				{post.content}
			</p>
			<div className="mt-2 text-sm text-gray-500 flex justify-between">
				<span className="font-medium">
					Auteur: {post.authorName}
				</span>
				<span className="italic">
					Publié le{" "}
					{new Date(post.createdAt).toLocaleDateString("fr-FR")}
				</span>
			</div>
		</div>
	);
};

export default PostItem;
